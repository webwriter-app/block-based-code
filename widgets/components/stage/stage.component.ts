import {
  customElement, property, query, state,
} from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task } from "@lit/task";
import {
  SlButton,
  SlCheckbox,
  SlDialog,
  SlDivider,
  SlRange,
  SlSpinner,
  SlTab,
  SlTabGroup,
  SlTabPanel,
} from "@shoelace-style/shoelace";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import AdjustmentsIcon from "@tabler/icons/outline/adjustments.svg";
import PlayerStopIcon from "@tabler/icons/outline/player-stop.svg";
import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { codeStyles, styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { PixiApplication } from "../../lib/pixi";
import { CodeHighlightingEvent, StageApplication, StageType } from "../../types";
import { ErrorApplication } from "../../lib/error";
import { Toolbar } from "../toolbar";
import { ToolbarButton } from "../toolbar-button/toolbar-button.component";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  public stageApplication: StageApplication;

  @property({ type: String })
  public stageType: StageType;

  @property({ type: String })
  public readableCode: string;

  @property({ type: String })
  public executableCode: string;

  @query("#stage")
  private readonly stageElement!: SlTabPanel;

  @query("#vm-options-dialog")
  private readonly vmOptionsDialog!: SlDialog;

  @state()
  private vmBlockHighlighting: boolean = true;

  @state()
  private vmDelay: number = 100;

  private readonly resizeObserver: ResizeObserver;

  private readonly applicationReady: Task;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-toolbar-button": ToolbarButton,
      "sl-spinner": SlSpinner,
      "sl-tab-group": SlTabGroup,
      "sl-tab": SlTab,
      "sl-tab-panel": SlTabPanel,
      "sl-dialog": SlDialog,
      "sl-button": SlButton,
      "sl-checkbox": SlCheckbox,
      "sl-range": SlRange,
      "sl-divider": SlDivider,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
      codeStyles,
    ];
  }

  constructor() {
    super();
    hljs.registerLanguage("javascript", javascript);
    this.applicationReady = new Task(this, {
      task: async () => {
        await this.stageApplication.initComplete;
      },
      autoRun: false,
      onComplete: () => {
        this.stageElement.appendChild(this.stageApplication.container);
        this.stageApplication.virtualMachine.setHighlightCallback(this.handleCodeHighlighting.bind(this));
        this.stageApplication.show();
        Logger.log(this, "Initialized!");
      },
    });
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
  }

  public connectedCallback() {
    super.connectedCallback();

    this.resizeObserver.observe(this);

    this.applyStageType();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();

    this.resizeObserver.disconnect();
    this.applicationReady.abort();
  }

  public render(): TemplateResult {
    const renderer: Parameters<typeof this.applicationReady["render"]>[0] = {
      pending: () => html`<sl-spinner></sl-spinner>`,
      error: (error: Error) => {
        Logger.log(this, error);
        return html`<div class="error">${msg("ERROR")}</div>`;
      },
    };

    return html`
        <webwriter-blocks-toolbar>
            <div>
                <webwriter-blocks-toolbar-button id="settings"
                                                 label=${msg("STOP")}
                                                 icon=${AdjustmentsIcon}
                                                 @click=${this.handleVmOptionsClick}>
                </webwriter-blocks-toolbar-button>
            </div>
            <div>
                <webwriter-blocks-toolbar-button id="stop"
                                                 label=${msg("STOP")}
                                                 icon=${PlayerStopIcon}
                                                 @click=${this.handleStopClick}>
                </webwriter-blocks-toolbar-button>
                <webwriter-blocks-toolbar-button id="start"
                                                 label=${msg("START")}
                                                 icon=${PlayerPlayIcon}
                                                 @click=${this.handleStartClick}>
                </webwriter-blocks-toolbar-button>
            </div>
        </webwriter-blocks-toolbar>
        <sl-tab-group placement="bottom">
            <sl-tab slot="nav" panel="stage">${msg(`OPTIONS.STAGE_TYPES.${this.stageType.toUpperCase() as Uppercase<StageType>}`)}</sl-tab>
            <sl-tab slot="nav" panel="code">${msg("OPTIONS.STAGE_TYPES.CODE")}</sl-tab>
            
            <sl-tab-panel name="stage" id="stage">
                ${this.applicationReady.render(renderer)}
            </sl-tab-panel>
            <sl-tab-panel name="code" id="code">
                <pre><code>${unsafeHTML(hljs.highlight(this.readableCode, { language: "javascript" }).value)}</code></pre>
            </sl-tab-panel>
        </sl-tab-group>
        <sl-dialog label="Execution Options" id="vm-options-dialog">
            <div class="group">
                <sl-checkbox help-text="Highlight blocks as they are executed." 
                             .checked=${this.vmBlockHighlighting}
                             @sl-change=${this.handleBlockHighlightingChange}>
                    Block highlighting
                </sl-checkbox>
            </div>
            <sl-divider></sl-divider>
            <div class="group" style="gap: 0">
                <span class="label">Delay (ms)</span>
                <div style="display: flex; gap: var(--sl-spacing-x-small);">
                    <sl-range help-text="The delay between each block execution."
                              style="width: 100%;"
                              min="40"
                              max="1000"
                              step="100"
                              .value=${this.vmDelay}
                              @sl-change=${this.handleDelayChange}>
                    </sl-range>
                    <span style="width: 100px; font-style: italic; color: var(--sl-color-gray-500); font-size: 14px; padding-top: 3px">
                        ${this.vmDelay} ms
                    </span>
                </div>
            </div>
            <sl-button slot="footer"
                       variant="primary"
                       @click="${() => this.vmOptionsDialog.hide()}">
                Save
            </sl-button>
        </sl-dialog>
    `;
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.get("stageType")) {
      this.applyStageType();
    }
  }

  private handleResize(): void {
    this.stageApplication.resize();
  }

  private handleVmOptionsClick(): void {
    this.vmOptionsDialog.show().catch();
  }

  private handleBlockHighlightingChange(event: Event): void {
    const checkbox = event.target as SlCheckbox;
    this.vmBlockHighlighting = checkbox.checked;
  }

  private handleDelayChange(event: Event): void {
    const range = event.target as SlRange;
    this.vmDelay = range.value as number;
  }

  private handleStartClick(): void {
    this.stageApplication.virtualMachine.start(this.executableCode, this.vmDelay);
  }

  private handleStopClick(): void {
    this.stageApplication.virtualMachine.stop();
  }

  private handleCodeHighlighting(id: string): void {
    if (!this.vmBlockHighlighting) return;
    const event = new CodeHighlightingEvent(id);
    this.dispatchEvent(event);
  }

  private applyStageType(): void {
    if (this.stageApplication) {
      this.stageApplication.destroy();
    }
    switch (this.stageType) {
      case StageType.CANVAS:
        this.stageApplication = new PixiApplication();
        break;
      case StageType.Error:
        this.stageApplication = new ErrorApplication();
        break;
      default:
        throw new Error("Invalid stage type.");
    }
    this.applicationReady.run();
  }
}

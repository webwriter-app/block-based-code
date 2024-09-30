import {
  customElement, property, query, state,
} from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task, TaskStatus } from "@lit/task";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import AdjustmentsIcon from "@tabler/icons/outline/adjustments.svg";
import PlayerStopIcon from "@tabler/icons/outline/player-stop.svg";
import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import RefreshIcon from "@tabler/icons/outline/refresh.svg";
import { codeStyles, styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { PixiApplication } from "../../lib/pixi";
import { CodeHighlightingEvent, StageApplication, StageType } from "../../types";
import { Toolbar } from "../toolbar";
import { ToolbarButton } from "../toolbar-button";

import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js"
import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.component.js"
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js"
import SlRange from "@shoelace-style/shoelace/dist/components/range/range.component.js"
import SlSpinner from "@shoelace-style/shoelace/dist/components/spinner/spinner.component.js"
import SlTab from "@shoelace-style/shoelace/dist/components/tab/tab.component.js"
import SlTabGroup from "@shoelace-style/shoelace/dist/components/tab-group/tab-group.component.js"
import SlTabPanel from "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.component.js"

/**
 * The stage component.
 */
export class Stage extends LitElementWw {
  /**
   * The application that is used to render the stage.
   */
  public stageApplication: StageApplication;

  /**
   * The selected stage type.
   */
  @property({ type: String })
  public accessor stageType: StageType;

  /**
   * The readable code.
   */
  @property({ type: String })
  public accessor readableCode: string;

  /**
   * The executable code.
   */
  @property({ type: String })
  public accessor executableCode: string;

  /**
   * The stage element.
   * @private
   */
  @query("#stage")
  private accessor stageElement!: SlTabPanel;

  /**
   * The VM options dialog element.
   * @private
   */
  @query("#vm-options-dialog")
  private accessor vmOptionsDialog!: SlDialog;

  /**
   * Whether block highlighting is enabled.
   * @private
   */
  @state()
  private accessor vmBlockHighlighting: boolean = true;

  /**
   * The delay between each block execution.
   * @private
   */
  @state()
  private accessor vmDelay: number = 100;

  /**
   * The resize observer.
   * @private
   */
  private readonly resizeObserver: ResizeObserver;

  /**
   * The application ready task.
   * @private
   */
  private readonly applicationReady: Task;

  /**
   * The execution running task.
   * @private
   */
  private readonly executionRunning: Task;

  /**
   * @inheritDoc
   */
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

  /**
   * @inheritDoc
   */
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
    this.executionRunning = new Task<[string, number]>(this, {
      task: async ([code, delay], options) => {
        Logger.log(this, "Starting execution...");
        options.signal.addEventListener("abort", () => {
          this.stageApplication.virtualMachine.stop();
          Logger.log(this, "Execution aborted!");
        });
        await this.stageApplication.virtualMachine.start(code, delay);
      },
      autoRun: false,
      onComplete: () => {
        Logger.log(this, "Execution completed!");
      },
    });
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
  }

  /**
   * @inheritDoc
   */
  public connectedCallback() {
    super.connectedCallback();

    this.resizeObserver.observe(this);

    this.applyStageType();
  }

  /**
   * @inheritDoc
   */
  public disconnectedCallback() {
    super.disconnectedCallback();

    this.resizeObserver.disconnect();
    this.applicationReady.abort();
  }

  /**
   * @inheritDoc
   */
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
                                                 label=${msg("EXECUTION_OPTIONS")}
                                                 icon=${AdjustmentsIcon}
                                                 .disabled=${this.executionRunning.status === TaskStatus.PENDING}
                                                 @click=${this.handleVmOptionsClick}>
                </webwriter-blocks-toolbar-button>
            </div>
            <div>
                <webwriter-blocks-toolbar-button id="stop"
                                                 label=${msg("STOP")}
                                                 icon=${PlayerStopIcon}
                                                 .disabled=${this.executionRunning.status !== TaskStatus.PENDING}
                                                 @click=${this.handleStopClick}>
                </webwriter-blocks-toolbar-button>
                <webwriter-blocks-toolbar-button id="start"
                                                 label=${this.executionRunning.status === TaskStatus.PENDING ? msg("RESTART") : msg("START")}
                                                 icon=${this.executionRunning.status === TaskStatus.PENDING ? RefreshIcon : PlayerPlayIcon}
                                                 @click=${this.handleStartClick}>
                </webwriter-blocks-toolbar-button>
            </div>
        </webwriter-blocks-toolbar>
        <sl-tab-group placement="bottom">
            <sl-tab slot="nav" panel="stage" active>${msg(`OPTIONS.STAGE_TYPES.${this.stageType.toUpperCase() as Uppercase<StageType>}`)}
            </sl-tab>
            <sl-tab slot="nav" panel="code">${msg("OPTIONS.STAGE_TYPES.CODE")}</sl-tab>
            <sl-tab-panel name="stage" id="stage" active>
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
                              min="0"
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

  /**
   * @inheritDoc
   */
  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.get("stageType")) {
      this.applyStageType();
    }
  }

  /**
   * Handles the resize event.
   * @private
   */
  private handleResize(): void {
    this.stageApplication.resize();
  }

  /**
   * Handles the VM options click event.
   * @private
   */
  private handleVmOptionsClick(): void {
    this.vmOptionsDialog.show().catch();
  }

  /**
   * Handles the start click event.
   * @private
   */
  private async handleStartClick(): Promise<void> {
    await this.executionRunning.run([this.executableCode, this.vmDelay]);
  }

  /**
   * Handles the stop click event.
   * @private
   */
  private handleStopClick(): void {
    this.executionRunning.abort();
  }

  /**
   * Handles the block highlighting change event.
   * @param event The change event.
   * @private
   */
  private handleBlockHighlightingChange(event: Event): void {
    const checkbox = event.target as SlCheckbox;
    this.vmBlockHighlighting = checkbox.checked;
  }

  /**
   * Handles the delay change event.
   * @param event The change event.
   * @private
   */
  private handleDelayChange(event: Event): void {
    const range = event.target as SlRange;
    this.vmDelay = range.value as number;
  }

  /**
   * Handles the code highlighting event.
   * @param id The block ID.
   * @private
   */
  private handleCodeHighlighting(id: string): void {
    if (!this.vmBlockHighlighting) return;
    const event = new CodeHighlightingEvent(id);
    this.dispatchEvent(event);
  }

  /**
   * Applies the selected stage type.
   * @private
   */
  private applyStageType(): void {
    if (this.stageApplication) {
      this.stageApplication.destroy();
    }
    switch (this.stageType) {
      case StageType.CANVAS:
        this.stageApplication = new PixiApplication();
        break;
      default:
        throw new Error("Invalid stage type.");
    }
    this.applicationReady.run();
  }
}

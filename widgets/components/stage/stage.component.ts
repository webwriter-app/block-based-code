import { customElement, property, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task } from "@lit/task";
import {
  SlSpinner, SlTab, SlTabGroup, SlTabPanel,
} from "@shoelace-style/shoelace";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { consume } from "@lit/context";
import { codeStyles, styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { PixiApplication } from "../../lib/pixi";
import { StageApplication, StageType } from "../../types";
import { ErrorApplication } from "../../lib/error";
import { virtualMachineContext } from "../../context";
import { VirtualMachine } from "../../lib/vm";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  public stageApplication: StageApplication<string>;

  @property({ type: String })
  public stageType: StageType;

  @property({ type: String })
  public code: string;

  @query("#stage")
  private readonly stageElement!: SlTabPanel;

  @consume({ context: virtualMachineContext })
  private vm: VirtualMachine;

  private readonly resizeObserver: ResizeObserver;

  private readonly applicationReady: Task;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-spinner": SlSpinner,
      "sl-tab-group": SlTabGroup,
      "sl-tab": SlTab,
      "sl-tab-panel": SlTabPanel,
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
        <sl-tab-group placement="bottom">
            <sl-tab slot="nav" panel="stage">${msg(`OPTIONS.STAGE_TYPES.${this.stageType.toUpperCase() as Uppercase<StageType>}`)}</sl-tab>
            <sl-tab slot="nav" panel="code">${msg("OPTIONS.STAGE_TYPES.CODE")}</sl-tab>
            
            <sl-tab-panel name="stage" id="stage">
                ${this.applicationReady.render(renderer)}
            </sl-tab-panel>
            <sl-tab-panel name="code" id="code">
                <pre><code>${unsafeHTML(hljs.highlight(this.code, { language: "javascript" }).value)}</code></pre>
            </sl-tab-panel>
        </sl-tab-group>
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
    this.vm.registerCommandReceiver(this.stageApplication);
    this.applicationReady.run();
  }
}

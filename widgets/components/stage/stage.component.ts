import { customElement, property, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task } from "@lit/task";
import {
  SlSpinner, SlTab, SlTabGroup, SlTabPanel,
} from "@shoelace-style/shoelace";
import { styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { PixiApplication } from "../../lib/pixi";
import { StageApplication, StageType } from "../../types";
import { ErrorApplication } from "../../lib/error";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  public stageApplication: StageApplication<string>;

  @property({ type: String })
  public stageType: StageType;

  @property({ type: String })
  public code: string;

  @query("#stage")
  private readonly stage!: HTMLDivElement;

  private readonly resizeObserver: ResizeObserver;

  private readonly readyTask: Task;

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
    ];
  }

  constructor() {
    super();

    this.readyTask = new Task(this, {
      task: async () => {
        await this.stageApplication.initComplete;
      },
      autoRun: false,
      onComplete: () => {
        this.stage.appendChild(this.stageApplication.container);
        this.stageApplication.show();
        Logger.log("Stage initialized!");
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
    this.readyTask.abort();
  }

  public render(): TemplateResult {
    const renderer: Parameters<typeof this.readyTask["render"]>[0] = {
      pending: () => html`<sl-spinner></sl-spinner>`,
      error: (error: Error) => {
        Logger.log(error);
        return html`<div class="error">${msg("ERROR")}</div>`;
      },
    };

    console.log(this.code);

    return html`
        <sl-tab-group placement="bottom">
            <sl-tab slot="nav" panel="stage">${msg(`OPTIONS.STAGE_TYPES.${this.stageType.toUpperCase() as Uppercase<StageType>}`)}</sl-tab>
            <sl-tab slot="nav" panel="code">${msg("OPTIONS.STAGE_TYPES.CODE")}</sl-tab>
            
            <sl-tab-panel name="stage" id="stage">
                ${this.readyTask.render(renderer)}
            </sl-tab-panel>
            <sl-tab-panel name="code">
                <pre><code>${this.code}</code></pre>
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
    this.readyTask.run();
  }
}

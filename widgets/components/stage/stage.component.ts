import { customElement, property, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task } from "@lit/task";
import { SlSpinner } from "@shoelace-style/shoelace";
import { styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { PixiApplication } from "../../lib/pixi";
import { IStageApplication, StageType } from "../../types";
import { ErrorApplication } from "../../lib/error";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  public application: IStageApplication;

  @property({ type: String })
  public stageType: StageType;

  @query("#stage")
  private readonly stage!: HTMLDivElement;

  private readonly resizeObserver: ResizeObserver;

  private readonly readyTask: Task;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-spinner": SlSpinner,
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
        await this.application.initComplete;
      },
      autoRun: false,
      onComplete: () => {
        this.stage.appendChild(this.application.container);
        this.application.show();
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

    return html`
      <div id="stage">
          ${this.readyTask.render(renderer)}
      </div>
    `;
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.get("stageType")) {
      this.applyStageType();
    }
  }

  private handleResize(): void {
    this.application.resize();
  }

  private applyStageType(): void {
    if (this.application) {
      this.application.destroy();
    }
    switch (this.stageType) {
      case StageType.CANVAS:
        this.application = new PixiApplication();
        break;
      case StageType.CODE_EDITOR:
        throw new Error("Not implemented yet.");
      case StageType.Error:
        this.application = new ErrorApplication();
        break;
      default:
        throw new Error("Invalid stage type.");
    }
    this.readyTask.run();
  }
}

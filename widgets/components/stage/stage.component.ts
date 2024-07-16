import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { Task } from "@lit/task";
import { SlSpinner } from "@shoelace-style/shoelace";
import { styles } from "./stage.styles";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { IStage } from "../../types/stage";
import { BlockTypes } from "../../lib/blockly";
import { PixiApplication } from "../../lib/pixi";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw implements IStage {
  @query("#stage")
  private canvas!: HTMLDivElement;

  private application: PixiApplication;

  private resizeObserver: ResizeObserver;

  private readyTask: Task;

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

    this.application = new PixiApplication();
    this.readyTask = new Task(this, {
      task: async () => {
        await new Promise((resolve) => { setTimeout(resolve, 1e3); });
        await this.application.initComplete;
      },
      autoRun: false,
      onComplete: () => {
        this.canvas.appendChild(this.application.container);
        this.application.show();
        Logger.log("Stage initialized!");
      },
    });
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
  }

  public connectedCallback() {
    super.connectedCallback();

    this.resizeObserver.observe(this);

    this.readyTask.run();
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

  public start(): void {
    this.application.start();
  }

  public stop(): void {
    this.application.stop();
  }

  public get availableBlocks(): BlockTypes[] {
    return [
      "controls:wait",
      "controls:repeat",
      "controls:forever",
      "controls:if",
      "controls:if_else",
      "controls:stop",
      "motions:move",
      "motions:rotate",
      "motions:go_to_x",
      "motions:go_to_y",
      "motions:go_to_xy",
      "motions:x_position",
      "motions:y_position",
      "operators:sum",
      "operators:subtract",
      "operators:multiply",
      "operators:divide",
      "operators:greater",
      "operators:smaller",
      "operators:equal",
      "operators:and",
      "operators:or",
      "variables",
    ];
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
  }

  private handleResize(): void {
    this.application.resize();
  }
}

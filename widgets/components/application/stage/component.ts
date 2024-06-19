import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import * as Pixi from "pixi.js";
import { Task } from "@lit/task";
import { SlSpinner } from "@shoelace-style/shoelace";
import bunny from "../../../assets/bunny.png";
import { styles } from "./styles";
import { Logger } from "../../../utils";
import { msg } from "../../../locales";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  @query("#stage")
  private canvas!: HTMLDivElement;

  private application: Pixi.Application;

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

    this.application = new Pixi.Application();

    this.readyTask = new Task(this, {
      task: async () => {
        await new Promise((resolve) => { setTimeout(resolve, 3e3); });
        await Promise.all([
          await this.application.init({
            width: 800,
            height: 600,
            background: "white",
          }),
          await Pixi.Assets.load(bunny),
        ]);
      },
      autoRun: false,
      onComplete: () => {
        Logger.log("Pixi.js initialized!");
        this.handlePixiReady();
        this.addSprite();
        this.dummyAnimation();
      },
    });
  }

  public render(): TemplateResult {
    const renderer: Parameters<typeof this.readyTask["render"]>[0] = {
      pending: () => html`<sl-spinner></sl-spinner>`,
      error: (error: Error) => {
        Logger.log(error);
        return html`<div class="error">${msg("error")}</div>`;
      },
    };

    return html`
      <div id="stage">
          ${this.readyTask.render(renderer)}
      </div>
      
    `;
  }

  public resize(): void {
    if (this.application.renderer) {
      this.application.canvas.style.transform = `scale(${this.canvas.clientWidth / this.application.canvas.width})`;
    }
  }

  public connectedCallback() {
    super.connectedCallback();

    this.readyTask.run();
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
  }

  private handlePixiReady(): void {
    this.canvas.appendChild(this.application.canvas);
    this.resize();
  }

  private addSprite(): void {
    const filter = new Pixi.ColorMatrixFilter();
    filter.hue(Math.random() * 360, true);

    const sprite = Pixi.Sprite.from(bunny);
    sprite.label = "bunny";
    sprite.filters = [filter];
    sprite.anchor = new Pixi.Point(0.5, 0.5);
    sprite.x = this.application.canvas.width / 2;
    sprite.y = this.application.canvas.height / 2;
    sprite.setSize(100);
    this.application.stage.addChild(sprite);
  }

  private dummyAnimation() : void {
    const sprite = this.application.stage.getChildByLabel("bunny");

    let ySpeed = (Math.random() * 0.4 + 0.1) * 0.5;
    let xSpeed = (Math.random() * 0.4 + 0.1) * 0.5;

    this.application.ticker.add((ticker) => {
      sprite.y += ySpeed * ticker.deltaMS;
      sprite.x += xSpeed * ticker.deltaMS;

      if (sprite.y > this.application.canvas.height - 50 || sprite.y < 50) {
        ySpeed *= -1;
        sprite.filters[0].hue(Math.random() * 360, true);
      }

      if (sprite.x > this.application.canvas.width - 50 || sprite.x < 50) {
        xSpeed *= -1;
        sprite.filters[0].hue(Math.random() * 360, true);
      }
    });
  }
}

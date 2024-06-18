import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  css, CSSResult, html, TemplateResult,
} from "lit";
import * as Pixi from "pixi.js";
import { Logger } from "../utils";
import bunny from "../assets/bunny.png";

@customElement("webwriter-blocks-stage")
export class Stage extends LitElementWw {
  @query("#canvas")
  private canvas!: HTMLDivElement;

  private app?: Pixi.Application;

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          gap: 8px;
          
          height: calc(100% - 16px);

          padding: 8px 8px 8px 0;
          
          background-color: var(--sl-color-gray-100);
        }
        
        #canvas {
          position: relative;
          width: 100%;
          margin: 0 auto;
          height: 0;

          padding-top: calc(100% * 3 / 4);
          
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }
        
        #canvas canvas {
          position: absolute;
          top: 0;
          left: 0;
          
          transform-origin: top left;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
      <div id="canvas"></div>
    `;
  }

  public resize(): void {
    if (this.app) {
      this.app.canvas.style.transform = `scale(${this.canvas.clientWidth / this.app.canvas.width})`;
    }
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);

    this.app = new Pixi.Application();

    this.app
      .init({
        width: 800,
        height: 600,
        background: "white",
      })
      .then(this.handlePixiReady.bind(this))
      .catch(this.handlePixiError.bind(this));
  }

  private handlePixiReady(): void {
    this.canvas.appendChild(this.app.canvas);
    this.resize();

    this.loadAssets().then(() => {
      const filter = new Pixi.ColorMatrixFilter();
      filter.hue(Math.random() * 360, true);

      const sprite = Pixi.Sprite.from(bunny);
      sprite.filters = [filter];
      sprite.anchor = new Pixi.Point(0.5, 0.5);
      sprite.x = this.app.canvas.width / 2;
      sprite.y = this.app.canvas.height / 2;
      sprite.setSize(100);
      this.app.stage.addChild(sprite);

      let ySpeed = (Math.random() * 0.4 + 0.1) * 0.5;
      let xSpeed = (Math.random() * 0.4 + 0.1) * 0.5;
      this.app.ticker.add((ticker) => {
        sprite.y += ySpeed * ticker.deltaMS;
        sprite.x += xSpeed * ticker.deltaMS;

        if (sprite.y > this.app.canvas.height - sprite.height / 2 || sprite.y < sprite.height / 2) {
          ySpeed *= -1;
          filter.hue(Math.random() * 360, true);
        }

        if (sprite.x > this.app.canvas.width - sprite.width / 2 || sprite.x < sprite.width / 2) {
          xSpeed *= -1;
          filter.hue(Math.random() * 360, true);
        }
      });
    });
  }

  private async loadAssets(): Promise<void> {
    await Pixi.Assets.load(bunny);
  }

  private handlePixiError(error: Error): void {
    Logger.error("Error initializing pixi.js");
    Logger.log(error);
  }
}

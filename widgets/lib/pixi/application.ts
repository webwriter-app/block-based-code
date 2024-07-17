import {
  Application, Assets, ColorMatrixFilter, Point, Renderer, Sprite,
} from "pixi.js";
import { BlockTypes } from "../blockly";
import bunny from "../../assets/bunny.png";
import type { Command, IStageApplication } from "../types";
import { Logger } from "../../utils";

export class PixiApplication implements IStageApplication {
  public initComplete: Promise<void>;

  private application: Application;

  constructor() {
    this.application = new Application();
    this.initComplete = new Promise((resolve, reject) => {
      this.init().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public get container(): Renderer["canvas"] {
    return this.application.canvas;
  }

  public destroy(): void {
    this.application.destroy();
  }

  public command(command: Command, ...args: unknown[]): void {
    switch (command) {
      case "start":
        this.application.ticker.start();
        break;
      case "stop":
        this.application.ticker.stop();
        break;
      default:
        Logger.log(`Unknown command: ${command}(${args.join(", ")})`);
    }
  }

  public get usableBlocks(): BlockTypes[] {
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

  public show(): void {
    this.application.render();
    this.resize();
  }

  public resize(): void {
    if (this.application.canvas.parentElement) {
      this.application.canvas.style.transform = `scale(${this.application.canvas.parentElement.clientWidth / this.application.canvas.width})`;
    }
  }

  private async init(): Promise<void> {
    await new Promise((resolve) => { setTimeout(resolve, 1e3); });
    await this.application.init({
      width: 800,
      height: 600,
      background: "white",
      autoStart: false,
    });
    await Assets.load(bunny);
    this.addSprite();
    this.dummyAnimation();
  }

  private addSprite(): void {
    const filter = new ColorMatrixFilter();
    filter.hue(Math.random() * 360, true);

    const sprite = Sprite.from(bunny);
    sprite.label = "bunny";
    sprite.filters = [filter];
    sprite.anchor = new Point(0.5, 0.5);
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

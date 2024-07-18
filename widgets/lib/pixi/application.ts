import {
  Application, Assets, ColorMatrixFilter, Point, Sprite,
} from "pixi.js";
import { BlockTypes } from "../blockly";
import bunny from "../../assets/bunny.png";
import { StageApplication } from "../types";
import { Logger } from "../../utils";

type Commands = "move" | "rotate" | "set_x" | "set_y" | "set_xy";

export class PixiApplication extends StageApplication<Commands> {
  private application: Application;

  constructor() {
    super();
    this.application = new Application();
    this.createContainer();
    this.initComplete = new Promise((resolve, reject) => {
      this.init().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public destroy(): void {
    this.application.destroy();
    super.destroy();
  }

  public command(command: Commands, ...args: unknown[]): void {
    Logger.log(this, `${command}(${args.join(", ")})`);
    switch (command) {
      case "move":
        this.move(args[0] as number);
        break;
      case "rotate":
        this.rotate(args[0] as number);
        break;
      case "set_x":
        this.setX(args[0] as number);
        break;
      case "set_y":
        this.setY(args[0] as number);
        break;
      case "set_xy":
        this.setXY(args[0] as number, args[1] as number);
        break;
      default:
        break;
    }
  }

  public get usableBlocks(): BlockTypes[] {
    const defaultBlocks = super.usableBlocks;
    return [
      ...defaultBlocks,
      "motions:move",
      "motions:rotate",
      "motions:go_to_x",
      "motions:go_to_y",
      "motions:go_to_xy",
      "motions:x_position",
      "motions:y_position",
    ];
  }

  public show(): void {
    this.container.appendChild(this.application.canvas);
    this.application.render();
    this.resize();
  }

  public resize(): void {
    this.application.canvas.style.transform = `scale(${this.container.clientWidth / this.application.canvas.width})`;
  }

  protected createContainer(): void {
    super.createContainer();
    this.container.style.height = "0";
    this.container.style.paddingTop = "calc(100% * 3 / 4)";
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
    this.application.canvas.style.position = "absolute";
    this.application.canvas.style.transformOrigin = "top left";
    this.application.canvas.style.top = "0";
    this.application.canvas.style.left = "0";
    // this.dummyAnimation();
    this.application.ticker.start();
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

  private move(steps: number): void {
    this.bunny.x += steps * Math.cos(this.bunny.rotation);
    this.bunny.y += steps * Math.sin(this.bunny.rotation);
  }

  private rotate(angle: number): void {
    this.bunny.angle += angle;
  }

  private setX(x: number): void {
    this.bunny.x = x;
  }

  private setY(y: number): void {
    this.bunny.y = y;
  }

  private setXY(x: number, y: number): void {
    this.bunny.x = x;
    this.bunny.y = y;
  }

  private get bunny(): Sprite {
    return this.application.stage.getChildByLabel("bunny") as Sprite;
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

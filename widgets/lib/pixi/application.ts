import {
  Application, Assets, Point, Sprite,
} from "pixi.js";
import { BlockTypes } from "../blockly";
import bunny from "../../assets/bunny.png";
import { StageApplication } from "../types";
import { PixiVirtualMachine } from "./vm";

export class PixiApplication extends StageApplication {
  public override virtualMachine: PixiVirtualMachine;

  private application: Application;

  constructor() {
    super();

    this.virtualMachine = new PixiVirtualMachine(this.application);
  }

  public override destroy(): void {
    this.virtualMachine.stop();
    this.application.destroy();
    super.destroy();
  }

  public override show(): void {
    this.container.appendChild(this.application.canvas);
    this.application.render();
    this.resize();
  }

  public override resize(): void {
    this.application.canvas.style.transform = `scale(${this.container.clientWidth / this.application.canvas.width})`;
  }

  protected override createContainer(): void {
    super.createContainer();
    this.container.style.height = "0";
    this.container.style.paddingTop = "calc(100% * 3 / 4)";
  }

  protected override get specialBlocks(): BlockTypes[] {
    return [
      "motions:move",
      "motions:rotate",
      "motions:go_to_x",
      "motions:go_to_y",
      "motions:go_to_xy",
      "motions:x_position",
      "motions:y_position",
    ];
  }

  protected override async init(): Promise<void> {
    this.application = new Application();
    await this.application.init({
      width: 800,
      height: 600,
      background: "white",
      autoStart: false,
    });
    await Assets.load(bunny);
    this.styleCanvas();
    this.addSprite();
    this.application.ticker.start();
  }

  private styleCanvas(): void {
    this.application.canvas.style.position = "absolute";
    this.application.canvas.style.transformOrigin = "top left";
    this.application.canvas.style.top = "0";
    this.application.canvas.style.left = "0";
  }

  private addSprite(): void {
    const sprite = Sprite.from(bunny);
    sprite.label = "bunny";
    sprite.anchor = new Point(0.5, 0.5);
    sprite.x = this.application.canvas.width / 2;
    sprite.y = this.application.canvas.height / 2;
    sprite.setSize(100);
    this.application.stage.addChild(sprite);
  }
}

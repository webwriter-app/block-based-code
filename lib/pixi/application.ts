import {
  Application, Assets, ColorMatrixFilter, Point, Sprite,
  TextureStyle,
} from "pixi.js";
import { BlockTypes } from "../blockly";
import bunny from "../../assets/bunny.png";
import { StageApplication } from "../types";
import { PixiVirtualMachine } from "./vm";
import { Logger } from "../../utils";

/**
 * The PixiApplication class represents a Pixi application.
 */
export class PixiApplication extends StageApplication {
  /**
   * The virtual machine used by the application.
   */
  public override virtualMachine: PixiVirtualMachine;

  /**
   * The Pixi application.
   * @private
   */
  private declare application: Application;

  constructor() {
    super();
    this.virtualMachine = new PixiVirtualMachine(this.application);
  }

  /**
   * @inheritDoc
   */
  public override destroy(): void {
    this.virtualMachine.stop();
    this.application.destroy();
    super.destroy();
  }

  /**
   * @inheritDoc
   */
  public override show(): void {
    this.container.appendChild(this.application.canvas);
    this.application.render();
    this.resize();
  }

  /**
   * @inheritDoc
   */
  public override resize(): void {
    if (!this.application) return;
    this.application.canvas.style.transform = `scale(${this.container.clientWidth / this.application.canvas.width})`;
  }

  /**
   * @inheritDoc
   */
  protected override createContainer(): void {
    super.createContainer();
    this.container.style.height = "0";
    this.container.style.paddingTop = "calc(100% * 3 / 4)";
  }

  /**
   * @inheritDoc
   */
  protected override get specialBlocks(): BlockTypes[] {
    return [
      "motions:move",
      "motions:rotate",
      "motions:set_rotation",
      "motions:set_x",
      "motions:set_y",
      "motions:set_xy",
      "motions:get_x",
      "motions:get_y",
      "looks:say",
      "looks:say_for_seconds",
      "looks:set_color",
      "sensing:timer",
      "sensing:reset_timer",
    ];
  }

  /**
   * @inheritDoc
   */
  protected override async init(): Promise<void> {
    this.application = new Application();
    await this.application.init({
      width: 800,
      height: 600,
      background: "white",
      autoStart: false,
    });
    TextureStyle.defaultOptions.scaleMode = "nearest";
    await Assets.load(bunny);
    this.styleCanvas();
    this.addSprite();
    this.application.ticker.start();
    this.virtualMachine.initSpeechBubble();
  }

  /**
   * Styles the Pixi canvas element.
   * @private
   */
  private styleCanvas(): void {
    this.application.canvas.style.position = "absolute";
    this.application.canvas.style.transformOrigin = "top left";
    this.application.canvas.style.top = "0";
    this.application.canvas.style.left = "0";
  }

  /**
   * Adds a sprite to the stage.
   * @private
   */
  private addSprite(): void {
    const sprite = Sprite.from(bunny);
    sprite.label = "bunny";
    sprite.anchor = new Point(0.5, 0.5);
    sprite.x = this.application.canvas.width / 2;
    sprite.y = this.application.canvas.height / 2;
    sprite.setSize(100);

    const filter = new ColorMatrixFilter();
    sprite.filters = [filter];

    // Make sprite interactive and add click handler
    sprite.eventMode = "static";
    sprite.on("pointerdown", () => this.handleSpriteClick());

    this.application.stage.addChild(sprite);
  }

  /**
   * Handles the sprite click event.
   * @private
   */
  private handleSpriteClick(): void {
    if (this.executableCode) {
      // Start the VM with the whenSpriteClicked event
      this.virtualMachine.start(this.executableCode, this.vmDelay, "whenSpriteClicked").catch((error) => {
        Logger.error("Error starting VM on sprite click:", error);
      });
    }
  }
}

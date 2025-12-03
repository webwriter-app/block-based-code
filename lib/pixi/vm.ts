import { Application, ColorMatrixFilter, Sprite } from "pixi.js";
import { sound } from "@pixi/sound";
import { VirtualMachine } from "../types";
import { SpeechBubble } from "./speech-bubble";

export class PixiVirtualMachine extends VirtualMachine {
  private application: Application;

  private timerStartTime: number = 0;

  private speechBubble: SpeechBubble;

  private tickerCallback: () => void;

  private pendingSoundPromises: Set<() => void> = new Set();

  constructor(application: Application) {
    super();
    this.application = application;
    this.timerStartTime = Date.now();
  }

  /**
   * Initializes the speech bubble and adds it to the stage
   * Must be called after the PIXI application is initialized
   */
  public initSpeechBubble(): void {
    if (this.speechBubble) {
      return; // Already initialized
    }

    this.speechBubble = new SpeechBubble(
      this.application.canvas.width,
      this.application.canvas.height,
    );
    this.application.stage.addChild(this.speechBubble);

    // Add ticker callback to update bubble position when sprite moves
    this.tickerCallback = () => {
      if (this.speechBubble.visible) {
        const sprite = this.bunny;
        const dims = this.speechBubble.getDimensions();
        this.speechBubble.updatePosition(sprite, dims.width, dims.height);
      }
    };
    this.application.ticker.add(this.tickerCallback);
  }

  public override async start(code: string, delay: number, eventType: string = "whenStartClicked"): Promise<void> {
    if (eventType === "whenStartClicked") {
      this.timerStartTime = Date.now();
    }
    await super.start(code, delay, eventType);
  }

  public override stop(): void {
    this.stopAllSounds();
    super.stop();
  }

  /**
   * Resets the stage to its initial state
   */
  public reset(): void {
    // Reset background color to white
    this.application.renderer.background.color = "white";

    // Reset sprite position to center
    const sprite = this.bunny;
    sprite.x = this.application.canvas.width / 2;
    sprite.y = this.application.canvas.height / 2;

    // Reset rotation to 0
    sprite.angle = 0;

    // Reset color filter
    const filter = sprite.filters[0] as ColorMatrixFilter;
    filter.reset();

    // Hide speech bubble
    if (this.speechBubble) {
      this.speechBubble.visible = false;
    }

    // Reset variables
    this.resetVariables();
  }

  protected override get callables(): ((...args: any[]) => void)[] {
    return [
      this.move,
      this.rotate,
      this.setRotation,
      this.setX,
      this.setY,
      this.setXY,
      this.getX,
      this.getY,
      this.setColor,
      this.setBackgroundColor,
      this.getTimer,
      this.resetTimer,
      this.say,
      this.playSound,
      this.playSoundUntilDone,
      this.stopAllSounds,
    ];
  }

  private move(steps: number): void {
    if (!Number.isFinite(steps)) return;
    this.bunny.x += steps * Math.cos(this.bunny.rotation);
    this.bunny.y += steps * Math.sin(this.bunny.rotation);
  }

  private rotate(angle: number): void {
    if (!Number.isFinite(angle)) return;
    this.bunny.angle += angle;
  }

  private setRotation(angle: number): void {
    if (!Number.isFinite(angle)) return;
    this.bunny.angle = angle;
  }

  private setX(x: number): void {
    if (!Number.isFinite(x)) return;
    this.bunny.x = x;
  }

  private setY(y: number): void {
    if (!Number.isFinite(y)) return;
    this.bunny.y = y;
  }

  private setXY(x: number, y: number): void {
    if (Number.isFinite(x)) {
      this.bunny.x = x;
    }
    if (Number.isFinite(y)) {
      this.bunny.y = y;
    }
  }

  private getX(): number {
    return this.bunny.x;
  }

  private getY(): number {
    return this.bunny.y;
  }

  private setColor(color: number): void {
    if (!Number.isFinite(color)) return;
    const filter = this.bunny.filters[0] as ColorMatrixFilter;
    filter.hue(color, false);
  }

  private setBackgroundColor(color: string): void {
    this.application.renderer.background.color = color;
  }

  private getTimer(): number {
    return (Date.now() - this.timerStartTime) / 1000;
  }

  private resetTimer(): void {
    this.timerStartTime = Date.now();
  }

  private say(text: string): void {
    this.speechBubble.setText(String(text), this.bunny);
  }

  private playSound(soundName: string): void {
    sound.play(soundName);
  }

  private playSoundUntilDone(soundName: string): Promise<void> {
    return new Promise((resolve) => {
      this.pendingSoundPromises.add(resolve);
      sound.play(soundName, {
        complete: () => {
          this.pendingSoundPromises.delete(resolve);
          resolve();
        },
      });
    });
  }

  private stopAllSounds(): void {
    sound.stopAll();
    // Resolve all pending promises to prevent scripts from hanging
    this.pendingSoundPromises.forEach((resolve) => resolve());
    this.pendingSoundPromises.clear();
  }

  private get bunny(): Sprite {
    return this.application.stage.getChildByLabel("bunny") as Sprite;
  }
}

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
      this.getTimer,
      this.resetTimer,
      this.say,
      this.playSound,
      this.playSoundUntilDone,
      this.stopAllSounds,
    ];
  }

  private move(steps: number): void {
    this.bunny.x += steps * Math.cos(this.bunny.rotation);
    this.bunny.y += steps * Math.sin(this.bunny.rotation);
  }

  private rotate(angle: number): void {
    this.bunny.angle += angle;
  }

  private setRotation(angle: number): void {
    this.bunny.angle = angle;
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

  private getX(): number {
    return this.bunny.x;
  }

  private getY(): number {
    return this.bunny.y;
  }

  private setColor(color: number): void {
    const filter = this.bunny.filters[0] as ColorMatrixFilter;
    filter.hue(color, false);
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

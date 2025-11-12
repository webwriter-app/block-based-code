import { Application, ColorMatrixFilter, Sprite } from "pixi.js";
import { VirtualMachine } from "../types";

export class PixiVirtualMachine extends VirtualMachine {
  private application: Application;
  private timerStartTime: number = 0;

  constructor(application: Application) {
    super();
    this.application = application;
  }

  public override async start(code: string, delay: number): Promise<void> {
    this.timerStartTime = Date.now();
    await super.start(code, delay);
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

  private get bunny(): Sprite {
    return this.application.stage.getChildByLabel("bunny") as Sprite;
  }
}

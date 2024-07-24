import { Application, ColorMatrixFilter, Sprite } from "pixi.js";
import { VirtualMachine } from "../vm";

export class PixiVirtualMachine extends VirtualMachine {
  private application: Application;

  constructor(application: Application) {
    super();
    this.application = application;
  }

  protected override get callables(): ((...args: any[]) => void)[] {
    return [
      ...super.callables,
      this.move,
      this.rotate,
      this.setRotation,
      this.setX,
      this.setY,
      this.setXY,
      this.getX,
      this.getY,
      this.setColor,
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

  private get bunny(): Sprite {
    return this.application.stage.getChildByLabel("bunny") as Sprite;
  }
}

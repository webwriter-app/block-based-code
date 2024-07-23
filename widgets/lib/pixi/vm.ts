import { Application, Sprite } from "pixi.js";
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
      this.goToX,
      this.goToY,
      this.goToXY,
      this.getX,
      this.getY,
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

  private goToX(x: number): void {
    this.bunny.x = x;
  }

  private goToY(y: number): void {
    this.bunny.y = y;
  }

  private goToXY(x: number, y: number): void {
    this.bunny.x = x;
    this.bunny.y = y;
  }

  private getX(): number {
    return this.bunny.x;
  }

  private getY(): number {
    return this.bunny.y;
  }

  private get bunny(): Sprite {
    return this.application.stage.getChildByLabel("bunny") as Sprite;
  }
}

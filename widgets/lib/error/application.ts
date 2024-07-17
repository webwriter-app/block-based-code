import { StageApplication } from "../types";

export class ErrorApplication extends StageApplication<string> {
  constructor() {
    super();
    this.initComplete = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Invalid"));
      }, 5e3);
    });
  }

  public get container(): HTMLElement {
    return null;
  }

  public destroy(): void {

  }

  public command(): void {

  }

  public show(): void {

  }

  public resize(): void {

  }
}

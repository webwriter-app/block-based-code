import { StageApplication } from "../types";

export class ErrorApplication extends StageApplication {
  constructor() {
    super();
    this.initComplete = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Invalid"));
      }, 5e3);
    });
  }

  public command(): any {

  }

  public show(): void {

  }

  public resize(): void {

  }
}

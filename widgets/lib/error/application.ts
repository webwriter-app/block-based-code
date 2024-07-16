import { BlockTypes } from "../blockly";
import { IStageApplication } from "../../types";

export class ErrorApplication implements IStageApplication {
  public initComplete: Promise<void>;

  constructor() {
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

  public start(): void {

  }

  public stop(): void {

  }

  public get usableBlocks(): BlockTypes[] {
    return [];
  }

  public show(): void {

  }

  public resize(): void {

  }
}

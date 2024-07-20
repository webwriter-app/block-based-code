import { BlockTypes } from "../blockly";
import { Application } from "./application";
import { VirtualMachine } from "../vm";

export abstract class StageApplication extends Application {
  public initComplete: Promise<void>;

  public abstract virtualMachine: VirtualMachine;

  protected constructor() {
    super();

    this.initComplete = new Promise((resolve, reject) => {
      this.init().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public get usableBlocks(): BlockTypes[] {
    return [
      "controls:wait",
      "controls:repeat",
      "controls:forever",
      "controls:if",
      "controls:if_else",
      "controls:stop",
      "operators:sum",
      "operators:subtract",
      "operators:multiply",
      "operators:divide",
      "operators:greater",
      "operators:smaller",
      "operators:equal",
      "operators:and",
      "operators:or",
      "variables",
      ...this.specialBlocks,
    ];
  }

  public abstract show(): void;

  public abstract resize(): void;

  protected abstract init(): Promise<void>;

  protected abstract get specialBlocks(): BlockTypes[];
}

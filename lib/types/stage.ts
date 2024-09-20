import { BlockTypes } from "../blockly";
import { Application } from "./application";
import { VirtualMachine } from ".";

/**
 * The Stage Application class is an abstract class that represents a stage application.
 */
export abstract class StageApplication extends Application {
  /**
   * The promise that resolves when the stage is initialized.
   */
  public initComplete: Promise<void>;

  /**
   * The virtual machine instance.
   */
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

  /**
   * The blocks that can be used in the stage.
   */
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
      "operators:not",
      "operators:absolute",
      "variables",
      ...this.specialBlocks,
    ];
  }

  /**
   * Destroys the stage application.
   */
  public override destroy(): void {
    super.destroy();
    this.virtualMachine.stop();
  }

  /**
   * Shows the stage application. This method should be overridden in the child class.
   */
  public abstract show(): void;

  /**
   * Inits the stage application. This method should be overridden in the child class.
   */
  protected abstract init(): Promise<void>;

  /**
   * The special blocks that can be used in the stage. This method should be overridden in the child class.
   */
  protected abstract get specialBlocks(): BlockTypes[];
}

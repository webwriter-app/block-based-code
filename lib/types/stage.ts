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

  /**
   * The current executable code.
   * @protected
   */
  protected executableCode: string = "";

  /**
   * The current VM delay.
   * @protected
   */
  protected vmDelay: number = 100;

  /**
   * The host element (custom element) that contains this application.
   * @protected
   */
  protected hostElement: HTMLElement | null = null;

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
   * Sets the executable code and VM delay for event handlers.
   * @param code The executable code.
   * @param delay The VM delay.
   */
  public setExecutionContext(code: string, delay: number): void {
    this.executableCode = code;
    this.vmDelay = delay;
  }

  /**
   * Sets the host element (custom element) that contains this application.
   * @param element The host element.
   */
  public setHostElement(element: HTMLElement): void {
    this.hostElement = element;
    this.onHostElementSet();
  }

  /**
   * Called after the host element is set.
   * @protected
   */
  protected onHostElementSet(): void {
    // Set by subclasses
  }

  /**
   * The blocks that can be used in the stage.
   */
  public get usableBlocks(): BlockTypes[] {
    return [
      "events:when_start_clicked",
      "events:when_sprite_clicked",
      "events:when_key_pressed",
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
      "operators:random",
      "operators:greater",
      "operators:smaller",
      "operators:equal",
      "operators:and",
      "operators:or",
      "operators:not",
      "operators:join",
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

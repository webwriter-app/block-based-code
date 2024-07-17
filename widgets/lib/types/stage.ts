import { BlockTypes } from "../blockly";
import { IApplication } from "./application";

interface IStageApplication<Commands extends string> extends IApplication<Commands> {
  initComplete: Promise<void>;

  get container(): HTMLElement;

  get usableBlocks(): BlockTypes[];

  destroy(): void;

  show(): void;

  resize(): void;
}

// eslint-disable-next-line max-len
export abstract class StageApplication<Commands extends string> implements IStageApplication<Commands> {
  public initComplete: Promise<void>;

  public abstract get container(): HTMLElement;

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
    ];
  }

  public abstract destroy(): void;

  public abstract show(): void;

  public abstract resize(): void;

  public abstract command(command: Commands, ...args: unknown[]): void;
}

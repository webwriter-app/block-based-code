import { BlockTypes } from "../blockly";
import { Application } from "./application";

// eslint-disable-next-line max-len
export abstract class StageApplication<Commands extends string> extends Application<Commands> {
  public initComplete: Promise<void>;

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

  public abstract show(): void;

  public abstract resize(): void;
}

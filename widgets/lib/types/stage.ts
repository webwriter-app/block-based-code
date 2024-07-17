import { BlockTypes } from "../blockly";
import { IApplication } from "./application";

export interface IStageApplication extends IApplication {
  initComplete: Promise<void>;

  get container(): HTMLElement;

  get usableBlocks(): BlockTypes[];

  destroy(): void;

  show(): void;

  resize(): void;
}

import { BlockTypes } from "../blockly";

export interface IStageApplication {
  initComplete: Promise<void>;

  get container(): HTMLElement;

  get usableBlocks(): BlockTypes[];

  destroy(): void;

  show(): void;

  start(): void;

  stop(): void;

  resize(): void;
}

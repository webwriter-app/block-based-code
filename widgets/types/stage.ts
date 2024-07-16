import { BlockTypes } from "../lib/blockly";

export interface IStage {
  start(): void;
  stop(): void;

  get availableBlocks(): BlockTypes[];
}

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

export enum StageType {
  CANVAS = "canvas",
  CODE_EDITOR = "code-editor",
  Error = "error",
}

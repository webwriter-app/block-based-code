import { BlockTypes } from "../lib/blockly";

export interface IStage {
  start(): void;
  stop(): void;

  get availableBlocks(): BlockTypes[];
}

export enum StageType {
  CANVAS = "canvas",
  Error = "error",
}

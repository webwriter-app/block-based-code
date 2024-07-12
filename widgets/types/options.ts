import { BlockTypes } from "../lib/blockly";
import { StageType } from "./stage";

export interface Options {
  readonly?: 0 | 1;
  stageType?: StageType;
  selectedBlocks?: BlockTypes[];
}

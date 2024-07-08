import { BlockTypes } from "../lib/blockly";
import { StageType } from "./stage";

export interface Options {
  stageType?: StageType;
  selectedBlocks?: BlockTypes[];
}

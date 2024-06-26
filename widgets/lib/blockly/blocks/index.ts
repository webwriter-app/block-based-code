import * as Blockly from "blockly";
import { eventBlocks } from "./events";
import { controlBlocks } from "./controls";
import { operatorBlocks } from "./operators";
import { motionBlocks } from "./motions";

Blockly.defineBlocksWithJsonArray([
  ...motionBlocks,
  ...eventBlocks,
  ...controlBlocks,
  ...operatorBlocks,
]);

delete Blockly.Blocks.math_change;

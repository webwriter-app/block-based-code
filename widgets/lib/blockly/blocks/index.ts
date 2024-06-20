import * as Blockly from "blockly";
import { eventBlocks } from "./events";
import { controlBlocks } from "./controls";
import { operatorBlocks } from "./operators";

Blockly.defineBlocksWithJsonArray([
  ...eventBlocks,
  ...controlBlocks,
  ...operatorBlocks,
]);

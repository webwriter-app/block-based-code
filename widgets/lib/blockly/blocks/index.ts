import * as Blockly from "blockly";
import { eventBlocks } from "./events";
import { controlBlocks } from "./controls";

Blockly.defineBlocksWithJsonArray([
  ...eventBlocks,
  ...controlBlocks,
]);

import * as Blockly from "blockly";
import { blocks as eventBlocks } from "./events";
import { BlockType } from "../types";

const blocks = [
  ...eventBlocks,
];

const blockDefinitions: typeof Blockly.Blocks = Blockly.common.createBlockDefinitionsFromJsonArray(blocks);
Blockly.common.defineBlocks(blockDefinitions);

export const blockTemplates = blocks.reduce((templates, block) => ({
  ...templates,
  [block.type]: {
    kind: "block",
    type: BlockType.WHEN_START_CLICKED,
  },
}), {});

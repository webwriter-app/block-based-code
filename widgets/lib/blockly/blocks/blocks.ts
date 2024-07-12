import { blocks as controlBlocks } from "./controls";
import { blocks as eventBlocks } from "./events";
import { blocks as motionBlocks } from "./motions";
import { blocks as operatorBlocks } from "./operators";
import { numberBlock } from "./math";

export const blocks = [
  ...eventBlocks,
  ...controlBlocks,
  ...motionBlocks,
  ...operatorBlocks,
  numberBlock,
];
export type BlockTypes = typeof blocks[number]["type"];

export const blockDefinitions = blocks.reduce((acc, block) => {
  acc[block.type] = block;
  return acc;
}, {}) as Record<BlockTypes, object>;

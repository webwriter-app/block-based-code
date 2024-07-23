import { blocks as controlBlocks } from "./controls";
import { blocks as eventBlocks } from "./events";
import { blocks as lookBlocks } from "./looks";
import { blocks as motionBlocks } from "./motions";
import { blocks as operatorBlocks } from "./operators";
import { numberBlock } from "./math";
import { BlockDefinition } from "../types";

export const blocks = [
  ...eventBlocks,
  ...controlBlocks,
  ...lookBlocks,
  ...motionBlocks,
  ...operatorBlocks,
  numberBlock,
] satisfies BlockDefinition[];

export type BlockTypes = typeof blocks[number]["type"] | "variables";
export type CategoryTypes = typeof blocks[number]["category"];

export const blockArguments = blocks.reduce((acc, block) => {
  const args = [];
  let argsIndex = 0;
  while (block[`args${argsIndex}`]) {
    const blockArgs = block[`args${argsIndex}`];
    args.push(blockArgs);
    argsIndex += 1;
  }

  acc[block.type] = args;
  return acc;
}, {}) as Record<BlockTypes, { type: string; name: string; check: string }[][]>;

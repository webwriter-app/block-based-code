import { blocks as controlBlocks } from "./controls";
import { blocks as eventBlocks } from "./events";
import { blocks as lookBlocks } from "./looks";
import { blocks as motionBlocks } from "./motions";
import { blocks as operatorBlocks } from "./operators";
import { blocks as sensingBlocks } from "./sensing";
import { blocks as soundsBlocks } from "./sounds";
import { numberBlock } from "./math";
import { stringBlock } from "./string";
import { BlockDefinition } from "../types";

export const blocks = [
  ...eventBlocks,
  ...controlBlocks,
  ...lookBlocks,
  ...motionBlocks,
  ...operatorBlocks,
  ...sensingBlocks,
  ...soundsBlocks,
  numberBlock,
  stringBlock,
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

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
export type BlockTypes = typeof blocks[number]["type"] | "variables";

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

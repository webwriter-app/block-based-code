import { blocks as controlBlocks } from "./controls";
import { blocks as eventBlocks } from "./events";
import { blocks as lookBlocks } from "./looks";
import { blocks as motionBlocks } from "./motions";
import { blocks as operatorBlocks } from "./operators";
import { blocks as sensingBlocks } from "./sensing";
import { blocks as soundsBlocks } from "./sounds";
import { numberBlock } from "./math";
import { stringBlock } from "./string";
import { BlockDefinition } from "../block-types";

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

type BlockArguments = NonNullable<BlockDefinition[`args${number}`]>;

export const blockArguments = (blocks as BlockDefinition[]).reduce((acc, block) => {
  const args: BlockArguments[] = [];
  let argsIndex = 0;
  while (block[`args${argsIndex}`]) {
    args.push(block[`args${argsIndex}`] as BlockArguments);
    argsIndex += 1;
  }

  acc[block.type as BlockTypes] = args;
  return acc;
}, {} as Record<BlockTypes, BlockArguments[]>);

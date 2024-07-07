import { blockTemplates } from "./blocks";
import { BlockType, CategoryKey } from "./types";

export * from "./blockly-workspace";

export const AllBlocks: BlockType[] = Object.keys(blockTemplates) as BlockType[];
export const BlockTree: Record<CategoryKey, BlockType[]> = AllBlocks.reduce((tree, block) => {
  if (block === BlockType.WHEN_START_CLICKED) return tree;
  const [category] = block.split(":");
  // eslint-disable-next-line no-param-reassign
  if (!tree[category]) tree[category] = [];
  tree[category].push(block);
  return tree;
}, {});

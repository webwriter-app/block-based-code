import { blockTemplates } from "../blocks";
import { BlockType } from "../types";

export const createToolboxFromBlockList = (blocks: string[]) => {
  const toolbox = {};
  Object.entries(blockTemplates).forEach(([block, template]) => {
    if (![...blocks, BlockType.WHEN_START_CLICKED].includes(block)) return;
    const [category] = block.split(":");
    if (!toolbox[category]) {
      toolbox[category] = [];
    }
    toolbox[category].push(template);
  });

  return {
    kind: "categoryToolbox",
    contents: Object.keys(toolbox).map((category) => ({
      kind: "category",
      name: category,
      contents: toolbox[category],
      categoryStyle: category.slice(0, -1),
    })),
  };
};

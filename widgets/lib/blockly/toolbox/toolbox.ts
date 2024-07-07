import { blockTemplates } from "../blocks";
import { BlockType } from "../types";

export const createToolboxFromBlockList = (blocks: string[]) => {
  const toolbox = {
    events: [
      blockTemplates[BlockType.WHEN_START_CLICKED],
    ],
  };
  // blocks.forEach((block) => {
  //   const [category] = block.split(":");
  //   if (!toolbox[category]) {
  //     toolbox[category] = [];
  //   }
  //   toolbox[category].push(blockDefinition);
  // });

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

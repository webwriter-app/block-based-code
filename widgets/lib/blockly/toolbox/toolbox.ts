import { blockTemplates } from "../blocks";

export const createToolboxFromBlockList = (blocks: string[]) => {
  const toolbox = {};
  Object.entries(blockTemplates).forEach(([block, template]) => {
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

import { BlockTypes } from "../blocks";
import { CategoryStyle } from "../theme";

interface IToolbox {
  kind: "categoryToolbox";
  contents: {
    kind: "category";
    name: string;
    categoryStyle: CategoryStyle;
    contents: {
      kind: "block";
      type: BlockTypes;
      inputs: {
        [key: string]: object
      }
    }[];
  }[];
}

export const createToolboxFromBlockList = (blocks: BlockTypes[]): IToolbox => {
  const toolbox = new Map<CategoryStyle, IToolbox["contents"][number]["contents"][number][]>();

  ["events:when_start_clicked" as BlockTypes, ...blocks].forEach((block) => {
    const [category] = block.split(":") as [CategoryStyle];

    if (!toolbox.has(category)) {
      toolbox.set(category, []);
    }
    toolbox.get(category)!.push({
      kind: "block",
      type: block,
      inputs: {},
    });
  });

  return {
    kind: "categoryToolbox",
    contents: Array.from(toolbox.entries()).map(([category, contents]) => ({
      kind: "category",
      name: category,
      categoryStyle: category,
      contents,
    })),
  };
};

import { blockDefinitions, BlockTypes } from "../blocks";
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
export type SelectedBlocks = BlockTypes[];
export const createToolboxFromBlockList = (blocks: SelectedBlocks): IToolbox => {
  const toolbox = new Map<CategoryStyle, IToolbox["contents"][number]["contents"][number][]>();
  blocks.unshift("events:when_start_clicked");

  blocks.forEach((block) => {
    const [category] = block.split(":") as [CategoryStyle];

    if (!toolbox.has(category)) {
      toolbox.set(category, []);
    }

    let argsIndex = 0;
    const inputs = {};
    while (blockDefinitions[block][`args${argsIndex}`]) {
      const args = blockDefinitions[block][`args${argsIndex}`];

      args.forEach((arg) => {
        if (arg.type && arg.type === "input_value") {
          if (arg.check && arg.check === "Number") {
            inputs[arg.name] = { shadow: { type: "math:number", fields: { NUM: "0" } } };
          }
        }
      });
      argsIndex += 1;
    }
    toolbox.get(category)!.push({
      kind: "block",
      type: block,
      inputs,
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

import { blockArguments, BlockTypes } from "../blocks";
import { CategoryStyle } from "../theme";

interface IToolbox {
  kind: "categoryToolbox";
  contents: {
    kind: "category";
    name: string;
    categoryStyle: CategoryStyle;
    contents?: {
      kind: "block";
      type: BlockTypes;
      inputs?: {
        [key: string]: object
      },
    }[];
    custom?: string;
  }[];
}
export type SelectedBlocks = BlockTypes[];
export const createToolboxFromBlockList = (blocks: SelectedBlocks): IToolbox => {
  const toolbox = new Map<CategoryStyle, IToolbox["contents"][number]["contents"][number][]>();
  blocks.unshift("events:when_start_clicked");

  let variables: boolean = false;
  blocks.forEach((block) => {
    const [category] = block.split(":") as [CategoryStyle];

    if (category === "variables") {
      variables = true;
      return;
    }

    if (!toolbox.has(category)) {
      toolbox.set(category, []);
    }

    const inputs = {};
    blockArguments[block].forEach((args) => {
      args.forEach((arg) => {
        if (arg.type && arg.type === "input_value") {
          if (arg.check && arg.check === "Number") {
            inputs[arg.name] = { shadow: { type: "math:number", fields: { NUM: "0" } } };
          }
        }
      });
    });
    toolbox.get(category)!.push({
      kind: "block",
      type: block,
      inputs,
    });
  });

  const categories: IToolbox["contents"] = Array.from(toolbox.entries()).map(([category, contents]) => ({
    kind: "category",
    name: category,
    categoryStyle: category,
    contents,
  }));
  if (variables) {
    categories.push({
      kind: "category",
      name: "variables",
      categoryStyle: "variables",
      custom: "VARIABLE",
    });
  }
  return {
    kind: "categoryToolbox",
    contents: categories,
  };
};

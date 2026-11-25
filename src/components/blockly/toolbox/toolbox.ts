import { blockArguments, BlockTypes } from "../../../model/blockly/blocks/blocks";
import { CategoryStyle } from "../../../model/blockly/theme";
import type { MsgFn } from "@lit/localize";
import { categoryName } from "../../messages";

interface IToolboxBlock {
  kind: "block";
  type: BlockTypes;
  inputs?: {
    [key: string]: object
  },
}

interface IToolboxCategory {
  kind: "category";
  name: string;
  categoryStyle: CategoryStyle;
  contents?: IToolboxBlock[];
  custom?: string;
}

interface IToolbox {
  kind: "categoryToolbox";
  contents: IToolboxCategory[];
}
export type SelectedBlocks = BlockTypes[];

/**
 * Generates a toolbox config from a list of blocks.
 * @param blocks The list of blocks.
 */
export const createToolboxFromBlockList = (blocks: SelectedBlocks, msg: MsgFn): IToolbox => {
  const toolbox = new Map<CategoryStyle, IToolboxBlock[]>();

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

    const inputs: Record<string, object> = {};
    blockArguments[block].forEach((args) => {
      args.forEach((arg) => {
        if (arg.name && arg.type === "input_value") {
          if (arg.check && arg.check === "Number") {
            inputs[arg.name] = { shadow: { type: "math:number", fields: { NUM: "0" } } };
          }
          if (arg.check && Array.isArray(arg.check) && arg.check.includes("String")) {
            inputs[arg.name] = { shadow: { type: "text:string", fields: { TEXT: "" } } };
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

  const categories: IToolboxCategory[] = Array.from(toolbox.entries()).map(([category, contents]) => ({
    kind: "category",
    name: categoryName(msg, category),
    categoryStyle: category,
    contents,
  }));
  if (variables) {
    categories.push({
      kind: "category",
      name: categoryName(msg, "variables"),
      categoryStyle: "variables",
      custom: "VARIABLE",
    });
  }
  return {
    kind: "categoryToolbox",
    contents: categories,
  };
};

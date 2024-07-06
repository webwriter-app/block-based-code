import { Variables, WorkspaceSvg } from "blockly";
import { BlockKey, CategoryKey, ToolboxDefinition } from "../types";
import { WebWriterBlocks } from "../blocks";
import { CategoryStyle } from "../theme";

export class WebWriterToolbox {
  public static allBlocks: BlockKey[] = Object.values(BlockKey);

  public static readonly CREATE_VARIABLE_CALLBACK_KEY = "ofkjffejkeff";

  public static generateToolbox(blocks: BlockKey[], disabledBlocks: BlockKey[] = []): ToolboxDefinition {
    WebWriterBlocks.clearBlocks();

    const toolbox = {};
    blocks.forEach((block) => {
      const blockDefinition = WebWriterBlocks.getBlockDefinition(block);
      if (disabledBlocks.includes(block)) {
        blockDefinition.disabled = true;
      }
      const [category] = block.split(":") as [CategoryKey];
      if (!toolbox[category]) {
        toolbox[category] = [];
      }
      toolbox[category].push(blockDefinition);
    });

    return {
      kind: "categoryToolbox",
      contents: Object.keys(toolbox).map((category) => ({
        kind: "category",
        name: category,
        contents: toolbox[category],
        categoryStyle: CategoryStyle[category],
      })),
    };
  }

  public static get variablesCategoryCallback(): (workspace: WorkspaceSvg) => Element[] {
    return (workspace: WorkspaceSvg) => {
      const blockList: Element[] = [];

      const button = document.createElement("button");
      button.setAttribute("text", "Create variable");
      button.setAttribute("callbackkey", WebWriterToolbox.CREATE_VARIABLE_CALLBACK_KEY);
      blockList.push(button);

      const blocks = Variables.flyoutCategoryBlocks(workspace);
      blockList.push(...blocks);

      return blockList;
    };
  }
}

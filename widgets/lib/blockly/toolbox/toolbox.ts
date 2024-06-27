import { Variables, WorkspaceSvg } from "blockly";
import { BlockKey, CategoryKey } from "../types";
import { WebWriterBlocks } from "../blocks";

export class WebWriterToolbox {
  public static readonly CREATE_VARIABLE_CALLBACK_KEY = "ofkjffejkeff";

  public static get empty() {
    return WebWriterToolbox.generateToolbox();
  }

  public static generateToolbox(blocks: BlockKey[] = []) {
    WebWriterBlocks.clearBlocks();

    const toolbox = {};
    blocks.forEach((block) => {
      const blockDefinition = WebWriterBlocks.getBlockDefinition(block);
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

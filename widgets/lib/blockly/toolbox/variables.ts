import * as Blockly from "blockly";

export const variablesCategoryCallback = (workspace: Blockly.WorkspaceSvg): Element[] => {
  const blockList: Element[] = [];

  const button = document.createElement("button");
  button.setAttribute("text", "Create variable");
  button.setAttribute("callbackkey", "CREATE_VARIABLE_NEW");
  blockList.push(button);

  const blocks = Blockly.Variables.flyoutCategoryBlocks(workspace);
  blockList.push(...blocks);

  return blockList;
};

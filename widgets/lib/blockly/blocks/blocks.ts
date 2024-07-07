import * as Blockly from "blockly";
import { blocks as controlBlocks } from "./controls";
import { blocks as eventBlocks } from "./events";
import { blocks as motionBlocks } from "./motions";
import { blocks as operatorBlocks } from "./operators";
import { numberBlock } from "./math";
import { BlockType } from "../types";

const blocks = [
  ...eventBlocks,
  ...controlBlocks,
  ...motionBlocks,
  ...operatorBlocks,
];

const blockDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  ...blocks,
  numberBlock,
]);
Blockly.common.defineBlocks(blockDefinitions);

export const blockTemplates = blocks.reduce((templates, block) => {
  let argsIndex = 0;
  const inputs = {};
  while (block[`args${argsIndex}`]) {
    const args = block[`args${argsIndex}`];
    args.forEach((arg) => {
      if (arg.type && arg.type === "input_value") {
        if (arg.check && arg.check === "Number") {
          inputs[arg.name] = { shadow: { type: "math:number", fields: { NUM: "0" } } };
        }
      }
    });
    argsIndex += 1;
  }

  return ({
    ...templates,
    [block.type]: {
      kind: "block",
      type: block.type,
      inputs,
    },
  });
}, {}) as Record<BlockType, object>;

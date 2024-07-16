import { JavascriptGenerator, Order } from "blockly/javascript";
import type { GeneratorFunction } from "../types/generator";
import { BlockTypes } from "../blocks";
import { generators as eventGenerators } from "./events";
import { generators as controlGenerators } from "./controls";
import { generators as motionGenerators } from "./motions";
import { generators as operatorGenerators } from "./operators";

export const codeGenerator = new JavascriptGenerator("webwriter");

const generators: Record<BlockTypes, GeneratorFunction> = {
  ...eventGenerators,
  ...controlGenerators,
  ...motionGenerators,
  ...operatorGenerators,
  "math:number": (block) => {
    const number = Number(block.getFieldValue("NUM"));
    const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
    return [String(number), order];
  },
  variables: null,
};

codeGenerator.forBlock = generators;

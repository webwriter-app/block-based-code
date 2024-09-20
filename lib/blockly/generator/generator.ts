import { JavascriptGenerator, Order } from "blockly/javascript";
import type { GeneratorFunction } from "../types/generator";
import { BlockTypes } from "../blocks";
import { generators as eventGenerators } from "./events";
import { generators as controlGenerators } from "./controls";
import { generators as lookGenerators } from "./looks";
import { generators as motionGenerators } from "./motions";
import { generators as operatorGenerators } from "./operators";
import { generators as variableGenerators } from "./variables";

/**
 * The custom code generator for Blockly. This generator is used to generate executable code.
 */
export class ExecutableGenerator extends JavascriptGenerator {
  constructor() {
    super("executable");
    this.STATEMENT_PREFIX = "highlight(%1);\n";
    this.STATEMENT_SUFFIX = "await delay();\n";
  }
}

/**
 * The custom code generator for Blockly. This generator is used to generate readable code.
 */
export class ReadableGenerator extends JavascriptGenerator {
  constructor() {
    super("readable");
    this.STATEMENT_PREFIX = "";
  }
}

export const executableCodeGenerator = new ExecutableGenerator();
export const readableCodeGenerator = new ReadableGenerator();

const generators: Record<BlockTypes, GeneratorFunction> = {
  ...eventGenerators,
  ...controlGenerators,
  ...lookGenerators,
  ...motionGenerators,
  ...operatorGenerators,
  ...variableGenerators,
  "math:number": (block) => {
    const number = Number(block.getFieldValue("NUM"));
    const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
    return [String(number), order];
  },
  variables: null,
};

executableCodeGenerator.forBlock = generators;
readableCodeGenerator.forBlock = generators;

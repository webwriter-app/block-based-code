import { JavascriptGenerator, Order } from "blockly/javascript";
import type { GeneratorFunction } from "../types/generator";
import { BlockTypes } from "../blocks";
import { generators as eventGenerators } from "./events";
import { generators as controlGenerators } from "./controls";
import { generators as lookGenerators, readableGenerators as readableLookGenerators } from "./looks";
import { generators as motionGenerators } from "./motions";
import { generators as operatorGenerators, readableGenerators as readableOperatorGenerators } from "./operators";
import { generators as sensingGenerators } from "./sensing";
import { generators as variableGenerators, readableGenerators as readableVariableGenerators } from "./variables";
import { generators as soundGenerators } from "./sounds";
import type { WorkspaceSvg } from "blockly";

// Event block types that trigger code execution
const EVENT_BLOCKS = ["events:when_start_clicked", "events:when_sprite_clicked", "events:when_key_pressed"] as const;

// Map event block types to function name patterns
const EVENT_TO_FUNCTION_NAME: Record<string, string> = {
  "events:when_start_clicked": "whenStartClicked",
  "events:when_sprite_clicked": "whenSpriteClicked",
  "events:when_key_pressed": "whenKeyPressed",
};

/**
 * The custom code generator for Blockly. This generator is used to generate executable code.
 */
export class ExecutableGenerator extends JavascriptGenerator {
  constructor() {
    super("executable");
    this.STATEMENT_PREFIX = "highlight(%1);\n";
    this.STATEMENT_SUFFIX = "await delay();\n";
  }

  /**
   * Generate code for the workspace, creating separate functions for each event handler
   */
  public override workspaceToCode(workspace: WorkspaceSvg): string {
    this.init(workspace);

    const eventFunctions: Record<string, string> = {};

    const topBlocks = workspace.getTopBlocks(true);

    for (const block of topBlocks) {
      const blockType = block.type as BlockTypes;

      if (EVENT_BLOCKS.includes(blockType as any)) {
        let functionName = EVENT_TO_FUNCTION_NAME[blockType];
        if (!functionName) continue;

        // For whenKeyPressed, append the key value to the function name
        if (blockType === "events:when_key_pressed") {
          const key = block.getFieldValue("KEY");
          const normalizedKey = key === " " ? "space" : key;
          functionName = `${functionName}_${normalizedKey}`;
        }

        const blockCode = this.blockToCode(block);

        if (eventFunctions[functionName]) {
          eventFunctions[functionName] += blockCode;
        } else {
          eventFunctions[functionName] = blockCode;
        }
      }
    }

    this.finish("");

    let code = "";
    for (const [functionName, functionBody] of Object.entries(eventFunctions)) {
      code += `async function ${functionName}() {\n`;
      code += functionBody;
      code += "}\n\n";
    }

    return code;
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

  /**
   * Generate code for the workspace, creating separate functions for each event handler
   */
  public override workspaceToCode(workspace: WorkspaceSvg): string {
    this.init(workspace);

    const eventFunctions: Record<string, string> = {};

    const topBlocks = workspace.getTopBlocks(true);

    for (const block of topBlocks) {
      const blockType = block.type as BlockTypes;

      if (EVENT_BLOCKS.includes(blockType as any)) {
        let functionName = EVENT_TO_FUNCTION_NAME[blockType];
        if (!functionName) continue;

        // For whenKeyPressed, append the key value to the function name
        if (blockType === "events:when_key_pressed") {
          const key = block.getFieldValue("KEY");
          const normalizedKey = key === " " ? "space" : key;
          functionName = `${functionName}_${normalizedKey}`;
        }

        const blockCode = this.blockToCode(block);

        if (eventFunctions[functionName]) {
          eventFunctions[functionName] += blockCode;
        } else {
          eventFunctions[functionName] = blockCode;
        }
      }
    }

    this.finish("");

    let code = "";
    for (const [functionName, functionBody] of Object.entries(eventFunctions)) {
      code += `function ${functionName}() {\n`;
      code += functionBody;
      code += "}\n\n";
    }

    return code;
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
  ...sensingGenerators,
  ...variableGenerators,
  ...soundGenerators,
  "math:number": (block) => {
    const number = Number(block.getFieldValue("NUM"));
    const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
    return [String(number), order];
  },
  "text:string": (block) => {
    const text = String(block.getFieldValue("TEXT"));
    const code = executableCodeGenerator.quote_(text);
    return [code, Order.ATOMIC];
  },
  variables: null,
};

const readableGenerators: Record<BlockTypes, GeneratorFunction> = {
  ...eventGenerators,
  ...controlGenerators,
  ...readableLookGenerators,
  ...motionGenerators,
  ...readableOperatorGenerators,
  ...sensingGenerators,
  ...readableVariableGenerators,
  ...soundGenerators,
  "math:number": (block) => {
    const number = Number(block.getFieldValue("NUM"));
    const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
    return [String(number), order];
  },
  "text:string": (block) => {
    const text = String(block.getFieldValue("TEXT"));
    const code = executableCodeGenerator.quote_(text);
    return [code, Order.ATOMIC];
  },
  variables: null,
};

executableCodeGenerator.forBlock = generators;
readableCodeGenerator.forBlock = readableGenerators;

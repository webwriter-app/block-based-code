import { Order } from "blockly/javascript";
import { Names } from "blockly";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "controls:wait": (block, generator) => {
    const time = generator.valueToCode(block, "DURATION", Order.ATOMIC);
    return `wait(${time});\n`;
  },
  "controls:repeat": (block, generator) => {
    const times = generator.valueToCode(block, "TIMES", Order.ATOMIC);
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.addLoopTrap(branch, block);

    let code = "";
    const loopVar = generator.nameDB_.getDistinctName("count", Names.NameType.VARIABLE);
    code += `for (let ${loopVar} = 0; ${loopVar} < ${times}; ${loopVar}++) {\n`;
    code += `${generator.prefixLines(branch, generator.INDENT)}`;
    code += "}\n";
    return code;
  },
  "controls:forever": (block, generator) => {
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.addLoopTrap(branch, block);

    let code = "";
    code += "while (true) {\n";
    code += `${generator.prefixLines(branch, generator.INDENT)}`;
    code += "}\n";
    return code;
  },
  "controls:if": (block, generator) => {
    const condition = generator.valueToCode(block, "CONDITION", Order.NONE) || false;
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.prefixLines(branch, generator.INDENT);

    let code = "";
    code += `if (${condition}) {\n`;
    code += `${branch}`;
    code += "}\n";
    return code;
  },
  "controls:if_else": (block, generator) => {
    const condition = generator.valueToCode(block, "CONDITION", Order.NONE) || false;
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.prefixLines(branch, generator.INDENT);

    let elseBranch = generator.statementToCode(block, "SUBSTACK2");
    elseBranch = generator.prefixLines(elseBranch, generator.INDENT);

    let code = "";
    code += `if (${condition}) {\n`;
    code += `${branch}`;
    code += "} else {\n";
    code += `${elseBranch}`;
    code += "}\n";
    return code;
  },
  "controls:stop": () => "return;",
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators: Partial<Record<BlockTypes, GeneratorFunction>> = {
  "events:when_start_clicked": (block, generator) => {
    let code = "function main() { \n";
    const branch = generator.statementToCode(block, "SUBSTACK");
    code += `${generator.prefixLines(branch, generator.INDENT)}\n`;
    code += "}";
    return code;
  },
};

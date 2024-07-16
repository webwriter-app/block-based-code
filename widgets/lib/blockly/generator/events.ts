import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "events:when_start_clicked": (block, generator) => {
    let code = "function main() { \n";
    const branch = generator.statementToCode(block, "SUBSTACK");
    code += `${generator.prefixLines(branch, generator.INDENT)}`;
    code += "}\n";
    code += "main();";
    return code;
  },
}satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

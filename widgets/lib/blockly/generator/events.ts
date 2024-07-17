import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "events:when_start_clicked": (block, generator) => {
    let code = generator.injectId(generator.STATEMENT_PREFIX, block);
    const targetBlock = block.getInputTargetBlock("SUBSTACK");
    const branch = generator.blockToCode(targetBlock);
    code += branch;
    return code;
  },
}satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

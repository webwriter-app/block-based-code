import { BlockTypes } from "../blocks/blocks";
import type { GeneratorFunction } from "../generator-types";

export const generators = {
  "events:when_start_clicked": (block, generator) => {
    let code = generator.injectId(generator.STATEMENT_PREFIX ?? "", block);
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.prefixLines(branch, generator.INDENT);
    code += branch;
    return code;
  },
  "events:when_sprite_clicked": (block, generator) => {
    let code = generator.injectId(generator.STATEMENT_PREFIX ?? "", block);
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.prefixLines(branch, generator.INDENT);
    code += branch;
    return code;
  },
  "events:when_key_pressed": (block, generator) => {
    let code = generator.injectId(generator.STATEMENT_PREFIX ?? "", block);
    let branch = generator.statementToCode(block, "SUBSTACK");
    branch = generator.prefixLines(branch, generator.INDENT);
    code += branch;
    return code;
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

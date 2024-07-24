import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "looks:set_color": (block, generator) => {
    const color = generator.valueToCode(block, "COLOR", Order.NONE);

    return `setColor(${color});\n`;
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

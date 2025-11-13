import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "looks:say": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);

    return `say(${text});\n`;
  },
  "looks:say_for_seconds": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);
    const seconds = generator.valueToCode(block, "SECONDS", Order.NONE);

    // Show the speech bubble, wait, then hide it
    return `say(${text});\nawait wait(${seconds});\nsay('');\n`;
  },
  "looks:set_color": (block, generator) => {
    const color = generator.valueToCode(block, "COLOR", Order.NONE);

    return `setColor(${color});\n`;
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

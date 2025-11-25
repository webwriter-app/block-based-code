import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "looks:say": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);

    return `say(String(${text}));\n`;
  },
  "looks:say_for_seconds": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);
    const seconds = generator.valueToCode(block, "SECONDS", Order.NONE);

    // Show the speech bubble, wait, then hide it
    return `say(String(${text}));\nawait wait(${seconds});\nsay('');\n`;
  },
  "looks:set_color": (block, generator) => {
    const color = generator.valueToCode(block, "COLOR", Order.NONE);

    return `setColor(${color});\n`;
  },
  "looks:set_background_color": (block) => {
    const color = block.getFieldValue("COLOR");

    return `setBackgroundColor("${color}");\n`;
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

export const readableGenerators = {
  ...generators,
  "looks:say": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);

    return `say(${text});\n`;
  },
  "looks:say_for_seconds": (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE);
    const seconds = generator.valueToCode(block, "SECONDS", Order.NONE);

    return `say_for_seconds(${text}, ${seconds});\n`;
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

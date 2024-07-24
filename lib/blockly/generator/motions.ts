import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "motions:move": (block, generator) => {
    const distance = generator.valueToCode(block, "STEPS", Order.ATOMIC);
    return `move(${distance});\n`;
  },
  "motions:rotate": (block, generator) => {
    const angle = generator.valueToCode(block, "DEGREES", Order.ATOMIC);
    return `rotate(${angle});\n`;
  },
  "motions:set_rotation": (block, generator) => {
    const angle = generator.valueToCode(block, "DEGREES", Order.ATOMIC);
    return `setRotation(${angle});\n`;
  },
  "motions:set_x": (block, generator) => {
    const x = generator.valueToCode(block, "X", Order.ATOMIC);
    return `setX(${x});\n`;
  },
  "motions:set_y": (block, generator) => {
    const y = generator.valueToCode(block, "Y", Order.ATOMIC);
    return `setY(${y});\n`;
  },
  "motions:set_xy": (block, generator) => {
    const x = generator.valueToCode(block, "X", Order.ATOMIC);
    const y = generator.valueToCode(block, "Y", Order.ATOMIC);
    return `setXY(${x}, ${y});\n`;
  },
  "motions:get_x": () => ["await getX()", Order.FUNCTION_CALL],
  "motions:get_y": () => ["await getY()", Order.FUNCTION_CALL],
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

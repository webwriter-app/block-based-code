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
  "motions:go_to_x": (block, generator) => {
    const x = generator.valueToCode(block, "X", Order.ATOMIC);
    return `goToX(${x});\n`;
  },
  "motions:go_to_y": (block, generator) => {
    const y = generator.valueToCode(block, "Y", Order.ATOMIC);
    return `goToY(${y});\n`;
  },
  "motions:go_to_xy": (block, generator) => {
    const x = generator.valueToCode(block, "X", Order.ATOMIC);
    const y = generator.valueToCode(block, "Y", Order.ATOMIC);
    return `goToXY(${x}, ${y});\n`;
  },
  "motions:x_position": () => ["getX()", Order.FUNCTION_CALL],
  "motions:y_position": () => ["getY()", Order.FUNCTION_CALL],
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

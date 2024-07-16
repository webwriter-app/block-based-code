import { Order } from "blockly/javascript";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  variables_get: (block, generator) => {
    const variableName = generator.getVariableName(block.getFieldValue("VAR"));
    return [variableName, Order.ATOMIC];
  },
  variables_set: (block, generator) => {
    const variableName = generator.getVariableName(block.getFieldValue("VAR"));
    const value = generator.valueToCode(block, "VALUE", Order.ASSIGNMENT);
    return `${variableName} = ${value};\n`;
  },
} satisfies Record<"variables_get" | "variables_set", GeneratorFunction>;

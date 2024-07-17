import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "operators:sum": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.ADDITION);
    const right = generator.valueToCode(block, "B", Order.ADDITION);

    return [`${left} + ${right}`, Order.ADDITION];
  },
  "operators:subtract": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.SUBTRACTION);
    const right = generator.valueToCode(block, "B", Order.SUBTRACTION);

    return [`${left} - ${right}`, Order.ADDITION];
  },
  "operators:multiply": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.MULTIPLICATION);
    const right = generator.valueToCode(block, "B", Order.MULTIPLICATION);

    return [`${left} * ${right}`, Order.ADDITION];
  },
  "operators:divide": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.DIVISION);
    const right = generator.valueToCode(block, "B", Order.DIVISION);

    return [`${left} / ${right}`, Order.ADDITION];
  },
  "operators:greater": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.RELATIONAL);
    const right = generator.valueToCode(block, "B", Order.RELATIONAL);

    return [`${left} > ${right}`, Order.RELATIONAL];
  },
  "operators:smaller": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.RELATIONAL);
    const right = generator.valueToCode(block, "B", Order.RELATIONAL);

    return [`${left} < ${right}`, Order.RELATIONAL];
  },
  "operators:equal": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.EQUALITY);
    const right = generator.valueToCode(block, "B", Order.EQUALITY);

    return [`${left} == ${right}`, Order.EQUALITY];
  },
  "operators:and": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.LOGICAL_AND) || false;
    const right = generator.valueToCode(block, "B", Order.LOGICAL_AND) || false;

    return [`${left} && ${right}`, Order.LOGICAL_AND];
  },
  "operators:or": (block, generator) => {
    const left = generator.valueToCode(block, "A", Order.LOGICAL_OR) || false;
    const right = generator.valueToCode(block, "B", Order.LOGICAL_OR) || false;

    return [`${left} || ${right}`, Order.LOGICAL_OR];
  },
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

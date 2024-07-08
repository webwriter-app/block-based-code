import { Block } from "../types";

export const blocks = [
  {
    type: "operators:sum",
    message0: "%1 + %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Number",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:subtract",
    message0: "%1 - %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Number",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:multiply",
    message0: "%1 * %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Number",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:divide",
    message0: "%1 / %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Number",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:smaller",
    message0: "%1 < %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:greater",
    message0: "%1 > %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:equal",
    message0: "%1 = %2",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number",
      },
      {
        type: "input_value",
        name: "B",
        check: "Number",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:and",
    message0: "%{BKY_AND}",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Boolean",
      },
      {
        type: "input_value",
        name: "B",
        check: "Boolean",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    category: "operators",
    style: "operator_blocks",
  } as const,
  {
    type: "operators:or",
    message0: "%{BKY_OR}",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Boolean",
      },
      {
        type: "input_value",
        name: "B",
        check: "Boolean",
      },
    ],
    inputsInline: true,
    output: "Boolean",
    category: "operators",
    style: "operator_blocks",
  } as const,
] satisfies Block[];

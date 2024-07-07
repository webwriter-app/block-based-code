import { BlockType } from "../types";

export const blocks = [
  {
    type: BlockType.SUM,
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
  },
  {
    type: BlockType.SUBTRACT,
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
  },
  {
    type: BlockType.MULTIPLY,
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
  },
  {
    type: BlockType.DIVIDE,
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
  },
  {
    type: BlockType.SMALLER,
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
  },
  {
    type: BlockType.GREATER,
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
  },
  {
    type: BlockType.EQUAL,
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
  },
  {
    type: BlockType.AND,
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
  },
  {
    type: BlockType.OR,
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
  },
];

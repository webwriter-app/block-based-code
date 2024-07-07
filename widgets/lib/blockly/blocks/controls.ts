import { BlockType } from "../types";

export const blocks = [
  {
    type: BlockType.WAIT,
    message0: "wait %1 seconds",
    args0: [
      {
        type: "input_value",
        name: "DURATION",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
  {
    type: BlockType.REPEAT,
    message0: "repeat %1 times",
    args0: [
      {
        type: "input_value",
        name: "TIMES",
        check: "Number",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "SUBSTACK",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
  {
    type: BlockType.FOREVER,
    message0: "forever",
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "SUBSTACK",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
  {
    type: BlockType.IF,
    message0: "if %1",
    args0: [
      {
        type: "input_value",
        name: "CONDITION",
        check: "Boolean",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "SUBSTACK",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
  {
    type: BlockType.IF_ELSE,
    message0: "if %1",
    args0: [
      {
        type: "input_value",
        name: "CONDITION",
        check: "Boolean",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "SUBSTACK",
      },
    ],
    message2: "else",
    message3: "%1",
    args3: [
      {
        type: "input_statement",
        name: "SUBSTACK2",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
  {
    type: BlockType.STOP,
    message0: "stop",
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  },
];

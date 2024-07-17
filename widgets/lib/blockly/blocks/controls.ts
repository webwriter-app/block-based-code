import { BlockDefinition } from "../types";

export const blocks = [
  {
    type: "controls:wait",
    message0: "%{BKY_WAIT}",
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
  } as const,
  {
    type: "controls:repeat",
    message0: "%{BKY_REPEAT}",
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
  } as const,
  {
    type: "controls:forever",
    message0: "%{BKY_FOREVER}",
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
  } as const,
  {
    type: "controls:if",
    message0: "%{BKY_IF}",
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
  } as const,
  {
    type: "controls:if_else",
    message0: "%{BKY_IF}",
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
    message2: "%{BKY_ELSE}",
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
  } as const,
  {
    type: "controls:stop",
    message0: "%{BKY_STOP}",
    previousStatement: null,
    category: "controls",
    style: "control_blocks",
  } as const,
] satisfies BlockDefinition[];

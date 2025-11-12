import { BlockDefinition } from "../types";

export const blocks = [
  {
    type: "looks:say",
    message0: "%{BKY_SAY}",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "looks",
    style: "look_blocks",
  } as const,
  {
    type: "looks:say_for_seconds",
    message0: "%{BKY_SAY_FOR_SECONDS}",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
      {
        type: "input_value",
        name: "SECONDS",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "looks",
    style: "look_blocks",
  } as const,
  {
    type: "looks:set_color",
    message0: "%{BKY_SET_COLOR}",
    args0: [
      {
        type: "input_value",
        name: "COLOR",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "looks",
    style: "look_blocks",
  } as const,
] satisfies BlockDefinition[];

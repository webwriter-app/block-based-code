import { BlockDefinition } from "../types";

export const blocks = [
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

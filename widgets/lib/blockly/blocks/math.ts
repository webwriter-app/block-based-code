import { BlockDefinition } from "../types";

export const numberBlock = {
  type: "math:number",
  message0: "%1",
  args0: [
    {
      type: "field_number",
      name: "NUM",
      value: 0,
    },
  ],
  output: "Number",
  category: null,
  style: null,
} as const satisfies BlockDefinition;

import { BlockDefinition } from "../types";

export const stringBlock = {
  type: "text:string",
  message0: "%1",
  args0: [
    {
      type: "field_input",
      name: "TEXT",
      text: "",
    },
  ],
  output: "String",
  category: null,
  style: null,
} as const satisfies BlockDefinition;

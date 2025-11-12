import { BlockDefinition } from "../types";

export const blocks = [
  {
    type: "sensing:timer",
    message0: "%{BKY_TIMER}",
    output: "Number",
    category: "sensing",
    style: "sensing_blocks",
  } as const,
  {
    type: "sensing:reset_timer",
    message0: "%{BKY_RESET_TIMER}",
    previousStatement: null,
    nextStatement: null,
    category: "sensing",
    style: "sensing_blocks",
  } as const,
] satisfies BlockDefinition[];

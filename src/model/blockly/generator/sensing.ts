import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks/blocks";
import type { GeneratorFunction } from "../generator-types";

export const generators = {
  "sensing:timer": () => ["await getTimer()", Order.FUNCTION_CALL],
  "sensing:reset_timer": () => "resetTimer();\n",
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

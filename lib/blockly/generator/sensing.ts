import { Order } from "blockly/javascript";
import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

export const generators = {
  "sensing:timer": () => ["await getTimer()", Order.FUNCTION_CALL],
  "sensing:reset_timer": () => "resetTimer();\n",
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

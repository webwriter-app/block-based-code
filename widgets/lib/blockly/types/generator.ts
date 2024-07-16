import type { Block } from "blockly";
import { JavascriptGenerator } from "blockly/javascript";

export type GeneratorFunction = (block: Block, generator: JavascriptGenerator) => [string, number] | string | null;

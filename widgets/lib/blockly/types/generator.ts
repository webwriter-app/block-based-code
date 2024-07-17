import type { Block } from "blockly";
import { WebwriterGenerator } from "../generator/generator";

export type GeneratorFunction = (block: Block, generator: WebwriterGenerator) => [string, number] | string | null;

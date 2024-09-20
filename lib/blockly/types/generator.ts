import type { Block } from "blockly";
import { ExecutableGenerator } from "../generator/generator";

/**
 * The generator function type.
 */
export type GeneratorFunction = (block: Block, generator: ExecutableGenerator) => [string, number] | string | null;

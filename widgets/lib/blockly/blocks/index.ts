import { Blocks } from "blockly";
import { BlockDefinition, BlockKey } from "../types";
import { ControlBlocks } from "./controls";

export * from "./events";
export * from "./operators";
export * from "./controls";
export * from "./motions";

export class WebWriterBlocks {
  private static readonly blocksDefinitionGetter: Record<BlockKey, () => BlockDefinition> = {
    // Control blocks
    [BlockKey.WAIT]: ControlBlocks.wait,
    [BlockKey.REPEAT]: ControlBlocks.repeat,
    [BlockKey.FOREVER]: ControlBlocks.forever,
    [BlockKey.IF]: ControlBlocks.if,
    [BlockKey.IF_ELSE]: ControlBlocks.ifElse,
    [BlockKey.STOP]: ControlBlocks.stop,
  };

  public static clearBlocks() {
    Object.keys(Blocks).forEach((key) => {
      if (key === "math_number" || key === "variables_get" || key === "variables_set") return;
      delete Blocks[key];
    });
  }

  public static getBlockDefinition(block: BlockKey): BlockDefinition {
    return WebWriterBlocks.blocksDefinitionGetter[block]();
  }
}

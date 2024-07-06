import { Blocks } from "blockly";
import { BlockDefinition, BlockKey } from "../types";
import { ControlBlocks } from "./controls";
import { EventBlocks } from "./events";
import { MotionBlocks } from "./motions";
import { OperatorBlocks } from "./operators";

export * from "./events";
export * from "./operators";
export * from "./controls";
export * from "./motions";

export class WebWriterBlocks {
  public static allBlocks: BlockKey[] = Object.values(BlockKey);

  private static readonly blocksDefinitionGetter: Record<BlockKey, () => BlockDefinition> = {
    // Control blocks
    [BlockKey.WAIT]: ControlBlocks.wait,
    [BlockKey.REPEAT]: ControlBlocks.repeat,
    [BlockKey.FOREVER]: ControlBlocks.forever,
    [BlockKey.IF]: ControlBlocks.if,
    [BlockKey.IF_ELSE]: ControlBlocks.ifElse,
    [BlockKey.STOP]: ControlBlocks.stop,
    // Event blocks
    [BlockKey.WHEN_START_CLICKED]: EventBlocks.whenStartClicked,
    // Motion blocks
    [BlockKey.MOVE]: MotionBlocks.move,
    [BlockKey.ROTATE]: MotionBlocks.rotate,
    [BlockKey.GO_TO_X]: MotionBlocks.goToX,
    [BlockKey.GO_TO_Y]: MotionBlocks.goToY,
    [BlockKey.GO_TO_XY]: MotionBlocks.goToXY,
    [BlockKey.X_POSITION]: MotionBlocks.xPosition,
    [BlockKey.Y_POSITION]: MotionBlocks.yPosition,
    // Operator blocks
    [BlockKey.SUM]: OperatorBlocks.sum,
    [BlockKey.SUBTRACT]: OperatorBlocks.subtract,
    [BlockKey.MULTIPLY]: OperatorBlocks.multiply,
    [BlockKey.DIVIDE]: OperatorBlocks.divide,
    [BlockKey.SMALLER]: OperatorBlocks.smaller,
    [BlockKey.GREATER]: OperatorBlocks.greater,
    [BlockKey.EQUAL]: OperatorBlocks.equal,
    [BlockKey.AND]: OperatorBlocks.and,
    [BlockKey.OR]: OperatorBlocks.or,
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

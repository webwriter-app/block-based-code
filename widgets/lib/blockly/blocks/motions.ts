import { Block, Blocks } from "blockly";
import { BlockDefinition, BlockKey } from "../types";
import { BlockStyle } from "../theme";

export class MotionBlocks {
  public static move(): BlockDefinition {
    Blocks[BlockKey.MOVE] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("STEPS").setCheck("Number").appendField("move");
        this.appendDummyInput().appendField("steps");
      },
    };
    return {
      kind: "block",
      type: BlockKey.MOVE,
    };
  }

  public static rotate(): BlockDefinition {
    Blocks[BlockKey.ROTATE] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DEGREES").setCheck("Number").appendField("rotate");
        this.appendDummyInput().appendField("degrees");
      },
    };
    return {
      kind: "block",
      type: BlockKey.ROTATE,
    };
  }

  public static goToX(): BlockDefinition {
    Blocks[BlockKey.GO_TO_X] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("X").setCheck("Number").appendField("go to x:");
      },
    };
    return {
      kind: "block",
      type: BlockKey.GO_TO_X,
    };
  }

  public static goToY(): BlockDefinition {
    Blocks[BlockKey.GO_TO_Y] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("Y").setCheck("Number").appendField("go to y:");
      },
    };
    return {
      kind: "block",
      type: BlockKey.GO_TO_Y,
    };
  }

  public static goToXY(): BlockDefinition {
    Blocks[BlockKey.GO_TO_XY] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("go to x:");
        this.appendValueInput("X").setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("Y").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.GO_TO_XY,
    };
  }

  public static xPosition(): BlockDefinition {
    Blocks[BlockKey.X_POSITION] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("x position");
      },
    };
    return {
      kind: "block",
      type: BlockKey.X_POSITION,
    };
  }

  public static yPosition(): BlockDefinition {
    Blocks[BlockKey.Y_POSITION] = {
      init(this: Block) {
        this.setStyle(BlockStyle.MOTION);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("y position");
      },
    };
    return {
      kind: "block",
      type: BlockKey.Y_POSITION,
    };
  }
}

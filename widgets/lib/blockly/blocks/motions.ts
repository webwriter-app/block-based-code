import { Block, Blocks } from "blockly";
import { BlockDefinition, BlockType, CategoryKey } from "../types";

import { BlockStyle } from "../theme/theme";

export class MotionBlocks {
  private static readonly style = BlockStyle[CategoryKey.MOTIONS];

  public static move(): BlockDefinition {
    Blocks[BlockType.MOVE] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("STEPS").setCheck("Number").appendField("move");
        this.appendDummyInput().appendField("steps");
      },
    };
    return {
      kind: "block",
      type: BlockType.MOVE,
    };
  }

  public static rotate(): BlockDefinition {
    Blocks[BlockType.ROTATE] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DEGREES").setCheck("Number").appendField("rotate");
        this.appendDummyInput().appendField("degrees");
      },
    };
    return {
      kind: "block",
      type: BlockType.ROTATE,
    };
  }

  public static goToX(): BlockDefinition {
    Blocks[BlockType.GO_TO_X] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("X").setCheck("Number").appendField("go to x:");
      },
    };
    return {
      kind: "block",
      type: BlockType.GO_TO_X,
    };
  }

  public static goToY(): BlockDefinition {
    Blocks[BlockType.GO_TO_Y] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("Y").setCheck("Number").appendField("go to y:");
      },
    };
    return {
      kind: "block",
      type: BlockType.GO_TO_Y,
    };
  }

  public static goToXY(): BlockDefinition {
    Blocks[BlockType.GO_TO_XY] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
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
      type: BlockType.GO_TO_XY,
    };
  }

  public static xPosition(): BlockDefinition {
    Blocks[BlockType.X_POSITION] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("x position");
      },
    };
    return {
      kind: "block",
      type: BlockType.X_POSITION,
    };
  }

  public static yPosition(): BlockDefinition {
    Blocks[BlockType.Y_POSITION] = {
      init(this: Block) {
        this.setStyle(MotionBlocks.style);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("y position");
      },
    };
    return {
      kind: "block",
      type: BlockType.Y_POSITION,
    };
  }
}

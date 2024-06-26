import * as Blockly from "blockly";

enum MotionTypes {
  MOVE = "move",
  ROTATE = "rotate",
  GO_TO_X = "go_to_x",
  GO_TO_Y = "go_to_y",
  GO_TO_XY = "go_to_xy",
  X_POSITION = "x_position",
  Y_POSITION = "y_position",

}

export class MotionBlocks {
  private static readonly style = "motion_blocks";

  public static defineBlocks() {
    MotionBlocks.move();
    MotionBlocks.rotate();
    MotionBlocks.goToX();
    MotionBlocks.goToY();
    MotionBlocks.goToXY();
    MotionBlocks.xPosition();
    MotionBlocks.yPosition();
  }

  private static move() {
    Blockly.Blocks[MotionTypes.MOVE] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("STEPS").setCheck("Number").appendField("move");
        this.appendDummyInput().appendField("steps");
      },
    };
  }

  private static rotate() {
    Blockly.Blocks[MotionTypes.ROTATE] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DEGREES").setCheck("Number").appendField("rotate");
        this.appendDummyInput().appendField("degrees");
      },
    };
  }

  private static goToX() {
    Blockly.Blocks[MotionTypes.GO_TO_X] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("X").setCheck("Number").appendField("go to x:");
      },
    };
  }

  private static goToY() {
    Blockly.Blocks[MotionTypes.GO_TO_Y] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("Y").setCheck("Number").appendField("go to y:");
      },
    };
  }

  private static goToXY() {
    Blockly.Blocks[MotionTypes.GO_TO_XY] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("go to x:");
        this.appendValueInput("X").setCheck("Number");
        this.appendDummyInput().appendField("y:");
        this.appendValueInput("Y").setCheck("Number");
      },
    };
  }

  private static xPosition() {
    Blockly.Blocks[MotionTypes.X_POSITION] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("x position");
      },
    };
  }

  private static yPosition() {
    Blockly.Blocks[MotionTypes.Y_POSITION] = {
      init(this: Blockly.Block) {
        this.setStyle(MotionBlocks.style);
        this.setOutput(true, "Number");
        this.appendDummyInput().appendField("y position");
      },
    };
  }
}

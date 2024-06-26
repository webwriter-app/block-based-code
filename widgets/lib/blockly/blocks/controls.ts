import * as Blockly from "blockly";

enum ControlType {
  WAIT = "wait",
  REPEAT = "repeat",
  FOREVER = "forever",
  IF = "if",
  IF_ELSE = "if_else",
  STOP = "stop",
}

export class ControlBlocks {
  private static readonly style = "control_blocks";

  public static defineBlocks() {
    ControlBlocks.wait();
    ControlBlocks.repeat();
    ControlBlocks.forever();
    ControlBlocks.if();
    ControlBlocks.ifElse();
    ControlBlocks.stop();
  }

  private static wait() {
    Blockly.Blocks[ControlType.WAIT] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DURATION").setCheck("Number").appendField("wait");
      },
    };
  }

  private static repeat() {
    Blockly.Blocks[ControlType.REPEAT] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
        this.appendStatementInput("SUBSTACK");
      },
    };
  }

  private static forever() {
    Blockly.Blocks[ControlType.FOREVER] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("forever");
        this.appendStatementInput("SUBSTACK");
      },
    };
  }

  private static if() {
    Blockly.Blocks[ControlType.IF] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
        this.appendStatementInput("SUBSTACK");
      },
    };
  }

  private static ifElse() {
    Blockly.Blocks[ControlType.IF_ELSE] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
        this.appendStatementInput("SUBSTACK");
        this.appendDummyInput().appendField("else");
        this.appendStatementInput("SUBSTACK2");
      },
    };
  }

  private static stop() {
    Blockly.Blocks[ControlType.STOP] = {
      init(this: Blockly.Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.appendDummyInput().appendField("stop");
      },
    };
  }
}

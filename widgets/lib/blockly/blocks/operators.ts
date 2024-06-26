import * as Blockly from "blockly";

enum OperatorType {
  SUM = "sum",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
  SMALLER = "smaller",
  GREATER = "greater",
  EQUALS = "equals",
  AND = "and",
  OR = "or",

}

export class OperatorBlocks {
  private static readonly style = "operator_blocks";

  public static defineBlocks() {
    OperatorBlocks.sum();
    OperatorBlocks.subtract();
    OperatorBlocks.multiply();
    OperatorBlocks.divide();
    OperatorBlocks.smaller();
    OperatorBlocks.greater();
    OperatorBlocks.equals();
    OperatorBlocks.and();
    OperatorBlocks.or();
  }

  private static sum() {
    Blockly.Blocks[OperatorType.SUM] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("+");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static subtract() {
    Blockly.Blocks[OperatorType.SUBTRACT] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("-");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static multiply() {
    Blockly.Blocks[OperatorType.MULTIPLY] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("*");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static divide() {
    Blockly.Blocks[OperatorType.DIVIDE] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("/");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static smaller() {
    Blockly.Blocks[OperatorType.SMALLER] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("<");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static greater() {
    Blockly.Blocks[OperatorType.GREATER] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField(">");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static equals() {
    Blockly.Blocks[OperatorType.EQUALS] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("=");
        this.appendValueInput("B").setCheck("Number");
      },
    };
  }

  private static and() {
    Blockly.Blocks[OperatorType.AND] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("and");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
  }

  private static or() {
    Blockly.Blocks[OperatorType.OR] = {
      init(this: Blockly.Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("or");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
  }
}

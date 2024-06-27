import { Block, Blocks } from "blockly";
import { BlockDefinition, BlockKey } from "../types";
import { BlockStyle } from "../theme";

export class OperatorBlocks {
  public static sum(): BlockDefinition {
    Blocks[BlockKey.SUM] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("+");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.SUM,
    };
  }

  public static subtract(): BlockDefinition {
    Blocks[BlockKey.SUBTRACT] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("-");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.SUBTRACT,
    };
  }

  public static multiply(): BlockDefinition {
    Blocks[BlockKey.MULTIPLY] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("*");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.MULTIPLY,
    };
  }

  public static divide(): BlockDefinition {
    Blocks[BlockKey.DIVIDE] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("/");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.DIVIDE,
    };
  }

  public static smaller(): BlockDefinition {
    Blocks[BlockKey.SMALLER] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("<");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.SMALLER,
    };
  }

  public static greater(): BlockDefinition {
    Blocks[BlockKey.GREATER] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField(">");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.GREATER,
    };
  }

  public static equal(): BlockDefinition {
    Blocks[BlockKey.EQUAL] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("=");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockKey.EQUAL,
    };
  }

  public static and(): BlockDefinition {
    Blocks[BlockKey.AND] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("and");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
    return {
      kind: "block",
      type: BlockKey.AND,
    };
  }

  public static or(): BlockDefinition {
    Blocks[BlockKey.OR] = {
      init(this: Block) {
        this.setStyle(BlockStyle.OPERATOR);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("or");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
    return {
      kind: "block",
      type: BlockKey.OR,
    };
  }
}

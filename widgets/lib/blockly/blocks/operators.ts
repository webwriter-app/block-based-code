import { Block, Blocks } from "blockly";
import { BlockDefinition, BlockType, CategoryKey } from "../types";

import { BlockStyle } from "../theme/theme";

export class OperatorBlocks {
  private static readonly style = BlockStyle[CategoryKey.OPERATORS];

  public static sum(): BlockDefinition {
    Blocks[BlockType.SUM] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("+");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.SUM,
    };
  }

  public static subtract(): BlockDefinition {
    Blocks[BlockType.SUBTRACT] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("-");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.SUBTRACT,
    };
  }

  public static multiply(): BlockDefinition {
    Blocks[BlockType.MULTIPLY] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("*");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.MULTIPLY,
    };
  }

  public static divide(): BlockDefinition {
    Blocks[BlockType.DIVIDE] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Number");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("/");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.DIVIDE,
    };
  }

  public static smaller(): BlockDefinition {
    Blocks[BlockType.SMALLER] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("<");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.SMALLER,
    };
  }

  public static greater(): BlockDefinition {
    Blocks[BlockType.GREATER] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField(">");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.GREATER,
    };
  }

  public static equal(): BlockDefinition {
    Blocks[BlockType.EQUAL] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Number");
        this.appendDummyInput().appendField("=");
        this.appendValueInput("B").setCheck("Number");
      },
    };
    return {
      kind: "block",
      type: BlockType.EQUAL,
    };
  }

  public static and(): BlockDefinition {
    Blocks[BlockType.AND] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("and");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
    return {
      kind: "block",
      type: BlockType.AND,
    };
  }

  public static or(): BlockDefinition {
    Blocks[BlockType.OR] = {
      init(this: Block) {
        this.setStyle(OperatorBlocks.style);
        this.setOutput(true, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendDummyInput().appendField("or");
        this.appendValueInput("B").setCheck("Boolean");
      },
    };
    return {
      kind: "block",
      type: BlockType.OR,
    };
  }
}

import { Block, Blocks } from "blockly";
import { BlockDefinition, BlockType, CategoryKey } from "../types";
import { BlockStyle } from "../theme/theme";

export class ControlBlocks {
  private static readonly style = BlockStyle[CategoryKey.CONTROLS];

  public static wait(): BlockDefinition {
    Blocks[BlockType.WAIT] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DURATION").setCheck("Number").appendField("wait");
      },
    };
    return {
      kind: "block",
      type: BlockType.WAIT,
    };
  }

  public static repeat(): BlockDefinition {
    Blocks[BlockType.REPEAT] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockType.REPEAT,
    };
  }

  public static forever(): BlockDefinition {
    Blocks[BlockType.FOREVER] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("forever");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockType.FOREVER,
    };
  }

  public static if(): BlockDefinition {
    Blocks[BlockType.IF] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockType.IF,
    };
  }

  public static ifElse(): BlockDefinition {
    Blocks[BlockType.IF_ELSE] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
        this.appendStatementInput("SUBSTACK");
        this.appendDummyInput().appendField("else");
        this.appendStatementInput("SUBSTACK2");
      },
    };
    return {
      kind: "block",
      type: BlockType.IF_ELSE,
    };
  }

  public static stop(): BlockDefinition {
    Blocks[BlockType.STOP] = {
      init(this: Block) {
        this.setStyle(ControlBlocks.style);
        this.setPreviousStatement(true, null);
        this.appendDummyInput().appendField("stop");
      },
    };
    return {
      kind: "block",
      type: BlockType.STOP,
    };
  }
}

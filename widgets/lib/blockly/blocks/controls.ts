import { Block as BlocklyBlock, Blocks } from "blockly";
import { BlockStyle } from "../theme";
import { BlockDefinition, BlockKey } from "../types";

export class ControlBlocks {
  public static wait(): BlockDefinition {
    Blocks[BlockKey.WAIT] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("DURATION").setCheck("Number").appendField("wait");
      },
    };
    return {
      kind: "block",
      type: BlockKey.WAIT,
    };
  }

  public static repeat(): BlockDefinition {
    Blocks[BlockKey.REPEAT] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockKey.REPEAT,
    };
  }

  public static forever(): BlockDefinition {
    Blocks[BlockKey.FOREVER] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("forever");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockKey.FOREVER,
    };
  }

  public static if(): BlockDefinition {
    Blocks[BlockKey.IF] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
        this.appendStatementInput("SUBSTACK");
      },
    };
    return {
      kind: "block",
      type: BlockKey.IF,
    };
  }

  public static ifElse(): BlockDefinition {
    Blocks[BlockKey.IF_ELSE] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
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
      type: BlockKey.IF_ELSE,
    };
  }

  public static stop(): BlockDefinition {
    Blocks[BlockKey.STOP] = {
      init(this: BlocklyBlock) {
        this.setStyle(BlockStyle.CONTROL);
        this.setPreviousStatement(true, null);
        this.appendDummyInput().appendField("stop");
      },
    };
    return {
      kind: "block",
      type: BlockKey.STOP,
    };
  }
}

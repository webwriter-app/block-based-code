import { Block, Blocks } from "blockly";
import { BlockStyle } from "../theme";
import { BlockDefinition, BlockKey } from "../types";

export class EventBlocks {
  public static whenStartClicked(): BlockDefinition {
    Blocks[BlockKey.WHEN_START_CLICKED] = {
      init(this: Block) {
        this.setStyle(BlockStyle.EVENT);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("when");
        this.appendDummyInput().appendField("clicked");
      },
    };
    return {
      kind: "block",
      type: BlockKey.WHEN_START_CLICKED,
    };
  }
}

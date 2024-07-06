import { Block, Blocks } from "blockly";
import { BlockStyle } from "../theme";
import { BlockDefinition, BlockKey, CategoryKey } from "../types";

export class EventBlocks {
  private static readonly style = BlockStyle[CategoryKey.EVENTS];

  public static whenStartClicked(): BlockDefinition {
    Blocks[BlockKey.WHEN_START_CLICKED] = {
      init(this: Block) {
        this.setStyle(EventBlocks.style);
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

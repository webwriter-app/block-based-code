import * as Blockly from "blockly";

enum EventType {
  WHEN_START_CLICKED = "when_start_clicked",
}

export class EventBlocks {
  private static readonly style = "event_blocks";

  public static defineBlocks() {
    EventBlocks.whenStartClicked();
  }

  private static whenStartClicked() {
    Blockly.Blocks[EventType.WHEN_START_CLICKED] = {
      init(this: Blockly.Block) {
        this.setStyle(EventBlocks.style);
        this.setNextStatement(true, null);
        this.appendDummyInput().appendField("when");
        this.appendDummyInput().appendField("clicked");
      },
    };
  }
}

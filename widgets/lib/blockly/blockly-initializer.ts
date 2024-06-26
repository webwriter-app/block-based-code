import * as Blockly from "blockly";
import {
  ControlBlocks, EventBlocks, MotionBlocks, OperatorBlocks,
} from "./blocks";
import { WebWriterTheme } from "./theme";

export class BlocklyInitializer {
  private static initialized = false;

  public static define(): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineBlocks();
    BlocklyInitializer.defineContextMenu();
    BlocklyInitializer.initialized = true;
  }

  private static defineTheme(): void {
    // eslint-disable-next-line no-new
    new WebWriterTheme();
  }

  private static defineBlocks(): void {
    MotionBlocks.defineBlocks();
    EventBlocks.defineBlocks();
    ControlBlocks.defineBlocks();
    OperatorBlocks.defineBlocks();
  }

  private static defineContextMenu(): void {
    Blockly.ContextMenuRegistry.registry.unregister("undoWorkspace");
    Blockly.ContextMenuRegistry.registry.unregister("redoWorkspace");
    Blockly.ContextMenuRegistry.registry.unregister("blockInline");
  }
}

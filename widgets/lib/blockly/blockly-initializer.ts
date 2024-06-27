import { Blocks, ContextMenuRegistry } from "blockly";
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
    Object.keys(Blocks).forEach((key) => {
      if (key === "math_number" || key === "variables_get" || key === "variables_set") return;
      delete Blocks[key];
    });
    MotionBlocks.defineBlocks();
    EventBlocks.defineBlocks();
    ControlBlocks.defineBlocks();
    OperatorBlocks.defineBlocks();
  }

  private static defineContextMenu(): void {
    ContextMenuRegistry.registry.unregister("undoWorkspace");
    ContextMenuRegistry.registry.unregister("redoWorkspace");
    ContextMenuRegistry.registry.unregister("blockInline");
  }
}

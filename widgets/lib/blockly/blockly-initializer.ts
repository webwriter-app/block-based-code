import { common, ContextMenuRegistry } from "blockly";

import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";

export class BlocklyInitializer {
  private static initialized = false;

  public static define(): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineContextMenu();
    BlocklyInitializer.defineBlocks();
    BlocklyInitializer.initialized = true;
  }

  private static defineTheme(): void {
    // eslint-disable-next-line no-new
    new WebWriterTheme();
  }

  private static defineContextMenu(): void {
    ContextMenuRegistry.registry.unregister("undoWorkspace");
    ContextMenuRegistry.registry.unregister("redoWorkspace");
    ContextMenuRegistry.registry.unregister("blockInline");
  }

  private static defineBlocks(): void {
    const blockDefinitions = common.createBlockDefinitionsFromJsonArray(blocks);
    common.defineBlocks(blockDefinitions);
  }
}

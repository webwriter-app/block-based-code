import {
  common, ContextMenuRegistry, registry, ToolboxCategory,
} from "blockly";

import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";
import { WebWriterToolboxCategory } from "./toolbox";

export class BlocklyInitializer {
  private static initialized = false;

  public static define(): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineToolboxCategory();
    BlocklyInitializer.defineContextMenu();
    BlocklyInitializer.defineBlocks();
    BlocklyInitializer.initialized = true;
  }

  private static defineTheme(): void {
    // eslint-disable-next-line no-new
    new WebWriterTheme();
  }

  private static defineToolboxCategory(): void {
    registry.register(
      registry.Type.TOOLBOX_ITEM,
      ToolboxCategory.registrationName,
      WebWriterToolboxCategory,
      true,
    );
  }

  private static defineContextMenu(): void {
    ContextMenuRegistry.registry.unregister("undoWorkspace");
    ContextMenuRegistry.registry.unregister("redoWorkspace");
    ContextMenuRegistry.registry.unregister("blockInline");
  }

  private static defineBlocks(): void {
    common.defineBlocksWithJsonArray(blocks);
  }
}

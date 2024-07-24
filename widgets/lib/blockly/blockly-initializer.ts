import {
  Blocks, common, ContextMenuRegistry, dialog, registry, ToolboxCategory,
} from "blockly";

import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";
import { WebWriterToolboxCategory } from "./toolbox";
import { BlocklyApplication } from "./application";

export class BlocklyInitializer {
  private static initialized = false;

  public static define(promptReceiver: BlocklyApplication): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineToolboxCategory();
    BlocklyInitializer.definePrompt(promptReceiver);
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

  private static definePrompt(promptReceiver: BlocklyApplication): void {
    dialog.setPrompt((...args) => {
      promptReceiver.promptCallback(...args);
    });
  }

  private static defineContextMenu(): void {
    ContextMenuRegistry.registry.unregister("undoWorkspace");
    ContextMenuRegistry.registry.unregister("redoWorkspace");
    ContextMenuRegistry.registry.unregister("blockInline");
  }

  private static defineBlocks(): void {
    Object.keys(Blocks).forEach((key) => {
      if (key === "variables_get" || key === "variables_set") return;
      delete Blocks[key];
    });
    common.defineBlocksWithJsonArray(blocks);
  }
}

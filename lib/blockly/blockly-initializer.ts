import {
  Blocks, common, ContextMenuRegistry, dialog, registry, ToolboxCategory,
} from "blockly";

import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";
import { WebWriterToolboxCategory } from "./toolbox";
import { BlocklyApplication } from "./application";

export class BlocklyInitializer {
  private static initialized = false;

  public static define(dialogReceiver: BlocklyApplication): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.addCopyPastePlugin();
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineToolboxCategory();
    BlocklyInitializer.defineDialog(dialogReceiver);
    BlocklyInitializer.defineContextMenu();
    BlocklyInitializer.defineBlocks();
    BlocklyInitializer.initialized = true;
  }

  private static addCopyPastePlugin(): void {
    const plugin = new CrossTabCopyPaste();
    plugin.init({
      contextMenu: true,
      shortcut: true,
    });
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

  private static defineDialog(promptReceiver: BlocklyApplication): void {
    dialog.setPrompt((...args) => {
      if (!promptReceiver.promptCallback) return;
      promptReceiver.promptCallback(...args);
    });
    dialog.setConfirm((...args) => {
      if (!promptReceiver.confirmCallback) return;
      promptReceiver.confirmCallback(...args);
    });
    dialog.setAlert((message) => {
      if (!promptReceiver.alertCallback) return;
      promptReceiver.alertCallback(message);
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

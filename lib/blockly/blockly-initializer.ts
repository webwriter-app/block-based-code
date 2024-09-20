import {
  Blocks, common, ContextMenuRegistry, dialog, registry, ToolboxCategory,
} from "blockly";

import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";
import { WebWriterToolboxCategory } from "./toolbox";
import { BlocklyApplication } from "./application";

/**
 * The BlocklyInitializer class initializes Blockly.
 */
export class BlocklyInitializer {
  /**
   * Whether Blockly has been initialized.
   * @private
   */
  private static initialized = false;

  /**
   * Initializes Blockly.
   * @param dialogReceiver The dialog event receiver.
   */
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

  /**
   * Adds the copy-paste plugin to Blockly.
   * @private
   */
  private static addCopyPastePlugin(): void {
    const plugin = new CrossTabCopyPaste();
    plugin.init({
      contextMenu: true,
      shortcut: true,
    });
  }

  /**
   * Defines the theme used by Blockly.
   * @private
   */
  private static defineTheme(): void {
    // eslint-disable-next-line no-new
    new WebWriterTheme();
  }

  /**
   * Defines the toolbox category used by Blockly.
   * @private
   */
  private static defineToolboxCategory(): void {
    registry.register(
      registry.Type.TOOLBOX_ITEM,
      ToolboxCategory.registrationName,
      WebWriterToolboxCategory,
      true,
    );
  }

  /**
   * Defines the dialog event receiver.
   * @param promptReceiver
   * @private
   */
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

  /**
   * Defines the options inside the context menu in Blockly.
   * @private
   */
  private static defineContextMenu(): void {
    ContextMenuRegistry.registry.unregister("undoWorkspace");
    ContextMenuRegistry.registry.unregister("redoWorkspace");
    ContextMenuRegistry.registry.unregister("blockInline");
  }

  /**
   * Defines the blocks used by Blockly.
   * @private
   */
  private static defineBlocks(): void {
    Object.keys(Blocks).forEach((key) => {
      if (key === "variables_get" || key === "variables_set") return;
      delete Blocks[key];
    });
    common.defineBlocksWithJsonArray(blocks);
  }
}

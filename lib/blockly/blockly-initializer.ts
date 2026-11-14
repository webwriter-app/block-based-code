import {
  Blocks, common, ContextMenuRegistry, dialog, registry, ToolboxCategory, fieldRegistry,
  type Block, type Workspace,
} from "blockly";
import { FieldColour } from "@blockly/field-colour";
import { CrossTabCopyPaste } from "@blockly/plugin-cross-tab-copy-paste";
import { WebWriterTheme } from "./theme";
import { blocks } from "./blocks";
import { WebWriterToolboxCategory } from "./toolbox";
import { BlocklyApplication } from "./application";
import { messageFor } from "../../locales";
import type { Dictionary, Lang } from "../../types";

function localizeBlockJson(value: unknown, locale: Lang): unknown {
  if (typeof value === "string") {
    return value.replace(/%\{BKY_([A-Z0-9_]+)\}/g, (token, name: string) => {
      const key = `BLOCKS.${name as keyof Dictionary["BLOCKS"]}` as const;
      const translated = messageFor(locale)(key);
      return translated === key ? token : translated;
    });
  }
  if (Array.isArray(value)) return value.map(item => localizeBlockJson(item, locale));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeBlockJson(item, locale)]));
  }
  return value;
}

/**
 * The BlocklyInitializer class initializes Blockly.
 */
export class BlocklyInitializer {
  /**
   * Whether Blockly has been initialized.
   * @private
   */
  private static initialized = false;
  private static activeApplication?: BlocklyApplication;
  private static readonly applicationsByWorkspace = new WeakMap<Workspace, BlocklyApplication>();

  public static activate(application: BlocklyApplication) {
    this.activeApplication = application;
    this.applicationsByWorkspace.set(application.getWorkspace(), application);
  }

  private static localeForWorkspace(workspace: Workspace): Lang | undefined {
    const root = workspace.getRootWorkspace() ?? workspace;
    return this.applicationsByWorkspace.get(root)?.getLocale();
  }

  public static deactivate(application: BlocklyApplication) {
    if (this.activeApplication === application) this.activeApplication = undefined;
  }

  /**
   * Initializes Blockly.
   */
  public static define(): void {
    if (BlocklyInitializer.initialized) return;
    BlocklyInitializer.addCopyPastePlugin();
    BlocklyInitializer.registerFields();
    BlocklyInitializer.defineTheme();
    BlocklyInitializer.defineToolboxCategory();
    BlocklyInitializer.defineDialog();
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
   * Registers custom fields.
   * @private
   */
  private static registerFields(): void {
    fieldRegistry.register("field_colour", FieldColour);
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

  /** Dispatch global Blockly dialogs to the active workspace. */
  private static defineDialog(): void {
    dialog.setPrompt((...args) => this.activeApplication?.promptCallback?.(...args));
    dialog.setConfirm((...args) => this.activeApplication?.confirmCallback?.(...args));
    dialog.setAlert(message => this.activeApplication?.alertCallback?.(message));
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
    const definitions = Object.fromEntries(blocks.map(definition => [definition.type, {
      init(this: Block) {
        const locale = BlocklyInitializer.localeForWorkspace(this.workspace);
        this.jsonInit(locale ? localizeBlockJson(definition, locale) : definition);
      },
    }]));
    common.defineBlocks(definitions);
  }
}

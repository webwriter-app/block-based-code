import {
  common, Events, inject, serialization, setLocale, setParentContainer, svgResize, utils, Variables, WorkspaceSvg,
} from "blockly";
import ZoomResetIcon from "@tabler/icons/outline/zoom-reset.svg";
import ZoomOutIcon from "@tabler/icons/outline/zoom-out.svg";
import ZoomInIcon from "@tabler/icons/outline/zoom-in.svg";
import { BlocklyInitializer } from "./blockly-initializer";
import { createToolboxFromBlockList, SelectedBlocks } from "./toolbox/toolbox";
import { BlockTypes } from "../../model/blockly/blocks/blocks";
import { executableCodeGenerator, readableCodeGenerator } from "../../model/blockly/generator/generator";
import type { MsgFn } from "@lit/localize";
import { Application } from "../base-application";
import { WebWriterFlyout } from "./toolbox/flyout";
import { ToolbarButton } from "../toolbar-button";
import { blocklyMessagesFor, coreOverridesFor } from "../../model/blockly/locale";
import { blockMessages, controlMessages } from "../messages";

type BlockInfo = utils.toolbox.BlockInfo;

/**
 * The BlocklyApplication class represents a Blockly application.
 */
export class BlocklyApplication extends Application {
  /**
   * The renderer used by Blockly.
   * @private
   */
  private static readonly renderer = "zelos";

  /**
   * The theme used by Blockly.
   * @private
   */
  private static readonly theme = "webwriter";

  /**
   * The Blockly events supported by the widget.
   * @private
   */
  private static readonly supportedBlocklyEvents: Set<string> = new Set([
    Events.BLOCK_CHANGE,
    Events.BLOCK_CREATE,
    Events.BLOCK_DELETE,
    Events.BLOCK_MOVE,
    Events.VAR_CREATE,
    Events.VAR_DELETE,
    Events.VAR_RENAME,
  ]);

  /**
   * The prompt callback function.
   */
  public promptCallback: (promptText: string, defaultText: string, callback: (newText: string) => void) => void;

  /**
   * The confirm callback function.
   */
  public confirmCallback: (message: string, callback: (confirmed: boolean) => void) => void;

  /**
   * The alert callback function.
   */
  public alertCallback: (message: string) => void;

  /**
   * Whether the application is readonly.
   * @private
   */
  private readonly: boolean;

  /**
   * The usable blocks.
   * @private
   */
  private usableBlocks: SelectedBlocks;

  /**
   * The Blockly workspace.
   * @private
   */
  private workspace: WorkspaceSvg;

  constructor(readonly: boolean, usableBlocks: SelectedBlocks, private readonly msg: MsgFn, private locale: string, private catalog: string, private readonly registry: CustomElementRegistry) {
    super();
    this.updateBlockMessages();
    this.applyBlocklyLocale();
    BlocklyInitializer.define();
    this.readonly = readonly;
    this.usableBlocks = usableBlocks;
    this.injectWorkspace();
    BlocklyInitializer.activate(this);
    this.zoomGroup = this.generateZoomGroup();
    this.container.appendChild(this.zoomGroup);
    for (const type of ["pointerdown", "contextmenu", "keydown", "focusin"]) {
      this.container.addEventListener(type, this.activateLocale, { capture: true });
    }
  }

  private zoomGroup: HTMLDivElement;
  private blockMessageSet: Record<string, string> = {};

  /** The texts of the blocks in the language of this workspace. */
  public getBlockMessages(): Record<string, string> {
    return this.blockMessageSet;
  }

  private updateBlockMessages() {
    this.blockMessageSet = blockMessages(this.msg);
  }

  /** Blockly keeps its texts globally, so the workspace that is used sets its own. */
  private applyBlocklyLocale() {
    setLocale({
      ...blocklyMessagesFor(this.locale),
      ...this.blockMessageSet,
      ...controlMessages(this.msg),
      ...coreOverridesFor(this.locale),
    });
  }

  private activateLocale = () => {
    this.applyBlocklyLocale();
    BlocklyInitializer.activate(this);
  };

  public setLocale(locale: string, catalog: string) {
    if (locale === this.locale && catalog === this.catalog) return false;
    this.catalog = catalog;
    this.updateBlockMessages();
    const state = this.save();
    const scale = this.workspace.getScale();
    const scrollX = this.workspace.scrollX;
    const scrollY = this.workspace.scrollY;
    const selected = common.getSelected() as { id?: unknown; workspace?: unknown } | null;
    const selectedId = selected?.workspace === this.workspace && typeof selected.id === "string"
      ? selected.id : undefined;

    this.locale = locale;
    this.activateLocale();
    Events.disable();
    try {
      this.workspace.clear();
      serialization.workspaces.load(state, this.workspace);
      this.workspace.setScale(scale);
      this.workspace.scroll(scrollX, scrollY);
      if (selectedId) {
        const replacement = this.workspace.getBlockById(selectedId) ?? this.workspace.getCommentById(selectedId);
        if (replacement && "select" in replacement && typeof replacement.select === "function") replacement.select();
      }
    } finally {
      Events.enable();
    }

    this.zoomGroup.replaceWith(this.zoomGroup = this.generateZoomGroup());
    this.updateToolbox(this.usableBlocks);
    return true;
  }

  /** Workspace lookup used by Blockly's globally registered block definitions. */
  public getWorkspace(): WorkspaceSvg {
    return this.workspace;
  }

  /**
   * @inheritDoc
   */
  public override resize(): void {
    svgResize(this.workspace);
  }

  /**
   * Returns the workspace state.
   */
  public save(): object {
    return serialization.workspaces.save(this.workspace);
  }

  /**
   * Returns the generated executable code.
   */
  public get executableCode(): string {
    return executableCodeGenerator.workspaceToCode(this.workspace);
  }

  /**
   * Returns the generated readable code.
   */
  public get readableCode(): string {
    return readableCodeGenerator.workspaceToCode(this.workspace).replaceAll("await ", "");
  }

  /**
   * Loads the workspace state.
   * @param state The workspace state.
   */
  public load(state: object): void {
    this.activateLocale();
    serialization.workspaces.load(state, this.workspace);
  }

  /**
   * Highlights the block with the given id.
   * @param id The block id.
   */
  public highlight(id: string | null): void {
    this.workspace.highlightBlock(id);
  }

  /**
   * Adds an event listener to the Blockly application.
   */
  public addEventListener(key: "PROMPT", callback: (promptText: string, defaultText: string, callback: (newText: string) => void) => void): void;
  public addEventListener(key: "CONFIRM", callback: (message: string, callback: (confirmed: boolean) => void) => void): void;
  public addEventListener(key: "ALERT", callback: (message: string) => void): void;
  public addEventListener(key: "CHANGE", callback: (event: Events.Abstract) => void): void;
  public addEventListener(key: string, callback: (...args: any[]) => void): void {
    switch (key) {
      case "PROMPT":
        this.promptCallback = callback;
        break;
      case "CONFIRM":
        this.confirmCallback = callback;
        break;
      case "ALERT":
        this.alertCallback = callback;
        break;
      case "CHANGE":
        this.workspace.addChangeListener((event) => {
          if (this.workspace.isDragging()) return;
          if (!BlocklyApplication.supportedBlocklyEvents.has(event.type)) return;

          callback(event);
        });
        break;
      default:
        throw new Error(`Event ${key} not supported`);
    }
  }

  /**
   * Creates a variable with the given name inside the workspace.
   */
  public createVariable(name: string): void | never {
    if (!name) {
      throw new Error("Please enter a variable name");
    }
    const variables = this.workspace.getVariableMap();
    if (variables.getVariable(name)) {
      throw new Error("Variable already exists");
    }
    variables.createVariable(name);
  }

  /**
   * @inheritDoc
   */
  public override destroy(): void {
    BlocklyInitializer.deactivate(this);
    this.workspace.dispose();
    super.destroy();
  }

  /**
   * Updates the toolbox in the workspace with the given usable blocks.
   * @param usableBlocks The usable blocks.
   */
  public updateToolbox(usableBlocks: SelectedBlocks): void {
    if (!this.readonly) {
      this.usableBlocks = usableBlocks;
      this.activateLocale();
      const toolbox = createToolboxFromBlockList(this.usableBlocks, this.msg);
      this.workspace.updateToolbox(toolbox);
      this.workspace.refreshToolboxSelection();
    }
  }

  /**
   * @inheritDoc
   */
  protected override createContainer(): void {
    super.createContainer();
    this.container.style.height = "100%";
    this.container.style.overflow = "visible";

    setParentContainer(this.container);
  }

  /**
   * Injects the Blockly workspace into the container.
   * @private
   */
  private injectWorkspace(): void {
    this.workspace = inject(this.container, {
      renderer: BlocklyApplication.renderer,
      theme: BlocklyApplication.theme,
      readOnly: this.readonly,
      sounds: false,
      collapse: false,
      comments: false,
      disable: false,
      grid: {
        spacing: 30,
        length: 1,
        colour: "var(--sl-color-gray-500)",
      },
      move: {
        wheel: true,
      },
      zoom: {
        wheel: true,
        maxScale: 0.8,
        controls: false,
        startScale: 0.8,
        pinch: true,
      },
      trashcan: false,
      toolbox: createToolboxFromBlockList(this.usableBlocks, this.msg),
      maxInstances: {
        "events:when_start_clicked": 1,
        "events:when_sprite_clicked": 1,
      } satisfies Partial<Record<BlockTypes, number>>,
      maxTrashcanContents: 0,
      plugins: {
        flyoutsVerticalToolbox: WebWriterFlyout,
      },
    });
    this.registerVariablesCategory();
    this.addVariableBlockShadowListener();
    this.workspace.addChangeListener(() => {
      this.removeComputeCanvas();
    });
    this.moveStyleElementsToContainer();
    if (!this.readonly) {
      this.workspace.getToolbox()?.refreshSelection();
    }
  }

  /**
   * Registers the variables category in the workspace.
   * @private
   */
  private registerVariablesCategory(): void {
    this.workspace.registerToolboxCategoryCallback("VARIABLE", (workspace: WorkspaceSvg) => {
      const items = Variables.flyoutCategory(workspace);
      const setter = items.find((item) => item.kind.toLowerCase() === "block" && (item as BlockInfo).type === "variables_set") as BlockInfo | undefined;
      if (setter) {
        setter.inputs = { ...setter.inputs, VALUE: { shadow: { type: "math:number", fields: { NUM: 0 } } } };
      }
      return items;
    });
  }

  /**
   * Ensure that variables_set blocks always have a math:number shadow block.
   * @private
   */
  private addVariableBlockShadowListener(): void {
    this.workspace.addChangeListener((event) => {
      if (event.type !== Events.BLOCK_CREATE) return;
      if (!(event instanceof Events.BlockCreate) || !event.blockId) return;

      const block = this.workspace.getBlockById(event.blockId);
      if (!block || block.type !== "variables_set") return;

      const valueInput = block.getInput("VALUE");
      if (!valueInput) return;

      if (valueInput.connection?.targetBlock()) return;

      const shadowBlock = this.workspace.newBlock("math:number");
      shadowBlock.setShadow(true);
      shadowBlock.setFieldValue("0", "NUM");
      shadowBlock.initSvg();
      shadowBlock.render();
      valueInput.connection?.connect(shadowBlock.outputConnection!);
    });
  }

  /**
   * Moves the Blockly style elements to the container.
   * @private
   */
  private moveStyleElementsToContainer(): void {
    ["blockly-common-style", `blockly-renderer-style-${BlocklyApplication.renderer}-${BlocklyApplication.theme}`].forEach((styleElementId) => {
      const styleElement = document.querySelector<HTMLStyleElement>(`#${styleElementId}`);
      if (!styleElement) {
        console.error(`Style element with id ${styleElementId} not found`);
        return;
      }
      this.container.appendChild(styleElement.cloneNode(true));
    });
  }

  /**
   * Removes the Blockly compute canvas from the workspace. Some weird canvas that appears in the worksheet.
   * @private
   */
  private removeComputeCanvas(): void {
    const computeCanvas = document.querySelectorAll<HTMLCanvasElement>(".blocklyComputeCanvas");
    computeCanvas.forEach((canvas) => canvas.remove());
  }

  /**
   * Generates the zoom group elements.
   * @private
   */
  private generateZoomGroup(): HTMLDivElement {
    const msg = this.msg;
    const groupDiv = document.createElement("div");
    groupDiv.style.position = "absolute";
    groupDiv.style.top = "var(--sl-spacing-small)";
    groupDiv.style.right = "var(--sl-spacing-large)";
    groupDiv.style.display = "flex";
    groupDiv.style.zIndex = "100";

    groupDiv.appendChild(this.generateZoomButton(ZoomResetIcon, this.msg("Reset Zoom"), () => {
      this.workspace.zoomToFit();
    }));
    groupDiv.appendChild(this.generateZoomButton(ZoomOutIcon, this.msg("Zoom Out"), () => {
      this.workspace.zoomCenter(-1);
    }));
    groupDiv.appendChild(this.generateZoomButton(ZoomInIcon, this.msg("Zoom In"), () => {
      this.workspace.zoomCenter(1);
    }));

    return groupDiv;
  }

  /**
   * Generates a zoom button.
   * @param icon The icon of the button.
   * @param label The label of the button.
   * @param onClick The onClick event of the button.
   * @private
   */
  private generateZoomButton(icon: string, label: string, onClick: () => void): ToolbarButton {
    const zoomInButton = document.createElement("webwriter-blocks-toolbar-button", { customElementRegistry: this.registry }) as ToolbarButton;
    zoomInButton.icon = icon;
    zoomInButton.label = label;
    zoomInButton.addEventListener("click", onClick);
    return zoomInButton;
  }
}

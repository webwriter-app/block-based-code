import {
  Events, inject, serialization, setParentContainer, svgResize, utils, Variables, WorkspaceSvg,
} from "blockly";
import ZoomResetIcon from "@tabler/icons/outline/zoom-reset.svg";
import ZoomOutIcon from "@tabler/icons/outline/zoom-out.svg";
import ZoomInIcon from "@tabler/icons/outline/zoom-in.svg";
import { BlocklyInitializer } from "./blockly-initializer";
import { createToolboxFromBlockList, SelectedBlocks } from "./toolbox";
import { BlockTypes } from "./blocks";
import { executableCodeGenerator, readableCodeGenerator } from "./generator";
import { Application } from "../types";
import { WebWriterFlyout } from "./toolbox/flyout";
import { ToolbarButton } from "../../components/toolbar-button";
import { msg } from "../../locales";

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

  constructor(readonly: boolean, usableBlocks: SelectedBlocks) {
    super();
    BlocklyInitializer.define(this);
    this.readonly = readonly;
    this.usableBlocks = usableBlocks;
    this.injectWorkspace();
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
    serialization.workspaces.load(state, this.workspace);
  }

  /**
   * Highlights the block with the given id.
   * @param id The block id.
   */
  public highlight(id: string): void {
    this.workspace.highlightBlock(id);
  }

  /**
   * Adds an event listener to the Blockly application.
   */
  public addEventListener(key: "PROMPT", callback: (promptText: string, defaultText: string, callback: (newText: string) => void) => void): void;
  public addEventListener(key: "CONFIRM", callback: (message: string, callback: (confirmed: boolean) => void) => void): void;
  public addEventListener(key: "ALERT", callback: (message: string) => void): void;
  public addEventListener(key: "CHANGE", callback: (event: any) => void): void;
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
    if (this.workspace.getVariable(name)) {
      throw new Error("Variable already exists");
    }
    this.workspace.createVariable(name);
  }

  /**
   * @inheritDoc
   */
  public override destroy(): void {
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
      const toolbox = createToolboxFromBlockList(this.usableBlocks);
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

    const zoomGroup = this.generateZoomGroup();
    this.container.appendChild(zoomGroup);

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
      toolbox: createToolboxFromBlockList(this.usableBlocks),
      maxInstances: {
        "events:when_start_clicked": 1,
      } satisfies Partial<Record<BlockTypes, number>>,
      maxTrashcanContents: 0,
      plugins: {
        flyoutsVerticalToolbox: WebWriterFlyout,
      },
    });
    this.registerVariablesCategory();
    this.workspace.addChangeListener(() => {
      this.removeComputeCanvas();
    });
    this.moveStyleElementsToContainer();
    if (!this.readonly) {
      this.workspace.getToolbox().refreshSelection();
    }
  }

  /**
   * Registers the variables category in the workspace.
   * @private
   */
  private registerVariablesCategory(): void {
    this.workspace.registerToolboxCategoryCallback("VARIABLE", (workspace: WorkspaceSvg): Element[] => {
      const blocks = Variables.flyoutCategory(workspace);
      blocks.some((block) => {
        if (block.getAttribute("type") === "variables_set") {
          const shadow = utils.xml.textToDom("<value name='VALUE'><shadow type='math:number'><field name='NUM'>0</field></shadow></value>");
          block.appendChild(shadow);
          return true;
        }
        return false;
      });

      return blocks;
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
    const groupDiv = document.createElement("div");
    groupDiv.style.position = "absolute";
    groupDiv.style.top = "var(--sl-spacing-small)";
    groupDiv.style.right = "var(--sl-spacing-large)";
    groupDiv.style.display = "flex";
    groupDiv.style.zIndex = "100";

    groupDiv.appendChild(this.generateZoomButton(ZoomResetIcon, msg("ZOOM.RESET"), () => {
      this.workspace.zoomToFit();
    }));
    groupDiv.appendChild(this.generateZoomButton(ZoomOutIcon, msg("ZOOM.OUT"), () => {
      this.workspace.zoomCenter(-1);
    }));
    groupDiv.appendChild(this.generateZoomButton(ZoomInIcon, msg("ZOOM.IN"), () => {
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
    const zoomInButton = document.createElement("webwriter-blocks-toolbar-button");
    zoomInButton.icon = icon;
    zoomInButton.label = label;
    zoomInButton.addEventListener("click", onClick);
    return zoomInButton;
  }
}

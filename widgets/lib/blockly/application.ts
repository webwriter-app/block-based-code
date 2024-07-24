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

export class BlocklyApplication extends Application {
  private static readonly newVariableButtonCallback = "CREATE_VARIABLE_NEW";

  private static readonly renderer = "zelos";

  private static readonly theme = "webwriter";

  private static readonly supportedBlocklyEvents = new Set([
    Events.BLOCK_CHANGE,
    Events.BLOCK_CREATE,
    Events.BLOCK_DELETE,
    Events.BLOCK_MOVE,
  ]);

  public promptCallback: (p1: string, p2: string, p3: (p1: string | null) => void) => void;

  private readonly: boolean;

  private selectedBlocks: SelectedBlocks;

  private workspace: WorkspaceSvg;

  constructor(readonly: boolean, selectedBlocks: SelectedBlocks) {
    super();
    BlocklyInitializer.define(this);
    this.readonly = readonly;
    this.selectedBlocks = selectedBlocks;

    this.injectWorkspace();
  }

  public resize(): void {
    svgResize(this.workspace);
  }

  public save(): object {
    return serialization.workspaces.save(this.workspace);
  }

  public get executableCode(): string {
    return executableCodeGenerator.workspaceToCode(this.workspace);
  }

  public get readableCode(): string {
    return readableCodeGenerator.workspaceToCode(this.workspace).replaceAll("await ", "");
  }

  public load(state: object): void {
    serialization.workspaces.load(state, this.workspace);
  }

  public highlight(id: string): void {
    this.workspace.highlightBlock(id);
  }

  public addEventListener(key: "PROMPT", callback: (p1: string, p2: string, p3: (p1: string | null) => void) => void): void;
  public addEventListener(key: "CHANGE", callback: (event: any) => void): void;
  public addEventListener(key: string, callback: (...args: any[]) => void): void {
    switch (key) {
      case "PROMPT":
        this.promptCallback = callback;
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

  public createVariable(name: string): void | never {
    if (!name) {
      throw new Error("Please enter a variable name");
    }
    if (this.workspace.getVariable(name)) {
      throw new Error("Variable already exists");
    }
    this.workspace.createVariable(name);
  }

  public disconnect(): void {
    this.workspace.dispose();
  }

  public updateToolbox(selectedBlocks: SelectedBlocks): void {
    if (!this.readonly) {
      this.selectedBlocks = selectedBlocks;
      const toolbox = createToolboxFromBlockList(this.selectedBlocks);
      this.workspace.updateToolbox(toolbox);
      this.workspace.refreshToolboxSelection();
    }
  }

  protected createContainer(): void {
    super.createContainer();
    this.container.style.height = "100%";
    this.container.style.overflow = "visible";

    const zoomGroup = this.generateZoomGroup();
    this.container.appendChild(zoomGroup);

    setParentContainer(this.container);
  }

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
        controls: false,
        startScale: 0.8,
      },
      trashcan: false,
      toolbox: createToolboxFromBlockList(this.selectedBlocks),
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

  private removeComputeCanvas(): void {
    const computeCanvas = document.querySelectorAll<HTMLCanvasElement>(".blocklyComputeCanvas");
    computeCanvas.forEach((canvas) => canvas.remove());
  }

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

  private generateZoomButton(icon: string, label: string, onClick: () => void): ToolbarButton {
    const zoomInButton = document.createElement("webwriter-blocks-toolbar-button");
    zoomInButton.icon = icon;
    zoomInButton.label = label;
    zoomInButton.addEventListener("click", onClick);
    return zoomInButton;
  }
}

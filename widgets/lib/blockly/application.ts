import {
  Events,
  FlyoutButton,
  inject,
  serialization,
  setParentContainer,
  svgResize,
  Variables,
  WorkspaceSvg,
} from "blockly";
import { BlocklyInitializer } from "./blockly-initializer";
import { createToolboxFromBlockList, SelectedBlocks } from "./toolbox";
import { BlockTypes } from "./blocks";
import { executableCodeGenerator, readableCodeGenerator } from "./generator";
import { Application } from "../types";

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

  private readonly: boolean;

  private selectedBlocks: SelectedBlocks;

  private workspace: WorkspaceSvg;

  constructor(readonly: boolean, selectedBlocks: SelectedBlocks) {
    super();
    BlocklyInitializer.define();
    this.readonly = readonly;
    this.selectedBlocks = selectedBlocks;

    this.injectWorkspace();
  }

  public resize(): void {
    svgResize(this.workspace);
  }

  public save(): string {
    return JSON.stringify(serialization.workspaces.save(this.workspace));
  }

  public get executableCode(): string {
    return executableCodeGenerator.workspaceToCode(this.workspace);
  }

  public get readableCode(): string {
    return readableCodeGenerator.workspaceToCode(this.workspace);
  }

  public load(workspace: string): void {
    serialization.workspaces.load(JSON.parse(workspace), this.workspace);
  }

  public highlight(id: string): void {
    this.workspace.highlightBlock(id);
  }

  // @ts-ignore
  public addEventListener(key: "CREATE_VARIABLE", callback: (button: FlyoutButton) => void): void;
  public addEventListener(key: "CHANGE", callback: (event: any) => void): void;
  public addEventListener(key: string, callback: (...args: unknown[]) => void): void {
    switch (key) {
      case "CREATE_VARIABLE":
        this.workspace.registerButtonCallback(
          BlocklyApplication.newVariableButtonCallback,
          callback,
        );
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
    this.selectedBlocks = selectedBlocks;
    const toolbox = createToolboxFromBlockList(this.selectedBlocks);
    this.workspace.updateToolbox(toolbox);
    this.workspace.refreshToolboxSelection();
  }

  protected createContainer(): void {
    super.createContainer();
    this.container.style.height = "100%";
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
      move: {
        wheel: true,
      },
      trashcan: false,
      toolbox: createToolboxFromBlockList(this.selectedBlocks),
      maxInstances: {
        "events:when_start_clicked": 1,
      } satisfies Partial<Record<BlockTypes, number>>,
      maxTrashcanContents: 0,
    });
    if (!this.readonly) {
      this.registerVariablesCategory();
    }
    this.moveStyleElementsToContainer();
  }

  private registerVariablesCategory(): void {
    this.workspace.registerToolboxCategoryCallback("VARIABLE", (workspace: WorkspaceSvg): Element[] => {
      const blockList: Element[] = [];

      const button = document.createElement("button");
      button.setAttribute("text", "Create variable");
      button.setAttribute("callbackkey", BlocklyApplication.newVariableButtonCallback);
      blockList.push(button);

      const blocks = Variables.flyoutCategoryBlocks(workspace);
      blockList.push(...blocks);

      return blockList;
    });
    this.workspace.getToolbox().refreshSelection();
  }

  private moveStyleElementsToContainer(): void {
    ["blockly-common-style", `blockly-renderer-style-${BlocklyApplication.renderer}-${BlocklyApplication.theme}`].forEach((styleElementId) => {
      const styleElement = <HTMLStyleElement>document.querySelector(`#${styleElementId}`);
      if (!styleElement) {
        console.error(`Style element with id ${styleElementId} not found`);
        return;
      }
      this.container.appendChild(styleElement.cloneNode(true));
    });
  }
}

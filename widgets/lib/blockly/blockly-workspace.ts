import {
  FlyoutButton, inject, serialization, setParentContainer, svgResize, WorkspaceSvg,
} from "blockly";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { BlocklyInitializer } from "./blockly-initializer";
import { WebWriterToolbox } from "./toolbox/toolbox";

export class BlocklyWorkspace {
  private static readonly renderer = "zelos";

  private static readonly theme = "webwriter";

  public container: HTMLDivElement;

  private workspace: WorkspaceSvg;

  constructor(readonly: boolean = false) {
    BlocklyInitializer.define();
    this.createContainer();
    this.injectWorkspace(readonly);
    if (!readonly) {
      this.registerVariablesCategory();
    }
    this.moveStyleElementsToContainer();
  }

  public resize(): void {
    svgResize(this.workspace);
  }

  public save(): string {
    return JSON.stringify(serialization.workspaces.save(this.workspace));
  }

  public load(workspace: string): void {
    serialization.workspaces.load(JSON.parse(workspace), this.workspace);
  }

  public addEventListener(key: "CREATE_VARIABLE", callback: (button: FlyoutButton) => void): void;
  public addEventListener(key: "CHANGE", callback: (event: any) => void): void;
  public addEventListener(key: string, callback: (...args: unknown[]) => void): void {
    switch (key) {
      case "CREATE_VARIABLE":
        this.workspace.registerButtonCallback(WebWriterToolbox.CREATE_VARIABLE_CALLBACK_KEY, callback);
        break;
      case "CHANGE":
        this.workspace.addChangeListener(callback);
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

  private createContainer(): void {
    this.container = document.createElement("div");
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    setParentContainer(this.container);
  }

  private injectWorkspace(readonly: boolean): void {
    this.workspace = inject(this.container, {
      renderer: BlocklyWorkspace.renderer,
      theme: BlocklyWorkspace.theme,
      readOnly: readonly,
      sounds: false,
      collapse: false,
      comments: false,
      disable: false,
      move: {
        wheel: true,
      },
      toolbox: WebWriterToolbox.default,
      maxTrashcanContents: 0,
      plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
      },
    });
  }

  private registerVariablesCategory(): void {
    this.workspace.registerToolboxCategoryCallback("VARIABLE", WebWriterToolbox.variablesCategoryCallback);
    this.workspace.getToolbox().refreshSelection();
  }

  private moveStyleElementsToContainer(): void {
    ["blockly-common-style", `blockly-renderer-style-${BlocklyWorkspace.renderer}-${BlocklyWorkspace.theme}`].forEach((styleElementId) => {
      const styleElement = <HTMLStyleElement>document.querySelector(`#${styleElementId}`);
      if (!styleElement) {
        console.error(`Style element with id ${styleElementId} not found`);
        return;
      }
      this.container.appendChild(styleElement.cloneNode(true));
    });
  }
}

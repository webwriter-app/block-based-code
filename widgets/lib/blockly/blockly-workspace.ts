import {
  FlyoutButton, inject, setParentContainer, svgResize, WorkspaceSvg,
} from "blockly";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { BlocklyInitializer } from "./blockly-initializer";
import { WebWriterToolbox } from "./toolbox/toolbox";

export class BlocklyWorkspace {
  private static readonly renderer = "zelos";

  private static readonly theme = "webwriter";

  public container: Element;

  private workspace: WorkspaceSvg;

  constructor() {
    BlocklyInitializer.define();
    this.container = document.createElement("div");
    setParentContainer(this.container);
    this.injectWorkspace();
    this.registerVariablesCategory();
    this.moveStyleElementsToContainer();
  }

  public resize(): void {
    svgResize(this.workspace);
  }

  public addEventListener(key: "CREATE_VARIABLE", callback: (button: FlyoutButton) => void): void;
  public addEventListener(key: string, callback: (...args: unknown[]) => void): void {
    if (key === "CREATE_VARIABLE") {
      this.workspace.registerButtonCallback(WebWriterToolbox.CREATE_VARIABLE_CALLBACK_KEY, callback);
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

  private injectWorkspace(): void {
    this.workspace = inject(this.container, {
      renderer: BlocklyWorkspace.renderer,
      theme: BlocklyWorkspace.theme,
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

import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import * as Blockly from "blockly";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { consume } from "@lit/context";
import { PropertyValues } from "@lit/reactive-element";
import { SlButton, SlDialog, SlInput } from "@shoelace-style/shoelace";
import { Logger } from "../../utils";
import { styles } from "./editor.styles";
import { settingsContext } from "../../context";
import { Settings } from "../../types";
import { variablesCategoryCallback } from "../../lib/blockly";

const shadowMathInput = {
  shadow: {
    type: "math_number",
    fields: {
      NUM: "0",
    },
  },
};

const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Events",
      categoryStyle: "events_category",
      contents: [
        {
          kind: "block",
          type: "when_start_clicked",
        },
      ],
    },
    {
      kind: "category",
      name: "Controls",
      categoryStyle: "controls_category",
      contents: [
        {
          kind: "block",
          type: "wait",
          inputs: {
            DURATION: shadowMathInput,
          },
        },
        {
          kind: "block",
          type: "repeat",
          inputs: {
            TIMES: shadowMathInput,
          },
        },
        {
          kind: "block",
          type: "forever",
        },
        {
          kind: "block",
          type: "if",
        },
        {
          kind: "block",
          type: "if_else",
        },
        {
          kind: "block",
          type: "stop",
        },
      ],
    },
    {
      kind: "category",
      name: "Operators",
      categoryStyle: "operators_category",
      contents: [
        ...["sum", "subtract", "multiply", "divide"].map((type) => ({
          kind: "block",
          type,
          inputs: {
            A: shadowMathInput,
            B: shadowMathInput,
          },
        })),
        {
          kind: "sep",
          gap: 64,
        },
        ...["smaller", "greater", "equals"].map((type) => ({
          kind: "block",
          type,
          inputs: {
            A: shadowMathInput,
            B: shadowMathInput,
          },
        })),
        {
          kind: "sep",
          gap: 64,
        },
        ...["and", "or"].map((type) => ({
          kind: "block",
          type,
        })),
      ],
    },
    {
      kind: "category",
      name: "Variables",
      categoryStyle: "variables_category",
      custom: "VARIABLE",
    },
  ],
};

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  @query("#new-variable-dialog")
  private newVariableDialog!: SlDialog;

  @consume({ context: settingsContext, subscribe: true })
  private settings: Settings;

  private resizeObserver: ResizeObserver;

  private workspace?: Blockly.WorkspaceSvg;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-dialog": SlDialog,
      "sl-input": SlInput,
      "sl-button": SlButton,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  constructor() {
    super();

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
  }

  public connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();

    this.resizeObserver.disconnect();
  }

  public render(): TemplateResult {
    return html`
        <div id="block-canvas"></div>
        <sl-dialog label="New Variable" id="new-variable-dialog">
            <sl-input autofocus label="New variable name" placeholder=""></sl-input>
            <sl-button slot="footer" @click="${() => this.newVariableDialog.hide()}">Close</sl-button>
            <sl-button slot="footer" variant="primary" @click="${this.handleCreateVariable}">Create</sl-button>
        </sl-dialog>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    const renderer = "zelos";
    const theme = "webwriter";
    Blockly.setParentContainer(this.shadowRoot as unknown as Element);
    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer,
      theme,
      readOnly: !this.settings.contentEditable && this.settings.readonly,
      sounds: false,
      collapse: false,
      comments: false,
      disable: false,
      grid: {
        spacing: 16,
        length: 1,
        snap: true,
        colour: "var(--sl-color-gray-500)",
      },
      move: {
        wheel: true,
      },
      maxTrashcanContents: 0,
      toolbox,
      plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
      },
    });

    this.workspace.registerToolboxCategoryCallback("VARIABLE", variablesCategoryCallback);
    this.workspace.createVariable("test", "");

    this.workspace.getToolbox().refreshSelection();

    ["blockly-common-style", `blockly-renderer-style-${renderer}-${theme}`].forEach((styleElementId) => {
      const styleElement = <HTMLStyleElement>document.querySelector(`#${styleElementId}`);
      if (!styleElement) {
        Logger.error(`Style element with id ${styleElementId} not found`);
        return;
      }
      this.shadowRoot.appendChild(styleElement.cloneNode(true));
    });

    this.workspace.removeButtonCallback("CREATE_VARIABLE_NEW");
    this.workspace.registerButtonCallback("CREATE_VARIABLE_NEW", this.handleCreateVariableClick.bind(this));
    this.handleResize();
  }

  private handleResize(): void {
    if (this.workspace) {
      Blockly.svgResize(this.workspace);
    }
  }

  private handleCreateVariableClick(): void {
    this.newVariableDialog.show().catch();
  }

  private handleCreateVariable(): void {
    const input = this.newVariableDialog.querySelector("sl-input");
    const variableName = input.value;
    if (!variableName) {
      input.setCustomValidity("Please enter a variable name");
      input.reportValidity();
      return;
    }
    const existingVariable = this.workspace.getVariable(variableName);
    if (existingVariable) {
      input.setCustomValidity("Variable already exists");
      input.reportValidity();
      return;
    }
    this.workspace.createVariable(variableName);
    input.value = "";
    this.newVariableDialog.hide().catch();
  }
}

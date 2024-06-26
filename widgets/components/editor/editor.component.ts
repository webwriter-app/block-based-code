import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { consume } from "@lit/context";
import { PropertyValues } from "@lit/reactive-element";
import { SlButton, SlDialog, SlInput } from "@shoelace-style/shoelace";
import { styles } from "./editor.styles";
import { settingsContext } from "../../context";
import { Settings } from "../../types";
import { BlocklyWorkspace } from "../../lib/blockly/blockly-workspace";

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  @query("#new-variable-dialog")
  private newVariableDialog!: SlDialog;

  @consume({ context: settingsContext, subscribe: true })
  private settings: Settings;

  private resizeObserver: ResizeObserver;

  private blockly: BlocklyWorkspace;

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
    this.blockly = new BlocklyWorkspace();
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
        <sl-dialog label="New Variable" id="new-variable-dialog">
            <sl-input autofocus label="New variable name" placeholder=""></sl-input>
            <sl-button slot="footer" @click="${() => this.newVariableDialog.hide()}">Close</sl-button>
            <sl-button slot="footer" variant="primary" @click="${this.handleCreateVariable}">Create</sl-button>
        </sl-dialog>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.shadowRoot.appendChild(this.blockly.container);
  }

  private handleResize(): void {
    this.blockly.resize();
  }

  private handleCreateVariableClick(): void {
    this.newVariableDialog.show().catch();
  }

  // private handleCreateVariable(): void {
  //   const input = this.newVariableDialog.querySelector("sl-input");
  //   const variableName = input.value;
  //   if (!variableName) {
  //     input.setCustomValidity("Please enter a variable name");
  //     input.reportValidity();
  //     return;
  //   }
  //   const existingVariable = this.workspace.getVariable(variableName);
  //   if (existingVariable) {
  //     input.setCustomValidity("Variable already exists");
  //     input.reportValidity();
  //     return;
  //   }
  //   this.workspace.createVariable(variableName);
  //   input.value = "";
  //   this.newVariableDialog.hide().catch();
  // }
}

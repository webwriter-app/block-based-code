import { customElement, property, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { PropertyValues } from "@lit/reactive-element";
import { SlButton, SlDialog, SlInput } from "@shoelace-style/shoelace";
import { styles } from "./editor.styles";
import { BlocklyApplication, SelectedBlocks } from "../../lib/blockly";
import { EditorChangeEvent } from "../../types";
import { Toolbar } from "../toolbar";
import { ToolbarButton } from "../toolbar-button";
import { Logger } from "../../utils";

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  public editorApplication: BlocklyApplication;

  @query("#new-variable-dialog")
  private newVariableDialog!: SlDialog;

  @property({ type: Boolean })
  public readonly: boolean;

  @property({ type: Array })
  public selectedBlocks: SelectedBlocks;

  @property({ type: Object })
  public state: object;

  private resizeObserver: ResizeObserver;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-toolbar-button": ToolbarButton,
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

    this.editorApplication = new BlocklyApplication(this.readonly, this.selectedBlocks);
    this.editorApplication.load(this.state);
    this.editorApplication.addEventListener("CHANGE", this.handleChange.bind(this));
    this.editorApplication.addEventListener("PROMPT", this.handlePrompt.bind(this));
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
    this.editorApplication.disconnect();
  }

  public render(): TemplateResult {
    return html`
        <sl-dialog id="new-variable-dialog">
            <sl-input autofocus placeholder=""></sl-input>
            <sl-button slot="footer" variant="primary">Save</sl-button>
        </sl-dialog>
    `;
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    let shouldUpdate = false;
    if (changedProperties.has("readonly")) {
      shouldUpdate = true;
    }
    if (changedProperties.get("selectedBlocks")) {
      this.editorApplication.updateToolbox(this.selectedBlocks);
    }

    return shouldUpdate;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.shadowRoot.appendChild(this.editorApplication.container);
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
  }

  private handleResize(): void {
    this.editorApplication.resize();
  }

  private handlePrompt(
    promptText: string,
    defaultText: string,
    callback: (newText: string) => void,
  ): void {
    Logger.log(this, promptText, defaultText, callback);
    this.newVariableDialog.label = promptText;
    const input = this.newVariableDialog.querySelector("sl-input");
    input.value = defaultText;
    const button = this.newVariableDialog.querySelector("sl-button");
    const clonedButton = button.cloneNode(true);
    clonedButton.addEventListener("click", () => {
      callback(input.value);
      this.newVariableDialog.hide().catch();
    });
    button.parentNode.replaceChild(clonedButton, button);
    this.newVariableDialog.show().catch();
  }

  private handleChange(): void {
    const changeEvent = new EditorChangeEvent(
      this.editorApplication.save(),
      this.editorApplication.readableCode,
      this.editorApplication.executableCode,
    );
    this.dispatchEvent(changeEvent);
  }
}

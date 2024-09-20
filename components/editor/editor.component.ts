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

  @property({ type: Boolean })
  public accessor readonly: boolean;

  @property({ type: Array })
  public accessor selectedBlocks: SelectedBlocks;

  @property({ type: Object })
  public accessor state: object;

  private resizeObserver: ResizeObserver;

  @query("#prompt")
  private accessor promptDialog!: SlDialog;

  @query("#confirm")
  private accessor confirmDialog!: SlDialog;

  @query("#alert")
  private accessor alertDialog!: SlDialog;

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
    this.editorApplication.addEventListener("CONFIRM", this.handleConfirm.bind(this));
    this.editorApplication.addEventListener("ALERT", this.handleAlert.bind(this));
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
    this.editorApplication.destroy();
  }

  public render(): TemplateResult {
    return html`
        <sl-dialog id="prompt" no-header>
            <span></span>
            <sl-input autofocus placeholder=""></sl-input>
            <sl-button slot="footer" @click="${() => this.promptDialog.hide()}">Cancel</sl-button>
            <sl-button slot="footer" variant="primary">Save</sl-button>
        </sl-dialog>
        <sl-dialog id="confirm" no-header>
            <span></span>
            <sl-button slot="footer">No</sl-button>
            <sl-button slot="footer" variant="primary">Yes</sl-button>
        </sl-dialog>
        <sl-dialog id="alert" no-header>
            <span></span>
            <sl-button slot="footer" variant="primary" @click=${() => this.alertDialog.hide()}>Ok</sl-button>
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
    const titleSpan = this.promptDialog.querySelector("span");
    titleSpan.textContent = promptText;

    const input = this.promptDialog.querySelector("sl-input");
    input.value = defaultText;
    const button = this.promptDialog.querySelector("sl-button[variant=primary]");
    const clonedButton = button.cloneNode(true);
    clonedButton.addEventListener("click", () => {
      try {
        callback(input.value);
      } catch (error) {
        Logger.log(this, error);
      }
      this.promptDialog.hide().catch();
    });
    button.parentNode.replaceChild(clonedButton, button);
    this.promptDialog.show().catch();
  }

  private handleConfirm(message: string, callback: (confirmed: boolean) => void): void {
    Logger.log(this, message, callback);
    const titleSpan = this.confirmDialog.querySelector("span");
    titleSpan.textContent = message;

    const noButton = this.confirmDialog.querySelector("sl-button");
    const clonedNoButton = noButton.cloneNode(true);
    clonedNoButton.addEventListener("click", () => {
      callback(false);
      this.confirmDialog.hide().catch();
    });
    noButton.parentNode.replaceChild(clonedNoButton, noButton);

    const yesButton = this.confirmDialog.querySelector("sl-button[variant=primary]");
    const clonedYesButton = yesButton.cloneNode(true);
    clonedYesButton.addEventListener("click", () => {
      try {
        callback(true);
      } catch (error) {
        Logger.log(this, error);
      }
      this.confirmDialog.hide().catch();
    });
    yesButton.parentNode.replaceChild(clonedYesButton, yesButton);
    this.confirmDialog.show().catch();
  }

  private handleAlert(message: string): void {
    Logger.log(this, message);
    const titleSpan = this.alertDialog.querySelector("span");
    titleSpan.textContent = message;

    this.alertDialog.show().catch();
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

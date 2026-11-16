import { property, query } from "lit/decorators.js";
import {
  CSSResult, html, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { widgetMsg } from "@webwriter/lit/localize";
import { PropertyValues } from "@lit/reactive-element";
import { styles } from "./editor.styles";
import { BlocklyApplication } from "./blockly/application";
import { SelectedBlocks } from "./blockly/toolbox/toolbox";
import { EditorChangeEvent } from "../model/events";
import { Toolbar } from "./toolbar";
import { ToolbarButton } from "./toolbar-button";

import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.component.js"
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js"
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"

export class Editor extends LitElementWw {
  public editorApplication: BlocklyApplication;
  private readonly msg = widgetMsg(this);

  /** The language of the widget, for Blockly's own translations. */
  @property({ type: String })
  public accessor locale = "";

  /** The language of the catalog that the widget shows. It changes after the catalog has arrived. */
  @property({ type: String })
  public accessor catalog = "";

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

  private dialogOpenedAt = 0;
  private loadingProgram = false;

  static scopedElements = {
    "webwriter-blocks-toolbar": Toolbar,
    "webwriter-blocks-toolbar-button": ToolbarButton,
    "sl-dialog": SlDialog,
    "sl-input": SlInput,
    "sl-button": SlButton,
  };

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
    this.editorApplication = new BlocklyApplication(this.readonly, this.selectedBlocks, this.msg, this.locale, this.catalog, this.registry);
    this.editorApplication.load(this.state);
    this.editorApplication.addEventListener("CHANGE", this.handleChange.bind(this));
    this.editorApplication.addEventListener("PROMPT", this.handlePrompt.bind(this));
    this.editorApplication.addEventListener("CONFIRM", this.handleConfirm.bind(this));
    this.editorApplication.addEventListener("ALERT", this.handleAlert.bind(this));
    if (this.hasUpdated) this.renderRoot.appendChild(this.editorApplication.container);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
    this.editorApplication.destroy();
  }

  public render(): TemplateResult {
    return html`
        <sl-dialog id="prompt" no-header @sl-request-close=${this.handleDialogRequestClose}>
            <span></span>
            <sl-input autofocus placeholder=""></sl-input>
            <sl-button slot="footer" @click="${() => this.promptDialog.hide()}">${this.msg("Cancel")}</sl-button>
            <sl-button slot="footer" variant="primary">${this.msg("Save")}</sl-button>
        </sl-dialog>
        <sl-dialog id="confirm" no-header>
            <span></span>
            <sl-button slot="footer">${this.msg("No")}</sl-button>
            <sl-button slot="footer" variant="primary">${this.msg("Yes")}</sl-button>
        </sl-dialog>
        <sl-dialog id="alert" no-header>
            <span></span>
            <sl-button slot="footer" variant="primary" @click=${() => this.alertDialog.hide()}>${this.msg("OK")}</sl-button>
        </sl-dialog>
    `;
  }

  protected shouldUpdate(changedProperties: PropertyValues): boolean {
    let shouldUpdate = this.editorApplication.setLocale(this.locale, this.catalog);
    if (changedProperties.has("readonly")) {
      shouldUpdate = true;
    }
    if (changedProperties.has("state") && this.state &&
        JSON.stringify(this.state) !== JSON.stringify(this.editorApplication.save())) {
      this.loadingProgram = true;
      try {
        this.editorApplication.load(this.state);
        this.handleChange();
      } finally {
        this.loadingProgram = false;
      }
    }
    if (changedProperties.has("selectedBlocks")) {
      this.editorApplication.updateToolbox(this.selectedBlocks);
    }

    return shouldUpdate;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.renderRoot.appendChild(this.editorApplication.container);
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
    const titleSpan = this.promptDialog.querySelector("span");
    const input = this.promptDialog.querySelector<SlInput>("sl-input");
    const button = this.promptDialog.querySelector("sl-button[variant=primary]");
    if (!titleSpan || !input || !button) return;
    titleSpan.textContent = promptText;
    input.value = defaultText;
    const clonedButton = button.cloneNode(true);
    clonedButton.addEventListener("click", () => {
      try {
        callback(input.value);
      } catch (error) {
        console.error(error);
      }
      this.promptDialog.hide().catch();
    });
    button.replaceWith(clonedButton);
    this.dialogOpenedAt = Date.now();
    this.promptDialog.show().catch();
  }

  private handleDialogRequestClose(event: CustomEvent): void {
    // Prevent dialog from closing by the same event that opened it
    // (affected change value pop-up on mobile devices)
    if (event.detail.source === "overlay" && Date.now() - this.dialogOpenedAt < 100) {
      event.preventDefault();
    }
  }

  private handleConfirm(message: string, callback: (confirmed: boolean) => void): void {
    const titleSpan = this.confirmDialog.querySelector("span");
    const noButton = this.confirmDialog.querySelector("sl-button");
    const yesButton = this.confirmDialog.querySelector("sl-button[variant=primary]");
    if (!titleSpan || !noButton || !yesButton) return;
    titleSpan.textContent = message;

    const clonedNoButton = noButton.cloneNode(true);
    clonedNoButton.addEventListener("click", () => {
      callback(false);
      this.confirmDialog.hide().catch();
    });
    noButton.replaceWith(clonedNoButton);

    const clonedYesButton = yesButton.cloneNode(true);
    clonedYesButton.addEventListener("click", () => {
      try {
        callback(true);
      } catch (error) {
        console.error(error);
      }
      this.confirmDialog.hide().catch();
    });
    yesButton.replaceWith(clonedYesButton);
    this.confirmDialog.show().catch();
  }

  private handleAlert(message: string): void {
    const titleSpan = this.alertDialog.querySelector("span");
    if (titleSpan) titleSpan.textContent = message;

    this.alertDialog.show().catch();
  }

  private handleChange(): void {
    const changeEvent = new EditorChangeEvent(
      this.editorApplication.save(),
      this.editorApplication.readableCode,
      this.editorApplication.executableCode,
    );
    this.dispatchEvent(this.loadingProgram ? new CustomEvent("programloaded", {detail: changeEvent.detail}) : changeEvent);
  }
}

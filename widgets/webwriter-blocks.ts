import {html, TemplateResult} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement} from "lit/decorators.js"
import {Workspace} from "./components/workspace";

import "@shoelace-style/shoelace/dist/themes/light.css";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.js";
@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  constructor() {
    super();
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
  }

  public static get scopedElements(): any {
    return {
      "sl-button": SlButton,
      "webwriter-blocks-workspace": Workspace
    }
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          background-color: white;
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
        }
      `
    ]
  }

  public get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  public render(): TemplateResult {
    return html`
      <div>
        <sl-button @click="${this._handleFullscreenClick}">
          F
        </sl-button>
      </div>
      <webwriter-blocks-workspace id="workspace"></webwriter-blocks-workspace>
    `
  }

  private _handleFullscreenClick() {
    if (this.isFullscreen) {
        this.ownerDocument.exitFullscreen();
    } else {
      try {
        this.requestFullscreen();
      } catch {
        console.error("Failed to enter fullscreen mode.");
      }
    }
  }
}
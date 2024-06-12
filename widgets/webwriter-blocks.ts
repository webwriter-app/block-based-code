import {
  css, CSSResult, html, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import { Workspace } from "./components/workspace";

import "@shoelace-style/shoelace/dist/themes/light.css";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @query("#workspace")
  private workspace!: Workspace;

  constructor() {
    super();
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
    this.addEventListener("fullscreenerror", console.log);
  }

  public static get scopedElements(): any {
    return {
      "sl-button": SlButton,
      "sl-split-panel": SlSplitPanel,
      "webwriter-blocks-workspace": Workspace,
    };
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
      `,
    ];
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
      <sl-split-panel style="--min: 150px; --max: calc(100% - 150px);" @sl-reposition="${this._handleSplitPanelResize}">
        <div slot="start">
          <webwriter-blocks-workspace id="workspace"></webwriter-blocks-workspace>
        </div>
        <div slot="end">
          
        </div>
      </sl-split-panel>
    `;
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

  private _handleSplitPanelResize() {
    this.workspace.resize();
  }
}

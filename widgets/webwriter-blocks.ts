import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import { Workspace } from "./components/workspace";
import { Logger } from "./utils";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { Canvas } from "./components/canvas";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @query("#workspace")
  private workspace!: Workspace;

  @query("#canvas")
  private canvas!: Canvas;

  constructor() {
    super();
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
  }

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-button": SlButton,
      "sl-split-panel": SlSplitPanel,
      "webwriter-blocks-workspace": Workspace,
      "webwriter-blocks-canvas": Canvas,
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
        <sl-button @click="${this.handleFullscreenClick}">
          F
        </sl-button>
      </div>
      <sl-split-panel style="--min: 150px; --max: calc(100% - 150px);" @sl-reposition="${this.handleSplitPanelResize}">
        <div slot="start">
          <webwriter-blocks-workspace id="workspace"></webwriter-blocks-workspace>
        </div>
        <div slot="end" style="min-width: 0">
          <webwriter-blocks-canvas id="canvas"></webwriter-blocks-canvas>
        </div>
      </sl-split-panel>
    `;
  }

  private handleFullscreenClick(): void {
    if (this.isFullscreen) {
      this.ownerDocument.exitFullscreen();
    } else {
      try {
        this.requestFullscreen();
      } catch {
        Logger.error("Failed to enter fullscreen mode.");
      }
    }
  }

  private handleSplitPanelResize(): void {
    this.workspace.resize();
    this.canvas.resize();
  }
}

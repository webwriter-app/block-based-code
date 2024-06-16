import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import GripVerticalIcon from "bootstrap-icons/icons/grip-vertical.svg";
import FullscreenIcon from "bootstrap-icons/icons/fullscreen.svg";
import FullscreenExitIcon from "bootstrap-icons/icons/fullscreen-exit.svg";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
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
      "sl-icon": SlIcon,
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
          display: block;
          width: 100%;
          height: auto;
          
          background-color: white;
          
          user-select: none;
        }
        
        .toolbar {
          margin-bottom: 4px;
        }
        
        .toolbar .icon-button::part(label) {
          padding: 0 12px;
        }
        
        .application {
          --min: 150px;
          --max: calc(100% - 150px);
          --divider-width: 16px;
          
          outline: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          
          overflow: hidden;
        }
        
        .application > div {
          min-width: 0;
          min-height: 0;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
      <div class="toolbar">
        <sl-button class="icon-button" @click="${this.handleFullscreenClick.bind(this)}" style="">
          <sl-icon src="${this.isFullscreen ? FullscreenExitIcon : FullscreenIcon}"></sl-icon>
        </sl-button>
      </div>
      <sl-split-panel class="application" @sl-reposition="${this.handleSplitPanelResize}">
        <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
        <div slot="start">
          <webwriter-blocks-workspace id="workspace"></webwriter-blocks-workspace>
        </div>
        <div slot="end">
          <webwriter-blocks-canvas id="canvas"></webwriter-blocks-canvas>
        </div>
      </sl-split-panel>
    `;
  }

  private get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  private handleFullscreenClick(event: Event): void {
    event.preventDefault();
    if (this.isFullscreen) {
      this.ownerDocument.exitFullscreen();
    } else {
      try {
        this.requestFullscreen();
      } catch (error) {
        Logger.error("Failed to enter fullscreen mode.");
        Logger.log(error);
      }
    }
  }

  private handleSplitPanelResize(): void {
    this.workspace.resize();
    this.canvas.resize();
  }
}

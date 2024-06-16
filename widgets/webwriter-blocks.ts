import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js";
import GripVerticalIcon from "bootstrap-icons/icons/grip-vertical.svg";
import FullscreenIcon from "bootstrap-icons/icons/fullscreen.svg";
import FullscreenExitIcon from "bootstrap-icons/icons/fullscreen-exit.svg";
import PlayIcon from "bootstrap-icons/icons/play.svg";
import StopIcon from "bootstrap-icons/icons/stop.svg";
import { Workspace } from "./components/workspace";
import { Logger } from "./utils";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { Canvas } from "./components/canvas";
import { Options } from "./components/options";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js";

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
      "sl-checkbox": SlCheckbox,
      "sl-icon": SlIcon,
      "sl-icon-button": SlIconButton,
      "sl-split-panel": SlSplitPanel,
      "sl-tooltip": SlTooltip,
      "webwriter-blocks-workspace": Workspace,
      "webwriter-blocks-canvas": Canvas,
      "webwriter-blocks-options": Options,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: block;

          user-select: none;

          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }

        :host * {
          user-select: none;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          
          padding: 8px 12px;
        }
        
        .toolbar .actions {
          display: flex;
          
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }
        
        .toolbar .actions sl-icon-button::part(base) {
          border-radius: 0;
        }
        
        .toolbar .actions sl-tooltip:not(:first-child) sl-icon-button::part(base) {
          border-left: 1px solid var(--sl-color-gray-300);
        }

        .application {
          --min: 150px;
          --max: calc(100% - 150px);
          --divider-width: 16px;
          
          height: 500px;

          border-top: 1px solid var(--sl-color-gray-300);
        }

        .application > div {
          min-width: 0;
          min-height: 0;
        }
        
        .application::part(divider) {
          background-color: var(--sl-color-gray-100);
          color: var(--sl-color-gray-500);
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
      <div class="toolbar">
        <sl-icon-button src="${this.isFullscreen ? FullscreenExitIcon : FullscreenIcon}"> @click="${this.handleFullscreenClick.bind(this)}"></sl-icon-button>
        <div class="actions">
          <sl-tooltip content="Stop Execution">
            <sl-icon-button src="${StopIcon}" label="Stop Execution"></sl-icon-button>
          </sl-tooltip>
          <sl-tooltip content="Start Execution">
            <sl-icon-button src="${PlayIcon}" label="Start Execution"></sl-icon-button>
          </sl-tooltip>
        </div>
      </div>
      <sl-split-panel class="application" position="66" @sl-reposition="${this.handleSplitPanelResize}">
        <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
        <div slot="start">
          <webwriter-blocks-workspace id="workspace"></webwriter-blocks-workspace>
        </div>
        <div slot="end">
          <webwriter-blocks-canvas id="canvas"></webwriter-blocks-canvas>
        </div>
      </sl-split-panel>
      <webwriter-blocks-options part="options"></webwriter-blocks-options>
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

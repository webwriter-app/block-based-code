import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
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
import { msg, setLocale } from "./locales";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @query("#workspace")
  private workspace!: Workspace;

  @query("#canvas")
  private canvas!: Canvas;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-checkbox": SlCheckbox,
      "sl-icon": SlIcon,
      "sl-button": SlButton,
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
        
        .toolbar sl-button::part(label) {
          padding: 0 11px;
          font-size: 16px;
        }

        .toolbar sl-button::part(base) {
          border-color: transparent;
          border-radius: 0;
        }

        .toolbar sl-tooltip:not(:first-child) sl-button {
          border-left: 1px solid var(--sl-color-gray-300);
        }
        
        .toolbar .actions {
          display: flex;
          
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
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

  constructor() {
    super();
    setLocale(this.ownerDocument.documentElement.lang);
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
  }

  public render(): TemplateResult {
    return html`
      <div class="toolbar">
        <div class="actions">
          <sl-tooltip content="${msg(this.isFullscreen ? "fullscreenExit" : "fullscreen")}">
            <sl-button @click="${this.handleFullscreenClick}">
              <sl-icon src="${this.isFullscreen ? FullscreenExitIcon : FullscreenIcon}"></sl-icon>
            </sl-button>
          <sl-tooltip>
        </div>
        <div class="actions">
          <sl-tooltip content="${msg("stop")}">
            <sl-button>
                <sl-icon src="${StopIcon}" label="Stop Execution"></sl-icon>
            </sl-button>
          </sl-tooltip>
          <sl-tooltip content="${msg("start")}">
            <sl-button>
                <sl-icon src="${PlayIcon}" label="Start Execution"></sl-icon>
            </sl-button>
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

  private handleFullscreenClick(): void {
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

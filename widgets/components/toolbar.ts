import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import StopIcon from "bootstrap-icons/icons/stop.svg";
import PlayIcon from "bootstrap-icons/icons/play.svg";
import FullscreenIcon from "bootstrap-icons/icons/fullscreen.svg";
import FullscreenExitIcon from "bootstrap-icons/icons/fullscreen-exit.svg";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js";
import { Logger } from "../utils";
import { msg } from "../locales";

@customElement("webwriter-blocks-toolbar")
export class Toolbar extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-icon": SlIcon,
      "sl-button": SlButton,
      "sl-split-panel": SlSplitPanel,
      "sl-tooltip": SlTooltip,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
    
          padding: 8px 12px;

          border-bottom: 1px solid var(--sl-color-gray-300);
        }
        
        sl-button::part(label) {
          padding: 0 11px;
          font-size: 16px;
        }
        
        sl-button::part(base) {
          border-color: transparent;
          border-radius: 0;
        }
        
        sl-tooltip:not(:first-child) sl-button {
          border-left: 1px solid var(--sl-color-gray-300);
        }
        
        .actions {
          display: flex;
        
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
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
}

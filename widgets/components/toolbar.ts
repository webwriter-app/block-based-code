import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
import PlayerStopIcon from "@tabler/icons/outline/player-stop.svg";
import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { Logger } from "../utils";
import { msg } from "../locales";

@customElement("webwriter-blocks-toolbar")
export class Toolbar extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-icon": SlIcon,
      "sl-button": SlButton,
      "sl-tooltip": SlTooltip,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
    
          padding: 8px;

          border-bottom: 1px solid var(--sl-color-gray-300);
        }

        div.actions {
          display: flex;

          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }

        sl-tooltip:not(:first-child) sl-button {
          border-left: 1px solid var(--sl-color-gray-300);
        }
        
        sl-button {
          display: flex;
          align-content: center;
          justify-content: center;
          
        }
        
        sl-button::part(base) {
          min-height: unset;
          
          padding-inline-start: 0;
          padding: 6px;
          
          border: none;
          border-radius: 0;
          box-sizing: border-box;
        }

        sl-button#stop::part(base) {
          background-color: var(--sl-color-danger-50);
          color: var(--sl-color-danger-500);
        }

        sl-button#play::part(base) {
          background-color: var(--sl-color-success-50);
          color: var(--sl-color-success-500);
        }
        
        sl-button::part(label) {
          padding: 0;
          line-height: 1;
        }
        
        sl-icon {
          font-size: 18px;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
      <div class="actions">
        <sl-tooltip content="${msg(this.isFullscreen ? "fullscreenExit" : "fullscreen")}">
          <sl-button @click="${this.handleFullscreenClick}">
            <sl-icon src="${this.isFullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}"></sl-icon>
          </sl-button>
        <sl-tooltip>
      </div>
      <div class="actions">
        <sl-tooltip content="${msg("stop")}">
          <sl-button id="stop">
              <sl-icon src="${PlayerStopIcon}" label="Stop Execution"></sl-icon>
          </sl-button>
        </sl-tooltip>
        <sl-tooltip content="${msg("start")}">
          <sl-button id="play">
              <sl-icon src="${PlayerPlayIcon}" label="Start Execution"></sl-icon>
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

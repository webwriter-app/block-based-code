import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
import PlayerStopIcon from "@tabler/icons/outline/player-stop.svg";
import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { Logger } from "../../utils";
import { msg } from "../../locales";
import { styles } from "./styles";

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
      styles,
    ];
  }

  public render(): TemplateResult {
    return html`
      <div class="actions">
        <sl-tooltip content="${msg(this.isFullscreen ? "fullscreenExit" : "fullscreen")}">
          <sl-button variant="text" @click="${this.handleFullscreenClick}">
            <sl-icon src="${this.isFullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}"></sl-icon>
          </sl-button>
        <sl-tooltip>
      </div>
      <div class="actions">
        <sl-tooltip content="${msg("stop")}">
          <sl-button id="stop" variant="text">
              <sl-icon src="${PlayerStopIcon}" label="Stop Execution"></sl-icon>
          </sl-button>
        </sl-tooltip>
        <sl-tooltip content="${msg("start")}">
          <sl-button id="play" variant="text">
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

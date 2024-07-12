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
import { consume } from "@lit/context";
import { msg } from "../../locales";
import { styles } from "./toolbar.styles";
import { fullscreenContext } from "../../context";

@customElement("webwriter-blocks-toolbar")
export class Toolbar extends LitElementWw {
  @consume({ context: fullscreenContext, subscribe: true })
  private fullscreen?: boolean;

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
        <sl-tooltip content="${msg(this.fullscreen ? "FULLSCREEN_EXIT" : "FULLSCREEN")}">
          <sl-button variant="text" @click="${this.handleFullscreenToggle}">
            <sl-icon src="${this.fullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}"></sl-icon>
          </sl-button>
        <sl-tooltip>
      </div>
      <div class="actions">
        <sl-tooltip content="${msg("STOP")}">
          <sl-button id="stop" variant="text" @click="${this.handleStopClick}">
              <sl-icon src="${PlayerStopIcon}" label="Stop Execution"></sl-icon>
          </sl-button>
        </sl-tooltip>
        <sl-tooltip content="${msg("START")}">
          <sl-button id="play" variant="text" @click="${this.handleStartClick}">
              <sl-icon src="${PlayerPlayIcon}" label="Start Execution"></sl-icon>
          </sl-button>
        </sl-tooltip>
      </div>
    `;
  }

  private handleFullscreenToggle(): void {
    const event = new CustomEvent("fullscreentoggle", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleStartClick(): void {
    const event = new CustomEvent("start", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleStopClick(): void {
    const event = new CustomEvent("stop", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

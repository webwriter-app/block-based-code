import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import { consume } from "@lit/context";
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
        <slot></slot>
    `;
  }

  private handleFullscreenToggle(): void {
    const event = new CustomEvent("fullscreentoggle", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

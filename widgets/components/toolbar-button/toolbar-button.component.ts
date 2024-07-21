import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import { styles } from "./toolbar-button.styles";

@customElement("webwriter-blocks-toolbar-button")
export class ToolbarButton extends LitElementWw {
  @property({ type: String })
  public label: string;

  @property({ type: String })
  public icon: string;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-tooltip": SlTooltip,
      "sl-button": SlButton,
      "sl-icon": SlIcon,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public render(): TemplateResult {
    return html`
        <sl-tooltip content=${this.label}>
            <sl-button part="button" variant="text">
                <sl-icon part="icon" src=${this.icon}></sl-icon>
            </sl-button>
        </sl-tooltip>
    `;
  }
}

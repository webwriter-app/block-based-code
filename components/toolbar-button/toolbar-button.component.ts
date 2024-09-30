import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { styles } from "./toolbar-button.styles";

import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js"
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js"

/**
 * The toolbar button component.
 */
@customElement("webwriter-blocks-toolbar-button")
export class ToolbarButton extends LitElementWw {
  /**
   * The id of the button.
   */
  @property({ type: String })
  public accessor id: string;

  /**
   * The label of the button.
   */
  @property({ type: String })
  public accessor label: string;

  /**
   * The icon of the button.
   */
  @property({ type: String })
  public accessor icon: string;

  /**
   * Whether the button is disabled.
   */
  @property({ type: Boolean })
  public accessor disabled: boolean;

  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-tooltip": SlTooltip,
      "sl-button": SlButton,
      "sl-icon": SlIcon,
    };
  }

  /**
   * @inheritDoc
   */
  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  /**
   * @inheritDoc
   */
  public render(): TemplateResult {
    return html`
        <sl-tooltip content=${this.label}>
            <sl-button id=${this.id} part="button" variant="text" .disabled=${this.disabled}>
                <sl-icon part="icon" src=${this.icon}></sl-icon>
            </sl-button>
        </sl-tooltip>
    `;
  }
}

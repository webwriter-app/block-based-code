import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import { styles } from "./toolbar-button.styles";

/**
 * The toolbar button component.
 */
@customElement("webwriter-blocks-toolbar-button")
export class ToolbarButton extends LitElementWw {
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
            <sl-button part="button" variant="text" .disabled=${this.disabled}>
                <sl-icon part="icon" src=${this.icon}></sl-icon>
            </sl-button>
        </sl-tooltip>
    `;
  }
}

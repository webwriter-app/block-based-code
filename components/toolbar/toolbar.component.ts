import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlButton, SlIcon, SlTooltip } from "@shoelace-style/shoelace";
import { styles } from "./toolbar.styles";

/**
 * The toolbar component.
 */
@customElement("webwriter-blocks-toolbar")
export class Toolbar extends LitElementWw {
  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-icon": SlIcon,
      "sl-button": SlButton,
      "sl-tooltip": SlTooltip,
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
        <slot></slot>
    `;
  }
}

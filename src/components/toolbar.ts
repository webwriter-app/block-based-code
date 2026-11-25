import {
  CSSResult, html, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { styles } from "./toolbar.styles";

import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js"
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js"

/**
 * The toolbar component.
 */
export class Toolbar extends LitElementWw {
  static scopedElements = {
    "sl-icon": SlIcon,
    "sl-button": SlButton,
    "sl-tooltip": SlTooltip,
  };

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

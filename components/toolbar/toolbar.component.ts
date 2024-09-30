import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { styles } from "./toolbar.styles";

import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js"
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js"

/**
 * The toolbar component.
 */
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

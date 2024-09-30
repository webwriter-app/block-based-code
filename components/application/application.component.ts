import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { styles } from "./application.styles";

import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js"
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.component.js"

/**
 * The application component.
 */
export class Application extends LitElementWw {
  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-split-panel": SlSplitPanel,
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
        <sl-split-panel position="33" primary="end">
            <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
            <div class="panel" slot="start">
                <slot name="editor"></slot>
            </div>
            <div class="panel" slot="end">
                <slot name="stage"></slot>
            </div>
        </sl-split-panel>
    `;
  }
}

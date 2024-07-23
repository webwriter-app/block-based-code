import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlIcon, SlSplitPanel } from "@shoelace-style/shoelace";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { styles } from "./application.styles";

@customElement("webwriter-blocks-application")
export class Application extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-split-panel": SlSplitPanel,
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

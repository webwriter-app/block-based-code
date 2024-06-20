import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlIcon, SlSplitPanel } from "@shoelace-style/shoelace";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { Stage } from "../stage";
import { styles } from "./application.styles";

@customElement("webwriter-blocks-application")
export class Application extends LitElementWw {
  @query("#stage")
  private stage!: Stage;

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
        <sl-split-panel position="66" primary="start">
            <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
            <slot name="editor" slot="start"></slot>
            <slot name="stage" slot="end" id="stage"></slot>
        </sl-split-panel>
    `;
  }
}

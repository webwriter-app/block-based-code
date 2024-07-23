import { customElement, state } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlIcon, SlSplitPanel } from "@shoelace-style/shoelace";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { consume } from "@lit/context";
import { styleMap } from "lit/directives/style-map.js";
import { styles } from "./application.styles";
import { fullscreenContext } from "../../context";

@customElement("webwriter-blocks-application")
export class Application extends LitElementWw {
  @consume({ context: fullscreenContext, subscribe: true })
  @state()
  private fullscreen?: boolean;

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
        <sl-split-panel position="66" primary="start" style=${styleMap({ height: this.fullscreen ? "100%" : "500px" })}>
            <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
            <slot name="editor" slot="start"></slot>
            <slot name="stage" slot="end"></slot>
        </sl-split-panel>
    `;
  }
}

import {
  CSSResult, html, TemplateResult,
} from "lit";
import { state } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import GripHorizontalIcon from "@tabler/icons/outline/grip-horizontal.svg";
import { styles } from "./application.styles";

import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js"
import SlSplitPanel from "@shoelace-style/shoelace/dist/components/split-panel/split-panel.component.js"

/**
 * The application component.
 */
export class Application extends LitElementWw {
  static scopedElements = {
    "sl-split-panel": SlSplitPanel,
    "sl-icon": SlIcon,
  };

  /** Whether the editor and the stage are stacked because the width is narrow. */
  @state()
  private accessor stacked = false;

  private readonly resizeObserver = new ResizeObserver((entries) => {
    const width = entries.at(-1)?.contentRect.width ?? 0;
    if (width > 0) this.stacked = width < Application.stackedBelow;
  });

  /** The width in pixels below which the editor and the stage are stacked. */
  private static readonly stackedBelow = 560;

  public connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  public disconnectedCallback() {
    this.resizeObserver.disconnect();
    super.disconnectedCallback();
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
        <sl-split-panel position=${this.stacked ? 50 : 33} primary="end" ?vertical=${this.stacked}>
            <sl-icon slot="divider" src=${this.stacked ? GripHorizontalIcon : GripVerticalIcon}></sl-icon>
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

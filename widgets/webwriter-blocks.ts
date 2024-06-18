import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query } from "lit/decorators.js";
import { SlIcon, SlSplitPanel } from "@shoelace-style/shoelace";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { Editor } from "./components/editor";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { Stage } from "./components/stage";
import { Options } from "./components/options";
import { setLocale } from "./locales";
import { Toolbar } from "./components/toolbar";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @query("#editor")
  private editor!: Editor;

  @query("#stage")
  private stage!: Stage;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-split-panel": SlSplitPanel,
      "sl-icon": SlIcon,
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
      "webwriter-blocks-options": Options,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: block;

          user-select: none;

          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }

        :host * {
          user-select: none;
        }

        .application {
          --min: 150px;
          --max: calc(100% - 150px);
          --divider-width: 16px;
          
          height: 500px;
        }

        .application > div {
          min-width: 0;
          min-height: 0;
        }
        
        .application::part(divider) {
          background-color: var(--sl-color-gray-100);
          color: var(--sl-color-gray-500);
        }
      `,
    ];
  }

  public static get shadowRootOptions(): ShadowRootInit {
    return {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  constructor() {
    super();
    setLocale(this.ownerDocument.documentElement.lang);
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
  }

  public render(): TemplateResult {
    return html`
      <webwriter-blocks-toolbar></webwriter-blocks-toolbar>
      <sl-split-panel class="application" position="66" @sl-reposition="${this.handleSplitPanelResize}">
        <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
        <div slot="start">
          <webwriter-blocks-editor id="editor"></webwriter-blocks-editor>
        </div>
        <div slot="end">
          <webwriter-blocks-stage id="stage"></webwriter-blocks-stage>
        </div>
      </sl-split-panel>
      <webwriter-blocks-options part="options"></webwriter-blocks-options>
    `;
  }

  private handleSplitPanelResize(): void {
    this.editor.resize();
    this.stage.resize();
  }
}

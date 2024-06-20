import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import {
  Application, Editor, Options, Stage, Toolbar,
} from "./components";
import { setLocale } from "./locales";
import "@shoelace-style/shoelace/dist/themes/light.css";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-options": Options,
      "webwriter-blocks-application": Application,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
          :host {
              display: flex !important;
              flex-direction: column;
              gap: 8px;
              
              padding: 8px;

              user-select: none;


              box-sizing: border-box;
              border: 1px solid var(--sl-color-gray-300);
              border-radius: var(--sl-border-radius-medium);
              overflow: hidden;

              background-color: var(--sl-color-gray-50);
          }

          :host * {
              user-select: none;
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
        <webwriter-blocks-options part="options"></webwriter-blocks-options>
        <webwriter-blocks-toolbar></webwriter-blocks-toolbar>
        <webwriter-blocks-application id="application">
            <webwriter-blocks-editor slot="editor"></webwriter-blocks-editor>
            <webwriter-blocks-stage slot="stage"></webwriter-blocks-stage>
        </webwriter-blocks-application>
    `;
  }
}

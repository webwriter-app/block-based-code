import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import { Application, Options, Toolbar } from "./components";
import { setLocale } from "./locales";
import "@shoelace-style/shoelace/dist/themes/light.css";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-options": Options,
      "webwriter-blocks-application": Application,
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
        <webwriter-blocks-application id="application"></webwriter-blocks-application>
    `;
  }
}

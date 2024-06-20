import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, state } from "lit/decorators.js";
import {
  Application, Editor, Options, Stage, Toolbar,
} from "./components";
import { setLocale } from "./locales";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { provide } from "@lit/context";
import { fullscreenContext } from "./context/fullscreen.context";
import { Logger } from "./utils";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @provide({ context: fullscreenContext })
  @state()
  private fullscreen: boolean;

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

    this.fullscreen = false;
  }

  public connectedCallback() {
    super.connectedCallback();

    this.addEventListener("fullscreenchange", () => this.handleFullscreenChange());
  }

  public render(): TemplateResult {
    return html`
        <webwriter-blocks-options part="options"></webwriter-blocks-options>
        <webwriter-blocks-toolbar @fullscreentoggle="${this.handleFullscreenToggle}"></webwriter-blocks-toolbar>
        <webwriter-blocks-application id="application">
            <webwriter-blocks-editor slot="editor"></webwriter-blocks-editor>
            <webwriter-blocks-stage slot="stage"></webwriter-blocks-stage>
        </webwriter-blocks-application>
    `;
  }

  private get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  private handleFullscreenChange(): void {
    this.fullscreen = this.isFullscreen;
  }

  private handleFullscreenToggle(): void {
    if (this.isFullscreen) {
      this.ownerDocument.exitFullscreen();
    } else {
      try {
        this.requestFullscreen();
      } catch (error) {
        Logger.error("Failed to enter fullscreen mode.");
        Logger.log(error);
      }
    }
  }
}

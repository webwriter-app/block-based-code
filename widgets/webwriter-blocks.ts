import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw, option } from "@webwriter/lit";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import { PropertyValues } from "@lit/reactive-element";
import {
  Application, Editor, Stage, Toolbar,
} from "./components";
import { setLocale } from "./locales";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { provide } from "@lit/context";
import { fullscreenContext, settingsContext } from "./context";
import { Logger } from "./utils";
import type { Settings } from "./types";
import { IStage } from "./types/stage";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @property({ type: Boolean, attribute: true, reflect: true })
  @option({ type: "boolean", label: { en: "Readonly", de: "Schreibgeschützt" } })
  public readonly: boolean = false;

  @provide({ context: fullscreenContext })
  @state()
  private fullscreen: boolean = false;

  @query("#stage")
  private stage!: IStage;

  @provide({ context: settingsContext })
  private settings: Settings;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-application": Application,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
          :host {
              position: unset !important;
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
    this.settings = {
      contentEditable: this.contentEditable === "true" || this.contentEditable === "",
      readonly: this.readonly,
    };
  }

  public connectedCallback() {
    super.connectedCallback();

    this.addEventListener("fullscreenchange", () => this.handleFullscreenChange());
  }

  public render(): TemplateResult {
    return html`
        <webwriter-blocks-toolbar @fullscreentoggle="${this.handleFullscreenToggle}" @start="${this.handleStart}" @stop="${this.handleStop}"></webwriter-blocks-toolbar>
        <webwriter-blocks-application id="application">
            <webwriter-blocks-editor slot="editor"></webwriter-blocks-editor>
            <webwriter-blocks-stage slot="stage" id="stage"></webwriter-blocks-stage>
        </webwriter-blocks-application>
    `;
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    const settings: Partial<Settings> = {};
    if (changedProperties.has("readonly")) {
      settings.readonly = this.readonly;
    }
    if (changedProperties.has("contentEditable")) {
      settings.contentEditable = this.contentEditable === "true" || this.contentEditable === "";
    }
    this.settings = {
      ...this.settings,
      ...settings,
    };
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
        console.dir(this);
      }
    }
  }

  private handleStart(): void {
    if (this.stage) {
      this.stage.start();
    }
  }

  private handleStop(): void {
    if (this.stage) {
      this.stage.stop();
    }
  }
}

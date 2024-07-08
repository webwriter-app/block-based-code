import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw, option } from "@webwriter/lit";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import { provide } from "@lit/context";
import {
  Application, Editor, Options, Stage, Toolbar,
} from "./components";
import { setLocale } from "./locales";
import { fullscreenContext } from "./context";
import { Logger } from "./utils";
import { IStage, StageType } from "./types";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { EditorChangeEvent, OptionsChangeEvent } from "./types/events";
import { SelectedBlocks } from "./lib/blockly";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @property({ type: Boolean, reflect: true })
  @option({ type: "boolean", label: { en: "Readonly", de: "Schreibgeschützt" } })
  public readonly: boolean = false;

  @property({ type: String, reflect: true })
  public stageType: StageType = StageType.CANVAS;

  @property({ type: Array, reflect: true })
  public selectedBlocks: SelectedBlocks = [];

  @property({ type: String, reflect: true })
  public editorState: string = "{}";

  @provide({ context: fullscreenContext })
  @state()
  private fullscreen: boolean = false;

  @query("#editor")
  private editor!: Editor;

  @query("#stage")
  private stage!: IStage;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-application": Application,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
      "webwriter-blocks-options": Options,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
          :host {
              display: flex !important;
              flex-direction: column;
              gap: var(--sl-spacing-x-small);
              
              padding: var(--sl-spacing-x-small);

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
    const styleElement = this.ownerDocument.createElement("style");
    styleElement.textContent = ".sl-scroll-lock {--sl-scroll-lock-size: 0!important; overflow-x: hidden!important; overflow-y: scroll!important}";
    this.ownerDocument.head.appendChild(styleElement);
  }

  public render(): TemplateResult {
    return html`
        <webwriter-blocks-toolbar @fullscreentoggle=${this.handleFullscreenToggle}
                                  @start=${this.handleStart}
                                  @stop=${this.handleStop}>
        </webwriter-blocks-toolbar>
        <webwriter-blocks-application id="application">
            <webwriter-blocks-editor slot="editor"
                                     id="editor"
                                     initialState=${this.editorState}
                                     .selectedBlocks=${this.selectedBlocks}
                                     .readonly=${this.readonly && !(this.contentEditable === "true" || this.contentEditable === "")}
                                     @change=${this.handleEditorChange}>
            </webwriter-blocks-editor>
            <webwriter-blocks-stage slot="stage" id="stage"></webwriter-blocks-stage>
        </webwriter-blocks-application>
        <webwriter-blocks-options part="options"
                                  stageType=${this.stageType}
                                  .selectedBlocks=${this.selectedBlocks}
                                  @change=${this.handleOptionsChange}>
        </webwriter-blocks-options>
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

  private handleEditorChange(event: EditorChangeEvent): void {
    console.log(event.detail.workspace);
    this.editorState = event.detail.workspace;
  }

  private handleOptionsChange(event: OptionsChangeEvent): void {
    const options = event.detail;

    if (options.selectedBlocks) {
      this.selectedBlocks = options.selectedBlocks;
    }
    if (options.stageType) {
      this.stageType = options.stageType;
    }
  }
}

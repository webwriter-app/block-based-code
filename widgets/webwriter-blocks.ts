import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
import { styleMap } from "lit/directives/style-map.js";
import {
  Application, Editor, Options, Stage, Toolbar,
} from "../components";
import { msg, setLocale } from "../locales";
import { Logger } from "../utils";
import {
  CodeHighlightingEvent, EditorChangeEvent, OptionsChangeEvent, StageType,
} from "../types";
import { BlockTypes, SelectedBlocks } from "../lib/blockly";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { ToolbarButton } from "../components/toolbar-button";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @property({ type: Number, reflect: true })
  public readonly: 0 | 1 = 0;

  @property({ type: String, reflect: true })
  public stageType: StageType = StageType.CANVAS;

  @property({ type: Array, reflect: true })
  public selectedBlocks: SelectedBlocks = ["events:when_start_clicked"];

  @property({ type: Object, reflect: true })
  public editorState: object = {};

  @state()
  private availableBlocks: BlockTypes[] = [];

  @state()
  private readableCode: string = "";

  @state()
  private executableCode: string = "";

  @query("#editor")
  private editor!: Editor;

  @query("#stage")
  private stage!: Stage;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-toolbar-button": ToolbarButton,
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
  }

  public connectedCallback() {
    super.connectedCallback();

    this.addEventListener("fullscreenchange", () => this.requestUpdate());
    const styleElement = this.ownerDocument.createElement("style");
    styleElement.textContent = ".sl-scroll-lock {--sl-scroll-lock-size: 0!important; overflow-x: hidden!important; overflow-y: scroll!important}";
    this.ownerDocument.head.appendChild(styleElement);
  }

  public render(): TemplateResult {
    return html`
        <webwriter-blocks-application id="application" style=${styleMap({ height: this.isFullscreen ? "100%" : "500px" })}>
            <webwriter-blocks-toolbar slot="editor">
                <div>
                    <webwriter-blocks-toolbar-button icon=${this.isFullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}
                                                     label=${this.isFullscreen ? msg("FULLSCREEN_EXIT") : msg("FULLSCREEN")}
                                                     @click=${this.handleFullscreenToggle}></webwriter-blocks-toolbar-button>
                </div>
            </webwriter-blocks-toolbar>
            <webwriter-blocks-editor slot="editor"
                                     id="editor"
                                     .state=${this.editorState}
                                     .selectedBlocks=${this.selectedBlocks}
                                     .readonly=${this.readonly === 1 && !(this.contentEditable === "true" || this.contentEditable === "")}
                                     @change=${this.handleEditorChange}>
            </webwriter-blocks-editor>
            
            <webwriter-blocks-stage slot="stage"
                                    id="stage"
                                    stageType=${this.stageType}
                                    readableCode=${this.readableCode}
                                    executableCode=${this.executableCode}
                                    @highlight=${this.handleCodeHighlighting}>
            </webwriter-blocks-stage>
        </webwriter-blocks-application>
        ${!this.isFullscreen && (this.contentEditable === "true" || this.contentEditable === "") ? html`
            <webwriter-blocks-options part="options"
                                      readonly=${this.readonly}
                                      stageType=${this.stageType}
                                      .availableBlocks=${this.availableBlocks}
                                      .selectedBlocks=${this.selectedBlocks}
                                      @change=${this.handleOptionsChange}>
        ` : null}
        </webwriter-blocks-options>
    `;
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);

    this.setBlocks();
  }

  private get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  private handleFullscreenToggle(): void {
    if (this.isFullscreen) {
      this.ownerDocument.exitFullscreen();
    } else {
      try {
        this.requestFullscreen();
      } catch (error) {
        Logger.error("Failed to enter fullscreen mode.");
        Logger.log(this, error);
      }
    }
  }

  private handleEditorChange(event: EditorChangeEvent): void {
    this.editorState = event.detail.state;
    this.readableCode = event.detail.readableCode;
    this.executableCode = event.detail.executableCode;
  }

  private handleCodeHighlighting(event: CodeHighlightingEvent): void {
    this.editor.editorApplication.highlight(event.detail);
  }

  private async handleOptionsChange(event: OptionsChangeEvent): Promise<void> {
    const options = event.detail;

    if (options.selectedBlocks) {
      this.selectedBlocks = options.selectedBlocks;
    }
    if (options.stageType) {
      this.stageType = options.stageType;
      await this.updateComplete;

      this.setBlocks();
    }
    if (options.readonly !== undefined) {
      this.readonly = options.readonly;
    }
  }

  private setBlocks(): void {
    const { usableBlocks } = this.stage.stageApplication;
    this.availableBlocks = usableBlocks;
    this.selectedBlocks = [...usableBlocks];
  }
}

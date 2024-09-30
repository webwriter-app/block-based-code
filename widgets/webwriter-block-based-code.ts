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
import { Help } from "../components/help";

/**
 * The main component of the Blocks widget.
 */
@customElement("webwriter-block-based-code")
export class WebwriterBlocks extends LitElementWw {
  /**
   * Whether the widget is in read-only mode, only effective when contentEditable is false.
   */
  @property({ type: Number, reflect: true })
  public accessor readonly: 0 | 1 = 0;

  /**
   * The selected stage type.
   */
  @property({ type: String, reflect: true })
  public accessor stageType: StageType = StageType.CANVAS;

  /**
   * The usable blocks. Only blocks in this list can be used in the editor.
   */
  @property({ type: Array, reflect: true })
  public accessor usableBlocks: SelectedBlocks = ["events:when_start_clicked"];

  /**
   * The editor state.
   */
  @property({ type: Object, reflect: true })
  public accessor editorState: object = {};

  /**
   * The available blocks. These are all blocks that can be understood by the stage.
   * @private
   */
  @state()
  private accessor availableBlocks: BlockTypes[] = [];

  /**
   * The readable generated code.
   * @private
   */
  @state()
  private accessor readableCode: string = "";

  /**
   * The executable generated code.
   * @private
   */
  @state()
  private accessor executableCode: string = "";

  /**
   * The editor element.
   * @private
   */
  @query("#editor")
  private accessor editor!: Editor;

  /**
   * The stage element.
   * @private
   */
  @query("#stage")
  private accessor stage!: Stage;

  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "webwriter-blocks-toolbar": Toolbar,
      "webwriter-blocks-toolbar-button": ToolbarButton,
      "webwriter-blocks-application": Application,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
      "webwriter-blocks-options": Options,
      "webwriter-blocks-help": Help,
    };
  }

  /**
   * @inheritDoc
   */
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
          };
      `,
    ];
  }

  /**
   * @inheritDoc
   */
  public static get shadowRootOptions(): ShadowRootInit {
    return {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  /**
   * @inheritDoc
   */
  public connectedCallback() {
    super.connectedCallback();
    setLocale(document.documentElement.lang?.split("-")[0] || navigator.language?.split("-")[0]);
    this.addEventListener("fullscreenchange", () => this.requestUpdate());
    const styleElement = this.ownerDocument.createElement("style");
    styleElement.textContent = ".sl-scroll-lock {--sl-scroll-lock-size: 0!important; overflow-x: hidden!important; overflow-y: scroll!important}";
    this.ownerDocument.head.appendChild(styleElement);
  }

  /**
   * @inheritDoc
   */
  public render(): TemplateResult {
    return html`
        <webwriter-blocks-application id="application" style=${styleMap({ height: this.isFullscreen ? "100%" : "500px" })}>
            <webwriter-blocks-toolbar slot="editor">
                <div>
                    <webwriter-blocks-toolbar-button icon=${this.isFullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}
                                                     label=${this.isFullscreen ? msg("FULLSCREEN_EXIT") : msg("FULLSCREEN")}
                                                     @click=${this.handleFullscreenToggle}>
                    </webwriter-blocks-toolbar-button>
                </div>
                <div>
                    <webwriter-blocks-help></webwriter-blocks-help>
                </div>
            </webwriter-blocks-toolbar>
            <webwriter-blocks-editor slot="editor"
                                     id="editor"
                                     .state=${this.editorState}
                                     .selectedBlocks=${this.usableBlocks}
                                     .readonly=${this.readonly === 1 && !this.isContentEditable}
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
        ${!this.isFullscreen && this.isContentEditable ? html`
            <webwriter-blocks-options part="options"
                                      readonly=${this.readonly}
                                      stageType=${this.stageType}
                                      .availableBlocks=${this.availableBlocks}
                                      .selectedBlocks=${this.usableBlocks}
                                      @change=${this.handleOptionsChange}></webwriter-blocks-options>
        ` : null}
        </webwriter-blocks-options>
    `;
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
    this.setBlocks();
  }

  /**
   * Whether the editor is in fullscreen mode.
   * @private
   */
  private get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  /**
   * Handles the fullscreen toggle event.
   * @private
   */
  private async handleFullscreenToggle() {
    if (this.isFullscreen) {
      await this.ownerDocument.exitFullscreen();
      this.requestUpdate()
    } else {
      try {
        await this.requestFullscreen();
        this.requestUpdate()
      } catch (error) {
        Logger.error("Failed to enter fullscreen mode.");
        Logger.log(this, error);
      }
    }
  }

  /**
   * Handles the editor change event.
   * @param event The editor change event.
   * @private
   */
  private handleEditorChange(event: EditorChangeEvent): void {
    this.editorState = event.detail.state;
    this.readableCode = event.detail.readableCode;
    this.executableCode = event.detail.executableCode;
  }

  /**
   * Handles the code highlighting event.
   * @param event The code highlighting event.
   * @private
   */
  private handleCodeHighlighting(event: CodeHighlightingEvent): void {
    this.editor.editorApplication.highlight(event.detail);
  }

  /**
   * Handles the options change event.
   * @param event The options change event.
   * @private
   */
  private async handleOptionsChange(event: OptionsChangeEvent): Promise<void> {
    const options = event.detail;

    if (options.selectedBlocks) {
      this.usableBlocks = options.selectedBlocks;
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

  /**
   * Sets the available and usable blocks after changing the stage type.
   * @private
   */
  private setBlocks(): void {
    const { usableBlocks } = this.stage.stageApplication;
    this.availableBlocks = usableBlocks;
    this.usableBlocks = [...usableBlocks];
  }
}

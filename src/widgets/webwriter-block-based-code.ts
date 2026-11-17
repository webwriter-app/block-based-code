import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import type { MsgFn } from "@lit/localize";
import { LitElementWw } from "@webwriter/lit";
import { localizer } from "@webwriter/lit/localize";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
import { styleMap } from "lit/directives/style-map.js";
import { Application } from "../components/application";
import { Editor } from "../components/editor";
import { Stage } from "../components/stage";
import { Toolbar } from "../components/toolbar";
import { sourceLocale, targetLocales } from "../../localization/generated/locale-codes.js";
import { blockMessages, categoryName } from "../components/messages";
import { CodeHighlightingEvent, EditorChangeEvent } from "../model/events";
import { StageType } from "../model/stage-type";
import { blocks } from "../model/blockly/blocks/blocks";
import { BlockTypes } from "../model/blockly/blocks/blocks";
import { SelectedBlocks } from "../components/blockly/toolbox/toolbox";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { ToolbarButton } from "../components/toolbar-button";
import { Help } from "../components/help";
import { jsonData } from "@webwriter/lit/data";
import { Permissions } from "@webwriter/lit/permissions";

/** The editor state of a program that was never edited. One object, so that the editor is not told about a change. */
const NO_EDITOR_STATE = {};

/**
 * Block-based programming on top of Blockly, inspired by Scratch. The blocks the author places in
 * the editor control a stage; the only stage type so far is a canvas drawn with PixiJS.
 * The program and the blocks offered to learners are kept in a JSON data block.
 *
 * @fires optionschange - The blocks the stage offers are known, or the language changed.
 */
@customElement("webwriter-block-based-code")
export class WebwriterBlockBasedCode extends LitElementWw {
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

  static scopedElements = {
    "webwriter-blocks-toolbar": Toolbar,
    "webwriter-blocks-toolbar-button": ToolbarButton,
    "webwriter-blocks-application": Application,
    "webwriter-blocks-editor": Editor,
    "webwriter-blocks-stage": Stage,
    "webwriter-blocks-help": Help,
  };

  static optionGroups = {
    blocks: { label: (widget: { msg: MsgFn }) => widget.msg("Available Blocks"), collapsible: true },
  };

  /**
   * @inheritDoc
   */
  public static get shadowRootOptions(): ShadowRootInit {
    return {
      ...LitElement.shadowRootOptions,
      delegatesFocus: true,
    };
  }

  protected localize = localizer(this, {
    sourceLocale,
    targetLocales,
    load: (locale) => import(`../../localization/generated/${locale}.ts`),
    drawer: true,
  });

  readonly msg: MsgFn = this.localize.msg;

  /** The program in the JSON data block: the editor state and the blocks the author made usable. */
  readonly #program = jsonData<{ editorState?: object; usableBlocks?: SelectedBlocks }>(this, { defaults: {} });

  readonly #permissions = new Permissions(this);

  @property({ type: Boolean, reflect: true, attribute: "read-only" })
  public accessor readOnly = false;

  @property({ type: String, reflect: true, attribute: "stage-type" })
  public accessor stageType: StageType = StageType.CANVAS;

  get usableBlocks(): SelectedBlocks {
    const { usableBlocks } = this.#program.get();
    return Array.isArray(usableBlocks) ? usableBlocks : this.availableBlocks;
  }

  set usableBlocks(blocks: SelectedBlocks | null) {
    const selected = Array.isArray(blocks)
      ? blocks.filter(block => this.availableBlocks.includes(block))
      : this.availableBlocks;
    this.#program.set({ usableBlocks: selected });
  }

  /** The options depend on the blocks the stage offers, so they cannot be static. */
  get options() {
    const categories = new Map<string, { value: string; label: { _: string } }[]>();
    const messages = blockMessages(this.msg);
    for (const value of this.availableBlocks) {
      const [category] = value.split(":");
      const children = categories.get(category) ?? [];
      children.push({ value, label: { _: this.getBlockOptionLabel(value as BlockTypes, messages) } });
      categories.set(category, children);
    }
    return {
      readOnly: { type: Boolean, label: { _: this.msg("Readonly") }, description: { _: this.msg("Choose whether the blocks can be edited") } },
      usableBlocks: {
        type: "select", control: "tree", multiple: true, attribute: false, group: "blocks",
        label: { _: this.msg("Available Blocks") },
        description: { _: this.msg("Choose the blocks that are available in the toolbox") },
        options: Array.from(categories, ([category, children]) =>
          children.length === 1 && children[0].value === category
            ? children[0] : { label: { _: categoryName(this.msg, category) }, children }
        ),
      },
    } as const;
  }

  @state()
  private accessor availableBlocks: BlockTypes[] = [];

  /** The readable generated code. */
  @state()
  private accessor readableCode: string = "";

  /** The executable generated code. */
  @state()
  private accessor executableCode: string = "";

  @query("#editor")
  private accessor editor!: Editor;

  @query("#stage")
  private accessor stage!: Stage;

  private fullscreenStyle?: HTMLStyleElement;

  /**
   * @inheritDoc
   */
  public connectedCallback() {
    super.connectedCallback();
    this.addEventListener("fullscreenchange", this.onFullscreenChange);
    const styleElement = this.ownerDocument.createElement("style");
    styleElement.textContent = `:fullscreen .sl-scroll-lock {scrollbar-gutter: stable!important; overflow: hidden!important}`;
    this.ownerDocument.head.appendChild(styleElement);
    this.fullscreenStyle = styleElement;
  }

  disconnectedCallback() {
    this.removeEventListener("fullscreenchange", this.onFullscreenChange);
    this.fullscreenStyle?.remove();
    super.disconnectedCallback();
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
    this.availableBlocks = this.stage.stageApplication.usableBlocks;
    this.dispatchEvent(new Event("optionschange", { bubbles: true }));
  }

  /**
   * Whether the editor is in fullscreen mode.
   * @private
   */
  private get isFullscreen(): boolean {
    return this.ownerDocument.fullscreenElement === this;
  }

  private getBlockOptionLabel(type: BlockTypes, messages: Record<string, string>): string {
    if (type === "variables") return categoryName(this.msg, "variables");
    const symbols: Record<string, string> = {
      "operators:sum": "+", "operators:subtract": "-", "operators:multiply": "*", "operators:divide": "/",
      "operators:smaller": "<", "operators:greater": ">", "operators:equal": "=", "math:number": "0", "text:string": "\"\"",
    };
    if (symbols[type]) return symbols[type];
    const definition = blocks.find(block => block.type === type);
    if (!definition || typeof definition.message0 !== "string") return this.msg("Available Blocks");
    return definition.message0
      .replace(/%\{BKY_([A-Z0-9_]+)\}/g, (token, key: string) => messages[key] ?? token)
      .replace(/%\d+/g, "…")
      .replace(/\s+/g, " ")
      .trim();
  }

  private onFullscreenChange = () => this.requestUpdate();

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
        console.error("Failed to enter fullscreen mode.", error);
      }
    }
  }

  /**
   * Handles the editor change event.
   * @param event The editor change event.
   * @private
   */
  private handleEditorChange(event: EditorChangeEvent): void {
    if (JSON.stringify(event.detail.state) !== JSON.stringify(this.#program.get().editorState ?? NO_EDITOR_STATE)) {
      this.#program.set({ editorState: event.detail.state });
    }
    this.handleProgramLoaded(event);
  }

  private handleProgramLoaded(event: EditorChangeEvent): void {
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
   * @inheritDoc
   */
  public render(): TemplateResult {
    return html`
        <webwriter-blocks-application id="application" style=${styleMap({ height: this.isFullscreen ? "100%" : "500px" })}>
            <webwriter-blocks-toolbar slot="editor">
                <div>
                    <webwriter-blocks-toolbar-button icon=${this.isFullscreen ? ArrowsMinimizeIcon : ArrowsMaximizeIcon}
                                                     label=${this.isFullscreen ? this.msg("Leave Fullscreen") : this.msg("Enter Fullscreen")}
                                                     @click=${this.handleFullscreenToggle}>
                    </webwriter-blocks-toolbar-button>
                </div>
                <div>
                    <webwriter-blocks-help></webwriter-blocks-help>
                </div>
            </webwriter-blocks-toolbar>
            <webwriter-blocks-editor slot="editor"
                                     id="editor"
                                     .state=${this.#program.get().editorState ?? NO_EDITOR_STATE}
                                     .selectedBlocks=${this.usableBlocks}
                                     .locale=${this.lang}
                                     .catalog=${this.localize.getLocale()}
                                     .readonly=${this.readOnly && !this.#permissions.editing}
                                     @programloaded=${this.handleProgramLoaded}
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
    `;
  }
}

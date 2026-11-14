import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
import { styleMap } from "lit/directives/style-map.js";
import {
  Application, Editor, Stage, Toolbar,
} from "../components";
import { localizeElement, LocalizedElement } from "../locales";
import { Logger } from "../utils";
import {
  CodeHighlightingEvent, EditorChangeEvent, StageType,
} from "../types";
import { blocks } from "../lib/blockly/blocks/blocks";
import { BlockTypes, CategoryTypes, SelectedBlocks } from "../lib/blockly";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { ToolbarButton } from "../components/toolbar-button";
import { Help } from "../components/help";
import { readData, writeData } from "./data-block";

/**
 * The main component of the Blocks widget.
 */
@customElement("webwriter-block-based-code")
export class WebwriterBlocks extends LocalizedElement {
  private readonly messages = localizeElement(this);
  @property({ type: Boolean, reflect: true, attribute: "read-only" })
  public accessor readOnly = false;

  @property({ type: String, reflect: true, attribute: "stage-type" })
  public accessor stageType: StageType = StageType.CANVAS;

  get optionGroups() {
    return { blocks: { label: { _: this.messages.msg("OPTIONS.AVAILABLE_BLOCKS") }, collapsible: true } };
  }

  constructor() {
    super();
    Object.defineProperty(this, "options", { configurable: true, get: () => this.getDrawerOptions() });
  }

  private getBlockOptionLabel(type: BlockTypes): string {
    if (type === "variables") return this.messages.msg("CATEGORY.VARIABLES");
    const symbols: Record<string, string> = {
      "operators:sum": "+", "operators:subtract": "-", "operators:multiply": "*", "operators:divide": "/",
      "operators:smaller": "<", "operators:greater": ">", "operators:equal": "=", "math:number": "0", "text:string": "\"\"",
    };
    if (symbols[type]) return symbols[type];
    const definition = blocks.find(block => block.type === type);
    if (!definition || typeof definition.message0 !== "string") return this.messages.msg("OPTIONS.AVAILABLE_BLOCKS");
    return definition.message0
      .replace(/%\{BKY_([A-Z0-9_]+)\}/g, (_match, key: string) => this.messages.msg(`BLOCKS.${key}` as `BLOCKS.${Uppercase<string>}`))
      .replace(/%\d+/g, "…")
      .replace(/\s+/g, " ")
      .trim();
  }

  private getDrawerOptions() {
    const categories = new Map<string, { value: string; label: { _: string } }[]>();
    for (const value of this.availableBlocks) {
      const [category] = value.split(":");
      const children = categories.get(category) ?? [];
      children.push({ value, label: { _: this.getBlockOptionLabel(value as BlockTypes) } });
      categories.set(category, children);
    }
    return {
      readOnly: { type: Boolean, label: { _: this.messages.msg("OPTIONS.READONLY") }, description: { _: this.messages.msg("OPTIONS.READONLY_TOOLTIP") } },
      usableBlocks: {
        type: "select", control: "tree", multiple: true, attribute: false, group: "blocks",
        label: { _: this.messages.msg("OPTIONS.AVAILABLE_BLOCKS") },
        description: { _: this.messages.msg("OPTIONS.AVAILABLE_BLOCKS_TOOLTIP") },
        options: Array.from(categories, ([category, children]) =>
          children.length === 1 && children[0].value === category
            ? children[0] : { label: { _: this.messages.msg(`CATEGORY.${category.toUpperCase()}` as `CATEGORY.${Uppercase<NonNullable<CategoryTypes> | "variables">}`) }, children }
        ),
      },
    } as const;
  }

  private readProgram() {
    return readData<{ editorState: object; usableBlocks: SelectedBlocks }>(this);
  }

  private editorState: object = {};

  get usableBlocks(): SelectedBlocks {
    const { usableBlocks } = this.readProgram();
    return Array.isArray(usableBlocks) ? usableBlocks : this.availableBlocks;
  }

  set usableBlocks(blocks: SelectedBlocks | null) {
    const selected = Array.isArray(blocks)
      ? blocks.filter(block => this.availableBlocks.includes(block))
      : this.availableBlocks;
    writeData(this, { ...this.readProgram(), usableBlocks: selected });
  }

  @state()
  private accessor availableBlocks: BlockTypes[] = [];

  private programObserver = new MutationObserver(() => this.syncProgram());

  private syncProgram() {
    const next = this.readProgram().editorState ?? {};
    if (JSON.stringify(next) !== JSON.stringify(this.editorState)) this.editorState = next;
    this.requestUpdate();
  }

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
    this.programObserver.observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["slot", "type", "src"] });
    this.syncProgram();
    this.addEventListener("fullscreenchange", this.onFullscreenChange);
    const styleElement = this.ownerDocument.createElement("style");
    styleElement.textContent = `:fullscreen .sl-scroll-lock {scrollbar-gutter: stable!important; overflow: hidden!important}`;
    this.ownerDocument.head.appendChild(styleElement);
    this.fullscreenStyle = styleElement;
  }

  private onFullscreenChange = () => this.requestUpdate();
  private fullscreenStyle?: HTMLStyleElement;

  disconnectedCallback() {
    this.programObserver.disconnect();
    this.removeEventListener("fullscreenchange", this.onFullscreenChange);
    this.fullscreenStyle?.remove();
    super.disconnectedCallback();
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
                                                     label=${this.isFullscreen ? this.messages.msg("FULLSCREEN_EXIT") : this.messages.msg("FULLSCREEN")}
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
                                     .readonly=${this.readOnly && !this.isContentEditable}
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
    const current = this.readProgram();
    if (JSON.stringify(event.detail.state) !== JSON.stringify(current.editorState ?? {})) {
      writeData(this, { ...current, editorState: event.detail.state });
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

}

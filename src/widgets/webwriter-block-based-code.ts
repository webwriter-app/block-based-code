import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import type { MsgFn } from "@lit/localize";
import { computed, LitElementWw, signal } from "@webwriter/lit";
import { serialization, Workspace } from "blockly";
import { localizer } from "@webwriter/lit/localize";
import {
  customElement, property, query, state,
} from "lit/decorators.js";
import ArrowsMaximizeIcon from "@tabler/icons/outline/arrows-maximize.svg";
import ArrowsMinimizeIcon from "@tabler/icons/outline/arrows-minimize.svg";
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
 * The editor and the stage sit side by side; below 560px of width they are stacked.
 * On paper the program is scaled to fit the editor view, the current picture of the stage and the program text are printed, and controls are hidden.
 *
 * Conversions: the program is exported as JavaScript (`text/javascript`, the readable program) and as
 * JSON (`application/json`: the Blockly workspace and the blocks the toolbox offers); a JSON file of that shape is
 * imported. A `pre` element can be exported with the program text. The JavaScript export drops the layout
 * of the blocks and the toolbox selection; the JSON file keeps both.
 *
 * Signals: `running` (boolean) is true while any part of the program runs; `code` (string) is the
 * readable program. The widget accepts no effects.
 *
 * @part application - The split view that holds the editor and the stage.
 * @part editor - The block editor.
 * @part stage - The stage that shows the result.
 * @part code - The generated program, shown on paper.
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
          box-sizing: border-box;
          min-width: min(300px, 100%);
          max-width: 2100px;
          container-type: inline-size;
          user-select: none;
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          background-color: var(--sl-color-gray-50);
          color: var(--ww-text-color, inherit);
          font-family: var(--ww-font-family, inherit);
        }

        :host * {
          user-select: none;
        }

        webwriter-blocks-application {
          height: 500px;
        }

        /* Below this width the editor and the stage are stacked, so each gets the full width. */
        @container (max-width: 559px) {
          webwriter-blocks-application {
            height: 780px;
          }
        }

        :host(:fullscreen) webwriter-blocks-application {
          height: 100%;
        }

        .print-code {
          display: none;
        }

        @media print {
          :host {
            display: block !important;
            max-width: none;
            break-inside: avoid;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          webwriter-blocks-toolbar {
            display: none;
          }

          webwriter-blocks-application {
            height: auto;
          }

          .print-code {
            display: block;
            margin: var(--sl-spacing-x-small) 0 0;
            padding: var(--sl-spacing-small);
            border: 1px solid var(--sl-color-gray-300);
            border-radius: var(--sl-border-radius-medium);
            background: var(--sl-color-neutral-0);
            color: #24292e;
            font-size: 11px;
            white-space: pre-wrap;
            break-inside: avoid;
            user-select: text;
          }
        }
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

  static convertFrom = { "application/json": "importJson" };

  static convertTo = {
    "text/javascript": "exportJavaScript",
    "application/json": "exportJson",
    pre: "toPre",
  };

  static actions = {
    clearProgram: {
      label: (widget: { msg: MsgFn }) => widget.msg("Clear program"),
      confirm: (widget: { msg: MsgFn }) => widget.msg("Remove all blocks from the program?"),
      intent: "danger" as const,
    },
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

  readonly #running = signal(false);

  readonly #code = signal("");

  /** Read-only values for other widgets: whether the program runs, and the readable program. */
  readonly signals = {
    running: computed(() => this.#running.get()),
    code: computed(() => this.#code.get()),
  };

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
    this.#running.set(false);
    this.#code.set("");
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

  /** The program as it is now: the editor state and the blocks the toolbox offers. */
  private currentProgram(): { editorState: object; usableBlocks: SelectedBlocks } {
    const editorState = this.editor?.editorApplication?.save() ?? this.#program.get().editorState ?? NO_EDITOR_STATE;
    return { editorState, usableBlocks: this.usableBlocks };
  }

  /** The readable program as a JavaScript file; null while there are no blocks. */
  public exportJavaScript(): File | null {
    const code = this.readableCode.trim();
    return code ? new File([`${code}\n`], "program.js", { type: "text/javascript" }) : null;
  }

  /** The workspace and the toolbox selection as a JSON file. */
  public exportJson(): File {
    return new File([JSON.stringify(this.currentProgram(), null, 2)], "block-program.json", { type: "application/json" });
  }

  /** A `pre` element with the readable program; null while there are no blocks. */
  public toPre(): HTMLElement | null {
    const code = this.readableCode.trim();
    if (!code) return null;
    const pre = this.ownerDocument.createElement("pre");
    pre.textContent = code;
    return pre;
  }

  /** Checks a whole file, then returns the function that replaces the program. */
  public async importJson(file: File): Promise<() => void> {
    let data: { editorState?: unknown; usableBlocks?: unknown };
    try {
      data = JSON.parse(await file.text());
    } catch {
      throw new Error(this.msg("The file is not valid JSON."));
    }
    const state = data?.editorState as { blocks?: { blocks?: unknown } } | undefined;
    if (!state || typeof state !== "object" || (state.blocks !== undefined && !Array.isArray(state.blocks.blocks))) {
      throw new Error(this.msg("The file does not contain a block program."));
    }
    // A workspace without a view takes the program as a test, so that unknown blocks fail before anything changes.
    const probe = new Workspace();
    try {
      serialization.workspaces.load(state as object, probe);
    } catch {
      throw new Error(this.msg("The file does not contain a block program."));
    } finally {
      probe.dispose();
    }
    const usable = Array.isArray(data.usableBlocks)
      ? (data.usableBlocks as BlockTypes[]).filter((block) => this.availableBlocks.includes(block))
      : null;
    return () => this.#program.set(usable ? { editorState: state as object, usableBlocks: usable } : { editorState: state as object });
  }

  /** Removes all blocks; the toolbox selection stays. */
  public clearProgram(): void {
    this.#program.set({ editorState: NO_EDITOR_STATE });
  }

  private handleExecutionChange = (event: Event) => {
    this.#running.set((event as CustomEvent<boolean>).detail);
  };

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
    this.#code.set(this.readableCode);
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
        <webwriter-blocks-application id="application" part="application">
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
                                     part="editor"
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
                                    part="stage"
                                    stageType=${this.stageType}
                                    readableCode=${this.readableCode}
                                    executableCode=${this.executableCode}
                                    @highlight=${this.handleCodeHighlighting}
                                    @executionchange=${this.handleExecutionChange}>
            </webwriter-blocks-stage>
        </webwriter-blocks-application>
        <pre class="print-code" part="code" aria-label=${this.msg("Code")}>${this.readableCode}</pre>
    `;
  }
}

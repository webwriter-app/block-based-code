import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlTree, SlTreeItem } from "@shoelace-style/shoelace";
import { styles } from "./options.styles";
import { BlockType, CategoryKey } from "../../lib/blockly";
import { msg } from "../../locales";
import { OptionsChangeEvent } from "../../types";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  @property({ type: Array, attribute: true })
  public availableBlocks: BlockType[] = [];

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-tree": SlTree,
      "sl-tree-item": SlTreeItem,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  public render(): TemplateResult {
    const blocks: [CategoryKey, BlockType[]][] = [
      [
        CategoryKey.CONTROLS, [
          BlockType.WAIT,
          BlockType.REPEAT,
          BlockType.FOREVER,
          BlockType.IF,
          BlockType.IF_ELSE,
          BlockType.STOP,
        ],
      ],
      [
        CategoryKey.EVENTS, [
          BlockType.WHEN_START_CLICKED,
        ],
      ],
      [
        CategoryKey.MOTIONS, [
          BlockType.MOVE,
          BlockType.ROTATE,
          BlockType.GO_TO_X,
          BlockType.GO_TO_Y,
          BlockType.GO_TO_XY,
          BlockType.X_POSITION,
          BlockType.Y_POSITION,
        ],
      ],
      [
        CategoryKey.OPERATORS, [
          BlockType.SUM,
          BlockType.SUBTRACT,
          BlockType.MULTIPLY,
          BlockType.DIVIDE,
          BlockType.SMALLER,
          BlockType.GREATER,
          BlockType.EQUAL,
          BlockType.AND,
          BlockType.OR,
        ],
      ],
    ];

    return html`
        <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectionChange}>
            <sl-tree-item>
                ${msg("availableBlocks")}
                ${blocks.map(([category, blockKeys]) => html`
                    <sl-tree-item>
                        ${category}
                        ${blockKeys.map((blockKey) => html`
                            <sl-tree-item .selected=${this.availableBlocks.includes(blockKey)} data-block-key=${blockKey}>
                                ${blockKey}
                            </sl-tree-item>
                        `)}
                    </sl-tree-item>
              `)}
            </sl-tree-item>
        </sl-tree>
    `;
  }

  private handleSelectionChange(event: CustomEvent<{ selection: SlTreeItem[] }>): void {
    const availableBlocks = event.detail.selection
      .filter((item) => item.getAttribute("data-block-key"))
      .map((item) => item.getAttribute("data-block-key") as BlockType);

    const changeEvent = new OptionsChangeEvent({
      availableBlocks,
    });
    this.dispatchEvent(changeEvent);
  }
}

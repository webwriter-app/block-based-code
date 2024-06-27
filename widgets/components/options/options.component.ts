import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlTree, SlTreeItem } from "@shoelace-style/shoelace";
import { styles } from "./options.styles";
import { BlockKey, CategoryKey } from "../../lib/blockly";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
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

  public render(): TemplateResult {
    const blocks: [CategoryKey, BlockKey[]][] = [
      [
        CategoryKey.CONTROL, [
          BlockKey.WAIT,
          BlockKey.REPEAT,
          BlockKey.FOREVER,
          BlockKey.IF,
          BlockKey.IF_ELSE,
          BlockKey.STOP,
        ],
      ],
    ];

    return html`
        <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectionChange}>
            ${blocks.map(([category, blockKeys]) => html`
                <sl-tree-item>
                    ${category}
                    ${blockKeys.map((blockKey) => html`
                        <sl-tree-item data-block-key="${blockKey}">
                            ${blockKey}
                        </sl-tree-item>
                    `)}
                </sl-tree-item>
            `)}
        </sl-tree>
    `;
  }

  private handleSelectionChange(event: CustomEvent<{ selection: SlTreeItem[] }>): void {
    console.log(event.detail.selection);
    event.detail.selection
      .filter((item) => item.getAttribute("data-block-key"))
      .map((item) => item.getAttribute("data-block-key"))
      .forEach(console.log);
  }
}

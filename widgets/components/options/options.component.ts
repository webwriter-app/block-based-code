import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlTree, SlTreeItem } from "@shoelace-style/shoelace";
import { styles } from "./options.styles";
import { msg } from "../../locales";
import { OptionsChangeEvent } from "../../types";
import { BlockTree } from "../../lib/blockly";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  @property({ type: Array, attribute: true })
  public availableBlocks: string[] = [];

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
    const blocks = BlockTree;

    return html`
        <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectionChange}>
            <sl-tree-item>
                ${msg("AVAILABLE_BLOCKS")}
                ${Object.entries(blocks).map(([category, blockKeys]) => html`
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
      .map((item) => item.getAttribute("data-block-key"));

    const changeEvent = new OptionsChangeEvent({
      availableBlocks,
    });
    this.dispatchEvent(changeEvent);
  }
}

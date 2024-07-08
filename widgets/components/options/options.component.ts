import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import {
  SlOption, SlSelect, SlTree, SlTreeItem,
} from "@shoelace-style/shoelace";
import { styles } from "./options.styles";
import { msg } from "../../locales";
import { OptionsChangeEvent, StageType } from "../../types";
import { BlockTypes } from "../../lib/blockly";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  @property({ type: String, attribute: true })
  public stageType: StageType = StageType.CANVAS;

  @property({ type: Array, attribute: true })
  public availableBlocks: string[] = [];

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-select": SlSelect,
      "sl-option": SlOption,
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
    const blocks: BlockTypes[] = ["controls:forever", "controls:if"];

    return html`
        <div class="group">
            <span class="label">${msg("OPTIONS.STAGE")}</span>
            <sl-select value=${this.stageType}>
                ${Object.values(StageType).map((type) => html`
                    <sl-option value=${type} .disabled=${type !== StageType.CANVAS}>
                        ${type}
                    </sl-option>
                `)}
            </sl-select>
        </div>
        <div class="group">
            <span class="label">${msg("OPTIONS.AVAILABLE_BLOCKS")}</span>
            <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectionChange}>
                <sl-tree-item>
                    all
                    ${blocks.map((block) => html`
                        <sl-tree-item .selected=${this.availableBlocks.includes(block)} data-block-key=${block}>
                            ${block}
                        </sl-tree-item>
                    `)}
                </sl-tree-item>
            </sl-tree>
        </div>
    `;
  }

  private handleSelectionChange(event: CustomEvent<{ selection: SlTreeItem[] }>): void {
    const availableBlocks = event.detail.selection
      .filter((item) => item.getAttribute("data-block-key"))
      .map((item) => item.getAttribute("data-block-key") as BlockTypes);

    const changeEvent = new OptionsChangeEvent({
      availableBlocks,
    });
    this.dispatchEvent(changeEvent);
  }
}

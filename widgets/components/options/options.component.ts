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
  public stageType: StageType;

  @property({ type: Object, attribute: true })
  public selectedBlocks: Set<BlockTypes>;

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
    const selectedBlocksSet = new Set(this.selectedBlocks);

    return html`
        <div class="group">
            <span class="label">${msg("OPTIONS.STAGE")}</span>
            <sl-select value=${this.stageType} @sl-change=${this.handleStageTypeChange}>
                ${Object.values(StageType).map((type) => html`
                    <sl-option value=${type} .disabled=${type === StageType.CODE_EDITOR}>
                        ${type}
                    </sl-option>
                `)}
            </sl-select>
        </div>
        <div class="group">
            <span class="label">${msg("OPTIONS.AVAILABLE_BLOCKS")}</span>
            <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectedBlocksChange}>
                <sl-tree-item>
                    all
                    ${blocks.map((block) => html`
                        <sl-tree-item .selected=${selectedBlocksSet.has(block)} data-block-key=${block}>
                            ${block}
                        </sl-tree-item>
                    `)}
                </sl-tree-item>
            </sl-tree>
        </div>
    `;
  }

  private handleStageTypeChange(): void {
    const changeEvent = new OptionsChangeEvent({
      stageType: this.stageType,
    });
    this.dispatchEvent(changeEvent);
  }

  private handleSelectedBlocksChange(event: CustomEvent<{ selection: SlTreeItem[] }>): void {
    const selectedBlocks = event.detail.selection
      .filter((item) => item.getAttribute("data-block-key"))
      .map((item) => item.getAttribute("data-block-key") as BlockTypes);

    const changeEvent = new OptionsChangeEvent({
      selectedBlocks,
    });
    this.dispatchEvent(changeEvent);
  }
}

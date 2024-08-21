import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import {
  SlCheckbox, SlOption, SlSelect, SlTree, SlTreeItem,
} from "@shoelace-style/shoelace";
import { styles } from "./options.styles";
import { msg } from "../../locales";
import { OptionsChangeEvent, StageType } from "../../types";
import { BlockTypes, SelectedBlocks } from "../../lib/blockly";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  @property({ type: Number })
  public accessor readonly: 0 | 1;

  @property({ type: String })
  public accessor stageType: StageType;

  @property({ type: Array })
  public accessor selectedBlocks: SelectedBlocks;

  @property({ type: Array })
  public accessor availableBlocks: BlockTypes[];

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-checkbox": SlCheckbox,
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
    const selectedBlocksSet = new Set(this.selectedBlocks);
    const availableBlocksMap = new Map<string, string[]>();

    this.availableBlocks.sort().forEach((block: BlockTypes) => {
      const [category, name] = block.split(":") as [string, string];
      if (!availableBlocksMap.has(category)) {
        availableBlocksMap.set(category, []);
      }
      if (name) {
        availableBlocksMap.get(category)!.push(name);
      }
    });

    return html`
        <div class="group">
            <sl-checkbox .checked=${this.readonly === 1} @sl-change=${this.handleReadonlyChange}>
                ${msg("OPTIONS.READONLY")}
            </sl-checkbox>
        </div>
        <div class="group">
            <span class="label">${msg("OPTIONS.STAGE")}</span>
            <sl-select value=${this.stageType} @sl-change=${this.handleStageTypeChange} hoist>
                ${Object.values(StageType).map((type) => html`
                    <sl-option value=${type}>
                        ${msg(`OPTIONS.STAGE_TYPES.${type.toUpperCase() as Uppercase<StageType>}`)}
                    </sl-option>
                `)}
            </sl-select>
        </div>
        <div class="group">
            <span class="label">${msg("OPTIONS.AVAILABLE_BLOCKS")}</span>
            <sl-tree selection="multiple" @sl-selection-change=${this.handleSelectedBlocksChange}>
                <sl-tree-item expanded>
                    all
                    ${Array.from(availableBlocksMap.entries()).map(([category, blocks]) => (blocks.length === 0 ? html`
                        <sl-tree-item .selected=${selectedBlocksSet.has(category as BlockTypes)}
                                      data-block-key=${`${category}`}>
                            ${category}
                        </sl-tree-item>
                      ` : html`
                          <sl-tree-item>
                              ${category}
                              ${blocks.map((name) => html`
                              <sl-tree-item .selected=${selectedBlocksSet.has(`${category}:${name}` as BlockTypes)}
                                            data-block-key=${`${category}:${name}`}>
                                  ${name}
                              </sl-tree-item>
                              `)}
                          </sl-tree-item>
                      `))}
                </sl-tree-item>
            </sl-tree>
        </div>
    `;
  }

  private handleReadonlyChange(e): void {
    const changeEvent = new OptionsChangeEvent({
      readonly: e.target.checked ? 1 : 0,
    });
    this.dispatchEvent(changeEvent);
  }

  private handleStageTypeChange(e): void {
    const changeEvent = new OptionsChangeEvent({
      stageType: e.target.value,
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

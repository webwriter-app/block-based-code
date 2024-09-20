import { customElement, property } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import {
  SlCheckbox, SlIcon, SlOption, SlSelect, SlTooltip, SlTree, SlTreeItem,
} from "@shoelace-style/shoelace";
import HelpCircleIcon from "@tabler/icons/outline/help-circle.svg";
import { styles } from "./options.styles";
import { msg } from "../../locales";
import { OptionsChangeEvent, StageType } from "../../types";
import { BlockTypes, SelectedBlocks } from "../../lib/blockly";

/**
 * The options component.
 */
@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  /**
   * Whether the widget are readonly.
   */
  @property({ type: Number })
  public accessor readonly: 0 | 1;

  /**
   * The selected stage type.
   */
  @property({ type: String })
  public accessor stageType: StageType;

  /**
   * The selected blocks.
   */
  @property({ type: Array })
  public accessor selectedBlocks: SelectedBlocks;

  /**
   * The available blocks.
   */
  @property({ type: Array })
  public accessor availableBlocks: BlockTypes[];

  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-checkbox": SlCheckbox,
      "sl-select": SlSelect,
      "sl-option": SlOption,
      "sl-tree": SlTree,
      "sl-tree-item": SlTreeItem,
      "sl-tooltip": SlTooltip,
      "sl-icon": SlIcon,
    };
  }

  /**
   * @inheritDoc
   */
  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  /**
   * @inheritDoc
   */
  public connectedCallback(): void {
    super.connectedCallback();
  }

  /**
   * @inheritDoc
   */
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
              <span class="label">
                ${msg("OPTIONS.READONLY")}
                <sl-tooltip content=${msg("OPTIONS.READONLY_TOOLTIP")}>
                    <sl-icon src="${HelpCircleIcon}"></sl-icon>
                </sl-tooltip>
              </span>
            </sl-checkbox>
        </div>
        <div class="group">
            <span class="label">
              ${msg("OPTIONS.STAGE")}
              <sl-tooltip content=${msg("OPTIONS.STAGE_TOOLTIP")}>
                  <sl-icon src="${HelpCircleIcon}"></sl-icon>
              </sl-tooltip>
            </span>
            <sl-select value=${this.stageType} @sl-change=${this.handleStageTypeChange} hoist>
                ${Object.values(StageType).map((type) => html`
                    <sl-option value=${type}>
                        ${msg(`OPTIONS.STAGE_TYPES.${type.toUpperCase() as Uppercase<StageType>}`)}
                    </sl-option>
                `)}
            </sl-select>
        </div>
        <div class="group">
            <span class="label">
              ${msg("OPTIONS.AVAILABLE_BLOCKS")}
              <sl-tooltip content=${msg("OPTIONS.AVAILABLE_BLOCKS_TOOLTIP")}>
                  <sl-icon src="${HelpCircleIcon}"></sl-icon>
              </sl-tooltip>
            </span>
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

  /**
   * Handles the readonly change event.
   * @param event The change event.
   * @private
   */
  private handleReadonlyChange(event): void {
    const changeEvent = new OptionsChangeEvent({
      readonly: event.target.checked ? 1 : 0,
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Handles the stage type change event.
   * @param event The change event.
   * @private
   */
  private handleStageTypeChange(event): void {
    const changeEvent = new OptionsChangeEvent({
      stageType: event.target.value,
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Handles the selected blocks change event.
   * @param event The change event.
   * @private
   */
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

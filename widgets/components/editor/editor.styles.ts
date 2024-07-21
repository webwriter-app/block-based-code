import { css } from "lit";

export const styles = css`
    :host {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-x-small);
        overflow: hidden;
    }
    
    .categoryBubble {
        display: block;
        margin: 0 auto 0.125rem;
        border-radius: 100%;
        border: 1px solid;
        width: 1rem;
        height: 1rem;
    }

    .blocklyToolboxDiv {
        padding: 0;

        background-color: var(--sl-color-neutral-0);
        border-right: 1px solid var(--sl-color-gray-300);

        overflow-y: visible;
    }

    .blocklyTreeRow {
        height: initial;
        margin-bottom: 0;
        padding: var(--sl-spacing-x-small) !important;

        transition: var(--sl-transition-medium);

        cursor: pointer;
    }

    .blocklyTreeRowContentContainer {
        display: flex;
        flex-direction: column;
    }
    
    .blocklyTreeLabel {
        margin: auto;
    }

    .blocklyTreeRow:first-child {
        border-top: none;
    }

    .categoryBubble {
        border-color: var(--sl-color-gray-300);
        margin-bottom: 0;
    }

    .blocklyTreeLabel {
        margin-top: 4px;
        font-size: 12px;
    }

    .blocklyTreeSelected {
        background-color: var(--sl-color-primary-100) !important;
    }

    .blocklyTreeSelected .blocklyTreeLabel {
        color: black !important;
    }

    .blocklyFlyout {
        border-right: 1px solid var(--sl-color-gray-300);
    }

    .blocklyFlyoutBackground {
        fill: var(--sl-color-neutral-0);
        fill-opacity: 1;
    }

    .blocklyWorkspace rect {
        stroke: none;
    }

    .blocklyWidgetDiv, .blocklyDropDownDiv, .blocklyTooltipDiv {
        position: fixed;
    }
    
    sl-dialog::part(base) {
        position: absolute !important;
    }

    sl-dialog::part(overlay) {
        position: absolute !important;
    }
`;

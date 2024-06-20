import { css } from "lit";

export const styles = css`
    :host {
        display: block;
        height: 100%;
    }

    #block-canvas {
        height: 100%;
        
        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);
        overflow: hidden;
    }

    .blocklyToolboxDiv {
        padding: 0;

        background-color: var(--sl-color-neutral-0);
        border-right: 1px solid var(--sl-color-gray-300);

        overflow-y: visible;
    }

    .blocklyTreeRow {
        margin-bottom: 0;
        padding: 8px 12px !important;

        transition: var(--sl-transition-medium);

        cursor: pointer;
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
        font-size: 14px;
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
`;
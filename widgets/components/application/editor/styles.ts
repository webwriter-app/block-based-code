import { css } from "lit";

export const styles = css`
    :host {
        display: block;
        height: calc(100% - 16px);
        padding: 8px 0 8px 8px;
    }

    #block-canvas {
        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);
        overflow: hidden;
    }

    .blocklyToolboxDiv {
        padding: 0;

        //background-color: var(--sl-color-gray-100);
        background-color: white;
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
        fill: white;
        fill-opacity: 1;
    }

    .blocklyWorkspace rect {
        stroke: none;
    }
`;

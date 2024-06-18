import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: 8px;

        height: calc(100% - 16px);

        padding: 8px 8px 8px 0;
    }

    #canvas {
        position: relative;
        width: 100%;
        margin: 0 auto;
        height: 0;

        padding-top: calc(100% * 3 / 4);

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);
        overflow: hidden;
    }

    #canvas canvas {
        position: absolute;
        top: 0;
        left: 0;

        transform-origin: top left;
    }
`;

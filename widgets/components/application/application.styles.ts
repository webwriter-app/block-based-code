import { css } from "lit";

export const styles = css`
    sl-split-panel {
        --min: 50%;
        --max: calc(100% - 200px);
        --divider-width: 16px;
    }

    sl-split-panel > * {
        min-width: 0;
        min-height: 0;
        
        box-sizing: border-box;
    }

    sl-split-panel::part(divider) {
        background-color: transparent;
        color: var(--sl-color-gray-500);
    }
`;

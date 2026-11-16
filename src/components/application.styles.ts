import { css } from "lit";

export const styles = css`
    sl-split-panel {
        height: 100%;
        --min: 200px;
        --max: 50%;
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
    
    .panel {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-x-small);
    }
`;

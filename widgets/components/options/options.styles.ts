import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-small);
        padding-left: 10px;
        max-width: 200px;
        height: 400px;
    }
    
    .group {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-2x-small)
    }
    
    .label {
        font-size: var(--sl-font-size-medium);
    }

    sl-select {
        padding-right: 4px;
    }
    
    sl-tree {
        height: 200px;
    }
`;

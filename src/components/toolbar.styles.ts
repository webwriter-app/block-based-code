import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        justify-content: space-between;
        
        width: 100%;
        min-height: 34px;
        flex: none;
        flex-wrap: wrap;
        gap: var(--sl-spacing-2x-small);

    }
    
    ::slotted(div) {
        position: relative;
        display: flex;

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);

        box-sizing: border-box;
    }
`;

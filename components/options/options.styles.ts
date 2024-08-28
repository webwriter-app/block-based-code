import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-small);
        padding-left: 10px;
        max-width: 195px;
        max-height: calc(560px - 116px);
        box-sizing: border-box;
    }
    
    .group {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-2x-small);
        
        padding-right: 10px;

        box-sizing: border-box;
    }
    
    .label {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--sl-spacing-x-small);
        
        font-size: var(--sl-font-size-medium);
    }
    
    sl-icon {
        color: var(--sl-color-gray-500);
    }
    
    sl-checkbox::part(base) {
        display: flex;
    }
    
    sl-checkbox::part(label) {
        width: 100%;
    }
`;

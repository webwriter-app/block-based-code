import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        justify-content: space-between;
        
        width: 100%;
        height: 34px;
        flex: none;

        //border-bottom: 1px solid var(--sl-color-gray-300);
    }
    
    ::slotted(div) {
        display: flex;

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);

        overflow: hidden;
        box-sizing: border-box;
    }
`;

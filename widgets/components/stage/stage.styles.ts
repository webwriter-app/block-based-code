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
   
    sl-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    sl-tab-group::part(base) {
        height: 100%;
    }
    
    sl-tab-group::part(body) {
        height: 100%;
        position: relative;
    }
    
    sl-tab::part(base) {
        padding-top: 0;
    }
    
    sl-tab-panel::part(base) {
        height: 100%;
        position: relative;
        overflow: hidden;
        padding-top: 0;
        padding-bottom: 0;
    }

    .error {
        height: 100%;
        font-size: 14px;
        
        display: flex;
        align-items: center;
        justify-content: center;    
        
        background-color: var(--sl-color-danger-50);
        color: var(--sl-color-danger-500);
        border: 1px solid var(--sl-color-danger-300);
        border-radius: var(--sl-border-radius-medium);
        
        box-sizing: border-box;
    }
    
    pre {
        overflow-x: scroll;
        font-size: 12px;
    }
`;

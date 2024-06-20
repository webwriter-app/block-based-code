import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    #stage {
        position: relative;
        width: 100%;
        margin: 0 auto;
        height: 0;

        padding-top: calc(100% * 3 / 4);

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);
        overflow: hidden;
        
        box-sizing: border-box;
        
        background-color: var(--sl-color-neutral-0);
    }

    #stage * {
        position: absolute;
    }

    #stage canvas {
        top: 0;
        left: 0;

        transform-origin: top left;
    }

    #stage sl-spinner {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    #stage div.error {
        inset: 0;
        font-size: 14px;
        
        display: flex;
        align-items: center;
        justify-content: center;    
        
        background-color: var(--sl-color-danger-50);
        color: var(--sl-color-danger-500);
    }
`;
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
    
    sl-split-panel[vertical] {
        --min: 120px;
        --max: 70%;
        --divider-width: 20px;
    }

    .panel {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-x-small);
    }

    @media print {
        :host {
            display: block;
        }

        sl-split-panel {
            display: block !important;
            height: auto;
        }

        sl-split-panel::part(divider) {
            display: none;
        }

        .panel {
            display: block;
            height: auto;
            overflow: visible;
        }

        .panel[slot="start"] {
            height: 480px;
            margin-bottom: var(--sl-spacing-x-small);
        }
    }
`;

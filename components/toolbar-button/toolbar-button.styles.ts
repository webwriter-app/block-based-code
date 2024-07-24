import { css } from "lit";

export const styles = css`
    sl-button {
        display: flex;
        align-content: center;
        justify-content: center;
    }

    sl-button::part(base) {
        min-height: unset;

        padding-inline-start: 0;
        padding: 6px;

        box-sizing: border-box;

        color: var(--sl-color-gray-700);
    }

    sl-button::part(label) {
        padding: 0;
        line-height: 1;
    }

    sl-icon {
        font-size: 18px;
    }
`;

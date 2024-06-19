import { css } from "lit";

export const styles = css`
    :host {
        display: flex;
        justify-content: space-between;

        //border-bottom: 1px solid var(--sl-color-gray-300);
    }

    div.actions {
        display: flex;

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);
    }

    sl-tooltip:not(:first-child) sl-button {
        border-left: 1px solid var(--sl-color-gray-300);
    }

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

    sl-button#stop::part(base) {
        background-color: var(--sl-color-danger-50);
        color: var(--sl-color-danger-500);
    }

    sl-button#play::part(base) {
        background-color: var(--sl-color-success-50);
        color: var(--sl-color-success-500);
    }

    sl-button::part(label) {
        padding: 0;
        line-height: 1;
    }

    sl-icon {
        font-size: 18px;
    }
`;

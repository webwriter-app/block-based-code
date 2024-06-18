import { css } from "lit";

export const styles = css`
    .application {
        --min: 150px;
        --max: calc(100% - 150px);
        --divider-width: 16px;

        height: 500px;
    }

    .application > div {
        min-width: 0;
        min-height: 0;
    }

    .application::part(divider) {
        background-color: transparent;
        color: var(--sl-color-gray-500);
    }
`;

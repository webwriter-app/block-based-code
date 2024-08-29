import { css } from "lit";

export const styles = css`
  sl-popup {
      --arrow-color: var(--sl-tooltip-background-color)
  }
    
  sl-popup::part(popup) {
      z-index: var(--sl-z-index-tooltip);
  }
    
  article {
      color: var(--sl-tooltip-color);
      background: var(--sl-tooltip-background-color);
      padding: var(--sl-spacing-small);
      border-radius: var(--sl-tooltip-border-radius);
      
      width: max-content;
      
      box-sizing: border-box;
      
      z-index: 1000;
  }
    
  h1, p {
      margin: 0;
      padding: 0;
      line-height: 1.2;
  }
    
  h1:not(:first-child), p:not(:first-child) {
      margin-top: var(--sl-spacing-small);
  }
`;

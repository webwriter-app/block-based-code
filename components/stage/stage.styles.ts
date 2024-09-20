import { css } from "lit";

export const styles = css`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-x-small);
    }

    webwriter-blocks-toolbar-button#stop {
        background-color: var(--sl-color-danger-50);
    }

    webwriter-blocks-toolbar-button#stop:hover {
        background-color: var(--sl-color-danger-100);
    }
    
    webwriter-blocks-toolbar-button#stop::part(icon) {
        color: var(--sl-color-danger-500);
    }

    webwriter-blocks-toolbar-button#start {
        background-color: var(--sl-color-success-50);
    }
    
    webwriter-blocks-toolbar-button#start:hover {
        background-color: var(--sl-color-success-100);
    }

    webwriter-blocks-toolbar-button#start::part(icon) {
        color: var(--sl-color-success-500);
    }
    
    sl-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    
    sl-tab-group {
        height: 100%;
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
    
    sl-tab-panel {
        height: 100%;
        position: relative;
    }
    
    sl-tab-panel::part(base) {
        height: 100%;
        position: relative;
        overflow: hidden;
        padding-top: 0;
    }

    sl-dialog::part(base) {
        position: absolute !important;
    }
    
    sl-dialog::part(body) {
        display: flex;
        flex-direction: column;
    }

    sl-dialog::part(overlay) {
        position: absolute !important;
    }

    .group {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-2x-small);

        padding-right: 10px;

        box-sizing: border-box;
    }

    .label {
        font-size: var(--sl-font-size-medium);
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
        width: 100%;
        height: 100%;
        margin: 0;
        background: var(--sl-color-neutral-0);

        border: 1px solid var(--sl-color-gray-300);
        border-radius: var(--sl-border-radius-medium);

        overflow: scroll;
        font-size: 12px;
        box-sizing: border-box;
        
        padding: var(--sl-spacing-large);
    }
    
    pre code {
        color: #24292e;
    }
`;

export const codeStyles = css`
    /*!
      Theme: GitHub
      Description: Light theme as seen on github.com
      Author: github.com
      Maintainer: @Hirse
      Updated: 2021-05-15
    
      Outdated base version: https://github.com/primer/github-syntax-light
      Current colors taken from GitHub's CSS
    */
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
        /* prettylights-syntax-keyword */
        color: #d73a49
    }
    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
        /* prettylights-syntax-entity */
        color: #6f42c1
    }
    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-variable,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id {
        /* prettylights-syntax-constant */
        color: #005cc5
    }
    .hljs-regexp,
    .hljs-string,
    .hljs-meta .hljs-string {
        /* prettylights-syntax-string */
        color: #032f62
    }
    .hljs-built_in,
    .hljs-symbol {
        /* prettylights-syntax-variable */
        color: #e36209
    }
    .hljs-comment,
    .hljs-code,
    .hljs-formula {
        /* prettylights-syntax-comment */
        color: #6a737d
    }
    .hljs-name,
    .hljs-quote,
    .hljs-selector-tag,
    .hljs-selector-pseudo {
        /* prettylights-syntax-entity-tag */
        color: #22863a
    }
    .hljs-subst {
        /* prettylights-syntax-storage-modifier-import */
        color: #24292e
    }
    .hljs-section {
        /* prettylights-syntax-markup-heading */
        color: #005cc5;
        font-weight: bold
    }
    .hljs-bullet {
        /* prettylights-syntax-markup-list */
        color: #735c0f
    }
    .hljs-emphasis {
        /* prettylights-syntax-markup-italic */
        color: #24292e;
        font-style: italic
    }
    .hljs-strong {
        /* prettylights-syntax-markup-bold */
        color: #24292e;
        font-weight: bold
    }
    .hljs-addition {
        /* prettylights-syntax-markup-inserted */
        color: #22863a;
        background-color: #f0fff4
    }
    .hljs-deletion {
        /* prettylights-syntax-markup-deleted */
        color: #b31d28;
        background-color: #ffeef0
    }
    .hljs-char.escape_,
    .hljs-link,
    .hljs-params,
    .hljs-property,
    .hljs-punctuation,
    .hljs-tag {
        /* purposely ignored */

    }
`;

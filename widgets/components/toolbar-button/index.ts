import { ToolbarButton } from "./toolbar-button.component";

export * from "./toolbar-button.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-toolbar-button": ToolbarButton;
  }
}

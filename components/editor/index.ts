import { Editor } from "./editor.component";

export * from "./editor.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-editor": Editor;
  }
}

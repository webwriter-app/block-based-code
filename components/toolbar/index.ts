import { Toolbar } from "./toolbar.component";

export * from "./toolbar.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-toolbar": Toolbar;
  }
}

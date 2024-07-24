import { Options } from "./options.component";

export * from "./options.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-options": Options;
  }
}

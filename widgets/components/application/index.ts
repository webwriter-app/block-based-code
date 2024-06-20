import { Application } from "./application.component";

export * from "./application.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-application": Application;
  }
}

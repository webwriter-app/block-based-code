import { Stage } from "./stage.component";

export * from "./stage.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-stage": Stage;
  }
}

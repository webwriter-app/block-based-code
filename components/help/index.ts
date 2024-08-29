import { Help } from "./help.component";

export * from "./help.component";

declare global {
  interface HTMLElementTagNameMap {
    "webwriter-blocks-help": Help;
  }
}

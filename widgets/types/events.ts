/* eslint-disable max-classes-per-file */
import { Options } from "./options";

export class EditorChangeEvent extends CustomEvent<{ workspace: string, code: string }> {
  constructor(workspace: string, code: string) {
    super("change", {
      detail: {
        workspace,
        code,
      },
      bubbles: true,
      composed: true,
    });
  }
}

export class OptionsChangeEvent extends CustomEvent<Options> {
  constructor(options: Options) {
    super("change", {
      detail: options,
      bubbles: true,
      composed: true,
    });
  }
}

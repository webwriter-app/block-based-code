/* eslint-disable max-classes-per-file */
import { Options } from "./options";

export class EditorChangeEvent extends CustomEvent<{ workspace: string, executableCode: string, readableCode: string }> {
  constructor(workspace: string, executableCode: string, readableCode: string) {
    super("change", {
      detail: {
        workspace,
        executableCode,
        readableCode,
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

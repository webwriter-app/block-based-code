/**
 * An event that is fired when the editor changes.
 */
export class EditorChangeEvent extends CustomEvent<{ state: object, readableCode: string, executableCode: string }> {
  constructor(state: object, readableCode: string, executableCode: string) {
    super("change", {
      detail: {
        state,
        readableCode,
        executableCode,
      },
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * An event that is fired when code highlighting is requested.
 */
export class CodeHighlightingEvent extends CustomEvent<string | null> {
  constructor(id: string | null) {
    super("highlight", {
      detail: id,
      bubbles: true,
      composed: true,
    });
  }
}

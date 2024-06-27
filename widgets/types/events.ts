export class EditorChangeEvent extends CustomEvent<{ workspace: string }> {
  constructor(workspace: string) {
    super("change", {
      detail: {
        workspace,
      },
      bubbles: true,
      composed: true,
    });
  }
}

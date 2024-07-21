/* eslint-disable max-classes-per-file */
import { StageType } from "./stage";
import { BlockTypes } from "../lib/blockly";

export class EditorChangeEvent extends CustomEvent<{ workspace: string, readableCode: string }> {
  constructor(workspace: string, readableCode: string) {
    super("change", {
      detail: {
        workspace,
        readableCode,
      },
      bubbles: true,
      composed: true,
    });
  }
}

export class OptionsChangeEvent extends CustomEvent<{
  readonly?: 0 | 1;
  stageType?: StageType;
  selectedBlocks?: BlockTypes[];
}> {
  constructor(options: OptionsChangeEvent["detail"]) {
    super("change", {
      detail: options,
      bubbles: true,
      composed: true,
    });
  }
}

export class CodeHighlightingEvent extends CustomEvent<string> {
  constructor(id: string) {
    super("highlight", {
      detail: id,
      bubbles: true,
      composed: true,
    });
  }
}

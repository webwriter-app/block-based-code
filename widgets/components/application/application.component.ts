import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import { SlIcon, SlSplitPanel } from "@shoelace-style/shoelace";
import GripVerticalIcon from "@tabler/icons/outline/grip-vertical.svg";
import { Editor } from "../editor";
import { Stage } from "../stage";
import { styles } from "./application.styles";

@customElement("webwriter-blocks-application")
export class Application extends LitElementWw {
  @query("#editor")
  private editor!: Editor;

  @query("#stage")
  private stage!: Stage;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-split-panel": SlSplitPanel,
      "sl-icon": SlIcon,
      "webwriter-blocks-editor": Editor,
      "webwriter-blocks-stage": Stage,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public render(): TemplateResult {
    return html`
        <sl-split-panel position="66" @sl-reposition="${this.handleSplitPanelResize}">
            <sl-icon slot="divider" src="${GripVerticalIcon}"></sl-icon>
            <webwriter-blocks-editor slot="start" id="editor"></webwriter-blocks-editor>
            <webwriter-blocks-stage slot="end" id="stage"></webwriter-blocks-stage>
        </sl-split-panel>
    `;
  }

  private handleSplitPanelResize(): void {
    this.editor.resize();
    this.stage.resize();
  }
}

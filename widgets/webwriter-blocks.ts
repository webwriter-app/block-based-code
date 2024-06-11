import {html, TemplateResult} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement} from "lit/decorators.js"
import {Workspace} from "./components/workspace";

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  public static get scopedElements(): any {
    return {
      "webwriter-blocks-workspace": Workspace
    }
  }

  public render(): TemplateResult {
    return html`
      <div>
        <webwriter-blocks-workspace></webwriter-blocks-workspace>
      </div>
    `
  }
}
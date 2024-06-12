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

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          background-color: white;
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
        }
      `
    ]
  }

  public render(): TemplateResult {
    return html`
      <div>
        <webwriter-blocks-workspace></webwriter-blocks-workspace>
      </div>
    `
  }
}
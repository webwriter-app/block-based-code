import {html} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement} from "lit/decorators.js"

@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  render() {
    return html`Hello, world!`
  }
}
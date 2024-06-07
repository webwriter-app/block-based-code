import {css, html, TemplateResult} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement, query} from "lit/decorators.js"
import * as Blockly from "blockly";


@customElement("webwriter-blocks")
export class WebwriterBlocks extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  private workspace: Blockly.WorkspaceSvg;

  constructor() {
    super();
  }

  public render(): TemplateResult {
    return html`
      <div>
        <div id="block-canvas" style="width: 100%; height: 500px; background: red">
        </div>
      </div>
    `
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer: "zelos",
      toolbox: {
        kind: 'categoryToolbox',
        contents: [
          {
            "kind": "category",
            "name": "Control",
            "contents": [
              {
                "kind": "block",
                "type": "controls_if"
              },
            ]
          },
          {
            "kind": "category",
            "name": "Logic",
            "contents": [
              {
                "kind": "block",
                "type": "logic_compare"
              },
              {
                "kind": "block",
                "type": "logic_operation"
              },
              {
                "kind": "block",
                "type": "logic_boolean"
              }
            ]
          }
          // You can add more blocks to this array.
        ]
      }
    });
    this.shadowRoot.appendChild(document.getElementById("blockly-common-style"));
    this.shadowRoot.appendChild(document.getElementById("blockly-renderer-style-zelos-classic"))
    Blockly.svgResize(this.workspace);
  }
}
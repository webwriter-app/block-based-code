import {customElement, query} from "lit/decorators.js";
import {LitElementWw} from "@webwriter/lit";
import {html, TemplateResult} from "lit";
import * as Blockly from "blockly";

@customElement("webwriter-blocks-workspace")
export class Workspace extends LitElementWw {
    @query("#block-canvas")
    private blockCanvas!: HTMLDivElement;

    private workspace: Blockly.WorkspaceSvg;

    public render(): TemplateResult {
        return html`
            <div id="block-canvas" style="width: 100%; height: 500px;"></div>
        `;
    }

    protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.firstUpdated(_changedProperties);
        this.workspace = Blockly.inject(this.blockCanvas, {
            renderer: "zelos",
            theme: "zelos",
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
        DEV: console.log(Blockly);
        DEV: console.log(this.workspace);

        ["blockly-common-style", "blockly-renderer-style-zelos-zelos"].forEach((styleElementId) => {
            const styleElement = <HTMLStyleElement>document.getElementById(styleElementId);
            if (!styleElement) {
                DEV: console.error(`Style element with id ${styleElementId} not found`);
            }
            this.shadowRoot.appendChild(styleElement.cloneNode(true));
        })
        Blockly.svgResize(this.workspace);
    }
}
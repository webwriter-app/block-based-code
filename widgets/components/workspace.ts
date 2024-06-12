import { customElement, query } from "lit/decorators";
import { LitElementWw } from "@webwriter/lit";
import { html, TemplateResult } from "lit";
import * as Blockly from "blockly";
import * as De from "blockly/msg/de";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { Logger } from "../utils";

@customElement("webwriter-blocks-workspace")
export class Workspace extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  private workspace: Blockly.WorkspaceSvg;

  public render(): TemplateResult {
    return html`
            <div id="block-canvas" style="min-width: 100%; height: 500px;"></div>
        `;
  }

  public resize(): void {
    Blockly.svgResize(this.workspace);
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);
    Blockly.setLocale(De);

    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer: "zelos",
      theme: "zelos",
      sounds: false,
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Control",
            categoryStyle: "logic_category",
            contents: [
              {
                kind: "block",
                type: "controls_if",
              },
            ],
          },
          {
            kind: "category",
            name: "Logic",
            categoryStyle: "",
            contents: [
              {
                kind: "block",
                type: "logic_compare",
              },
              {
                kind: "block",
                type: "logic_operation",
              },
              {
                kind: "block",
                type: "logic_boolean",
              },
            ],
          },
          // You can add more blocks to this array.
        ],
      },
      plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
      },
    });

    ["blockly-common-style", "blockly-renderer-style-zelos-zelos"].forEach((styleElementId) => {
      const styleElement = <HTMLStyleElement>document.getElementById(styleElementId);
      if (!styleElement) {
        Logger.error(`Style element with id ${styleElementId} not found`);
      }
      this.shadowRoot.appendChild(styleElement.cloneNode(true));
    });
    Blockly.svgResize(this.workspace);
  }
}

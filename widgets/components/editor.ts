import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  css, CSSResult, html, TemplateResult,
} from "lit";
import * as Blockly from "blockly";
import * as de from "blockly/msg/de";
import * as en from "blockly/msg/en";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { Logger } from "../utils";

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  private workspace: Blockly.WorkspaceSvg;

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: block;
          height: calc(100% - 16px);
          padding: 8px 0 8px 8px;

          background-color: var(--sl-color-gray-100);
        }
        
        #block-canvas {
          border: 1px solid var(--sl-color-gray-300);
          border-radius: var(--sl-border-radius-medium);
          overflow: hidden;
        }

        .blocklyToolboxDiv {
          padding: 0;
          
          //background-color: var(--sl-color-gray-100);
          background-color: white;
          border-right: 1px solid var(--sl-color-gray-300);
          
          overflow-y: visible;
        }

        .blocklyTreeRow {
          margin-bottom: 0;
          padding: 8px 12px !important;
          
          transition: var(--sl-transition-medium);
          
          cursor: pointer;
        }

        .blocklyTreeRow:first-child {
          border-top: none;
        }
        
        .categoryBubble {
          border-color: var(--sl-color-gray-300);
          margin-bottom: 0;
        }
        
        .blocklyTreeLabel {
          margin-top: 4px;
          font-size: 14px;
        }

        .blocklyTreeSelected {
          background-color: var(--sl-color-primary-100) !important;
        }

        .blocklyTreeSelected .blocklyTreeLabel {
          color: black !important;
        }

        .blocklyFlyout {
          border-right: 1px solid var(--sl-color-gray-300);
        }
      
        .blocklyFlyoutBackground {
          fill: white;
          fill-opacity: 1;
        } 
      
        .blocklyWorkspace rect {
          stroke: none;
        }
      `,
    ];
  }

  public render(): TemplateResult {
    return html`
            <div id="block-canvas"></div>
        `;
  }

  public resize(): void {
    if (this.workspace) {
      Blockly.svgResize(this.workspace);
    }
  }

  protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.firstUpdated(_changedProperties);

    Blockly.setLocale({
      de,
      en,
    }[this.ownerDocument.documentElement.lang as "de" | "en"]);

    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer: "zelos",
      theme: "zelos",
      sounds: false,
      grid: {
        spacing: 20,
        length: 1,
        snap: true,
        colour: "var(--sl-color-gray-500)",
      },
      move: {
        wheel: true,
      },
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
    this.resize();
  }
}

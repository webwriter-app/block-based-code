import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import { CSSResult, html, TemplateResult } from "lit";
import * as Blockly from "blockly";
import * as de from "blockly/msg/de";
import * as en from "blockly/msg/en";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { Logger } from "../../utils";
import { styles } from "./styles";

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  private workspace?: Blockly.WorkspaceSvg;

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  constructor() {
    super();

    this.configureBlockly();
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

    const renderer = "zelos";
    const theme = "zelos";
    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer,
      theme,
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

    ["blockly-common-style", `blockly-renderer-style-${renderer}-${theme}`].forEach((styleElementId) => {
      const styleElement = <HTMLStyleElement>document.querySelector(`#${styleElementId}`);
      if (!styleElement) {
        Logger.error(`Style element with id ${styleElementId} not found`);
        return;
      }
      this.shadowRoot.appendChild(styleElement.cloneNode(true));
    });
    this.resize();
  }

  private configureBlockly(): void {
    Blockly.setLocale({
      de,
      en,
    }[this.ownerDocument.documentElement.lang as "de" | "en"]);
  }
}

import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import { CSSResult, html, TemplateResult } from "lit";
import * as Blockly from "blockly";
import * as de from "blockly/msg/de";
import * as en from "blockly/msg/en";
import { ContinuousFlyout, ContinuousMetrics, ContinuousToolbox } from "@blockly/continuous-toolbox";
import { consume } from "@lit/context";
import { PropertyValues } from "@lit/reactive-element";
import { Logger } from "../../utils";
import { styles } from "./editor.styles";
import { settingsContext } from "../../context";
import { Settings } from "../../types";
import "../../lib/blockly";

@customElement("webwriter-blocks-editor")
export class Editor extends LitElementWw {
  @query("#block-canvas")
  private blockCanvas!: HTMLDivElement;

  @consume({ context: settingsContext, subscribe: true })
  private settings: Settings;

  private resizeObserver: ResizeObserver;

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

  public connectedCallback() {
    super.connectedCallback();

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();

    this.resizeObserver.disconnect();
  }

  public render(): TemplateResult {
    return html`
        <div id="block-canvas"></div>
    `;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    const renderer = "zelos";
    const theme = "webwriter";
    this.workspace = Blockly.inject(this.blockCanvas, {
      renderer,
      theme,
      readOnly: !this.settings.contentEditable && this.settings.readonly,
      sounds: false,
      grid: {
        spacing: 16,
        length: 1,
        snap: true,
        colour: "var(--sl-color-gray-500)",
      },
      move: {
        wheel: true,
      },
      maxTrashcanContents: 0,
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Events",
            categoryStyle: "text_category",
            contents: [
              {
                kind: "block",
                type: "when_start_clicked",
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
    this.handleResize();
  }

  private configureBlockly(): void {
    Blockly.setLocale({
      de,
      en,
    }[this.ownerDocument.documentElement.lang as "de" | "en"]);
  }

  private handleResize(): void {
    if (this.workspace) {
      Blockly.svgResize(this.workspace);
    }
  }
}

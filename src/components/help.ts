import { query } from "lit/decorators.js";
import {
  CSSResult, html, TemplateResult,
} from "lit";
import { LitElementWw } from "@webwriter/lit";
import { widgetMsg } from "@webwriter/lit/localize";
import SlPopup from "@shoelace-style/shoelace/dist/components/popup/popup.component.js"
import QuestionMarkIcon from "@tabler/icons/outline/question-mark.svg";
import { ToolbarButton } from "./toolbar-button";
import { styles } from "./help.styles";

/**
 * The help component.
 */
export class Help extends LitElementWw {
  private readonly msg = widgetMsg(this);

  /**
   * The popup element.
   * @private
   */
  @query("sl-popup")
  private accessor popup!: SlPopup;

  static scopedElements = {
    "sl-popup": SlPopup,
    "webwriter-blocks-toolbar-button": ToolbarButton,
  };

  /**
   * @inheritDoc
   */
  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  /**
   * @inheritDoc
   */
  public render(): TemplateResult {
    const ctrlKey = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent) ? "cmd" : "ctrl";

    return html`
        <sl-popup placement="bottom-end"
                  arrow arrow-placement="anchor"
                  distance="8"
                  shift>
            <webwriter-blocks-toolbar-button slot="anchor"
                                             icon=${QuestionMarkIcon}
                                             label=${this.msg("Help")}
                                             @focus=${this.handleHelpButtonFocus} 
                                             @blur=${this.handleHelpButtonBlur}>
            </webwriter-blocks-toolbar-button>
            <article>
                <h1>${this.msg("Shortcuts")}</h1>
                <p>
                    <b>${ctrlKey}</b> + <b>c</b>: ${this.msg("Copy")} <br>
                    <b>${ctrlKey}</b> + <b>v</b>: ${this.msg("Paste")} <br>
                    <b>delete</b>: ${this.msg("Delete")}
                </p>
            </article>
        </sl-popup>
    `;
  }

  /**
   * Handles the focus event on the help button.
   * @private
   */
  private handleHelpButtonFocus(): void {
    this.popup.active = true;
  }

  /**
   * Handles the blur event on the help button.
   * @private
   */
  private handleHelpButtonBlur(): void {
    this.popup.active = false;
  }
}

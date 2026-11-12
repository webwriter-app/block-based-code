import { query } from "lit/decorators.js";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import SlPopup from "@shoelace-style/shoelace/dist/components/popup/popup.component.js"
import QuestionMarkIcon from "@tabler/icons/outline/question-mark.svg";
import { localizeElement, LocalizedElement } from "../../locales";
import { ToolbarButton } from "../toolbar-button";
import { styles } from "./help.styles";

/**
 * The help component.
 */
export class Help extends LocalizedElement {
  private readonly messages = localizeElement(this);
  /**
   * The popup element.
   * @private
   */
  @query("sl-popup")
  private accessor popup!: SlPopup;

  /**
   * @inheritDoc
   */
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-popup": SlPopup,
      "webwriter-blocks-toolbar-button": ToolbarButton,
    };
  }

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
                                             label=${this.messages.msg("HELP")}
                                             @focus=${this.handleHelpButtonFocus} 
                                             @blur=${this.handleHelpButtonBlur}>
            </webwriter-blocks-toolbar-button>
            <article>
                <h1>${this.messages.msg("SHORTCUTS")}</h1>
                <p>
                    <b>${ctrlKey}</b> + <b>c</b>: ${this.messages.msg("CONTROLS.CROSS_TAB_COPY")} <br>
                    <b>${ctrlKey}</b> + <b>v</b>: ${this.messages.msg("CONTROLS.CROSS_TAB_PASTE")} <br>
                    <b>delete</b>: ${this.messages.msg("CONTROLS.DELETE")}
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

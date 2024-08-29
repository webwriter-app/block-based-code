import { customElement, query } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import QuestionMarkIcon from "@tabler/icons/outline/question-mark.svg";
import { SlPopup } from "@shoelace-style/shoelace";
import { styles } from "./help.styles";
import { msg } from "../../locales";
import { ToolbarButton } from "../toolbar-button";

@customElement("webwriter-blocks-help")
export class Help extends LitElementWw {
  @query("sl-popup")
  private accessor popup!: SlPopup;

  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-popup": SlPopup,
      "webwriter-blocks-toolbar-button": ToolbarButton,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public render(): TemplateResult {
    const ctrlKey = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent) ? "cmd" : "ctrl";

    return html`
        <sl-popup placement="bottom-end"
                  arrow arrow-placement="anchor"
                  distance="8"
                  shift>
            <webwriter-blocks-toolbar-button slot="anchor"
                                             icon=${QuestionMarkIcon}
                                             label=${msg("HELP")}
                                             @focus=${this.handleHelpButtonFocus} 
                                             @blur=${this.handleHelpButtonBlur}>
            </webwriter-blocks-toolbar-button>
            <article>
                <h1>${msg("SHORTCUTS")}</h1>
                <p>
                    <b>${ctrlKey}</b> + <b>c</b>: ${msg("CONTROLS.CROSS_TAB_COPY")} <br>
                    <b>${ctrlKey}</b> + <b>v</b>: ${msg("CONTROLS.CROSS_TAB_PASTE")} <br>
                    <b>delete</b>: ${msg("CONTROLS.DELETE")}
                </p>
                <p>
                    <b>${ctrlKey}</b> + <b>+</b>: ${msg("ZOOM.IN")} <br>
                    <b>${ctrlKey}</b> + <b>-</b>: ${msg("ZOOM.OUT")}
                </p>
            </article>
        </sl-popup>
    `;
  }

  private handleHelpButtonFocus(): void {
    this.popup.active = true;
  }

  private handleHelpButtonBlur(): void {
    this.popup.active = false;
  }
}

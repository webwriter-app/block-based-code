import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import { CSSResult, html, TemplateResult } from "lit";
import { styles } from "./options.styles";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public render(): TemplateResult {
    return html`test`;
  }
}

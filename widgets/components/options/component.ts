import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  CSSResult, html, LitElement, TemplateResult,
} from "lit";
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js";
import { styles } from "./styles";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-checkbox": SlCheckbox,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  public render(): TemplateResult {
    return html`
      <sl-checkbox id="show-grid" @sl-input="${this.handleShowGridInput.bind(this)}">Show Grid</sl-checkbox>
    `;
  }

  private handleShowGridInput(event: Event): void {
    const checkbox = event.target as SlCheckbox;
    console.log(checkbox.checked);
  }
}

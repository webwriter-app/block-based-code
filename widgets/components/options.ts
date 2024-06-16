import { customElement } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import {
  css, CSSResult, html, LitElement, TemplateResult,
} from "lit";
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js";

@customElement("webwriter-blocks-options")
export class Options extends LitElementWw {
  public static get scopedElements(): Record<string, typeof LitElement> {
    return {
      "sl-checkbox": SlCheckbox,
    };
  }

  public static get styles(): CSSResult[] {
    return [
      css`
        :host {
            display: block;
            padding-left: 10px;
        }
      `,
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

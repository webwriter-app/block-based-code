import { ToolboxCategory } from "blockly";

export class WebWriterToolboxCategory extends ToolboxCategory {
  protected override createLabelDom_(name: string): Element {
    const label = document.createElement("span");
    label.setAttribute("id", `${this.getId()}.label`);
    label.textContent = name;
    label.classList.add(this.cssConfig_.label);
    return label;
  }

  protected override createIconDom_(): Element {
    const icon = document.createElement("div");
    icon.classList.add("categoryBubble");
    icon.style.backgroundColor = this.colour_;
    return icon;
  }

  protected override addColourBorder_(): void {

  }
}

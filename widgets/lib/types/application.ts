export abstract class Application {
  public container: HTMLDivElement;

  constructor() {
    this.createContainer();
  }

  public destroy(): void {
    this.container.remove();
  }

  protected createContainer(): void {
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    this.container.style.width = "100%";
    this.container.style.border = "1px solid var(--sl-color-gray-300)";
    this.container.style.borderRadius = "var(--sl-border-radius-medium)";
    this.container.style.overflow = "hidden";
    this.container.style.boxSizing = "border-box";
    this.container.style.backgroundColor = "var(--sl-color-neutral-0)";
  }
}

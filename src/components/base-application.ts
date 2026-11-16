/**
 * The application class is an abstract class that represents an application.
 * Applications are used to create an abstraction layer between web components and external libraries.
 * Every external library should have its own application class that extends this class.
 */
export abstract class Application {
  /**
   * The container element of the application.
   */
  public container: HTMLDivElement;

  constructor() {
    this.createContainer();
  }

  /**
   * Destroys the application.
   */
  public destroy(): void {
    this.container.remove();
  }

  /**
   * Hides the stage application. This method should be overridden in the child class.
   */
  public abstract resize(): void;

  /**
   * Creates the container element of the application.
   */
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

/**
 * The VirtualMachine class is an abstract class that provides a simple interface to run code in a worker.
 */
export abstract class VirtualMachine {
  /**
   * The worker instance.
   * @private
   */
  private worker?: Worker;

  /**
   * The highlight callback function. This function is called when the worker wants to highlight a block.
   * @private
   */
  private highlightCallback: ((id: string) => void) | undefined;

  /**
   * The complete resolve function. This function is called when the worker is stopped.
   * @private
   */
  private completeResolveFunction: () => void;

  /**
   * Starts the worker with the given code and delay.
   * @param code The code to run in the worker.
   * @param delay The delay between each step in milliseconds.
   */
  public async start(code: string, delay: number): Promise<void> {
    this.stop();

    this.initWorker(code, delay);
    await new Promise<void>((resolve) => {
      this.completeResolveFunction = resolve;
    });
  }

  /**
   * Stops the worker.
   */
  public stop(): void {
    if (!this.worker) return;

    this.highlight(null);
    if (this.completeResolveFunction) {
      this.completeResolveFunction();
    }
    this.completeResolveFunction = undefined;
    this.worker.terminate();
  }

  /**
   * Sets the highlight callback function.
   * @param callback The highlight callback function.
   */
  public setHighlightCallback(callback: (id: string) => void): void {
    this.highlightCallback = callback;
  }

  /**
   * The callables that can be called from the worker. This method should be overridden in the child class.
   * @protected
   */
  protected abstract get callables(): ((...args: any[]) => void)[];

  /**
   * Initializes the worker with the given code and delay.
   * @param code The code to run in the worker.
   * @param delay The delay between each step in milliseconds.
   * @private
   */
  private initWorker(code: string, delay: number): void {
    const script = this.generateWorkerScript(code, delay);
    const url = this.generateWorkerScriptUrl(script);
    this.worker = new Worker(url);
    this.worker.onmessage = (event: MessageEvent<{ type: string, args: any[] }>) => {
      if (event.data.type === "complete") {
        this.stop();
        return;
      }

      const result = this[event.data.type](...event.data.args);
      if (result != null) {
        this.worker.postMessage({ type: "result", args: [result] });
      }
    };
  }

  /**
   * Generates the worker script with the given code and delay.
   * @param code The code to run in the worker.
   * @param delay The delay between each step in milliseconds.
   * @private
   */
  private generateWorkerScript(code: string, delay: number): string {
    let script = "";
    script += "let resultResolveFunction;\n";
    script += "async function wait(s) { await new Promise((resolve) => { setTimeout(resolve, s * 1e3) }); }\n";
    script += `async function delay() { await new Promise((resolve) => { setTimeout(resolve, ${delay === 0 ? 16.6 : delay}) }); }\n`;
    script += "onmessage = function (event) { if (event.data.type === 'result') { resultResolveFunction(event.data.args[0]); } };\n";

    [
      this.highlight,
      this.stop,
      ...this.callables,
    ].forEach((callable) => {
      const args = Array(callable.length).fill("x").map((x, i) => `${x}${i}`).join(", ");
      const message = `{ type: "${callable.name}", args: [${args}] }`;
      if (callable.name.startsWith("get")) {
        script += `async function ${callable.name}(${args}) { postMessage(${message.toString()}); return await new Promise((resolve) => { resultResolveFunction = resolve; }); } \n`;
      } else {
        script += `function ${callable.name}(${args}) { postMessage(${message.toString()}); } \n`;
      }
    });
    script += "(async function () {\n";
    script += code;
    script += "postMessage({ type: 'complete', args: [] });\n";
    script += "})()\n";
    return script;
  }

  /**
   * Generates the blob URL from the given script.
   * @param script The script to run in the worker.
   * @private
   */
  private generateWorkerScriptUrl(script: string): string {
    const blob = new Blob([script], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }

  /**
   * Highlights the block with the given id.
   * @param id The id of the block to highlight.
   * @private
   */
  private highlight(id: string): void {
    if (this.highlightCallback) {
      this.highlightCallback(id);
    }
  }
}

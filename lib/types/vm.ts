/**
 * The VirtualMachine class is an abstract class that provides a simple interface to run code in a worker.
 */
export abstract class VirtualMachine {
  /**
   * Map of event types to their worker instances.
   * @private
   */
  private workers: Map<string, Worker> = new Map();

  /**
   * Map of event types to their complete resolve functions.
   * @private
   */
  private completeResolveFunctions: Map<string, () => void> = new Map();

  /**
   * The highlight callback function. This function is called when the worker wants to highlight a block.
   * @private
   */
  private highlightCallback: ((id: string) => void) | undefined;

  /**
   * The execution state callback function. This function is called when the execution state changes.
   * @private
   */
  private executionStateCallback: ((runningEventTypes: Set<string>) => void) | undefined;

  /**
   * Starts the worker with the given code and delay.
   * @param code The code to run in the worker.
   * @param delay The delay between each step in milliseconds.
   * @param eventType The event type to trigger (e.g., "whenStartClicked", "whenSpriteClicked").
   */
  public async start(code: string, delay: number, eventType: string = "whenStartClicked"): Promise<void> {
    // Stop any existing worker for this event type
    this.stopEvent(eventType);

    this.initWorker(code, delay, eventType);

    // Notify about execution state change
    if (this.executionStateCallback) {
      this.executionStateCallback(new Set(this.workers.keys()));
    }

    await new Promise<void>((resolve) => {
      this.completeResolveFunctions.set(eventType, resolve);
    });
  }

  /**
   * Stops a specific event worker.
   * @param eventType The event type to stop.
   */
  public stopEvent(eventType: string): void {
    const worker = this.workers.get(eventType);
    if (!worker) return;

    this.highlight(null);
    const resolveFunction = this.completeResolveFunctions.get(eventType);
    if (resolveFunction) {
      resolveFunction();
    }
    this.completeResolveFunctions.delete(eventType);
    worker.terminate();
    this.workers.delete(eventType);

    // Notify about execution state change
    if (this.executionStateCallback) {
      this.executionStateCallback(new Set(this.workers.keys()));
    }
  }

  /**
   * Stops all workers.
   */
  public stop(): void {
    for (const eventType of this.workers.keys()) {
      this.stopEvent(eventType);
    }
  }

  /**
   * Resets the stage to its initial state.
   */
  public abstract reset(): void;

  /**
   * Sets the highlight callback function.
   * @param callback The highlight callback function.
   */
  public setHighlightCallback(callback: (id: string) => void): void {
    this.highlightCallback = callback;
  }

  /**
   * Sets the execution state callback function.
   * @param callback The execution state callback function. Receives a Set of currently running event types.
   */
  public setExecutionStateCallback(callback: (runningEventTypes: Set<string>) => void): void {
    this.executionStateCallback = callback;
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
   * @param eventType The event type to trigger.
   * @private
   */
  private initWorker(code: string, delay: number, eventType: string): void {
    const script = this.generateWorkerScript(code, delay, eventType);
    const url = this.generateWorkerScriptUrl(script);
    const worker = new Worker(url);
    this.workers.set(eventType, worker);

    worker.onmessage = async (event: MessageEvent<{ type: string, args: any[] }>) => {
      if (event.data.type === "complete") {
        this.stopEvent(eventType);
        return;
      }

      const result = this[event.data.type](...event.data.args);
      if (result != null) {
        if (result instanceof Promise) {
          const resolvedValue = await result;
          worker.postMessage({ type: "result", args: [resolvedValue] });
        } else {
          worker.postMessage({ type: "result", args: [result] });
        }
      }
    };
  }

  /**
   * Generates the worker script with the given code and delay.
   * @param code The code to run in the worker.
   * @param delay The delay between each step in milliseconds.
   * @param eventType The event type to trigger.
   * @private
   */
  private generateWorkerScript(code: string, delay: number, eventType: string): string {
    let script = "";
    script += "let resultResolveFunction;\n";
    script += "async function wait(s) { await new Promise((resolve) => { setTimeout(resolve, s * 1e3) }); }\n";
    script += `async function delay() { await new Promise((resolve) => { setTimeout(resolve, ${delay === 0 ? 16.6 : delay}) }); }\n`;
    script += "function random(from, to) { return Math.floor(Math.random() * (to - from + 1)) + from; }\n";
    script += "onmessage = function (event) { if (event.data.type === 'result') { resultResolveFunction(event.data.args[0]); } };\n";

    [
      this.highlight,
      this.stop,
      ...this.callables,
    ].forEach((callable) => {
      const args = Array(callable.length).fill("x").map((x, i) => `${x}${i}`).join(", ");
      const message = `{ type: "${callable.name}", args: [${args}] }`;
      if (callable.name.startsWith("get") || callable.name.includes("UntilDone")) {
        script += `async function ${callable.name}(${args}) { postMessage(${message.toString()}); return await new Promise((resolve) => { resultResolveFunction = resolve; }); } \n`;
      } else {
        script += `function ${callable.name}(${args}) { postMessage(${message.toString()}); } \n`;
      }
    });
    script += "(async function () {\n";
    script += code;
    script += `if (typeof ${eventType} === 'function') { await ${eventType}(); }\n`;
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

export abstract class VirtualMachine {
  private worker?: Worker;

  private highlightCallback: (id: string) => void;

  public start(code: string, delay: number): void {
    this.initWorker(code, delay);
  }

  public stop(): void {
    if (!this.worker) return;

    this.highlight(null);
    this.worker.terminate();
  }

  public setHighlightCallback(callback: (id: string) => void): void {
    this.highlightCallback = callback;
  }

  protected get callables(): ((...args: any[]) => void)[] {
    return [
      this.highlight,
      this.stop,
    ];
  }

  private initWorker(code: string, delay: number): void {
    const script = this.generateWorkerScript(code, delay);
    const url = this.generateWorkerScriptUrl(script);
    this.worker = new Worker(url);
    this.worker.onmessage = (event: MessageEvent<{ type: string, args: any[] }>) => {
      const result = this[event.data.type](...event.data.args);
      if (result) {
        this.worker.postMessage({ type: "result", args: [result] });
      }
    };
  }

  private generateWorkerScript(code: string, delay: number): string {
    let script = "";
    script += "let resultResolveFunction;\n";
    script += "async function wait(s) { await new Promise((resolve) => { setTimeout(resolve, s * 1e3) }); }\n";
    script += `async function delay() { await new Promise((resolve) => { setTimeout(resolve, ${delay === 0 ? 40 : delay}) }); }\n`;
    script += "onmessage = function (event) { if (event.data.type === 'result') { resultResolveFunction(event.data.args[0]); } };\n";

    this.callables.forEach((callable) => {
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
    script += "highlight(null);\n";
    script += "})()\n";
    return script;
  }

  private generateWorkerScriptUrl(script: string): string {
    const blob = new Blob([script], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }

  private highlight(id: string): void {
    if (this.highlightCallback) {
      this.highlightCallback(id);
    }
  }
}
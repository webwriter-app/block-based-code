export abstract class VirtualMachine {
  private worker: Worker;

  protected constructor() {
    this.initWorker();
  }

  public start(code: string): void {
    this.worker.postMessage(code);
  }

  public stop(): void {
    this.worker.terminate();
    this.initWorker();
  }

  protected get callables(): ((...args: any[]) => void)[] {
    return [
      this.highlight,
    ];
  }

  private initWorker(): void {
    const script = this.generateWorkerScript();
    const url = this.generateWorkerScriptUrl(script);
    this.worker = new Worker(url);
    this.worker.onmessage = (event: MessageEvent<{ type: string, args: any[] }>) => {
      this[event.data.type](...event.data.args);
    };
  }

  private generateWorkerScript(): string {
    let script = "";
    script += "function wait(s) { const n = Date.now(); while(Date.now() < n + s * 1e3) {} } \n";
    script += "function delay(ms) { const n = Date.now(); while(Date.now() < n + ms) {} } \n";
    this.callables.forEach((callable) => {
      const args = Array(callable.length).fill("x").map((x, i) => `${x}${i}`).join(", ");
      const message = `{ type: "${callable.name}", args: [${args}] }`;
      script += `function ${callable.name}(${args}) { postMessage(${message.toString()}); } \n`;
    });
    script += "onmessage = function(event) { console.log(event.data); eval(event.data); highlight(null); } \n";
    return script;
  }

  private generateWorkerScriptUrl(script: string): string {
    const blob = new Blob([script], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }

  private highlight(id: string): void {
    console.log("HIGHLIGHTING BLOCK:", id);
  }
}

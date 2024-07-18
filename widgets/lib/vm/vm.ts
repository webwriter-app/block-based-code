import worker from "./worker";
import { ICommandMessge, IStartMessage } from "./types/message";
import { ICommandReceiver } from "../types/command";

export class VirtualMachine {
  public code: string = "";

  private commandReceiver: Set<ICommandReceiver<string>>;

  private worker: Worker;

  constructor() {
    this.commandReceiver = new Set();
    this.initWorker();
  }

  public registerCommandReceiver(receiver: ICommandReceiver<string>): void {
    this.commandReceiver.add(receiver);
  }

  public unregisterCommandReceiver(receiver: ICommandReceiver<string>): void {
    this.commandReceiver.delete(receiver);
  }

  public run(): void {
    const message: IStartMessage = { type: "start", code: this.code };
    this.worker.postMessage(message);
  }

  public stop(): void {
    this.sendCommand("highlight", null);
    this.worker.terminate();
    this.initWorker();
  }

  private initWorker(): void {
    this.worker = new Worker(worker);
    this.worker.onmessage = (event: MessageEvent<ICommandMessge>) => {
      switch (event.data.type) {
        case "command":
          this.sendCommand(event.data.command, ...event.data.args);
          break;
        default:
          break;
      }
    };
  }

  private sendCommand(command: string, ...args: unknown[]): void {
    this.commandReceiver.forEach((receiver) => {
      receiver.command(command, ...args);
    });
  }
}

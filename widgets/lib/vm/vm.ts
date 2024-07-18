import worker from "./worker";
import { IHighlightMessage, IStartMessage } from "./types/message";
import { ICommandReceiver } from "../types/command";
import { Logger } from "../../utils";

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
    this.worker.terminate();
    this.initWorker();
  }

  private initWorker(): void {
    this.worker = new Worker(worker);
    this.worker.onmessage = (event: MessageEvent<IHighlightMessage>) => {
      this.commandReceiver.forEach((receiver) => {
        switch (event.data.type) {
          case "highlight":
            receiver.command("highlight", event.data.id);
            break;
          default:
            Logger.log("Unknown message type", event.data.type);
        }
      });
    };
  }
}

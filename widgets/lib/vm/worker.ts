import type { IStartMessage } from "./types/message";

// eslint-disable-next-line import/no-default-export
export default URL.createObjectURL(new Blob([
  (function () {
    const Logger = {
      log: (...args: any[]) => {
        console.log("[WEBWRITER-BLOCKS] [WORKER]", ...args);
      },
    };

    const highlight = (id: string) => {
      Logger.log("Highlighting block", id);
      postMessage({ type: "highlight", id });
    };

    const wait = (seconds: number) => {
      Logger.log("Waiting", seconds, "seconds");
      const now = Date.now();
      while (Date.now() < now + seconds * 1000) {
        // Wait
      }
      Logger.log("Waited", seconds, "seconds");
    };

    const delay = (ms: number) => {
      Logger.log("Delaying", ms, "milliseconds");
      const now = Date.now();
      while (Date.now() < now + ms) {
        // Wait
      }
    };

    const start = (message: IStartMessage) => {
      Logger.log("Starting code execution...");
      // eslint-disable-next-line no-eval
      eval(message.code);
      Logger.log("Code executed successfully");
      highlight(null);
    };

    onmessage = function (event: MessageEvent<IStartMessage>) {
      switch (event.data.type) {
        case "start":
          start(event.data);
          break;
        default:
          Logger.log("Unknown message type", event.data.type);
          break;
      }
    };
  }).toString().slice(12, -1),
], { type: "text/javascript" }));

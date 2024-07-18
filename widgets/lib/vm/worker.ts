import type { ICommandMessge, IStartMessage } from "./types/message";

const workerFunction = (function () {
  const Logger = {
    log: (...args: any[]) => {
      console.log("[WEBWRITER-BLOCKS] [WORKER]", ...args);
    },
  };

  const postCommandMessage = (command: string, ...args: unknown[]) => {
    const message: ICommandMessge = {
      type: "command",
      command,
      args,
    };
    postMessage(message);
  };

  const highlight = (id: string) => {
    Logger.log("Highlighting block", id);
    postCommandMessage("highlight", id);
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

  const move = (steps: number) => {
    Logger.log("Moving", steps, "steps");
    postCommandMessage("move", steps);
  };

  const rotate = (degrees: number) => {
    Logger.log("Rotating", degrees, "degrees");
    postCommandMessage("rotate", degrees);
  };

  const goToX = (x: number) => {
    Logger.log("Going to x", x);
    postCommandMessage("set_x", x);
  };

  const goToY = (y: number) => {
    Logger.log("Going to y", y);
    postCommandMessage("set_y", y);
  };

  const goToXY = (x: number, y: number) => {
    Logger.log("Going to x", x, "y", y);
    postCommandMessage("set_xy", x, y);
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
});

const workerString = workerFunction.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

// eslint-disable-next-line import/no-default-export
export default URL.createObjectURL(new Blob([
  workerString,
], { type: "text/javascript" }));

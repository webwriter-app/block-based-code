export type Command = "start" | "stop" | "highlight";

export interface IApplication {
  command(command: "start"): void;
  command(command: "stop"): void;
  command(command: "highlight", id: string): void;
  command(command: Command, ...args: unknown[]): void;
}

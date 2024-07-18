interface IMessage {
  type: string;
}

export interface IStartMessage extends IMessage {
  type: "start";
  code: string;
}

export interface ICommandMessge extends IMessage {
  type: "command";
  command: string;
  args: unknown[];
}

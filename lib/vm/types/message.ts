interface IMessage {
  type: string;
}

export interface IStartMessage extends IMessage {
  type: "start";
  code: string;
}

export interface IValueMessage extends IMessage {
  type: "value";
  value: [string, number | string];
}

export interface ICommandMessge extends IMessage {
  type: "command";
  command: string;
  args: unknown[];
}

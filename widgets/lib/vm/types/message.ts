interface IMessage {
  type: string;
}

export interface IStartMessage extends IMessage {
  type: "start";
  code: string;
}

export interface IHighlightMessage extends IMessage {
  type: "highlight";
  id: string;
}

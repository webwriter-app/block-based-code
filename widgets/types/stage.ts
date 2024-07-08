export interface IStage {
  start(): void;
  stop(): void;
}

export enum StageType {
  CANVAS = "canvas",
  CODE_EDITOR = "code-editor",
  TEST = "test",
}

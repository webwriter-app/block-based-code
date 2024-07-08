export interface IStage {
  start(): void;
  stop(): void;

  get blocks(): string[];
}

export interface IApplication<Commands extends string> {
  command(command: Commands, ...args: unknown[]): void;
}

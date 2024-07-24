export interface ICommandReceiver<Commands extends string> {
  command(command: Commands, ...args: any[]): void;
}

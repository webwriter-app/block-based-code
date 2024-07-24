// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars,no-console,no-unused-labels,no-restricted-syntax,no-labels */
import { toKebabCase } from "./string";

const base = "[webwriter-blocks]".toUpperCase();

export const Logger = {
  log: (origin: {
    constructor: {
      name: string
    };
  }, ...args: any[]) => {
    DEV: console.log(`${base} [${toKebabCase(origin.constructor.name).toUpperCase()}]`, ...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
  warn: (...args: any[]) => {
    console.warn(...args);
  },
  info: (...args: any[]) => {
    console.info(...args);
  },
  debug: (...args: any[]) => {
    console.debug(base, ...args);
  },
  assert(condition?: boolean, ...data: any[]): void {
    throw new Error("Function not implemented.");
  },
  clear(): void {
    throw new Error("Function not implemented.");
  },
  count(label?: string): void {
    throw new Error("Function not implemented.");
  },
  countReset(label?: string): void {
    throw new Error("Function not implemented.");
  },
  dir(item?: any, options?: any): void {
    throw new Error("Function not implemented.");
  },
  dirxml(...data: any[]): void {
    throw new Error("Function not implemented.");
  },
  group(...data: any[]): void {
    throw new Error("Function not implemented.");
  },
  groupCollapsed(...data: any[]): void {
    throw new Error("Function not implemented.");
  },
  groupEnd(): void {
    throw new Error("Function not implemented.");
  },
  table(tabularData?: any, properties?: string[]): void {
    throw new Error("Function not implemented.");
  },
  time(label?: string): void {
    throw new Error("Function not implemented.");
  },
  timeEnd(label?: string): void {
    throw new Error("Function not implemented.");
  },
  timeLog(label?: string, ...data: any[]): void {
    throw new Error("Function not implemented.");
  },
  timeStamp(label?: string): void {
    throw new Error("Function not implemented.");
  },
  trace(...data: any[]): void {
    throw new Error("Function not implemented.");
  },
};

// lit-localize generates this module as JavaScript.
declare module "*/locale-codes.js" {
  export const sourceLocale: string;
  export const targetLocales: readonly string[];
}
declare module "@webwriter/build/test" {
  export function getMochaConfig(): Mocha.MochaOptions;
}

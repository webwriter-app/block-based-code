import { BlockStyle, CategoryStyle } from "../theme";

export interface BlockDefinition {
  type: `${CategoryStyle}:${string}`;
  category: CategoryStyle;
  style: BlockStyle;

  [key: `message${number}`]: string;
  [key: `args${number}`]: {
    type: string;
    name?: Uppercase<string>;
    check?: "Number" | "String" | "Boolean";
    value?: string | number;
  }[];
  [key: string]: unknown;
}

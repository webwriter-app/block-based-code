import { BlockStyle, CategoryStyle } from "./theme";

/**
 * The block definition type.
 */
export interface BlockDefinition {
  type: `${CategoryStyle}:${string}`;
  category: CategoryStyle | null;
  style: BlockStyle | null;

  [key: `message${number}`]: string | undefined;
  [key: `args${number}`]: {
    type: string;
    name?: Uppercase<string>;
    check?: "Number" | "String" | "Boolean" | ("Number" | "String" | "Boolean")[];
    value?: string | number;
    text?: string;
    options?: [string, string][];
    src?: string;
    width?: number;
    height?: number;
    alt?: string;
  }[] | undefined;
  [key: string]: unknown;
}

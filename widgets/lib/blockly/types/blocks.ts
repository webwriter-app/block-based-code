import { BlockStyle, CategoryStyle } from "../theme";

export interface BlockDefinition {
  type: `${CategoryStyle}:${string}`;
  category: CategoryStyle;
  style: BlockStyle;

  [key: string]: unknown;
}

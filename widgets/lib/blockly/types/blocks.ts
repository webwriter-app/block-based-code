import { BlockStyle, CategoryStyle } from "../theme";

export interface Block {
  type: `${CategoryStyle}:${string}`;
  category: CategoryStyle;
  style: BlockStyle;

  [key: string]: unknown;
}

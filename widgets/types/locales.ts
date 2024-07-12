import { CategoryTypes } from "../lib/blockly";

export const languages = ["en", "de"] as const;
export type Lang = typeof languages[number];

export type Dictionary = {
  START: string;
  STOP: string;
  FULLSCREEN: string;
  FULLSCREEN_EXIT: string;
  ERROR: string;
  OPTIONS: {
    READONLY: string;
    STAGE: string;
    AVAILABLE_BLOCKS: string;
  }
  BLOCKS: Partial<Record<Uppercase<string>, string>>
  CATEGORY: Partial<Record<Uppercase<CategoryTypes>, string>>
};
export type Dictionaries = Record<Lang, Dictionary>;

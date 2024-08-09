import { CategoryTypes } from "../lib/blockly";
import { StageType } from "./stage";

export const languages = ["en", "de"] as const;
export type Lang = typeof languages[number];

export type Dictionary = {
  START: string;
  RESTART: string;
  STOP: string;
  FULLSCREEN: string;
  FULLSCREEN_EXIT: string;
  ERROR: string;
  EXECUTION_OPTIONS: string;
  ZOOM: {
    IN: string;
    OUT: string;
    RESET: string;
  };
  OPTIONS: {
    READONLY: string;
    STAGE: string;
    STAGE_TYPES: Record<Uppercase<StageType | "code">, string>;
    AVAILABLE_BLOCKS: string;
  }
  BLOCKS: Partial<Record<Uppercase<string>, string>>
  CATEGORY: Partial<Record<Uppercase<CategoryTypes>, string>>
};
export type Dictionaries = Record<Lang, Dictionary>;

import { CategoryTypes } from "../lib/blockly";
import { StageType } from "./stage";

/**
 * The available languages.
 */
export const languages = ["en", "de"] as const;

/**
 * The type of the available languages.
 */
export type Lang = typeof languages[number];

/**
 * The type of dictionary for widget.
 */
export type Dictionary = {
  START: string;
  RESTART: string;
  STOP: string;
  FULLSCREEN: string;
  FULLSCREEN_EXIT: string;
  HELP: string;
  ERROR: string;
  EXECUTION_OPTIONS: string;
  SHORTCUTS: string;
  ZOOM: {
    IN: string;
    OUT: string;
    RESET: string;
  };
  OPTIONS: {
    READONLY: string;
    READONLY_TOOLTIP: string;
    STAGE: string;
    STAGE_TOOLTIP: string;
    STAGE_TYPES: Record<Uppercase<StageType | "code">, string>;
    AVAILABLE_BLOCKS: string;
    AVAILABLE_BLOCKS_TOOLTIP: string;
  }
  CONTROLS: {
    DUPLICATE_BLOCK: string;
    CROSS_TAB_COPY: string;
    CROSS_TAB_PASTE: string;
    DELETE: string;
  };
  BLOCKS: Partial<Record<Uppercase<string>, string>>
  CATEGORY: Partial<Record<Uppercase<CategoryTypes>, string>>
};

/**
 * The type of dictionaries for the widget.
 */
export type Dictionaries = Record<Lang, Dictionary>;

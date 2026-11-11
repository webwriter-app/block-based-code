import { CategoryTypes } from "../lib/blockly";
import { StageType } from "./stage";

/**
 * The available languages.
 */
export const languages = ["en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN", "ar", "bg", "zh", "zh-Hans", "zh-Hant", "hr", "cs", "da", "nl", "et", "fi", "fr", "de", "el", "hu", "ga", "it", "lv", "lt", "mt", "pl", "pt", "pt-PT", "pt-BR", "ro", "ru", "sk", "sl", "es", "sv", "fa", "hi", "ja", "ko", "no", "nb", "nn", "tr", "uk", "sr", "sr-Cyrl", "sr-Latn", "sr-ijekavsk", "cnr", "sq", "mk", "is", "bs", "ca", "ca-ES-valencia", "eu", "gl", "cy", "lb", "bn", "pa", "gu", "mr", "te", "ur", "kn", "or", "ne", "si", "ta", "ml", "ps", "jv", "id", "ms", "tl", "my", "th", "lo", "vi", "km", "kk", "ky", "mn", "uz", "tg", "ka", "hy", "he", "az", "tk", "dv", "be", "la", "tpi", "am", "om", "so", "ti", "sw", "ha", "yue-Hans", "yue-Hant", "kmr", "kmr-Latn", "kmr-Arab", "ckb", "ckb-Arab", "af-ZA", "af-NA"] as const;

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
  RESET_STAGE: string;
  SHORTCUTS: string;
  DIALOG: { CANCEL: string; SAVE: string; NO: string; YES: string; OK: string };
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
  BLOCKLY?: Record<string, string>;
  CATEGORY: Partial<Record<Uppercase<NonNullable<CategoryTypes> | "variables">, string>>
};

/**
 * The type of dictionaries for the widget.
 */
export type Dictionaries = Partial<Record<Lang, Partial<Dictionary>>>;

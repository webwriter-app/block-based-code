export const languages = ["en", "de"] as const;
export type Lang = typeof languages[number];

export type Dictionary = {
  START: string;
  STOP: string;
  FULLSCREEN: string;
  FULLSCREEN_EXIT: string;
  ERROR: string;
  AVAILABLE_BLOCKS: string;
  BLOCKS: {
    [key: string]: string;
  }
};
export type Dictionaries = Record<Lang, Dictionary>;

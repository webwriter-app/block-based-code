export const languages = ["en", "de"] as const;
export type Lang = typeof languages[number];

export type Dictionary = {
  start: string;
  stop: string;
  fullscreen: string;
  fullscreenExit: string;
  error: string;
  availableBlocks: string;
};
export type Dictionaries = Record<Lang, Dictionary>;

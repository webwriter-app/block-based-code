import de from "./de";
import en from "./en";
import { Logger } from "../utils";

const languages = ["en", "de"] as const;

type Lang = typeof languages[number];
type Dictionary = {
  start: string;
  stop: string;
  fullscreen: string;
  fullscreenExit: string;
  error: string;
};
type Dictionaries = Record<Lang, Dictionary>;

const dictionaries: Dictionaries = {
  de,
  en,
};
let currentLang: Lang;

export const setLocale = (lang: string) => {
  if (!(languages as readonly string[]).includes(lang)) {
    throw new Error(`Invalid locale: ${lang}`);
  }
  Logger.info(`Setting locale to: ${lang}`);
  currentLang = lang as Lang;
};

export const msg = (key: keyof Dictionary) => dictionaries[currentLang][key];
import de from "./de";
import en from "./en";

const languages = ["en", "de"] as const;

type Lang = typeof languages[number];
type Dictionary = {
  start: string;
  stop: string;
  fullscreen: string;
  fullscreenExit: string;
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
  currentLang = lang as Lang;
};

export const msg = (key: keyof Dictionary) => dictionaries[currentLang][key];

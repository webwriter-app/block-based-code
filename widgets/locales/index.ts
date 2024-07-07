import * as Blockly from "blockly";
import * as blocklyDe from "blockly/msg/de";
import * as blocklyEn from "blockly/msg/en";
import { get } from "lodash";
import { Logger } from "../utils";
import {
  Dictionaries, Dictionary, Lang, languages,
} from "../types";

import { blocks as blocksDe, dictionary as webwriterDe } from "./de";
import { blocks as blocksEn, dictionary as webwriterEn } from "./en";
import { Leaves } from "../types/leaves";

export const dictionaries: Dictionaries = {
  de: webwriterDe,
  en: webwriterEn,
};
let currentLang: Lang;

export const setLocale = (lang: string) => {
  if (!(languages as readonly string[]).includes(lang)) {
    throw new Error(`Invalid locale: ${lang}`);
  }
  Logger.info(`Setting locale to: ${lang}`);
  currentLang = lang as Lang;
  Blockly.setLocale({
    de: {
      ...blocklyDe,
      ...blocksDe,
    },
    en: {
      ...blocklyEn,
      ...blocksEn,
    },
  }[lang]);
  console.log(Blockly.Msg);
};

export const msg = (key: Leaves<Dictionary>) => get(dictionaries[currentLang], key);

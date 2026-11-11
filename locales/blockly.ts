// Blockly ships a broad set of core UI translations. The 15 locale tags absent
// from Blockly v11 use the explicitly selected closest available catalog below;
// the widget's own messages still resolve independently per element.
import * as locale_af from "blockly/msg/af";
import * as locale_kuLatn from "blockly/msg/ku-latn";
import * as locale_0 from "blockly/msg/am";
import * as locale_1 from "blockly/msg/ar";
import * as locale_2 from "blockly/msg/az";
import * as locale_3 from "blockly/msg/be";
import * as locale_4 from "blockly/msg/bg";
import * as locale_5 from "blockly/msg/bn";
import * as locale_6 from "blockly/msg/bs";
import * as locale_7 from "blockly/msg/ca";
import * as locale_8 from "blockly/msg/cs";
import * as locale_9 from "blockly/msg/da";
import * as locale_10 from "blockly/msg/de";
import * as locale_11 from "blockly/msg/el";
import * as locale_12 from "blockly/msg/en";
import * as locale_13 from "blockly/msg/en-gb";
import * as locale_14 from "blockly/msg/es";
import * as locale_15 from "blockly/msg/et";
import * as locale_16 from "blockly/msg/eu";
import * as locale_17 from "blockly/msg/fa";
import * as locale_18 from "blockly/msg/fi";
import * as locale_19 from "blockly/msg/fr";
import * as locale_20 from "blockly/msg/gl";
import * as locale_21 from "blockly/msg/ha";
import * as locale_22 from "blockly/msg/he";
import * as locale_23 from "blockly/msg/hi";
import * as locale_24 from "blockly/msg/hr";
import * as locale_25 from "blockly/msg/hu";
import * as locale_26 from "blockly/msg/hy";
import * as locale_27 from "blockly/msg/id";
import * as locale_28 from "blockly/msg/is";
import * as locale_29 from "blockly/msg/it";
import * as locale_30 from "blockly/msg/ja";
import * as locale_31 from "blockly/msg/ka";
import * as locale_32 from "blockly/msg/km";
import * as locale_33 from "blockly/msg/kn";
import * as locale_34 from "blockly/msg/ko";
import * as locale_35 from "blockly/msg/ky";
import * as locale_36 from "blockly/msg/la";
import * as locale_37 from "blockly/msg/lb";
import * as locale_38 from "blockly/msg/lo";
import * as locale_39 from "blockly/msg/lt";
import * as locale_40 from "blockly/msg/lv";
import * as locale_41 from "blockly/msg/mk";
import * as locale_42 from "blockly/msg/ml";
import * as locale_43 from "blockly/msg/ms";
import * as locale_44 from "blockly/msg/my";
import * as locale_45 from "blockly/msg/nb";
import * as locale_46 from "blockly/msg/ne";
import * as locale_47 from "blockly/msg/nl";
import * as locale_48 from "blockly/msg/pa";
import * as locale_49 from "blockly/msg/pl";
import * as locale_50 from "blockly/msg/ps";
import * as locale_51 from "blockly/msg/pt";
import * as locale_52 from "blockly/msg/pt-br";
import * as locale_53 from "blockly/msg/ro";
import * as locale_54 from "blockly/msg/ru";
import * as locale_55 from "blockly/msg/si";
import * as locale_56 from "blockly/msg/sk";
import * as locale_57 from "blockly/msg/sl";
import * as locale_58 from "blockly/msg/sq";
import * as locale_59 from "blockly/msg/sr";
import * as locale_60 from "blockly/msg/sr-latn";
import * as locale_61 from "blockly/msg/sv";
import * as locale_62 from "blockly/msg/sw";
import * as locale_63 from "blockly/msg/ta";
import * as locale_64 from "blockly/msg/te";
import * as locale_65 from "blockly/msg/th";
import * as locale_66 from "blockly/msg/ti";
import * as locale_67 from "blockly/msg/tl";
import * as locale_68 from "blockly/msg/tr";
import * as locale_69 from "blockly/msg/uk";
import * as locale_70 from "blockly/msg/ur";
import * as locale_71 from "blockly/msg/uz";
import * as locale_72 from "blockly/msg/vi";
import * as locale_73 from "blockly/msg/zh-hans";
import * as locale_74 from "blockly/msg/zh-hant";

const byTag: Record<string, Record<string, unknown>> = {
  "en": locale_12,
  "en-US": locale_12,
  "en-GB": locale_13,
  "en-CA": locale_12,
  "en-AU": locale_12,
  "en-IN": locale_12,
  "ar": locale_1,
  "bg": locale_4,
  "zh": locale_73,
  "zh-Hans": locale_73,
  "zh-Hant": locale_74,
  "hr": locale_24,
  "cs": locale_8,
  "da": locale_9,
  "nl": locale_47,
  "et": locale_15,
  "fi": locale_18,
  "fr": locale_19,
  "de": locale_10,
  "el": locale_11,
  "hu": locale_25,
  "ga": locale_12,
  "it": locale_29,
  "lv": locale_40,
  "lt": locale_39,
  "mt": locale_29,
  "pl": locale_49,
  "pt": locale_51,
  "pt-PT": locale_51,
  "pt-BR": locale_52,
  "ro": locale_53,
  "ru": locale_54,
  "sk": locale_56,
  "sl": locale_57,
  "es": locale_14,
  "sv": locale_61,
  "fa": locale_17,
  "hi": locale_23,
  "ja": locale_30,
  "ko": locale_34,
  "no": locale_45,
  "nb": locale_45,
  "nn": locale_45,
  "tr": locale_68,
  "uk": locale_69,
  "sr": locale_59,
  "sr-Cyrl": locale_59,
  "sr-Latn": locale_60,
  "sr-ijekavsk": locale_59,
  "cnr": locale_60,
  "sq": locale_58,
  "mk": locale_41,
  "is": locale_28,
  "bs": locale_6,
  "ca": locale_7,
  "ca-ES-valencia": locale_7,
  "eu": locale_16,
  "gl": locale_20,
  "cy": locale_12,
  "lb": locale_37,
  "bn": locale_5,
  "pa": locale_48,
  "gu": locale_23,
  "mr": locale_23,
  "te": locale_64,
  "ur": locale_70,
  "kn": locale_33,
  "or": locale_23,
  "ne": locale_46,
  "si": locale_55,
  "ta": locale_63,
  "ml": locale_42,
  "ps": locale_50,
  "jv": locale_27,
  "id": locale_27,
  "ms": locale_43,
  "tl": locale_67,
  "my": locale_44,
  "th": locale_65,
  "lo": locale_38,
  "vi": locale_72,
  "km": locale_32,
  "kk": locale_54,
  "ky": locale_35,
  "mn": locale_54,
  "uz": locale_71,
  "tg": locale_54,
  "ka": locale_31,
  "hy": locale_26,
  "he": locale_22,
  "az": locale_2,
  "tk": locale_68,
  "dv": locale_1,
  "be": locale_3,
  "la": locale_36,
  "tpi": locale_12,
  "am": locale_0,
  "om": locale_12,
  "so": locale_62,
  "ti": locale_66,
  "sw": locale_62,
  "ha": locale_21,
  "yue-Hans": locale_12,
  "yue-Hant": locale_12,
  "kmr": locale_kuLatn,
  "kmr-Latn": locale_kuLatn,
  "kmr-Arab": locale_12,
  "ckb": locale_12,
  "ckb-Arab": locale_12,
  "af-ZA": locale_af,
  "af-NA": locale_af,
};

export function blocklyLocaleFor(tag: string): Record<string, unknown> {
  return byTag[tag] ?? byTag[tag.split("-")[0]] ?? byTag.en;
}

export const blocklyModuleFor = Object.freeze({
  "en": "en",
  "en-US": "en",
  "en-GB": "en-gb",
  "en-CA": "en",
  "en-AU": "en",
  "en-IN": "en",
  "ar": "ar",
  "bg": "bg",
  "zh": "zh-hans",
  "zh-Hans": "zh-hans",
  "zh-Hant": "zh-hant",
  "hr": "hr",
  "cs": "cs",
  "da": "da",
  "nl": "nl",
  "et": "et",
  "fi": "fi",
  "fr": "fr",
  "de": "de",
  "el": "el",
  "hu": "hu",
  "ga": "en",
  "it": "it",
  "lv": "lv",
  "lt": "lt",
  "mt": "it",
  "pl": "pl",
  "pt": "pt",
  "pt-PT": "pt",
  "pt-BR": "pt-br",
  "ro": "ro",
  "ru": "ru",
  "sk": "sk",
  "sl": "sl",
  "es": "es",
  "sv": "sv",
  "fa": "fa",
  "hi": "hi",
  "ja": "ja",
  "ko": "ko",
  "no": "nb",
  "nb": "nb",
  "nn": "nb",
  "tr": "tr",
  "uk": "uk",
  "sr": "sr",
  "sr-Cyrl": "sr",
  "sr-Latn": "sr-latn",
  "sr-ijekavsk": "sr",
  "cnr": "sr-latn",
  "sq": "sq",
  "mk": "mk",
  "is": "is",
  "bs": "bs",
  "ca": "ca",
  "ca-ES-valencia": "ca",
  "eu": "eu",
  "gl": "gl",
  "cy": "en",
  "lb": "lb",
  "bn": "bn",
  "pa": "pa",
  "gu": "hi",
  "mr": "hi",
  "te": "te",
  "ur": "ur",
  "kn": "kn",
  "or": "hi",
  "ne": "ne",
  "si": "si",
  "ta": "ta",
  "ml": "ml",
  "ps": "ps",
  "jv": "id",
  "id": "id",
  "ms": "ms",
  "tl": "tl",
  "my": "my",
  "th": "th",
  "lo": "lo",
  "vi": "vi",
  "km": "km",
  "kk": "ru",
  "ky": "ky",
  "mn": "ru",
  "uz": "uz",
  "tg": "ru",
  "ka": "ka",
  "hy": "hy",
  "he": "he",
  "az": "az",
  "tk": "tr",
  "dv": "ar",
  "be": "be",
  "la": "la",
  "tpi": "en",
  "am": "am",
  "om": "en",
  "so": "sw",
  "ti": "ti",
  "sw": "sw",
  "ha": "ha",
  "yue-Hans": "en",
  "yue-Hant": "en",
  "kmr": "ku-latn",
  "kmr-Latn": "ku-latn",
  "kmr-Arab": "en",
  "ckb": "en",
  "ckb-Arab": "en",
  "af-ZA": "af",
  "af-NA": "af",
});

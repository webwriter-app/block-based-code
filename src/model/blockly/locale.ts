// Blockly ships a broad set of core UI translations. Language tags without a
// catalog of their own use the closest available one below. Only the English
// catalog is bundled with the widget; the others are loaded when a language needs them.
import * as englishCatalog from "blockly/msg/en";
import { blocklyCoreOverrides } from "./core-overrides";

type Catalog = () => Promise<Record<string, unknown>>;

const locale_af: Catalog = () => import("blockly/msg/af");
const locale_kuLatn: Catalog = () => import("blockly/msg/ku-latn");
const locale_0: Catalog = () => import("blockly/msg/am");
const locale_1: Catalog = () => import("blockly/msg/ar");
const locale_2: Catalog = () => import("blockly/msg/az");
const locale_3: Catalog = () => import("blockly/msg/be");
const locale_4: Catalog = () => import("blockly/msg/bg");
const locale_5: Catalog = () => import("blockly/msg/bn");
const locale_6: Catalog = () => import("blockly/msg/bs");
const locale_7: Catalog = () => import("blockly/msg/ca");
const locale_8: Catalog = () => import("blockly/msg/cs");
const locale_9: Catalog = () => import("blockly/msg/da");
const locale_10: Catalog = () => import("blockly/msg/de");
const locale_11: Catalog = () => import("blockly/msg/el");
const locale_12: Catalog = () => Promise.resolve(englishCatalog);
const locale_13: Catalog = () => import("blockly/msg/en-gb");
const locale_14: Catalog = () => import("blockly/msg/es");
const locale_15: Catalog = () => import("blockly/msg/et");
const locale_16: Catalog = () => import("blockly/msg/eu");
const locale_17: Catalog = () => import("blockly/msg/fa");
const locale_18: Catalog = () => import("blockly/msg/fi");
const locale_19: Catalog = () => import("blockly/msg/fr");
const locale_20: Catalog = () => import("blockly/msg/gl");
const locale_21: Catalog = () => import("blockly/msg/ha");
const locale_22: Catalog = () => import("blockly/msg/he");
const locale_23: Catalog = () => import("blockly/msg/hi");
const locale_24: Catalog = () => import("blockly/msg/hr");
const locale_25: Catalog = () => import("blockly/msg/hu");
const locale_26: Catalog = () => import("blockly/msg/hy");
const locale_27: Catalog = () => import("blockly/msg/id");
const locale_28: Catalog = () => import("blockly/msg/is");
const locale_29: Catalog = () => import("blockly/msg/it");
const locale_30: Catalog = () => import("blockly/msg/ja");
const locale_31: Catalog = () => import("blockly/msg/ka");
const locale_32: Catalog = () => import("blockly/msg/km");
const locale_33: Catalog = () => import("blockly/msg/kn");
const locale_34: Catalog = () => import("blockly/msg/ko");
const locale_35: Catalog = () => import("blockly/msg/ky");
const locale_36: Catalog = () => import("blockly/msg/la");
const locale_37: Catalog = () => import("blockly/msg/lb");
const locale_38: Catalog = () => import("blockly/msg/lo");
const locale_39: Catalog = () => import("blockly/msg/lt");
const locale_40: Catalog = () => import("blockly/msg/lv");
const locale_41: Catalog = () => import("blockly/msg/mk");
const locale_42: Catalog = () => import("blockly/msg/ml");
const locale_43: Catalog = () => import("blockly/msg/ms");
const locale_44: Catalog = () => import("blockly/msg/my");
const locale_45: Catalog = () => import("blockly/msg/nb");
const locale_46: Catalog = () => import("blockly/msg/ne");
const locale_47: Catalog = () => import("blockly/msg/nl");
const locale_48: Catalog = () => import("blockly/msg/pa");
const locale_49: Catalog = () => import("blockly/msg/pl");
const locale_50: Catalog = () => import("blockly/msg/ps");
const locale_51: Catalog = () => import("blockly/msg/pt");
const locale_52: Catalog = () => import("blockly/msg/pt-br");
const locale_53: Catalog = () => import("blockly/msg/ro");
const locale_54: Catalog = () => import("blockly/msg/ru");
const locale_55: Catalog = () => import("blockly/msg/si");
const locale_56: Catalog = () => import("blockly/msg/sk");
const locale_57: Catalog = () => import("blockly/msg/sl");
const locale_58: Catalog = () => import("blockly/msg/sq");
const locale_59: Catalog = () => import("blockly/msg/sr");
const locale_60: Catalog = () => import("blockly/msg/sr-latn");
const locale_61: Catalog = () => import("blockly/msg/sv");
const locale_62: Catalog = () => import("blockly/msg/sw");
const locale_63: Catalog = () => import("blockly/msg/ta");
const locale_64: Catalog = () => import("blockly/msg/te");
const locale_65: Catalog = () => import("blockly/msg/th");
const locale_66: Catalog = () => import("blockly/msg/ti");
const locale_67: Catalog = () => import("blockly/msg/tl");
const locale_68: Catalog = () => import("blockly/msg/tr");
const locale_69: Catalog = () => import("blockly/msg/uk");
const locale_70: Catalog = () => import("blockly/msg/ur");
const locale_71: Catalog = () => import("blockly/msg/uz");
const locale_72: Catalog = () => import("blockly/msg/vi");
const locale_73: Catalog = () => import("blockly/msg/zh-hans");
const locale_74: Catalog = () => import("blockly/msg/zh-hant");

const byTag: Record<string, Catalog> = {
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

const tagsByLowerCase = new Map(Object.keys(byTag).map(tag => [tag.toLowerCase(), tag]));

/** The tag of the catalogs for a language tag, or "en". */
function resolveTag(tag: string): string {
  const lower = tag.trim().toLowerCase();
  return tagsByLowerCase.get(lower) ?? tagsByLowerCase.get(lower.split("-")[0]) ?? "en";
}

const stringEntries = (catalog: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(catalog).filter((entry): entry is [string, string] => typeof entry[1] === "string"));

const english = stringEntries(englishCatalog);
const loaded = new Map<Catalog, Record<string, string>>([[byTag["en"], english]]);

/** Blockly's own translations of its core interface for a language tag. English until `loadBlocklyMessages` has resolved for it. */
export function blocklyMessagesFor(tag: string): Record<string, string> {
  return loaded.get(byTag[resolveTag(tag)]) ?? english;
}

/** Loads Blockly's translations for a language tag. Resolves with true when they were not available before. */
export async function loadBlocklyMessages(tag: string): Promise<boolean> {
  const catalog = byTag[resolveTag(tag)];
  if (loaded.has(catalog)) return false;
  loaded.set(catalog, stringEntries(await catalog()));
  return true;
}

/** The widget's translations of Blockly's core interface for languages Blockly lacks, or undefined. */
export function coreOverridesFor(tag: string): Record<string, string> | undefined {
  return blocklyCoreOverrides[resolveTag(tag)];
}

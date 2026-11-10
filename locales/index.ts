import { LitElementWw } from "@webwriter/lit";
import * as Blockly from "blockly";
import { blocklyLocaleFor } from "./blockly";
import { blocklyCoreOverrides } from "./blockly-core-overrides";
import { get } from "lodash";
import type { ReactiveControllerHost } from "lit";
import { languages, type Dictionary, type Lang } from "../types";

import { dictionary as webwriterDe } from "./de";
import { dictionary as webwriterEn } from "./en";
import { dictionary as webwriterFr } from "./fr";
import { dictionary as webwriterEs } from "./es";
import { dictionary as webwriterIt } from "./it";
import { dictionary as webwriterAr } from "./ar";
import { dictionary as webwriterBg } from "./bg";
import { dictionary as webwriterZhHans } from "./zh-Hans";
import { dictionary as webwriterZhHant } from "./zh-Hant";
import { dictionary as webwriterHr } from "./hr";
import { dictionary as webwriterCs } from "./cs";
import { dictionary as webwriterDa } from "./da";
import { dictionary as webwriterNl } from "./nl";
import { dictionary as webwriterEt } from "./et";
import { dictionary as webwriterFi } from "./fi";
import { dictionary as webwriterEl } from "./el";
import { dictionary as webwriterHu } from "./hu";
import { dictionary as webwriterGa } from "./ga";
import { dictionary as webwriterLv } from "./lv";
import { dictionary as webwriterLt } from "./lt";
import { dictionary as webwriterMt } from "./mt";
import { dictionary as webwriterPl } from "./pl";
import { dictionary as webwriterPt } from "./pt";
import { dictionary as webwriterPtPT } from "./pt-PT";
import { dictionary as webwriterPtBR } from "./pt-BR";
import { dictionary as webwriterRo } from "./ro";
import { dictionary as webwriterRu } from "./ru";
import { dictionary as webwriterSk } from "./sk";
import { dictionary as webwriterSl } from "./sl";
import { dictionary as webwriterSv } from "./sv";
import { dictionary as webwriterFa } from "./fa";
import { dictionary as webwriterHi } from "./hi";
import { dictionary as webwriterJa } from "./ja";
import { dictionary as webwriterKo } from "./ko";
import { dictionary as webwriterNb } from "./nb";
import { dictionary as webwriterNo } from "./no";
import { dictionary as webwriterNn } from "./nn";
import { dictionary as webwriterTr } from "./tr";
import { dictionary as webwriterUk } from "./uk";
import { dictionary as webwriterId } from "./id";
import { dictionary as webwriterMs } from "./ms";
import { dictionary as webwriterTl } from "./tl";
import { dictionary as webwriterMy } from "./my";
import { dictionary as webwriterTh } from "./th";
import { dictionary as webwriterZh } from "./zh";
import { dictionary as webwriterSr } from "./sr";
import { dictionary as webwriterSrcyrl } from "./sr-Cyrl";
import { dictionary as webwriterSrlatn } from "./sr-Latn";
import { dictionary as webwriterSrijekavsk } from "./sr-ijekavsk";
import { dictionary as webwriterCnr } from "./cnr";
import { dictionary as webwriterBs } from "./bs";
import { dictionary as webwriterSq } from "./sq";
import { dictionary as webwriterMk } from "./mk";
import { dictionary as webwriterIs } from "./is";
import { dictionary as webwriterCa } from "./ca";
import { dictionary as webwriterEu } from "./eu";
import { dictionary as webwriterGl } from "./gl";
import { dictionary as webwriterCy } from "./cy";
import { dictionary as webwriterLb } from "./lb";
import { dictionary as webwriterCaesvalencia } from "./ca-ES-valencia";
import { dictionary as webwriterDv } from "./dv";
import { dictionary as webwriterLa } from "./la";
import { dictionary as webwriterTpi } from "./tpi";
import { dictionary as webwriterAm } from "./am";
import { dictionary as webwriterOm } from "./om";
import { dictionary as webwriterSo } from "./so";
import { dictionary as webwriterTi } from "./ti";
import { dictionary as webwriterSw } from "./sw";
import { dictionary as webwriterHa } from "./ha";
import { dictionary as webwriterBe } from "./be";
import { dictionary as webwriterBn } from "./bn";
import { dictionary as webwriterPa } from "./pa";
import { dictionary as webwriterGu } from "./gu";
import { dictionary as webwriterMr } from "./mr";
import { dictionary as webwriterTe } from "./te";
import { dictionary as webwriterUr } from "./ur";
import { dictionary as webwriterKn } from "./kn";
import { dictionary as webwriterOr } from "./or";
import { dictionary as webwriterNe } from "./ne";
import { dictionary as webwriterSi } from "./si";
import { dictionary as webwriterTa } from "./ta";
import { dictionary as webwriterMl } from "./ml";
import { dictionary as webwriterPs } from "./ps";
import { dictionary as webwriterJv } from "./jv";
import { dictionary as webwriterLo } from "./lo";
import { dictionary as webwriterVi } from "./vi";
import { dictionary as webwriterKm } from "./km";
import { dictionary as webwriterKk } from "./kk";
import { dictionary as webwriterKy } from "./ky";
import { dictionary as webwriterMn } from "./mn";
import { dictionary as webwriterUz } from "./uz";
import { dictionary as webwriterTg } from "./tg";
import { dictionary as webwriterKa } from "./ka";
import { dictionary as webwriterHy } from "./hy";
import { dictionary as webwriterHe } from "./he";
import { dictionary as webwriterAz } from "./az";
import { dictionary as webwriterTk } from "./tk";
import type { Leaves } from "../types/leaves";

export const dictionaries: Partial<Record<Lang, Partial<Dictionary>>> = {
  "en": webwriterEn,
  "de": webwriterDe,
  "fr": webwriterFr,
  "es": webwriterEs,
  "it": webwriterIt,
  "ar": webwriterAr,
  "bg": webwriterBg,
  "zh": webwriterZh,
  "zh-Hans": webwriterZhHans,
  "zh-Hant": webwriterZhHant,
  "hr": webwriterHr,
  "cs": webwriterCs,
  "da": webwriterDa,
  "nl": webwriterNl,
  "et": webwriterEt,
  "fi": webwriterFi,
  "el": webwriterEl,
  "hu": webwriterHu,
  "ga": { ...webwriterGa, BLOCKLY: blocklyCoreOverrides.ga },
  "lv": webwriterLv,
  "lt": webwriterLt,
  "mt": { ...webwriterMt, BLOCKLY: blocklyCoreOverrides.mt },
  "pl": webwriterPl,
  "pt": webwriterPt,
  "pt-PT": webwriterPtPT,
  "pt-BR": webwriterPtBR,
  "ro": webwriterRo,
  "ru": webwriterRu,
  "sk": webwriterSk,
  "sl": webwriterSl,
  "sv": webwriterSv,
  "fa": webwriterFa,
  "hi": webwriterHi,
  "ja": webwriterJa,
  "ko": webwriterKo,
  "no": webwriterNo,
  "nb": webwriterNb,
  "nn": webwriterNn,
  "tr": webwriterTr,
  "uk": webwriterUk,
  "id": webwriterId,
  "ms": webwriterMs,
  "tl": webwriterTl,
  "my": webwriterMy,
  "th": webwriterTh,
  "sr": webwriterSr,
  "sr-Cyrl": webwriterSrcyrl,
  "sr-Latn": webwriterSrlatn,
  "sr-ijekavsk": webwriterSrijekavsk,
  "cnr": webwriterCnr,
  "bs": webwriterBs,
  "sq": webwriterSq,
  "mk": webwriterMk,
  "is": webwriterIs,
  "ca": webwriterCa,
  "ca-ES-valencia": webwriterCaesvalencia,
  "eu": webwriterEu,
  "gl": webwriterGl,
  "cy": { ...webwriterCy, BLOCKLY: blocklyCoreOverrides.cy },
  "lb": webwriterLb,
  "dv": { ...webwriterDv, BLOCKLY: blocklyCoreOverrides.dv },
  "la": webwriterLa,
  "tpi": { ...webwriterTpi, BLOCKLY: blocklyCoreOverrides.tpi },
  "am": webwriterAm,
  "om": { ...webwriterOm, BLOCKLY: blocklyCoreOverrides.om },
  "so": { ...webwriterSo, BLOCKLY: blocklyCoreOverrides.so },
  "ti": webwriterTi,
  "sw": webwriterSw,
  "ha": webwriterHa,
  "be": webwriterBe,
  "bn": webwriterBn,
  "pa": webwriterPa,
  "gu": { ...webwriterGu, BLOCKLY: blocklyCoreOverrides.gu },
  "mr": { ...webwriterMr, BLOCKLY: blocklyCoreOverrides.mr },
  "te": webwriterTe,
  "ur": webwriterUr,
  "kn": webwriterKn,
  "or": { ...webwriterOr, BLOCKLY: blocklyCoreOverrides.or },
  "ne": webwriterNe,
  "si": webwriterSi,
  "ta": webwriterTa,
  "ml": webwriterMl,
  "ps": webwriterPs,
  "jv": { ...webwriterJv, BLOCKLY: blocklyCoreOverrides.jv },
  "lo": webwriterLo,
  "vi": webwriterVi,
  "km": webwriterKm,
  "kk": { ...webwriterKk, BLOCKLY: blocklyCoreOverrides.kk },
  "ky": webwriterKy,
  "mn": { ...webwriterMn, BLOCKLY: blocklyCoreOverrides.mn },
  "uz": webwriterUz,
  "tg": { ...webwriterTg, BLOCKLY: blocklyCoreOverrides.tg },
  "ka": webwriterKa,
  "hy": webwriterHy,
  "he": webwriterHe,
  "az": webwriterAz,
  "tk": { ...webwriterTk, BLOCKLY: blocklyCoreOverrides.tk },
};
const dictionaryFor = (locale: Lang): Dictionary => {
  const partial = dictionaries[locale]
    ?? dictionaries[locale.toLowerCase().split("-")[0] as Lang]
    ?? (locale.toLowerCase() === "zh" ? webwriterZhHans : undefined);
  if (!partial) return webwriterEn;
  return {
    ...webwriterEn,
    ...partial,
    DIALOG: { ...webwriterEn.DIALOG, ...partial.DIALOG },
    ZOOM: { ...webwriterEn.ZOOM, ...partial.ZOOM },
    OPTIONS: { ...webwriterEn.OPTIONS, ...partial.OPTIONS, STAGE_TYPES: { ...webwriterEn.OPTIONS.STAGE_TYPES, ...partial.OPTIONS?.STAGE_TYPES } },
    CONTROLS: { ...webwriterEn.CONTROLS, ...partial.CONTROLS },
    BLOCKS: { ...webwriterEn.BLOCKS, ...partial.BLOCKS },
    CATEGORY: { ...webwriterEn.CATEGORY, ...partial.CATEGORY },
  };
};

export function setBlocklyLocale(locale: Lang) {
  const { BLOCKS, BLOCKLY, CONTROLS } = dictionaryFor(locale);
  const builtIn = Object.fromEntries(Object.entries(blocklyLocaleFor(locale))
    .filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  Blockly.setLocale({ ...builtIn, ...BLOCKS, ...CONTROLS, ...BLOCKLY });
}

export const messageFor = (locale: Lang) => (key: NonNullable<Leaves<Dictionary>>) => {
  const message = get(dictionaryFor(locale), key);
  return typeof message === "string" ? message : key;
};

function* languageAncestors(host: Element) {
  for (let node: Element | null = host; node;) {
    yield node;
    const root = node.getRootNode();
    node = node.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
  }
}

function effectiveLanguage(host: Element) {
  for (const node of languageAncestors(host)) {
    const lang = node.getAttribute("lang");
    if (lang !== null) return lang;
  }
  return "";
}

export class LocalizedElement extends LitElementWw {
  static override get observedAttributes() {
    return super.observedAttributes.filter(name => name !== "lang");
  }

  protected static override finalize() {
    super.finalize();
    // Disable reflection of legacy LitElementWw's computed language.
    this.elementProperties.set("lang", { attribute: false, noAccessor: true });
  }

  override get lang(): string { return effectiveLanguage(this); }
  override set lang(value: string) {
    if (value == null) this.removeAttribute("lang");
    else this.setAttribute("lang", value);
  }
}

export function localizeElement(host: HTMLElement & ReactiveControllerHost) {
  const getLocale = (): Lang => {
    const raw = effectiveLanguage(host).trim().toLowerCase();
    const exact = languages.find(locale => locale.toLowerCase() === raw);
    if (exact) return exact;
    let canonical = raw;
    try { canonical = Intl.getCanonicalLocales(raw)[0]?.toLowerCase() ?? canonical; } catch {}
    return languages.find(locale => locale.toLowerCase() === canonical)
      ?? languages.find(locale => locale.toLowerCase() === canonical.split("-")[0])
      ?? "en";
  };
  let lastLocale: Lang | undefined;
  const observer = new MutationObserver(() => {
    const locale = getLocale();
    if (lastLocale === locale) return;
    lastLocale = locale;
    host.requestUpdate();
    host.dispatchEvent(new Event("optionschange", { bubbles: true }));
  });
  host.addController({
    hostConnected() {
      lastLocale = getLocale();
      for (const node of languageAncestors(host)) observer.observe(node, { attributes: true, attributeFilter: ["lang"] });
    },
    hostDisconnected() {
      observer.disconnect();
    },
  });
  return { getLocale, msg: (key: NonNullable<Leaves<Dictionary>>) => messageFor(getLocale())(key) };
}

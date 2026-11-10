import { LitElementWw } from "@webwriter/lit";
import * as Blockly from "blockly";
import * as blocklyDe from "blockly/msg/de";
import * as blocklyEn from "blockly/msg/en";
import * as blocklyFr from "blockly/msg/fr";
import * as blocklyEs from "blockly/msg/es";
import { get } from "lodash";
import type { ReactiveControllerHost } from "lit";
import { languages, type Dictionaries, type Dictionary, type Lang } from "../types";

import { dictionary as webwriterDe } from "./de";
import { dictionary as webwriterEn } from "./en";
import { dictionary as webwriterFr } from "./fr";
import { dictionary as webwriterEs } from "./es";
import type { Leaves } from "../types/leaves";

export const dictionaries: Dictionaries = { de: webwriterDe, en: webwriterEn, fr: webwriterFr, es: webwriterEs };
const blocklyDictionaries = { de: blocklyDe, en: blocklyEn, fr: blocklyFr, es: blocklyEs };

export function setBlocklyLocale(locale: Lang) {
  const { BLOCKS, CONTROLS } = dictionaries[locale];
  const builtIn = Object.fromEntries(Object.entries(blocklyDictionaries[locale])
    .filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  Blockly.setLocale({ ...builtIn, ...BLOCKS, ...CONTROLS });
}

export const messageFor = (locale: Lang) => (key: NonNullable<Leaves<Dictionary>>) => {
  const message = get(dictionaries[locale], key);
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
    const base = effectiveLanguage(host).trim().toLowerCase().split("-")[0];
    return languages.find(locale => locale === base) ?? "en";
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

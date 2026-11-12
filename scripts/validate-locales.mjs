import { readdirSync, readFileSync } from "node:fs";
import { transform } from "esbuild";
import * as blocklyEnglish from "blockly/msg/en";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const localeTypes = readFileSync(new URL("../types/locales.ts", import.meta.url), "utf8");
const blocklySource = readFileSync(new URL("../locales/blockly.ts", import.meta.url), "utf8");
const blocklyOverridesSource = readFileSync(new URL("../locales/blockly-core-overrides.ts", import.meta.url), "utf8");
const indexSource = readFileSync(new URL("../locales/index.ts", import.meta.url), "utf8");
const dictionaryBlock = indexSource.match(/export const dictionaries:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
const registeredDictionaries = new Set([...dictionaryBlock.matchAll(/^\s{2}(?:"([^\"]+)"|([a-zA-Z-]+))\s*:/gm)].map(([, quoted, bare]) => quoted ?? bare));
const tagsMatch = localeTypes.match(/export const languages = (\[[^;]+\]) as const;/);
if (!tagsMatch) throw new Error("Could not read target tags from types/locales.ts");
const tags = JSON.parse(tagsMatch[1]);
const moduleMap = Object.fromEntries([...blocklySource.matchAll(/^\s*"([^\"]+)": "([^\"]+)",?$/gm)].map(([, tag, module]) => [tag, module]));
const moduleImports = new Set([...blocklySource.matchAll(/from "blockly\/msg\/([^\"]+)"/g)].map(([, name]) => name));

async function loadModule(source) {
  const result = await transform(source, { loader: "ts", format: "esm", target: "es2022" });
  return import(`data:text/javascript;base64,${Buffer.from(result.code).toString("base64")}`);
}
async function loadDictionary(file) {
  const source = readFileSync(new URL(`../locales/${file}`, import.meta.url), "utf8");
  const alias = source.match(/export \{ dictionary \} from "\.\/([^"]+)"/);
  if (alias) return loadDictionary(`${alias[1]}.ts`);
  const module = await loadModule(source);
  return module.dictionary;
}
function compareShape(source, candidate, path = "") {
  const errors = [];
  for (const [key, value] of Object.entries(source)) {
    const at = path ? `${path}.${key}` : key;
    if (value && typeof value === "object") {
      if (!candidate?.[key] || typeof candidate[key] !== "object") errors.push(`Missing object ${at}`);
      else errors.push(...compareShape(value, candidate[key], at));
    } else if (typeof candidate?.[key] !== "string" || !candidate[key].trim()) errors.push(`Missing string ${at}`);
    else {
      const markers = value.match(/%\d+/g)?.sort().join(",") ?? "";
      const translatedMarkers = candidate[key].match(/%\d+/g)?.sort().join(",") ?? "";
      if (markers !== translatedMarkers) errors.push(`Placeholder mismatch ${at}: expected ${markers}, got ${translatedMarkers}`);
    }
  }
  return errors;
}

const issues = [];
for (const tag of tags) {
  if (!moduleMap[tag]) issues.push(`No Blockly module mapping for ${tag}`);
  else if (!moduleImports.has(moduleMap[tag])) issues.push(`Blockly module ${moduleMap[tag]} is not imported (${tag})`);
}
const files = readdirSync(new URL("../locales/", import.meta.url)).filter(name => /^[a-z][a-zA-Z-]*\.ts$/.test(name) && !["index.ts", "blockly.ts"].includes(name));
const dictionaries = new Map(await Promise.all(files.map(async file => [file.slice(0, -3), await loadDictionary(file)])));
const english = dictionaries.get("en");
const coreOverrides = (await loadModule(blocklyOverridesSource)).blocklyCoreOverrides;
const coreKeys = ["ADD_COMMENT", "CLEAN_UP", "COLLAPSE_ALL", "COLLAPSE_BLOCK", "DELETE_ALL_BLOCKS", "DELETE_BLOCK", "DELETE_X_BLOCKS", "DISABLE_BLOCK", "DUPLICATE_BLOCK", "DUPLICATE_COMMENT", "ENABLE_BLOCK", "EXPAND_ALL", "EXPAND_BLOCK", "EXTERNAL_INPUTS", "HELP", "REMOVE_COMMENT", "WORKSPACE_COMMENT_DEFAULT_TEXT", "DELETE_VARIABLE", "DELETE_VARIABLE_CONFIRMATION", "NEW_VARIABLE", "NEW_VARIABLE_TITLE", "RENAME_VARIABLE", "RENAME_VARIABLE_TITLE", "VARIABLE_ALREADY_EXISTS", "VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE", "CHANGE_VALUE_TITLE", "WORKSPACE_ARIA_LABEL"];
for (const [tag, messages] of Object.entries(coreOverrides)) {
  if (Object.keys(messages).length !== coreKeys.length || coreKeys.some(key => typeof messages[key] !== "string" || !messages[key].trim())) issues.push(`Incomplete Blockly core map for ${tag}`);
  for (const key of coreKeys) {
    const source = blocklyEnglish[key];
    const expectedMarkers = source?.match(/%\d+/g)?.sort().join(",") ?? "";
    const translatedMarkers = messages[key]?.match(/%\d+/g)?.sort().join(",") ?? "";
    if (expectedMarkers !== translatedMarkers) issues.push(`Blockly placeholder mismatch ${tag}.${key}`);
  }
  if (!indexSource.includes(`blocklyCoreOverrides.${tag}`)) issues.push(`Blockly core map not wired through BLOCKLY for ${tag}`);
}
const dictionaryFor = tag => dictionaries.get(tag) ?? dictionaries.get(tag.toLowerCase().split("-")[0]) ?? (tag.toLowerCase() === "zh" ? dictionaries.get("zh-Hans") : undefined) ?? english;
for (const keyword of packageJson.keywords.filter(k => k.startsWith("widget-lang-"))) {
  const tag = keyword.slice("widget-lang-".length);
  const dictionary = dictionaryFor(tag);
  if (!tags.includes(tag) || !dictionary) issues.push(`Advertised locale ${tag} has no widget dictionary`);
  else if (!registeredDictionaries.has(tag) && !registeredDictionaries.has(tag.toLowerCase().split("-")[0])) issues.push(`Advertised locale ${tag} is not wired into the runtime dictionary table`);
  else if (!tag.startsWith("en-") && compareShape(english, dictionary).length) issues.push(`Advertised locale ${tag} is missing widget strings: ${compareShape(english, dictionary).join(", ")}`);
}
for (const keyword of packageJson.keywords.filter(k => k.startsWith("widget-lang-"))) {
  const tag = keyword.slice("widget-lang-".length);
  for (const [path, config] of Object.entries(packageJson.editingConfig ?? {})) {
    if (config.label && !config.label[tag]) issues.push(`Advertised locale ${tag} has no label at ${path}`);
    if (path === "." && config.description && !config.description[tag]) issues.push(`Advertised locale ${tag} has no package description`);
  }
}
for (const [path, config] of Object.entries(packageJson.editingConfig ?? {})) {
  for (const tag of Object.keys(config.label ?? {})) {
    if (tag !== "_" && !tags.includes(tag)) issues.push(`Unknown metadata locale ${tag} at ${path}`);
  }
}
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${tags.length} target tags, ${moduleImports.size} Blockly catalogs, ${Object.keys(coreOverrides).length} direct Blockly core maps, and ${packageJson.keywords.filter(k => k.startsWith("widget-lang-")).length} advertised locales.`);
}

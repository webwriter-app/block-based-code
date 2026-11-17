/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-block-based-code";
import type { WebwriterBlockBasedCode } from "../src/widgets/webwriter-block-based-code";
import dvd from "../snippets/dvd.html";
import { blocklyMessagesFor, loadBlocklyMessages } from "../src/model/blockly/locale";
import { until } from "./helpers";

mocha.setup(getMochaConfig());

describe("<webwriter-block-based-code>", function () {
  this.timeout(30000);
  let mount: HTMLDivElement;
  let widget: any;
  let loaded: number;

  const editor = () => widget.shadowRoot.querySelector("#editor");
  const blocksOf = () => editor().editorApplication.save().blocks?.blocks ?? [];
  const block = () => widget.querySelector(':scope > script[type="application/json"][slot="data"]');
  const data = () => JSON.parse(block().textContent);

  before(async function () {
    mount = document.createElement("div");
    mount.style.width = "800px";
    document.body.append(mount);
    mount.innerHTML = dvd;
    widget = mount.querySelector("webwriter-block-based-code") as WebwriterBlockBasedCode;
    await customElements.whenDefined("webwriter-block-based-code");
    await until(() => editor()?.editorApplication && blocksOf().length > 0, "the program to load");
    loaded = blocksOf().length;
  });

  after(function () {
    mount.remove();
  });

  // The tests share one widget and run in order, as the old check page did.
  it("the program of the data block is loaded into the editor", async function () {
    assert.equal(loaded, data().editorState.blocks.blocks.length);
    assert.isTrue(widget.usableBlocks.length === data().usableBlocks.length && widget.usableBlocks[0] === data().usableBlocks[0], "usableBlocks getter");
  });

  it("setting usableBlocks writes the block in one transaction and keeps the other keys", async function () {
    const extra = { ...data(), extra: { kept: true } };
    block().textContent = JSON.stringify(extra);
    await until(() => widget.usableBlocks.length === extra.usableBlocks.length, "the block to be read");
    const seen: string[] = [];
    for (const type of ["ww-transactionstart", "ww-transactionend"]) document.addEventListener(type, () => seen.push(type));
    const subset = extra.usableBlocks.slice(0, 3);
    widget.usableBlocks = subset;
    await until(() => JSON.stringify(data().usableBlocks) === JSON.stringify(subset), "the block to hold the subset");
    assert.isTrue(data().extra?.kept === true, "an unknown key was lost");
    assert.equal(data().editorState.blocks.blocks.length, loaded, "editorState was lost");
    assert.equal(widget.querySelectorAll(":scope > script").length, 1, "a second data block appeared");
    assert.isTrue(block().getAttribute("type") === "application/json" && block().getAttribute("slot") === "data", "block attributes changed");
    assert.equal(seen.join(), "ww-transactionstart,ww-transactionend");
    assert.equal(JSON.stringify(widget.usableBlocks), JSON.stringify(subset), "getter after write");
  });

  it("an editor change is written as editorState", async function () {
    const workspace = editor().editorApplication.getWorkspace();
    const before = data().editorState.blocks.blocks.length;
    const created = workspace.newBlock("events:when_start_clicked");
    created.initSvg?.();
    await until(() => data().editorState.blocks.blocks.length === before + 1, "the new block in the data block");
    assert.isTrue(data().extra?.kept === true && Array.isArray(data().usableBlocks), "other keys changed");
  });

  it("a change of the data block from outside reaches the editor", async function () {
    const next = { ...data(), editorState: { blocks: { languageVersion: 0, blocks: [] } } };
    block().textContent = JSON.stringify(next);
    await until(() => blocksOf().length === 0, "the editor to follow the block");
  });

  it("replacing the data block element is followed", async function () {
    const state = JSON.parse(dvd.match(/>(\{.*?\})<\/script>/s)![1]).editorState;
    const replacement = document.createElement("script");
    replacement.type = "application/json";
    replacement.slot = "data";
    replacement.textContent = JSON.stringify({ editorState: state });
    block().replaceWith(replacement);
    await until(() => blocksOf().length === loaded, "the editor to load the replacement");
  });

  it("read mode: read-only makes the editor read-only; edit mode releases it", async function () {
    widget.removeAttribute("contenteditable");
    widget.setAttribute("read-only", "");
    await until(() => editor().readonly === true, "readonly in read mode");
    widget.setAttribute("contenteditable", "");
    await until(() => editor().readonly === false, "editable in edit mode");
    widget.removeAttribute("contenteditable");
    await until(() => editor().readonly === true, "readonly again in read mode");
    widget.removeAttribute("read-only");
    await until(() => editor().readonly === false, "writable without read-only");
  });

  it("the drawer declarations are still read from the instance", function () {
    assert.equal(Object.keys(widget.options).join(), "readOnly,usableBlocks");
    assert.isTrue(widget.options.usableBlocks.group === "blocks" && widget.optionGroups.blocks.collapsible === true, "groups");
  });

  it("the authored attributes keep their names and the element writes no UI into the light DOM", async function () {
    widget.setAttribute("read-only", "");
    await widget.updateComplete;
    assert.isTrue(widget.hasAttribute("read-only") && widget.getAttribute("stage-type") === "canvas", "attributes: " + widget.getAttributeNames());
    assert.isTrue([...widget.children].every((child: Element) => child.localName === "script"), "children: " + [...widget.children].map((c: Element) => c.localName));
  });

  it("Blockly's texts for another language are loaded on demand", async function () {
    assert.deepEqual(blocklyMessagesFor("de"), blocklyMessagesFor("en"), "English until the language is loaded");
    assert.isTrue(await loadBlocklyMessages("de"), "first load");
    assert.notEqual(blocklyMessagesFor("de").CLEAN_UP, blocklyMessagesFor("en").CLEAN_UP);
    assert.isFalse(await loadBlocklyMessages("de"), "second load");
  });

  it("a removed widget stops its render loop", async function () {
    const other = document.createElement("div");
    other.style.width = "800px";
    document.body.append(other);
    other.innerHTML = dvd;
    const stage = () => other.firstElementChild!.shadowRoot!.querySelector("#stage") as any;
    await until(() => stage()?.stageApplication.application?.renderer && stage().stageApplication.application.ticker.started, "the stage to render");
    const { application } = stage().stageApplication;
    other.remove();
    await until(() => !application.ticker?.started, "the ticker to stop");
  });
});

mocha.run();

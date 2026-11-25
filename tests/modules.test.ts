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

  describe("input, layout, theme and print", function () {
    const stage = () => widget.shadowRoot.querySelector("#stage");
    const application = () => widget.shadowRoot.querySelector("#application");
    const splitPanel = () => application().shadowRoot.querySelector("sl-split-panel");

    it("the editor and the stage are stacked at 300px and side by side at 1000px", async function () {
      mount.style.width = "300px";
      await until(() => splitPanel().hasAttribute("vertical"), "the stacked layout at 300px");
      assert.isAtLeast(widget.getBoundingClientRect().width, 299);
      assert.isAtMost(widget.scrollWidth, widget.clientWidth + 1, "the widget scrolls sideways at 300px");
      mount.style.width = "1000px";
      await until(() => !splitPanel().hasAttribute("vertical"), "the side by side layout at 1000px");
      mount.style.width = "800px";
    });

    it("the host follows the theme font and color, and the tab indicator the first accent", async function () {
      const wrapper = document.createElement("div");
      wrapper.style.cssText = "--ww-text-color: rgb(10, 20, 30); --ww-font-family: Georgia, serif; --ww-theme-accent-1: rgb(1, 2, 3)";
      document.body.append(wrapper);
      const other = document.createElement("div");
      other.style.width = "800px";
      wrapper.append(other);
      other.innerHTML = dvd;
      const host = other.firstElementChild as HTMLElement;
      await until(() => host.shadowRoot?.querySelector("#stage")?.shadowRoot?.querySelector("sl-tab-group"), "the stage");
      const tabs = host.shadowRoot!.querySelector("#stage")!.shadowRoot!.querySelector("sl-tab-group")!;
      assert.equal(getComputedStyle(host).color, "rgb(10, 20, 30)");
      assert.include(getComputedStyle(host).fontFamily, "Georgia");
      assert.equal(getComputedStyle(tabs).getPropertyValue("--indicator-color").trim(), "rgb(1, 2, 3)");
      wrapper.remove();
    });

    it("the workspace is a tab stop, so the blocks can be reached by keyboard", function () {
      const svg = editor().editorApplication.getWorkspace().getParentSvg();
      assert.isAtLeast(Number(svg.getAttribute("tabindex")), 0);
    });

    it("keys that operate the editor or a control are not input for the program", async function () {
      const app = stage().stageApplication;
      const calls: string[] = [];
      const start = app.virtualMachine.start;
      app.virtualMachine.start = async (_code: string, _delay: number, event: string) => { calls.push(event); };
      try {
        const press = (target: Element, key: string) =>
          target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, composed: true }));
        press(editor().renderRoot.querySelector(".blocklyWorkspace") ?? editor(), "ArrowRight");
        press(stage().shadowRoot.querySelector("#start").shadowRoot.querySelector("sl-button, button"), " ");
        assert.deepEqual(calls, [], "keys from the editor or a button started the program");
        press(widget, "ArrowRight");
        assert.include(calls, "whenKeyPressed_ArrowRight");
        // After a click on Start the button keeps the focus; arrows still steer the program, Enter presses the button.
        calls.length = 0;
        const startButton = stage().shadowRoot.querySelector("#start").shadowRoot.querySelector("sl-button, button");
        assert.isNotNull(startButton, "the real button inside the toolbar button");
        press(startButton, "ArrowRight");
        assert.include(calls, "whenKeyPressed_ArrowRight", "arrows were dropped while Start has the focus");
        calls.length = 0;
        press(startButton, "Enter");
        assert.deepEqual(calls, [], "Enter on a button started the program");
      } finally {
        app.virtualMachine.start = start;
      }
    });

    it("the stage can be focused and Enter clicks the sprite, as a tap does", async function () {
      const app = stage().stageApplication;
      assert.equal(app.container.tabIndex, 0);
      assert.isTrue(app.container.hasAttribute("aria-label"));
      const calls: string[] = [];
      const start = app.virtualMachine.start;
      app.virtualMachine.start = async (_code: string, _delay: number, event: string) => { calls.push(event); };
      try {
        app.container.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true }));
        assert.include(calls, "whenSpriteClicked");
      } finally {
        app.virtualMachine.start = start;
      }
    });

    it("a touch drag moves a block from the toolbox into the workspace", async function () {
      const workspace = editor().editorApplication.getWorkspace();
      const before = workspace.getAllBlocks(false).length;
      workspace.getToolbox().selectItemByPosition(1);
      await until(() => workspace.getFlyout().isVisible() && workspace.getFlyout().getWorkspace().getTopBlocks(false).length > 0, "the flyout");
      const source = workspace.getFlyout().getWorkspace().getTopBlocks(false)[0].getSvgRoot();
      const from = source.getBoundingClientRect();
      const start = { x: from.left + 10, y: from.top + from.height / 2 };
      const target = workspace.getInjectionDiv().getBoundingClientRect();
      const end = { x: target.left + target.width * 0.75, y: target.bottom - 60 };
      const fire = (node: EventTarget, type: string, point: { x: number; y: number }) =>
        node.dispatchEvent(new PointerEvent(type, {
          bubbles: true, composed: true, cancelable: true, pointerType: "touch", pointerId: 7, isPrimary: true,
          clientX: point.x, clientY: point.y, button: 0, buttons: type === "pointerup" ? 0 : 1,
        }));
      fire(source, "pointerdown", start);
      for (let step = 1; step <= 8; step++) {
        fire(document, "pointermove", { x: start.x + (end.x - start.x) * step / 8, y: start.y + (end.y - start.y) * step / 8 });
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      fire(document, "pointerup", end);
      await until(() => workspace.getAllBlocks(false).length > before, "the dragged block");
    });

    it("the stage is drawn into an image before printing and the image is dropped afterwards", async function () {
      window.dispatchEvent(new Event("beforeprint"));
      const printed = () => stage().shadowRoot.querySelector("img.print-image");
      await until(() => printed()?.getAttribute("src")?.startsWith("data:image/png"), "the print image");
      const picture = new Image();
      picture.src = printed()!.getAttribute("src")!;
      await picture.decode();
      const canvas = document.createElement("canvas");
      canvas.width = picture.naturalWidth;
      canvas.height = picture.naturalHeight;
      const context = canvas.getContext("2d")!;
      context.drawImage(picture, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      assert.isTrue(pixels.some((value) => value !== 0), "the print image is blank");
      window.dispatchEvent(new Event("afterprint"));
      await until(() => !printed(), "the print image to go");
    });

    it("before printing the whole program is scaled into the workspace view and restored afterwards", async function () {
      const workspace = editor().editorApplication.getWorkspace();
      const scale = workspace.scale;
      window.dispatchEvent(new Event("beforeprint"));
      const content = workspace.getBlocksBoundingBox();
      const metrics = workspace.getMetrics();
      assert.isAtMost((content.right - content.left) * workspace.scale, metrics.viewWidth + 2, "the program is wider than the view");
      assert.isAtMost((content.bottom - content.top) * workspace.scale, metrics.viewHeight + 2, "the program is taller than the view");
      window.dispatchEvent(new Event("afterprint"));
      assert.equal(workspace.scale, scale);
    });

    it("the program is part of the printed page", async function () {
      assert.isTrue(widget.shadowRoot.querySelector("pre.print-code").textContent.length > 0);
    });
  });
  describe("conversions, actions and signals", function () {
    let host: HTMLDivElement;
    let w: any;
    const ed = () => w.shadowRoot.querySelector("#editor");
    const count = () => ed().editorApplication.save().blocks?.blocks?.length ?? 0;
    const text = async (file: File) => file.text();

    before(async function () {
      host = document.createElement("div");
      host.style.width = "800px";
      document.body.append(host);
      host.innerHTML = dvd;
      w = host.firstElementChild;
      await until(() => ed()?.editorApplication && count() > 0 && w.exportJavaScript(), "the program");
    });

    after(function () {
      host.remove();
    });

    it("the program is exported as JavaScript and as a pre element", async function () {
      const file = w.exportJavaScript();
      assert.equal(file.name, "program.js");
      assert.equal(file.type, "text/javascript");
      assert.isAbove((await text(file)).length, 10);
      const pre = w.toPre();
      assert.equal(pre.localName, "pre");
      assert.equal(pre.textContent, (await text(file)).trim());
      assert.equal(pre.isConnected, false);
    });

    it("a JSON export imports again and gives the same program (round trip)", async function () {
      const file = w.exportJson();
      assert.equal(file.name, "block-program.json");
      const exported = JSON.parse(await text(file));
      assert.isArray(exported.usableBlocks);
      const before = JSON.stringify(ed().editorApplication.save());
      w.clearProgram();
      await until(() => count() === 0, "the program to be cleared");
      const apply = await w.importJson(file);
      assert.equal(count(), 0, "the widget changed before apply ran");
      apply();
      await until(() => count() > 0, "the imported program");
      assert.equal(JSON.stringify(ed().editorApplication.save()), before);
      assert.equal(JSON.stringify(w.usableBlocks), JSON.stringify(exported.usableBlocks));
    });

    it("invalid files are refused and leave the program as it is", async function () {
      const kept = count();
      const bad = [
        new File(["not json"], "a.json", { type: "application/json" }),
        new File(['{"editorState": 3}'], "b.json", { type: "application/json" }),
        new File(['{"editorState":{"blocks":{"blocks":[{"type":"no:such_block"}]}}}'], "c.json", { type: "application/json" }),
      ];
      for (const file of bad) {
        let message = "";
        try { await w.importJson(file); } catch (error) { message = (error as Error).message; }
        assert.isAbove(message.length, 0, file.name + " was accepted");
      }
      assert.equal(count(), kept);
    });

    it("the conversions are declared for the editor", function () {
      const ctor = w.constructor;
      assert.deepEqual(Object.keys(ctor.convertFrom), ["application/json"]);
      assert.deepEqual(Object.keys(ctor.convertTo).sort(), ["application/json", "pre", "text/javascript"]);
      assert.isTrue(ctor.actions.clearProgram.intent === "danger" && typeof ctor.actions.clearProgram.confirm === "function");
    });

    it("the signals are stable and follow the program and its execution", async function () {
      const { running, code } = w.signals;
      assert.strictEqual(w.signals.running, running);
      assert.isFalse(running.get());
      assert.equal(code.get(), w.shadowRoot.querySelector("pre.print-code").textContent);
      assert.isAbove(code.get().length, 0);
      const stage = w.shadowRoot.querySelector("#stage");
      stage.dispatchEvent(new CustomEvent("executionchange", { detail: true }));
      assert.isTrue(running.get());
      stage.dispatchEvent(new CustomEvent("executionchange", { detail: false }));
      assert.isFalse(running.get());
      // The real path: a click on Start runs the program in the virtual machine, a click on Stop ends it.
      const click = (id: string) => stage.shadowRoot.querySelector(id).click();
      await until(() => stage.stageApplication.application?.renderer, "the stage to be ready");
      click("#start");
      await until(() => running.get() === true, "running after Start");
      click("#stop");
      await until(() => running.get() === false, "not running after Stop");
      w.clearProgram();
      await until(() => code.get() === "", "the code signal to empty");
    });
  });
});

mocha.run();

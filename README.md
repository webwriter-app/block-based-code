# Block Based Code (`@webwriter/block-based-code@2.1.2`)
[License: MIT](LICENSE) | Version: 2.1.2

Build programs with visual blocks and run them in the browser.

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Bouncing Dvd | `@webwriter/block-based-code/snippets/bouncing-dvd.html` |



## `WebwriterBlockBasedCode` (`<webwriter-block-based-code>`)
Block-based programming on top of Blockly, inspired by Scratch. The blocks the author places in
the editor control a stage; the only stage type so far is a canvas drawn with PixiJS.
The program and the blocks offered to learners are kept in a JSON data block.

The editor and the stage sit side by side; below 560px of width they are stacked.
On paper the program is scaled to fit the editor view, the current picture of the stage and the program text are printed, and controls are hidden.

Conversions: the program is exported as JavaScript (`text/javascript`, the readable program) and as
JSON (`application/json`: the Blockly workspace and the blocks the toolbox offers); a JSON file of that shape is
imported. A `pre` element can be exported with the program text. The JavaScript export drops the layout
of the blocks and the toolbox selection; the JSON file keeps both.

Signals: `running` (boolean) is true while any part of the program runs; `code` (string) is the
readable program. The widget accepts no effects.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/block-based-code/widgets/webwriter-block-based-code.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/block-based-code/widgets/webwriter-block-based-code.js"></script>
<webwriter-block-based-code></webwriter-block-based-code>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/block-based-code
```

```html
<link href="@webwriter/block-based-code/widgets/webwriter-block-based-code.css" rel="stylesheet">
<script type="module" src="@webwriter/block-based-code/widgets/webwriter-block-based-code.js"></script>
<webwriter-block-based-code></webwriter-block-based-code>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `WebwriterBlockBasedCode.scopedElements` | `object` | - | `{ "webwriter-blocks-toolbar": Toolbar, "webwriter-blocks-toolbar-button": ToolbarButton, "webwriter-blocks-application": Application, "webwriter-blocks-editor": Editor, "webwriter-blocks-stage": Stage, "webwriter-blocks-help": Help, }` | ✗ |
| `WebwriterBlockBasedCode.convertFrom` | `object` | - | `{ "application/json": "importJson" }` | ✗ |
| `WebwriterBlockBasedCode.convertTo` | `object` | - | `{ "text/javascript": "exportJavaScript", "application/json": "exportJson", pre: "toPre", }` | ✗ |
| `WebwriterBlockBasedCode.actions` | `object` | - | `{ clearProgram: { label: (widget: { msg: MsgFn }) => widget.msg("Clear program"), confirm: (widget: { msg: MsgFn }) => widget.msg("Remove all blocks from the program?"), intent: "danger" as const, }, }` | ✗ |
| `WebwriterBlockBasedCode.optionGroups` | `object` | - | `{ blocks: { label: (widget: { msg: MsgFn }) => widget.msg("Available Blocks"), collapsible: true }, }` | ✗ |
| `WebwriterBlockBasedCode.shadowRootOptions` | `ShadowRootInit` | - | - | ✗ |
| `msg` | `MsgFn` | - | - | ✗ |
| `signals` | `object` | Read-only values for other widgets: whether the program runs, and the readable program. | `{ running: computed(() => this.#running.get()), code: computed(() => this.#code.get()), }` | ✗ |
| `readOnly` (`read-only`) | `boolean` | - | `false` | ✓ |
| `stageType` (`stage-type`) | `StageType` | - | - | ✓ |
| `usableBlocks` | `SelectedBlocks` | - | - | ✗ |
| `options` | - | The options depend on the blocks the stage offers, so they cannot be static. | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Methods
| Name | Description | Parameters |
| :--: | :---------: | :-------: |
| `exportJavaScript` | The readable program as a JavaScript file; null while there are no blocks. | -
| `exportJson` | The workspace and the toolbox selection as a JSON file. | -
| `toPre` | A `pre` element with the readable program; null while there are no blocks. | -
| `importJson` | Checks a whole file, then returns the function that replaces the program. | `file: File`
| `clearProgram` | Removes all blocks; the toolbox selection stays. | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Events
| Name | Description |
| :--: | :---------: |
| optionschange | The blocks the stage offers are known, or the language changed. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## CSS parts
| Name | Description |
| :--: | :---------: |
| application | The split view that holds the editor and the stage. |
| editor | The block editor. |
| stage | The stage that shows the result. |
| code | The generated program, shown on paper. |

*[CSS parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) allow freely styling internals of the widget with CSS.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `label` | `[object Object]` |
| `importFormats` | `application/json` |
| `exportFormats` | `text/javascript,application/json` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public slots, or custom CSS properties.*


---
*Generated with @webwriter/build@1.15.0*

# Block Based Code (`@webwriter/block-based-code@2.0.0`)
[License: MIT](LICENSE) | Version: 2.0.0

Write block-based code (e.g. Scratch) and run it.

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Bouncing Dvd | `@webwriter/block-based-code/snippets/bouncing-dvd.html` |



## `WebwriterBlockBasedCode` (`<webwriter-block-based-code>`)
Block-based programming on top of Blockly, inspired by Scratch. The blocks the author places in
the editor control a stage; the only stage type so far is a canvas drawn with PixiJS.
The program and the blocks offered to learners are kept in a JSON data block.

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
| `WebwriterBlockBasedCode.optionGroups` | `object` | - | `{ blocks: { label: (widget: { msg: MsgFn }) => widget.msg("Available Blocks"), collapsible: true }, }` | ✗ |
| `WebwriterBlockBasedCode.shadowRootOptions` | `ShadowRootInit` | - | - | ✗ |
| `msg` | `MsgFn` | - | - | ✗ |
| `readOnly` (`read-only`) | `boolean` | - | `false` | ✓ |
| `stageType` (`stage-type`) | `StageType` | - | - | ✓ |
| `usableBlocks` | `SelectedBlocks` | - | - | ✗ |
| `options` | - | The options depend on the blocks the stage offers, so they cannot be static. | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Events
| Name | Description |
| :--: | :---------: |
| optionschange | The blocks the stage offers are known, or the language changed. |

*[Events](https://developer.mozilla.org/en-US/docs/Web/Events) are dispatched by the widget after certain triggers.*

## Editing config
| Name | Value |
| :--: | :---------: |
| `label` | `[object Object]` |

*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, custom CSS properties, or CSS parts.*


---
*Generated with @webwriter/build@1.9.1*
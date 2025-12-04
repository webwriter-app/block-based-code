# Block Based Code (`@webwriter/block-based-code@1.7.2`)
[License: MIT](LICENSE) | Version: 1.7.2

Write block-based code (e.g. Scratch) and run it.

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Bouncing Dvd | `@webwriter/block-based-code/snippets/bouncing-dvd.html` |



## `WebwriterBlocks` (`<webwriter-block-based-code>`)
The main component of the Blocks widget.

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
| `readonly` (`readonly`) | `0 \| 1` | Whether the widget is in read-only mode, only effective when contentEditable is false. | `0` | ✓ |
| `stageType` (`stageType`) | `StageType` | The selected stage type. | - | ✓ |
| `usableBlocks` (`usableBlocks`) | `SelectedBlocks` | The usable blocks. Only blocks in this list can be used in the editor. | `["events:when_start_clicked"]` | ✓ |
| `editorState` (`editorState`) | `object` | The editor state. | `{}` | ✓ |
| `WebwriterBlocks.scopedElements` | `Record<string, typeof LitElement>` | - | - | ✗ |
| `WebwriterBlocks.shadowRootOptions` | `ShadowRootInit` | - | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, events, custom CSS properties, or CSS parts.*


---
*Generated with @webwriter/build@1.9.0*
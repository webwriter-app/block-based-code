import * as Blockly from "blockly";
import { Theme } from "blockly";
import ComponentStyle = Theme.ComponentStyle;

// Heavily inspired by the Scratch theme:
// https://github.com/scratchfoundation/scratch-blocks/wiki/Colors
const blockStyles = {
  control_blocks: {
    colourPrimary: "#ffab19",
    colourSecondary: "#ec9c13",
    colourTertiary: "#cf8b17",
  },
  event_blocks: {
    colourPrimary: "#ffbf00",
    colourSecondary: "#e6ac00",
    colourTertiary: "#cc9900",
  },
  look_blocks: {
    colourPrimary: "#9966ff",
    colourSecondary: "#855cd6",
    colourTertiary: "#774dc6",
  },
  motion_blocks: {
    colourPrimary: "#4c97ff",
    colourSecondary: "#4280d7",
    colourTertiary: "#3373cc",
  },
  operator_blocks: {
    colourPrimary: "#59c059",
    colourSecondary: "#46b946",
    colourTertiary: "#389438",
  },
  variable_blocks: {
    colourPrimary: "#ff8c1a",
    colourSecondary: "#ff8000",
    colourTertiary: "#db6e00",
  },
} satisfies { [key: string]: Pick<Blockly.Theme.BlockStyle, "colourPrimary" | "colourSecondary" | "colourTertiary"> };
export type BlockStyle = keyof typeof blockStyles;

const categoryStyles = {
  controls: {
    colour: "#ffab19",
  },
  events: {
    colour: "#ffbf00",
  },
  looks: {
    colour: "#9966ff",
  },
  motions: {
    colour: "#4c97ff",
  },
  operators: {
    colour: "#59c059",
  },
  variables: {
    colour: "#ff8c1a",
  },
} satisfies { [key: string]: Pick<Blockly.Theme.CategoryStyle, "colour"> };
export type CategoryStyle = keyof typeof categoryStyles | "math";

const componentStyles: ComponentStyle = {
  workspaceBackgroundColour: "var(--sl-color-neutral-0)",
  scrollbarColour: "var(--sl-color-neutral-700)",
  scrollbarOpacity: 0.4,
};

export class WebWriterTheme extends Blockly.Theme {
  public override startHats = true;

  constructor() {
    super("webwriter", blockStyles, categoryStyles, componentStyles);
  }
}

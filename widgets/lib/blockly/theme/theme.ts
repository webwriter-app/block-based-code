import * as Blockly from "blockly";

// Heavily inspired by the Scratch theme:
// https://github.com/scratchfoundation/scratch-blocks/wiki/Colors
const blockStyles: Record<string, Pick<Blockly.Theme.BlockStyle, "colourPrimary" | "colourSecondary" | "colourTertiary">> = {
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
};

const categoryStyles: Record<string, Pick<Blockly.Theme.CategoryStyle, "colour">> = {
  control: {
    colour: "#ffab19",
  },
  event: {
    colour: "#ffbf00",
  },
  motion: {
    colour: "#4c97ff",
  },
  operator: {
    colour: "#59c059",
  },
  variable: {
    colour: "#ff8c1a",
  },
};

export class WebWriterTheme extends Blockly.Theme {
  public override startHats = true;

  constructor() {
    super("webwriter", blockStyles, categoryStyles);
  }
}

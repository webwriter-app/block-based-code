import * as Blockly from "blockly";

// Heavily inspired by Scratch Colors.
// https://github.com/scratchfoundation/scratch-blocks/wiki/Colors

export enum BlockStyle {
  CONTROL = "control_blocks",
  EVENT = "event_blocks",
  MOTION = "motion_blocks",
  OPERATOR = "operator_blocks",
  VARIABLE = "variable_blocks",
}

export enum CategoryStyle {
  CONTROLS = "controls_category",
  EVENTS = "events_category",
  MOTIONS = "motions_category",
  OPERATORS = "operators_category",
  VARIABLES = "variables_category",
}

export class WebWriterTheme extends Blockly.Theme {
  public override startHats = true;

  constructor() {
    super("webwriter", {
      [BlockStyle.CONTROL]: {
        colourPrimary: "#ffab19",
        colourSecondary: "#ec9c13",
        colourTertiary: "#cf8b17",
      },
      [BlockStyle.EVENT]: {
        colourPrimary: "#ffbf00",
        colourSecondary: "#e6ac00",
        colourTertiary: "#cc9900",
      },
      [BlockStyle.MOTION]: {
        colourPrimary: "#4c97ff",
        colourSecondary: "#4280d7",
        colourTertiary: "#3373cc",
      },
      [BlockStyle.OPERATOR]: {
        colourPrimary: "#59c059",
        colourSecondary: "#46b946",
        colourTertiary: "#389438",
      },
      [BlockStyle.VARIABLE]: {
        colourPrimary: "#ff8c1a",
        colourSecondary: "#ff8000",
        colourTertiary: "#db6e00",
      },
    }, {
      [CategoryStyle.CONTROLS]: { colour: "#ffab19" },
      [CategoryStyle.EVENTS]: { colour: "#ffbf00" },
      [CategoryStyle.MOTIONS]: { colour: "#4c97ff" },
      [CategoryStyle.OPERATORS]: { colour: "#59c059" },
      [CategoryStyle.VARIABLES]: { colour: "#ff8c1a" },
    }, {

    });
  }
}

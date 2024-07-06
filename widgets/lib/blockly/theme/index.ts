import * as Blockly from "blockly";
import { CategoryKey } from "../types";

// Heavily inspired by Scratch Colors.
// https://github.com/scratchfoundation/scratch-blocks/wiki/Colors

export const BlockStyle: Record<CategoryKey, string> = {
  [CategoryKey.CONTROLS]: "control_blocks",
  [CategoryKey.EVENTS]: "event_blocks",
  [CategoryKey.MOTIONS]: "motion_blocks",
  [CategoryKey.OPERATORS]: "operator_blocks",
  [CategoryKey.VARIABLES]: "variable_blocks",
};

export const CategoryStyle: Record<CategoryKey, string> = {
  [CategoryKey.CONTROLS]: "controls_category",
  [CategoryKey.EVENTS]: "events_category",
  [CategoryKey.MOTIONS]: "motions_category",
  [CategoryKey.OPERATORS]: "operators_category",
  [CategoryKey.VARIABLES]: "variables_category",
};

export class WebWriterTheme extends Blockly.Theme {
  public override startHats = true;

  constructor() {
    super("webwriter", {
      [BlockStyle.controls]: {
        colourPrimary: "#ffab19",
        colourSecondary: "#ec9c13",
        colourTertiary: "#cf8b17",
      },
      [BlockStyle.events]: {
        colourPrimary: "#ffbf00",
        colourSecondary: "#e6ac00",
        colourTertiary: "#cc9900",
      },
      [BlockStyle.motions]: {
        colourPrimary: "#4c97ff",
        colourSecondary: "#4280d7",
        colourTertiary: "#3373cc",
      },
      [BlockStyle.operators]: {
        colourPrimary: "#59c059",
        colourSecondary: "#46b946",
        colourTertiary: "#389438",
      },
      [BlockStyle.variables]: {
        colourPrimary: "#ff8c1a",
        colourSecondary: "#ff8000",
        colourTertiary: "#db6e00",
      },
    }, {
      [CategoryStyle.controls]: { colour: "#ffab19" },
      [CategoryStyle.events]: { colour: "#ffbf00" },
      [CategoryStyle.motions]: { colour: "#4c97ff" },
      [CategoryStyle.operators]: { colour: "#59c059" },
      [CategoryStyle.variables]: { colour: "#ff8c1a" },
    }, {

    });
  }
}

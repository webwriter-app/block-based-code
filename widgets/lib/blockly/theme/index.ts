import * as Blockly from "blockly";

// Heavily inspired by Scratch Colors.
// https://github.com/scratchfoundation/scratch-blocks/wiki/Colors

const categoryStyles = {
  controls_category: { colour: "#ffab19" },
  events_category: { colour: "#ffbf00" },
  motions_category: { colour: "#4c97ff" },
  operators_category: { colour: "#59c059" },
  variables_category: { colour: "#ff8c1a" },
};

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

Blockly.Theme.defineTheme("webwriter", {
  name: "webwriter",
  base: Blockly.Themes.Zelos,
  categoryStyles,
  blockStyles,
  startHats: true,
});

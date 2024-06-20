import * as Blockly from "blockly";

const categoryStyles = {
  events_category: { colour: "#FFBF00" },
};

Blockly.Theme.defineTheme("webwriter", {
  name: "webwriter",
  base: Blockly.Themes.Zelos,
  categoryStyles,
  startHats: true,
});

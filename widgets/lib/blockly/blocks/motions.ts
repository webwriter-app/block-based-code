import { generateBlockDefinition } from "./utils";

const move = generateBlockDefinition({
  name: "move",
  category: "motion",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "move",
}, {
  type: "input_value",
  name: "STEPS",
  check: "Number",
}, {
  type: "input_dummy",
  text: "steps",
}]);

const rotate = generateBlockDefinition({
  name: "rotate",
  category: "motion",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "rotate",
}, {
  type: "input_value",
  name: "DEGREES",
  check: "Number",
}, {
  type: "input_dummy",
  text: "degrees",
}]);

const goToX = generateBlockDefinition({
  name: "go_to_x",
  category: "motion",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "go to x:",
}, {
  type: "input_value",
  name: "X",
  check: "Number",
}]);

const goToY = generateBlockDefinition({
  name: "go_to_y",
  category: "motion",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "go to y:",
}, {
  type: "input_value",
  name: "Y",
  check: "Number",
}]);

const goToXY = generateBlockDefinition({
  name: "go_to_xy",
  category: "motion",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "go to x:",
}, {
  type: "input_value",
  name: "X",
  check: "Number",
}, {
  type: "input_dummy",
  text: "y:",
}, {
  type: "input_value",
  name: "Y",
  check: "Number",
}]);

const xPosition = generateBlockDefinition({
  name: "x_position",
  category: "motion",
  output: "Number",
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "x position",
}]);

const yPosition = generateBlockDefinition({
  name: "y_position",
  category: "motion",
  output: "Number",
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "y position",
}]);

export const motionBlocks = [
  move,
  rotate,
  goToX,
  goToY,
  goToXY,
  xPosition,
  yPosition,
];

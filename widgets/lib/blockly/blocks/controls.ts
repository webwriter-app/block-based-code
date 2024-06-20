import { generateBlockDefinition } from "./utils";

const ifBlock = generateBlockDefinition({
  name: "if",
  category: "control",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "if",
}, {
  type: "input_value",
  name: "condition",
  check: "Boolean",
}, {
  type: "input_dummy",
  text: "then",
}, {
  type: "input_statement",
  name: "if",
}]);

const ifElseBlock = generateBlockDefinition({
  name: "if_else",
  category: "control",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "if",
}, {
  type: "input_value",
  name: "condition",
  check: "Boolean",
}, {
  type: "input_dummy",
  text: "then",
}, {
  type: "input_statement",
  name: "if",
}, {
  type: "input_dummy",
  text: "else",
}, {
  type: "input_statement",
  name: "else",
}]);

const waitBlock = generateBlockDefinition({
  name: "wait",
  category: "control",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "wait",
}, {
  type: "input_value",
  name: "wait",
  check: "Number",
}]);

const repeatBlock = generateBlockDefinition({
  name: "repeat",
  category: "control",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "repeat",
}, {
  type: "input_value",
  name: "repeat",
  check: "Number",
}, {
  type: "input_statement",
  name: "repeat",
}]);

const foreverBlock = generateBlockDefinition({
  name: "forever",
  category: "control",
  prev: null,
  next: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "forever",
}, {
  type: "input_statement",
  name: "forever",
}]);

const stopBlock = generateBlockDefinition({
  name: "stop",
  category: "control",
  prev: null,
  tooltip: "",
  helpUrl: "",
}, [{
  type: "input_dummy",
  text: "stop",
}]);

export const controlBlocks = [
  ifBlock,
  ifElseBlock,
  waitBlock,
  repeatBlock,
  foreverBlock,
  stopBlock,
];

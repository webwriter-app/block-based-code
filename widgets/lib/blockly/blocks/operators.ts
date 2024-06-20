import { generateBlockDefinition } from "./utils";

const generateMathBlockDefinition = (name: string, symbol: string) => generateBlockDefinition({
  name,
  category: "operator",
  tooltip: "",
  helpUrl: "",
  output: "Number",
}, [
  {
    type: "input_value",
    name: "A",
    check: "Number",
  }, {
    type: "input_dummy",
    text: symbol,
  }, {
    type: "input_value",
    name: "B",
    check: "Number",
  },
]);

const sumBlock = generateMathBlockDefinition("sum", "+");
const subtractBlock = generateMathBlockDefinition("subtract", "-");
const multiplyBlock = generateMathBlockDefinition("multiply", "*");
const divideBlock = generateMathBlockDefinition("divide", "/");

const generateCompareBlockDefinition = (name: string, symbol: string) => generateBlockDefinition({
  name,
  category: "operator",
  tooltip: "",
  helpUrl: "",
  output: "Boolean",
}, [
  {
    type: "input_value",
    name: "A",
    check: "Number",
  }, {
    type: "input_dummy",
    text: symbol,
  }, {
    type: "input_value",
    name: "B",
    check: "Number",
  },
]);

const smallerBlock = generateCompareBlockDefinition("smaller", "<");
const greaterBlock = generateCompareBlockDefinition("greater", ">");
const equalsBlock = generateCompareBlockDefinition("equals", "=");

const generateOperatorBlockDefinition = (name: string, symbol: string) => generateBlockDefinition({
  name,
  category: "operator",
  tooltip: "",
  helpUrl: "",
  output: "Boolean",
}, [
  {
    type: "input_value",
    name: "A",
    check: "Boolean",
  }, {
    type: "input_dummy",
    text: symbol,
  }, {
    type: "input_value",
    name: "B",
    check: "Boolean",
  },
]);

const andBlock = generateOperatorBlockDefinition("and", "and");
const orBlock = generateOperatorBlockDefinition("or", "or");

export const operatorBlocks = [
  sumBlock,
  subtractBlock,
  multiplyBlock,
  divideBlock,
  smallerBlock,
  greaterBlock,
  equalsBlock,
  andBlock,
  orBlock,
];

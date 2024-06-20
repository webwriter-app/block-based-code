const ifBlock = {
  type: "if",
  message0: "if %1 %2 then %3 %4",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_value",
      name: "condition",
      check: "Boolean",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "if",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: "control_blocks",
  tooltip: "",
  helpUrl: "",
};

const ifElseBlock = {
  type: "if_else",
  message0: "if %1 %2 then %3 %4 else %5 %6",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_value",
      name: "condition",
      check: "Boolean",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "if",
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "else",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: "control_blocks",
  tooltip: "",
  helpUrl: "",
};

export const controlBlocks = [
  ifBlock,
  ifElseBlock,
];

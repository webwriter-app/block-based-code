import * as Blockly from "blockly";

export const blockDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray([{
  type: "math:number",
  message0: "%1",
  args0: [
    {
      type: "field_number",
      name: "NUM",
      value: 0,
    },
  ],
  output: "Number",
}]);

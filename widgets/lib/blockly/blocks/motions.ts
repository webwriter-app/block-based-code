import { BlockType } from "../types";

export const blocks = [
  {
    type: BlockType.MOVE,
    message0: "move %1 steps",
    args0: [
      {
        type: "input_value",
        name: "STEPS",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.ROTATE,
    message0: "rotate %1 degrees",
    args0: [
      {
        type: "input_value",
        name: "DEGREES",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.GO_TO_X,
    message0: "go to x: %1",
    args0: [
      {
        type: "input_value",
        name: "X",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.GO_TO_Y,
    message0: "go to y: %1",
    args0: [
      {
        type: "input_value",
        name: "Y",
        check: "Number",
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.GO_TO_XY,
    message0: "go to x: %1 y: %2",
    args0: [
      {
        type: "input_value",
        name: "X",
        check: "Number",
      },
      {
        type: "input_value",
        name: "Y",
        check: "Number",
      },
    ],
    inputsInline: true,
    nextStatement: null,
    previousStatement: null,
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.X_POSITION,
    message0: "x position",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.Y_POSITION,
    message0: "y position",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  },
];

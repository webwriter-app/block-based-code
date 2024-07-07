import { BlockType } from "../types";

export const blocks = [
  {
    type: BlockType.MOVE,
    message0: "%{BKY_MOVE}",
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
    message0: "%{BKY_ROTATE}",
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
    message0: "%{BKY_GO_TO_X}",
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
    message0: "%{BKY_GO_TO_Y}",
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
    message0: "%{BKY_GO_TO_XY}",
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
    message0: "%{BKY_X_POSITION}",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  },
  {
    type: BlockType.Y_POSITION,
    message0: "%{BKY_Y_POSITION}",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  },
];

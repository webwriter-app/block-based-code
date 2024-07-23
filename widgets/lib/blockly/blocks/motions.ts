import { BlockDefinition } from "../types";

export const blocks = [
  {
    type: "motions:move",
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
  } as const,
  {
    type: "motions:rotate",
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
  } as const,
  {
    type: "motions:set_rotation",
    message0: "%{BKY_SET_ROTATION}",
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
  } as const,
  {
    type: "motions:go_to_x",
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
  } as const,
  {
    type: "motions:go_to_y",
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
  } as const,
  {
    type: "motions:go_to_xy",
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
  } as const,
  {
    type: "motions:x_position",
    message0: "%{BKY_X_POSITION}",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  } as const,
  {
    type: "motions:y_position",
    message0: "%{BKY_Y_POSITION}",
    output: "Number",
    category: "motions",
    style: "motion_blocks",
  } as const,
] satisfies BlockDefinition[];

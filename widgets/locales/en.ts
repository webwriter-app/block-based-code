import { Dictionary } from "../types";

// eslint-disable-next-line import/no-default-export
export const dictionary: Dictionary = {
  START: "Start Execution",
  STOP: "Stop Execution",
  FULLSCREEN: "Enter Fullscreen",
  FULLSCREEN_EXIT: "Leave Fullscreen",
  ERROR: "An error occurred!",
  OPTIONS: {
    READONLY: "Readonly",
    STAGE: "Stage",
    STAGE_TYPES: {
      canvas: "Canvas",
      "code-editor": "Code Editor",
      test: "Test",
    },
    AVAILABLE_BLOCKS: "Available Blocks",
  },
  BLOCKS: {
    // Events
    WHEN_START_CLICKED: "when %1 clicked",
    // Controls
    WAIT: "wait %1 seconds",
    REPEAT: "repeat %1",
    FOREVER: "forever",
    IF: "if %1, then",
    ELSE: "else",
    STOP: "stop",
    // Operators
    AND: "%1 and %2",
    OR: "%1 or %2",
    // Motions
    MOVE: "move %1 steps",
    ROTATE: "rotate by %1 degrees",
    GO_TO_X: "go to x: %1",
    GO_TO_Y: "go to y: %1",
    GO_TO_XY: "go to x: %1 y: %2",
    X_POSITION: "x-position",
    Y_POSITION: "y-position",
  },
  CATEGORY: {
    CONTROLS: "Controls",
    EVENTS: "Events",
    OPERATORS: "Operators",
    MOTIONS: "Motions",
    VARIABLES: "Variables",
  },
};

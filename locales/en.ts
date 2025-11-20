import { Dictionary } from "../types";

// eslint-disable-next-line import/no-default-export
export const dictionary: Dictionary = {
  START: "Start Execution",
  RESTART: "Restart Execution",
  STOP: "Stop Execution",
  FULLSCREEN: "Enter Fullscreen",
  FULLSCREEN_EXIT: "Leave Fullscreen",
  HELP: "Help",
  ERROR: "An error occurred!",
  EXECUTION_OPTIONS: "Execution Options",
  SHORTCUTS: "Shortcuts",
  ZOOM: {
    IN: "Zoom In",
    OUT: "Zoom Out",
    RESET: "Reset Zoom",
  },
  OPTIONS: {
    READONLY: "Readonly",
    READONLY_TOOLTIP: "Choose whether the blocks can be edited",
    STAGE: "Stage",
    STAGE_TOOLTIP: "Choose the type of stage",
    STAGE_TYPES: {
      CODE: "Code",
      CANVAS: "Canvas",
    },
    AVAILABLE_BLOCKS: "Available Blocks",
    AVAILABLE_BLOCKS_TOOLTIP: "Choose the blocks that are available in the toolbox",
  },
  CONTROLS: {
    DUPLICATE_BLOCK: "Duplicate",
    CROSS_TAB_COPY: "Copy",
    CROSS_TAB_PASTE: "Paste",
    DELETE: "Delete",
  },
  BLOCKS: {
    // Events
    WHEN_START_CLICKED: "when %1 clicked",
    WHEN_SPRITE_CLICKED: "when this sprite clicked",
    WHEN_KEY_PRESSED: "when %1 key pressed",
    KEY_ANY: "any",
    KEY_SPACE: "space",
    KEY_ARROW_UP: "up arrow",
    KEY_ARROW_DOWN: "down arrow",
    KEY_ARROW_LEFT: "left arrow",
    KEY_ARROW_RIGHT: "right arrow",
    // Controls
    WAIT: "wait %1 seconds",
    REPEAT: "repeat %1",
    FOREVER: "forever",
    IF: "if %1, then",
    ELSE: "else",
    STOP: "stop",
    // Operators
    RANDOM: "random between %1 and %2",
    AND: "%1 and %2",
    OR: "%1 or %2",
    NOT: "not %1",
    JOIN: "join %1 %2",
    ABSOLUTE: "absolute of %1",
    // Looks
    SAY: "say %1",
    SAY_FOR_SECONDS: "say %1 for %2 seconds",
    SET_COLOR: "set color effect to %1",
    // Motions
    MOVE: "move %1 steps",
    ROTATE: "rotate by %1 degrees",
    SET_ROTATION: "set rotation to %1 degrees",
    SET_X: "set x to %1",
    SET_Y: "set y to %1",
    SET_XY: "set x to %1 and y to %2",
    GET_X: "x-position",
    GET_Y: "y-position",
    // Sensing
    TIMER: "timer",
    RESET_TIMER: "reset timer",
  },
  CATEGORY: {
    CONTROLS: "Controls",
    EVENTS: "Events",
    OPERATORS: "Operators",
    LOOKS: "Looks",
    MOTIONS: "Motions",
    VARIABLES: "Variables",
    SENSING: "Sensing",
  },
};

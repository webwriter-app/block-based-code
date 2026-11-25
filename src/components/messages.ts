import type { MsgFn } from "@lit/localize";

/** The texts of the blocks, by the key that the block definitions name as `%{BKY_<key>}`. */
export const blockMessages = (msg: MsgFn): Record<string, string> => ({
  // Events
  WHEN_START_CLICKED: msg("when %1 clicked"),
  WHEN_SPRITE_CLICKED: msg("when this sprite clicked"),
  WHEN_KEY_PRESSED: msg("when %1 key pressed"),
  KEY_ANY: msg("any"),
  KEY_SPACE: msg("space"),
  KEY_ARROW_UP: msg("up arrow"),
  KEY_ARROW_DOWN: msg("down arrow"),
  KEY_ARROW_LEFT: msg("left arrow"),
  KEY_ARROW_RIGHT: msg("right arrow"),
  // Controls
  WAIT: msg("wait %1 seconds"),
  REPEAT: msg("repeat %1"),
  FOREVER: msg("forever"),
  IF: msg("if %1, then"),
  ELSE: msg("else"),
  STOP: msg("stop"),
  // Operators
  RANDOM: msg("pick random %1 to %2"),
  AND: msg("%1 and %2"),
  OR: msg("%1 or %2"),
  NOT: msg("not %1"),
  JOIN: msg("join %1 %2"),
  ABSOLUTE: msg("absolute of %1"),
  // Looks
  SAY: msg("say %1"),
  SAY_FOR_SECONDS: msg("say %1 for %2 seconds"),
  SET_COLOR: msg("set color effect to %1"),
  SET_BACKGROUND_COLOR: msg("set background color to %1"),
  // Motions
  MOVE: msg("move %1 steps"),
  ROTATE: msg("rotate by %1 degrees"),
  SET_ROTATION: msg("set rotation to %1 degrees"),
  SET_X: msg("set x to %1"),
  SET_Y: msg("set y to %1"),
  SET_XY: msg("set x to %1 and y to %2"),
  GET_X: msg("x-position"),
  GET_Y: msg("y-position"),
  // Sensing
  TIMER: msg("timer"),
  RESET_TIMER: msg("reset timer"),
  // Sounds
  PLAY_SOUND: msg("play sound %1"),
  PLAY_SOUND_UNTIL_DONE: msg("play sound %1 until done"),
  STOP_ALL_SOUNDS: msg("stop all sounds"),
  SOUND_POP: msg("pop"),
  SOUND_FAILURE: msg("failure"),
  SOUND_SUCCESS: msg("success"),
});

/** The texts of Blockly's context menu entries that the widget words itself. */
export const controlMessages = (msg: MsgFn): Record<string, string> => ({
  DUPLICATE_BLOCK: msg("Duplicate"),
  CROSS_TAB_COPY: msg("Copy"),
  CROSS_TAB_PASTE: msg("Paste"),
  DELETE: msg("Delete"),
});

/** The name of a toolbox category. */
export const categoryName = (msg: MsgFn, category: string): string => {
  switch (category) {
    case "controls": return msg("Controls");
    case "events": return msg("Events");
    case "operators": return msg("Operators");
    case "looks": return msg("Looks");
    case "motions": return msg("Motions");
    case "variables": return msg("Variables");
    case "sensing": return msg("Sensing");
    case "sounds": return msg("Sounds");
    default: return category;
  }
};

/** The name of a stage type. */
export const stageTypeName = (msg: MsgFn, type: string): string => {
  switch (type) {
    case "code": return msg("Code");
    case "canvas": return msg("Canvas");
    default: return type;
  }
};

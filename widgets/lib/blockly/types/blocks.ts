export enum CategoryKey {
  CONTROLS = "controls",
  EVENTS = "events",
  MOTIONS = "motions",
  OPERATORS = "operators",
  VARIABLES = "variables",
}

export enum BlockKey {
  // Controls
  WAIT = `${CategoryKey.CONTROLS}:wait`,
  REPEAT = `${CategoryKey.CONTROLS}:repeat`,
  FOREVER = `${CategoryKey.CONTROLS}:forever`,
  IF = `${CategoryKey.CONTROLS}:if`,
  IF_ELSE = `${CategoryKey.CONTROLS}:if_else`,
  STOP = `${CategoryKey.CONTROLS}:stop`,
  // Events
  WHEN_START_CLICKED = `${CategoryKey.EVENTS}:when_start_clicked`,
  // Motions
  MOVE = `${CategoryKey.MOTIONS}:move`,
  ROTATE = `${CategoryKey.MOTIONS}:rotate`,
  GO_TO_X = `${CategoryKey.MOTIONS}:go_to_x`,
  GO_TO_Y = `${CategoryKey.MOTIONS}:go_to_y`,
  GO_TO_XY = `${CategoryKey.MOTIONS}:go_to_xy`,
  X_POSITION = `${CategoryKey.MOTIONS}:x_position`,
  Y_POSITION = `${CategoryKey.MOTIONS}:y_position`,
  // Operators
  SUM = `${CategoryKey.OPERATORS}:sum`,
  SUBTRACT = `${CategoryKey.OPERATORS}:subtract`,
  MULTIPLY = `${CategoryKey.OPERATORS}:multiply`,
  DIVIDE = `${CategoryKey.OPERATORS}:divide`,
  SMALLER = `${CategoryKey.OPERATORS}:smaller`,
  GREATER = `${CategoryKey.OPERATORS}:greater`,
  EQUAL = `${CategoryKey.OPERATORS}:equal`,
  AND = `${CategoryKey.OPERATORS}:and`,
  OR = `${CategoryKey.OPERATORS}:or`,
}

export type BlockDefinition = {
  kind: "block";
  type: BlockKey;
};

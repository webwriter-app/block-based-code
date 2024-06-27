export enum CategoryKey {
  CONTROL = "control",
  EVENT = "event",
  MOTION = "motion",
  OPERATOR = "operator",
}

export enum BlockKey {
  // Controls
  WAIT = `${CategoryKey.CONTROL}:wait`,
  REPEAT = `${CategoryKey.CONTROL}:repeat`,
  FOREVER = `${CategoryKey.CONTROL}:forever`,
  IF = `${CategoryKey.CONTROL}:if`,
  IF_ELSE = `${CategoryKey.CONTROL}:if_else`,
  STOP = `${CategoryKey.CONTROL}:stop`,
  // Events
  WHEN_START_CLICKED = `${CategoryKey.EVENT}:when_start_clicked`,
  // Motions
  MOVE = `${CategoryKey.MOTION}:move`,
  ROTATE = `${CategoryKey.MOTION}:rotate`,
  GO_TO_X = `${CategoryKey.MOTION}:go_to_x`,
  GO_TO_Y = `${CategoryKey.MOTION}:go_to_y`,
  GO_TO_XY = `${CategoryKey.MOTION}:go_to_xy`,
  X_POSITION = `${CategoryKey.MOTION}:x_position`,
  Y_POSITION = `${CategoryKey.MOTION}:y_position`,
  // Operators
  SUM = `${CategoryKey.OPERATOR}:sum`,
  SUBTRACT = `${CategoryKey.OPERATOR}:subtract`,
  MULTIPLY = `${CategoryKey.OPERATOR}:multiply`,
  DIVIDE = `${CategoryKey.OPERATOR}:divide`,
  SMALLER = `${CategoryKey.OPERATOR}:smaller`,
  GREATER = `${CategoryKey.OPERATOR}:greater`,
  EQUAL = `${CategoryKey.OPERATOR}:equal`,
  AND = `${CategoryKey.OPERATOR}:and`,
  OR = `${CategoryKey.OPERATOR}:or`,
}

export type BlockDefinition = {
  kind: "block";
  type: BlockKey;
};

export enum CategoryKey {
  CONTROL = "control",
}

export enum BlockKey {
  // Controls
  WAIT = `${CategoryKey.CONTROL}:wait`,
  REPEAT = `${CategoryKey.CONTROL}:repeat`,
  FOREVER = `${CategoryKey.CONTROL}:forever`,
  IF = `${CategoryKey.CONTROL}:if`,
  IF_ELSE = `${CategoryKey.CONTROL}:if_else`,
  STOP = `${CategoryKey.CONTROL}:stop`,
}

export type BlockDefinition = {
  kind: "block";
  type: BlockKey;
};

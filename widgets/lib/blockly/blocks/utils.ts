export const generateBlockDefinition = (def: {
  name: string,
  category: string,
  prev?: null,
  next?: null,
  tooltip?: string,
  helpUrl?: string,
  hat?: "cap",
}, inputs: {
  type: string,
  text?: string,
  name?: string,
  check?: string,
  src?: string,
  width?: number,
  height?: number,
  alt?: string,
  flipRtl?: boolean,
}[]) => {
  const message0 = inputs.reduce((message, input, currentIndex) => {
    const {
      type, text,
    } = input;
    return `${message}${type === "input_dummy" ? `${text} ` : ""} %${currentIndex + 1} `;
  }, "");
  const args0 = inputs;

  const {
    name: type, category, prev: previousStatement, next: nextStatement, tooltip, helpUrl,
  } = def;

  return {
    type,
    message0,
    args0,
    previousStatement,
    nextStatement,
    tooltip,
    helpUrl,
    style: `${category}_blocks`,
    inputsInline: true,
  };
};

type Types = "Number" | "Boolean";

export const generateBlockDefinition = (def: {
  name: string,
  category: string,
  prev?: null,
  next?: null,
  tooltip?: string,
  helpUrl?: string,
  hat?: "cap",
  inputsInline?: boolean,
  output?: Types,
}, inputs: {
  type: string,
  text?: string,
  name?: Uppercase<string>,
  check?: Types | Types[]
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
    name: type, category, prev: previousStatement, next: nextStatement, inputsInline = true,
  } = def;

  return {
    type,
    message0,
    args0,
    previousStatement,
    nextStatement,
    style: `${category}_blocks`,
    inputsInline,
    ...def,
  };
};

export class WebWriterToolbox {
  public static get default() {
    const shadowMathInput = {
      shadow: {
        type: "math_number",
        fields: {
          NUM: "0",
        },
      },
    };

    return {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Motions",
          categoryStyle: "motions_category",
          contents: [
            {
              kind: "block",
              type: "move",
              inputs: {
                STEPS: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "rotate",
              inputs: {
                DEGREES: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "go_to_x",
              inputs: {
                X: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "go_to_y",
              inputs: {
                Y: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "go_to_xy",
              inputs: {
                X: shadowMathInput,
                Y: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "x_position",
            },
            {
              kind: "block",
              type: "y_position",
            },
          ],
        },
        {
          kind: "category",
          name: "Events",
          categoryStyle: "events_category",
          contents: [
            {
              kind: "block",
              type: "when_start_clicked",
            },
          ],
        },
        {
          kind: "category",
          name: "Controls",
          categoryStyle: "controls_category",
          contents: [
            {
              kind: "block",
              type: "wait",
              inputs: {
                DURATION: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "repeat",
              inputs: {
                TIMES: shadowMathInput,
              },
            },
            {
              kind: "block",
              type: "forever",
            },
            {
              kind: "block",
              type: "if",
            },
            {
              kind: "block",
              type: "if_else",
            },
            {
              kind: "block",
              type: "stop",
            },
          ],
        },
        {
          kind: "category",
          name: "Operators",
          categoryStyle: "operators_category",
          contents: [
            ...["sum", "subtract", "multiply", "divide"].map((type) => ({
              kind: "block",
              type,
              inputs: {
                A: shadowMathInput,
                B: shadowMathInput,
              },
            })),
            {
              kind: "sep",
              gap: 64,
            },
            ...["smaller", "greater", "equals"].map((type) => ({
              kind: "block",
              type,
              inputs: {
                A: shadowMathInput,
                B: shadowMathInput,
              },
            })),
            {
              kind: "sep",
              gap: 64,
            },
            ...["and", "or"].map((type) => ({
              kind: "block",
              type,
            })),
          ],
        },
        {
          kind: "category",
          name: "Variables",
          categoryStyle: "variables_category",
          custom: "VARIABLE",
        },
      ],
    };
  }
}

import { Dictionary } from "../types";

export const dictionary: Dictionary = {
  START: "Starte Ausführung",
  STOP: "Stoppe Ausführung",
  FULLSCREEN: "Vollbildmodus",
  FULLSCREEN_EXIT: "Vollbildmodus verlassen",
  ERROR: "Es ist ein Fehler aufgetreten!",
  OPTIONS: {
    READONLY: "Schreibgeschützt",
    STAGE: "Bühne",
    STAGE_TYPES: {
      canvas: "Leinwand",
      "code-editor": "Code Editor",
      test: "Test",
    },
    AVAILABLE_BLOCKS: "Verfügbare Bausteine",
  },
  BLOCKS: {
    // Events
    WHEN_START_CLICKED: "wenn %1 angeklickt wird",
    // Controls
    WAIT: "warte %1 Sekunden",
    REPEAT: "wiederhole %1 mal",
    FOREVER: "wiederhole fortlaufend",
    IF: "falls %1, dann",
    ELSE: "sonst",
    STOP: "stoppe",
    // Operators
    AND: "%1 und %2",
    OR: "%1 oder %2",
    // Motions
    MOVE: "gehe %1 Schritte",
    ROTATE: "drehe um %1 Grad",
    GO_TO_X: "gehe zu x: %1",
    GO_TO_Y: "gehe zu y: %1",
    GO_TO_XY: "gehe zu x: %1 y: %2",
    X_POSITION: "x-Position",
    Y_POSITION: "y-Position",
  },
  CATEGORY: {
    CONTROLS: "Steuerung",
    EVENTS: "Ereignisse",
    OPERATORS: "Operatoren",
    MOTIONS: "Bewegungen",
    VARIABLES: "Variablen",
  },
};

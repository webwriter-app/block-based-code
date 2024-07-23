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
      CODE: "Code",
      CANVAS: "Leinwand",
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
    SET_ROTATION: "setze Rotation auf %1 Grad",
    SET_X: "setze x auf %1",
    SET_Y: "setze y auf %1",
    SET_XY: "setze x auf %1 und y auf %2",
    GET_X: "x-Position",
    GET_Y: "y-Position",
  },
  CATEGORY: {
    CONTROLS: "Steuerung",
    EVENTS: "Ereignisse",
    OPERATORS: "Operatoren",
    MOTIONS: "Bewegungen",
    VARIABLES: "Variablen",
  },
};

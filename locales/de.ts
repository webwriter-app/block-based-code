import { Dictionary } from "../types";

export const dictionary: Dictionary = {
  START: "Starte Ausführung",
  RESTART: "Ausführung neu starten",
  STOP: "Stoppe Ausführung",
  FULLSCREEN: "Vollbildmodus",
  FULLSCREEN_EXIT: "Vollbildmodus verlassen",
  ERROR: "Es ist ein Fehler aufgetreten!",
  EXECUTION_OPTIONS: "Ausführungsoptionen",
  ZOOM: {
    IN: "Vergrößern",
    OUT: "Verkleinern",
    RESET: "Zurücksetzen",
  },
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
    RANDOM: "zufallszahl zwischen %1 und %2",
    AND: "%1 und %2",
    OR: "%1 oder %2",
    NOT: "nicht %1",
    ABSOLUTE: "betrag von %1",
    // Looks
    SET_COLOR: "setze Farbeffekt auf %1",
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
    LOOKS: "Aussehen",
    MOTIONS: "Bewegungen",
    VARIABLES: "Variablen",
  },
};

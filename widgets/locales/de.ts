import { Dictionary } from "../types";

export const dictionary = {
  start: "Starte Ausführung",
  stop: "Stoppe Ausführung",
  fullscreen: "Vollbildmodus",
  fullscreenExit: "Vollbildmodus verlassen",
  error: "Es ist ein Fehler aufgetreten!",
  availableBlocks: "Verfügbare Bausteine",
} satisfies Dictionary;

export const blocks = {
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
};

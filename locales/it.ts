import { Dictionary } from "../types";

// eslint-disable-next-line import/no-default-export
export const dictionary: Dictionary = {
  START: "Avvia l'esecuzione",
  RESTART: "Riavvia l'esecuzione",
  STOP: "Interrompi l'esecuzione",
  FULLSCREEN: "Entra a schermo intero",
  FULLSCREEN_EXIT: "Esci da schermo intero",
  HELP: "Aiuto",
  ERROR: "Si è verificato un errore!",
  EXECUTION_OPTIONS: "Opzioni di esecuzione",
  RESET_STAGE: "Reimposta la scena",
  SHORTCUTS: "Scorciatoie da tastiera",
  DIALOG: { CANCEL: "Annulla", SAVE: "Salva", NO: "No", YES: "Sì", OK: "OK" },
  ZOOM: { IN: "Ingrandisci", OUT: "Riduci", RESET: "Reimposta lo zoom" },
  OPTIONS: {
    READONLY: "Sola lettura", READONLY_TOOLTIP: "Scegli se i blocchi possono essere modificati",
    STAGE: "Scena", STAGE_TOOLTIP: "Scegli il tipo di scena",
    STAGE_TYPES: { CODE: "Codice", CANVAS: "Area di disegno" },
    AVAILABLE_BLOCKS: "Blocchi disponibili",
    AVAILABLE_BLOCKS_TOOLTIP: "Scegli quali blocchi sono disponibili nella casella degli strumenti",
  },
  CONTROLS: { DUPLICATE_BLOCK: "Duplica", CROSS_TAB_COPY: "Copia", CROSS_TAB_PASTE: "Incolla", DELETE: "Elimina" },
  BLOCKS: {
    WHEN_START_CLICKED: "quando si fa clic su %1", WHEN_SPRITE_CLICKED: "quando si fa clic su questo sprite", WHEN_KEY_PRESSED: "quando si preme il tasto %1",
    KEY_ANY: "qualsiasi tasto", KEY_SPACE: "spazio", KEY_ARROW_UP: "freccia su", KEY_ARROW_DOWN: "freccia giù", KEY_ARROW_LEFT: "freccia sinistra", KEY_ARROW_RIGHT: "freccia destra",
    WAIT: "attendi %1 secondi", REPEAT: "ripeti %1 volte", FOREVER: "per sempre", IF: "se %1, allora", ELSE: "altrimenti", STOP: "ferma",
    RANDOM: "scegli un numero casuale da %1 a %2", AND: "%1 e %2", OR: "%1 o %2", NOT: "non %1", JOIN: "unisci %1 e %2", ABSOLUTE: "valore assoluto di %1",
    SAY: "dì %1", SAY_FOR_SECONDS: "dì %1 per %2 secondi", SET_COLOR: "imposta l'effetto colore a %1", SET_BACKGROUND_COLOR: "imposta il colore dello sfondo a %1",
    MOVE: "fai %1 passi", ROTATE: "ruota di %1 gradi", SET_ROTATION: "imposta la rotazione a %1 gradi", SET_X: "imposta x a %1", SET_Y: "imposta y a %1", SET_XY: "imposta x a %1 e y a %2",
    GET_X: "posizione x", GET_Y: "posizione y", TIMER: "cronometro", RESET_TIMER: "azzera il cronometro",
    PLAY_SOUND: "riproduci il suono %1", PLAY_SOUND_UNTIL_DONE: "riproduci il suono %1 fino alla fine", STOP_ALL_SOUNDS: "interrompi tutti i suoni",
    SOUND_POP: "pop", SOUND_FAILURE: "errore", SOUND_SUCCESS: "successo",
  },
  CATEGORY: { CONTROLS: "Controllo", EVENTS: "Eventi", OPERATORS: "Operatori", LOOKS: "Aspetto", MOTIONS: "Movimento", VARIABLES: "Variabili", SENSING: "Sensori", SOUNDS: "Suoni" },
};

import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Start køyring", RESTART: "Start køyringa på nytt", STOP: "Stopp køyring", FULLSCREEN: "Gå til fullskjerm", FULLSCREEN_EXIT: "Avslutt fullskjerm", HELP: "Hjelp", ERROR: "Det oppstod ein feil!", EXECUTION_OPTIONS: "Køyringsalternativ", RESET_STAGE: "Nullstill scena", SHORTCUTS: "Snarvegar",
 DIALOG: { CANCEL: "Avbryt", SAVE: "Lagre", NO: "Nei", YES: "Ja", OK: "OK" }, ZOOM: { IN: "Zoom inn", OUT: "Zoom ut", RESET: "Nullstill zoom" },
 OPTIONS: { READONLY: "Skriveverna", READONLY_TOOLTIP: "Vel om blokkene kan redigerast", STAGE: "Scene", STAGE_TOOLTIP: "Vel scenetype", STAGE_TYPES: { CODE: "Kode", CANVAS: "Lerret" }, AVAILABLE_BLOCKS: "Tilgjengelege blokker", AVAILABLE_BLOCKS_TOOLTIP: "Vel kva for blokker som er tilgjengelege i verktøykassa" },
 CONTROLS: { DUPLICATE_BLOCK: "Dupliser", CROSS_TAB_COPY: "Kopier", CROSS_TAB_PASTE: "Lim inn", DELETE: "Slett" },
 BLOCKS: {
 WHEN_START_CLICKED: "når det vert klikka på %1", WHEN_SPRITE_CLICKED: "når det vert klikka på denne figuren", WHEN_KEY_PRESSED: "når tasten %1 vert trykt", KEY_ANY: "vilkårleg tast", KEY_SPACE: "mellomrom", KEY_ARROW_UP: "pil opp", KEY_ARROW_DOWN: "pil ned", KEY_ARROW_LEFT: "pil venstre", KEY_ARROW_RIGHT: "pil høgre",
 WAIT: "vent %1 sekund", REPEAT: "gjenta %1 gongar", FOREVER: "for alltid", IF: "viss %1, så", ELSE: "elles", STOP: "stopp", RANDOM: "vel eit tilfeldig tal frå %1 til %2", AND: "%1 og %2", OR: "%1 eller %2", NOT: "ikkje %1", JOIN: "set saman %1 og %2", ABSOLUTE: "absoluttverdien av %1",
 SAY: "sei %1", SAY_FOR_SECONDS: "sei %1 i %2 sekund", SET_COLOR: "set fargeeffekten til %1", SET_BACKGROUND_COLOR: "set bakgrunnsfargen til %1", MOVE: "flytt %1 steg", ROTATE: "roter %1 gradar", SET_ROTATION: "set retninga til %1 gradar", SET_X: "set x til %1", SET_Y: "set y til %1", SET_XY: "set x til %1 og y til %2", GET_X: "x-posisjon", GET_Y: "y-posisjon", TIMER: "tidtakar", RESET_TIMER: "nullstill tidtakaren", PLAY_SOUND: "spel av lyden %1", PLAY_SOUND_UNTIL_DONE: "spel av lyden %1 til han er ferdig", STOP_ALL_SOUNDS: "stopp alle lydar", SOUND_POP: "plopp", SOUND_FAILURE: "mislykka", SOUND_SUCCESS: "vellykka"
 }, CATEGORY: { CONTROLS: "Styring", EVENTS: "Hendingar", OPERATORS: "Operatorar", LOOKS: "Utsjånad", MOTIONS: "Rørsle", VARIABLES: "Variablar", SENSING: "Sansing", SOUNDS: "Lydar" }
};

import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Start kørsel", RESTART: "Genstart kørsel", STOP: "Stop kørsel", FULLSCREEN: "Gå til fuld skærm", FULLSCREEN_EXIT: "Afslut fuld skærm", HELP: "Hjælp", ERROR: "Der opstod en fejl!", EXECUTION_OPTIONS: "Kørselsindstillinger", RESET_STAGE: "Nulstil scenen", SHORTCUTS: "Tastaturgenveje",
 DIALOG: { CANCEL: "Annuller", SAVE: "Gem", NO: "Nej", YES: "Ja", OK: "OK" }, ZOOM: { IN: "Zoom ind", OUT: "Zoom ud", RESET: "Nulstil zoom" },
 OPTIONS: { READONLY: "Skrivebeskyttet", READONLY_TOOLTIP: "Vælg, om blokkene kan redigeres", STAGE: "Scene", STAGE_TOOLTIP: "Vælg scenetypen", STAGE_TYPES: { CODE: "Kode", CANVAS: "Lærred" }, AVAILABLE_BLOCKS: "Tilgængelige blokke", AVAILABLE_BLOCKS_TOOLTIP: "Vælg, hvilke blokke der er tilgængelige i værktøjskassen" },
 CONTROLS: { DUPLICATE_BLOCK: "Duplikér", CROSS_TAB_COPY: "Kopiér", CROSS_TAB_PASTE: "Indsæt", DELETE: "Slet" },
 BLOCKS: {
 WHEN_START_CLICKED: "når der klikkes på %1", WHEN_SPRITE_CLICKED: "når der klikkes på denne figur", WHEN_KEY_PRESSED: "når der trykkes på %1", KEY_ANY: "en vilkårlig tast", KEY_SPACE: "mellemrum", KEY_ARROW_UP: "pil op", KEY_ARROW_DOWN: "pil ned", KEY_ARROW_LEFT: "pil venstre", KEY_ARROW_RIGHT: "pil højre",
 WAIT: "vent %1 sekunder", REPEAT: "gentag %1 gange", FOREVER: "for altid", IF: "hvis %1, så", ELSE: "ellers", STOP: "stop", RANDOM: "vælg et tilfældigt tal fra %1 til %2", AND: "%1 og %2", OR: "%1 eller %2", NOT: "ikke %1", JOIN: "sæt %1 og %2 sammen", ABSOLUTE: "absolutværdien af %1",
 SAY: "sig %1", SAY_FOR_SECONDS: "sig %1 i %2 sekunder", SET_COLOR: "sæt farveeffekten til %1", SET_BACKGROUND_COLOR: "sæt baggrundsfarven til %1", MOVE: "flyt %1 trin", ROTATE: "drej %1 grader", SET_ROTATION: "sæt retningen til %1 grader", SET_X: "sæt x til %1", SET_Y: "sæt y til %1", SET_XY: "sæt x til %1 og y til %2", GET_X: "x-position", GET_Y: "y-position", TIMER: "timer", RESET_TIMER: "nulstil timer", PLAY_SOUND: "afspil lyden %1", PLAY_SOUND_UNTIL_DONE: "afspil lyden %1, indtil den er færdig", STOP_ALL_SOUNDS: "stop alle lyde", SOUND_POP: "pop", SOUND_FAILURE: "fejl", SOUND_SUCCESS: "succes"
 }, CATEGORY: { CONTROLS: "Styring", EVENTS: "Hændelser", OPERATORS: "Operatorer", LOOKS: "Udseende", MOTIONS: "Bevægelse", VARIABLES: "Variabler", SENSING: "Registrering", SOUNDS: "Lyde" }
};

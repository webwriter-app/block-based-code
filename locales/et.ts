import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Käivita", RESTART: "Käivita uuesti", STOP: "Peata", FULLSCREEN: "Ava täisekraanvaade", FULLSCREEN_EXIT: "Välju täisekraanvaatest", HELP: "Abi", ERROR: "Tekkis viga!", EXECUTION_OPTIONS: "Käivitamise seaded", RESET_STAGE: "Lähtesta lava", SHORTCUTS: "Klaviatuuri otseteed",
 DIALOG: { CANCEL: "Tühista", SAVE: "Salvesta", NO: "Ei", YES: "Jah", OK: "Sobib" }, ZOOM: { IN: "Suurenda", OUT: "Vähenda", RESET: "Lähtesta suurendus" },
 OPTIONS: { READONLY: "Kirjutuskaitstud", READONLY_TOOLTIP: "Vali, kas plokke saab muuta", STAGE: "Lava", STAGE_TOOLTIP: "Vali lava tüüp", STAGE_TYPES: { CODE: "Kood", CANVAS: "Lõuend" }, AVAILABLE_BLOCKS: "Saadaolevad plokid", AVAILABLE_BLOCKS_TOOLTIP: "Vali tööriistakastis saadaolevad plokid" },
 CONTROLS: { DUPLICATE_BLOCK: "Dubleeri", CROSS_TAB_COPY: "Kopeeri", CROSS_TAB_PASTE: "Kleebi", DELETE: "Kustuta" },
 BLOCKS: {
 WHEN_START_CLICKED: "kui klõpsatakse %1", WHEN_SPRITE_CLICKED: "kui klõpsatakse sellel tegelasel", WHEN_KEY_PRESSED: "kui vajutatakse klahvi %1", KEY_ANY: "suvaline klahv", KEY_SPACE: "tühik", KEY_ARROW_UP: "ülesnool", KEY_ARROW_DOWN: "allanool", KEY_ARROW_LEFT: "vasaknool", KEY_ARROW_RIGHT: "paremnool",
 WAIT: "oota %1 sekundit", REPEAT: "korda %1 korda", FOREVER: "igavesti", IF: "kui %1, siis", ELSE: "muidu", STOP: "peata", RANDOM: "vali juhuslik arv vahemikus %1 kuni %2", AND: "%1 ja %2", OR: "%1 või %2", NOT: "mitte %1", JOIN: "ühenda %1 ja %2", ABSOLUTE: "%1 absoluutväärtus",
 SAY: "ütle %1", SAY_FOR_SECONDS: "ütle %1 %2 sekundit", SET_COLOR: "määra värviefektiks %1", SET_BACKGROUND_COLOR: "määra taustavärviks %1", MOVE: "liigu %1 sammu", ROTATE: "pööra %1 kraadi", SET_ROTATION: "määra suunaks %1 kraadi", SET_X: "määra x väärtuseks %1", SET_Y: "määra y väärtuseks %1", SET_XY: "määra x väärtuseks %1 ja y väärtuseks %2", GET_X: "x-asukoht", GET_Y: "y-asukoht", TIMER: "taimer", RESET_TIMER: "lähtesta taimer", PLAY_SOUND: "esita heli %1", PLAY_SOUND_UNTIL_DONE: "esita heli %1 lõpuni", STOP_ALL_SOUNDS: "peata kõik helid", SOUND_POP: "pops", SOUND_FAILURE: "ebaõnnestumine", SOUND_SUCCESS: "õnnestumine"
 }, CATEGORY: { CONTROLS: "Juhtimine", EVENTS: "Sündmused", OPERATORS: "Tehted", LOOKS: "Välimus", MOTIONS: "Liikumine", VARIABLES: "Muutujad", SENSING: "Tajumine", SOUNDS: "Helid" }
};

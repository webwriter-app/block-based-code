import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Hefja keyrslu", RESTART: "Endurræsa keyrslu", STOP: "Stöðva keyrslu", FULLSCREEN: "Opna allan skjáinn", FULLSCREEN_EXIT: "Loka öllum skjánum", HELP: "Hjálp", ERROR: "Villa kom upp!", EXECUTION_OPTIONS: "Keyrslustillingar", RESET_STAGE: "Endurstilla svið", SHORTCUTS: "Flýtilyklar",
 DIALOG: { CANCEL: "Hætta við", SAVE: "Vista", NO: "Nei", YES: "Já", OK: "Í lagi" }, ZOOM: { IN: "Stækka", OUT: "Minnka", RESET: "Endurstilla aðdrátt" },
 OPTIONS: { READONLY: "Skrifvarið", READONLY_TOOLTIP: "Veldu hvort hægt sé að breyta kubbunum", STAGE: "Svið", STAGE_TOOLTIP: "Veldu tegund sviðs", STAGE_TYPES: { CODE: "Kóði", CANVAS: "Strigi" }, AVAILABLE_BLOCKS: "Tiltækir kubbar", AVAILABLE_BLOCKS_TOOLTIP: "Veldu hvaða kubbar eru tiltækir í verkfærakistunni" },
 CONTROLS: { DUPLICATE_BLOCK: "Afrita", CROSS_TAB_COPY: "Afrita", CROSS_TAB_PASTE: "Líma", DELETE: "Eyða" },
 BLOCKS: {
 WHEN_START_CLICKED: "þegar smellt er á %1", WHEN_SPRITE_CLICKED: "þegar smellt er á þessa fígúru", WHEN_KEY_PRESSED: "þegar ýtt er á %1", KEY_ANY: "hvaða takki sem er", KEY_SPACE: "bil", KEY_ARROW_UP: "ör upp", KEY_ARROW_DOWN: "ör niður", KEY_ARROW_LEFT: "ör til vinstri", KEY_ARROW_RIGHT: "ör til hægri",
 WAIT: "bíða í %1 sekúndur", REPEAT: "endurtaka %1 sinnum", FOREVER: "að eilífu", IF: "ef %1, þá", ELSE: "annars", STOP: "stöðva", RANDOM: "velja slembitölu frá %1 til %2", AND: "%1 og %2", OR: "%1 eða %2", NOT: "ekki %1", JOIN: "sameina %1 og %2", ABSOLUTE: "algildi %1",
 SAY: "segja %1", SAY_FOR_SECONDS: "segja %1 í %2 sekúndur", SET_COLOR: "stilla litáhrif á %1", SET_BACKGROUND_COLOR: "stilla bakgrunnslit á %1", MOVE: "færast um %1 skref", ROTATE: "snúa um %1 gráður", SET_ROTATION: "stilla stefnu á %1 gráður", SET_X: "stilla x á %1", SET_Y: "stilla y á %1", SET_XY: "stilla x á %1 og y á %2", GET_X: "x-staðsetning", GET_Y: "y-staðsetning", TIMER: "skeiðklukka", RESET_TIMER: "endurstilla skeiðklukku", PLAY_SOUND: "spila hljóðið %1", PLAY_SOUND_UNTIL_DONE: "spila hljóðið %1 til enda", STOP_ALL_SOUNDS: "stöðva öll hljóð", SOUND_POP: "popp", SOUND_FAILURE: "mistókst", SOUND_SUCCESS: "tókst"
 }, CATEGORY: { CONTROLS: "Stýringar", EVENTS: "Atburðir", OPERATORS: "Virkjar", LOOKS: "Útlit", MOTIONS: "Hreyfing", VARIABLES: "Breyturnar", SENSING: "Skynjun", SOUNDS: "Hljóð" }
};

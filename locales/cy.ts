import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Dechrau rhedeg", RESTART: "Ailddechrau rhedeg", STOP: "Stopio rhedeg", FULLSCREEN: "Agor sgrin lawn", FULLSCREEN_EXIT: "Gadael sgrin lawn", HELP: "Help", ERROR: "Digwyddodd gwall!", EXECUTION_OPTIONS: "Dewisiadau rhedeg", RESET_STAGE: "Ailosod y llwyfan", SHORTCUTS: "Llwybrau byr bysellfwrdd",
 DIALOG: { CANCEL: "Canslo", SAVE: "Cadw", NO: "Na", YES: "Iawn", OK: "Iawn" }, ZOOM: { IN: "Chwyddo i mewn", OUT: "Chwyddo allan", RESET: "Ailosod y chwyddo" },
 OPTIONS: { READONLY: "Darllen yn unig", READONLY_TOOLTIP: "Dewiswch a oes modd golygu'r blociau", STAGE: "Llwyfan", STAGE_TOOLTIP: "Dewiswch fath y llwyfan", STAGE_TYPES: { CODE: "Cod", CANVAS: "Canfas" }, AVAILABLE_BLOCKS: "Blociau sydd ar gael", AVAILABLE_BLOCKS_TOOLTIP: "Dewiswch y blociau sydd ar gael yn y blwch offer" },
 CONTROLS: { DUPLICATE_BLOCK: "Dyblygu", CROSS_TAB_COPY: "Copïo", CROSS_TAB_PASTE: "Gludo", DELETE: "Dileu" },
 BLOCKS: {
 WHEN_START_CLICKED: "pan glicir ar %1", WHEN_SPRITE_CLICKED: "pan glicir ar y cymeriad hwn", WHEN_KEY_PRESSED: "pan wasgir y fysell %1", KEY_ANY: "unrhyw fysell", KEY_SPACE: "gofod", KEY_ARROW_UP: "saeth i fyny", KEY_ARROW_DOWN: "saeth i lawr", KEY_ARROW_LEFT: "saeth i'r chwith", KEY_ARROW_RIGHT: "saeth i'r dde",
 WAIT: "aros %1 eiliad", REPEAT: "ailadrodd %1 gwaith", FOREVER: "am byth", IF: "os %1, yna", ELSE: "fel arall", STOP: "stopio", RANDOM: "dewis rhif ar hap o %1 i %2", AND: "%1 a %2", OR: "%1 neu %2", NOT: "nid %1", JOIN: "uno %1 a %2", ABSOLUTE: "gwerth absoliwt %1",
 SAY: "dweud %1", SAY_FOR_SECONDS: "dweud %1 am %2 eiliad", SET_COLOR: "gosod effaith lliw i %1", SET_BACKGROUND_COLOR: "gosod lliw'r cefndir i %1", MOVE: "symud %1 cam", ROTATE: "cylchdroi %1 gradd", SET_ROTATION: "gosod cyfeiriad i %1 gradd", SET_X: "gosod x i %1", SET_Y: "gosod y i %1", SET_XY: "gosod x i %1 ac y i %2", GET_X: "safle x", GET_Y: "safle y", TIMER: "amserydd", RESET_TIMER: "ailosod yr amserydd", PLAY_SOUND: "chwarae sain %1", PLAY_SOUND_UNTIL_DONE: "chwarae sain %1 nes gorffen", STOP_ALL_SOUNDS: "stopio pob sain", SOUND_POP: "pop", SOUND_FAILURE: "methiant", SOUND_SUCCESS: "llwyddiant"
 }, CATEGORY: { CONTROLS: "Rheoli", EVENTS: "Digwyddiadau", OPERATORS: "Gweithredwyr", LOOKS: "Golwg", MOTIONS: "Symudiad", VARIABLES: "Newidynnau", SENSING: "Synhwyro", SOUNDS: "Seiniau" }
};

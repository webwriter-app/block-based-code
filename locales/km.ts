import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "ចាប់ផ្ដើមដំណើរការ", RESTART: "ចាប់ផ្ដើមដំណើរការឡើងវិញ", STOP: "បញ្ឈប់ដំណើរការ", FULLSCREEN: "បើកពេញអេក្រង់", FULLSCREEN_EXIT: "ចេញពីពេញអេក្រង់", HELP: "ជំនួយ", ERROR: "មានបញ្ហាកើតឡើង!", EXECUTION_OPTIONS: "ជម្រើសដំណើរការ", RESET_STAGE: "កំណត់ឆាកឡើងវិញ", SHORTCUTS: "ផ្លូវកាត់ក្តារចុច",
 DIALOG: { CANCEL: "បោះបង់", SAVE: "រក្សាទុក", NO: "ទេ", YES: "បាទ/ចាស", OK: "យល់ព្រម" }, ZOOM: { IN: "ពង្រីក", OUT: "បង្រួម", RESET: "កំណត់ការពង្រីកឡើងវិញ" },
 OPTIONS: { READONLY: "អានតែប៉ុណ្ណោះ", READONLY_TOOLTIP: "ជ្រើសថាតើអាចកែសម្រួលប្លុកបានឬទេ", STAGE: "ឆាក", STAGE_TOOLTIP: "ជ្រើសប្រភេទឆាក", STAGE_TYPES: { CODE: "កូដ", CANVAS: "ផ្ទាំងគំនូរ" }, AVAILABLE_BLOCKS: "ប្លុកដែលមាន", AVAILABLE_BLOCKS_TOOLTIP: "ជ្រើសប្លុកដែលមាននៅក្នុងប្រអប់ឧបករណ៍" },
 CONTROLS: { DUPLICATE_BLOCK: "ចម្លង", CROSS_TAB_COPY: "ចម្លង", CROSS_TAB_PASTE: "បិទភ្ជាប់", DELETE: "លុប" },
 BLOCKS: {
 WHEN_START_CLICKED: "នៅពេលចុច %1", WHEN_SPRITE_CLICKED: "នៅពេលចុចតួអង្គនេះ", WHEN_KEY_PRESSED: "នៅពេលចុចគ្រាប់ចុច %1", KEY_ANY: "គ្រាប់ចុចណាមួយ", KEY_SPACE: "ដកឃ្លា", KEY_ARROW_UP: "ព្រួញឡើង", KEY_ARROW_DOWN: "ព្រួញចុះ", KEY_ARROW_LEFT: "ព្រួញឆ្វេង", KEY_ARROW_RIGHT: "ព្រួញស្ដាំ",
 WAIT: "រង់ចាំ %1 វិនាទី", REPEAT: "ធ្វើម្តងទៀត %1 ដង", FOREVER: "រហូត", IF: "ប្រសិនបើ %1 នោះ", ELSE: "បើមិនដូច្នោះទេ", STOP: "បញ្ឈប់", RANDOM: "ជ្រើសលេខចៃដន្យពី %1 ដល់ %2", AND: "%1 និង %2", OR: "%1 ឬ %2", NOT: "មិនមែន %1", JOIN: "ភ្ជាប់ %1 និង %2", ABSOLUTE: "តម្លៃដាច់ខាតរបស់ %1",
 SAY: "និយាយ %1", SAY_FOR_SECONDS: "និយាយ %1 រយៈពេល %2 វិនាទី", SET_COLOR: "កំណត់បែបផែនពណ៌ទៅជា %1", SET_BACKGROUND_COLOR: "កំណត់ពណ៌ផ្ទៃខាងក្រោយទៅជា %1", MOVE: "ផ្លាស់ទី %1 ជំហាន", ROTATE: "បង្វិល %1 ដឺក្រេ", SET_ROTATION: "កំណត់ទិសដៅទៅ %1 ដឺក្រេ", SET_X: "កំណត់ x ទៅជា %1", SET_Y: "កំណត់ y ទៅជា %1", SET_XY: "កំណត់ x ទៅជា %1 និង y ទៅជា %2", GET_X: "ទីតាំង x", GET_Y: "ទីតាំង y", TIMER: "កម្មវិធីកំណត់ម៉ោង", RESET_TIMER: "កំណត់ម៉ោងឡើងវិញ", PLAY_SOUND: "ចាក់សំឡេង %1", PLAY_SOUND_UNTIL_DONE: "ចាក់សំឡេង %1 រហូតដល់ចប់", STOP_ALL_SOUNDS: "បញ្ឈប់សំឡេងទាំងអស់", SOUND_POP: "ផុស", SOUND_FAILURE: "បរាជ័យ", SOUND_SUCCESS: "ជោគជ័យ"
 }, CATEGORY: { CONTROLS: "ការគ្រប់គ្រង", EVENTS: "ព្រឹត្តិការណ៍", OPERATORS: "ប្រមាណវិធី", LOOKS: "រូបរាង", MOTIONS: "ចលនា", VARIABLES: "អថេរ", SENSING: "ការចាប់សញ្ញា", SOUNDS: "សំឡេង" }
};

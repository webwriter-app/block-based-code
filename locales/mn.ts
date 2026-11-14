import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Ажиллуулж эхлэх", RESTART: "Дахин ажиллуулах", STOP: "Ажиллуулахыг зогсоох", FULLSCREEN: "Дэлгэц дүүрэн харуулах", FULLSCREEN_EXIT: "Бүтэн дэлгэцээс гарах", HELP: "Тусламж", ERROR: "Алдаа гарлаа!", EXECUTION_OPTIONS: "Ажиллуулах сонголт", RESET_STAGE: "Тайзыг шинэчлэх", SHORTCUTS: "Гарын товчлол",
 DIALOG: { CANCEL: "Цуцлах", SAVE: "Хадгалах", NO: "Үгүй", YES: "Тийм", OK: "За" }, ZOOM: { IN: "Томруулах", OUT: "Жижигрүүлэх", RESET: "Томруулалтыг шинэчлэх" },
 OPTIONS: { READONLY: "Зөвхөн унших", READONLY_TOOLTIP: "Блокуудыг засаж болох эсэхийг сонгоно уу", STAGE: "Тайз", STAGE_TOOLTIP: "Тайзны төрлийг сонгоно уу", STAGE_TYPES: { CODE: "Код", CANVAS: "Зотон" }, AVAILABLE_BLOCKS: "Боломжтой блокууд", AVAILABLE_BLOCKS_TOOLTIP: "Хэрэгслийн хайрцагт байх блокуудыг сонгоно уу" },
 CONTROLS: { DUPLICATE_BLOCK: "Хувилах", CROSS_TAB_COPY: "Хуулах", CROSS_TAB_PASTE: "Буулгах", DELETE: "Устгах" },
 BLOCKS: {
 WHEN_START_CLICKED: "%1 дээр дарахад", WHEN_SPRITE_CLICKED: "энэ дүр дээр дарахад", WHEN_KEY_PRESSED: "%1 товч дарахад", KEY_ANY: "дурын товч", KEY_SPACE: "зай", KEY_ARROW_UP: "дээш сум", KEY_ARROW_DOWN: "доош сум", KEY_ARROW_LEFT: "зүүн сум", KEY_ARROW_RIGHT: "баруун сум",
 WAIT: "%1 секунд хүлээх", REPEAT: "%1 удаа давтах", FOREVER: "үргэлж", IF: "хэрэв %1 бол", ELSE: "эс бөгөөс", STOP: "зогсоох", RANDOM: "%1-ээс %2 хүртэлх санамсаргүй тоо сонгох", AND: "%1 ба %2", OR: "%1 эсвэл %2", NOT: "%1 биш", JOIN: "%1 ба %2-г нэгтгэх", ABSOLUTE: "%1-ийн абсолют утга",
 SAY: "%1 гэж хэлэх", SAY_FOR_SECONDS: "%1 гэж %2 секунд хэлэх", SET_COLOR: "өнгөний эффектийг %1 болгох", SET_BACKGROUND_COLOR: "дэвсгэрийн өнгийг %1 болгох", MOVE: "%1 алхам хөдлөх", ROTATE: "%1 градус эргэх", SET_ROTATION: "чиглэлийг %1 градус болгох", SET_X: "x-г %1 болгох", SET_Y: "y-г %1 болгох", SET_XY: "x-г %1, y-г %2 болгох", GET_X: "x байрлал", GET_Y: "y байрлал", TIMER: "цаг хэмжигч", RESET_TIMER: "цаг хэмжигчийг шинэчлэх", PLAY_SOUND: "%1 дууг тоглуулах", PLAY_SOUND_UNTIL_DONE: "%1 дууг дуустал тоглуулах", STOP_ALL_SOUNDS: "бүх дууг зогсоох", SOUND_POP: "поп", SOUND_FAILURE: "амжилтгүй", SOUND_SUCCESS: "амжилттай"
 }, CATEGORY: { CONTROLS: "Удирдлага", EVENTS: "Үйл явдал", OPERATORS: "Үйлдлүүд", LOOKS: "Харагдах байдал", MOTIONS: "Хөдөлгөөн", VARIABLES: "Хувьсагч", SENSING: "Мэдрэхүй", SOUNDS: "Дуу" }
};

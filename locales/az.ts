import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "İcraata başla", RESTART: "İcraatı yenidən başlat", STOP: "İcraatı dayandır", FULLSCREEN: "Tam ekrana keç", FULLSCREEN_EXIT: "Tam ekrandan çıx", HELP: "Kömək", ERROR: "Xəta baş verdi!", EXECUTION_OPTIONS: "İcra seçimləri", RESET_STAGE: "Səhnəni sıfırla", SHORTCUTS: "Klaviatura qısayolları",
 DIALOG: { CANCEL: "Ləğv et", SAVE: "Yadda saxla", NO: "Xeyr", YES: "Bəli", OK: "Oldu" }, ZOOM: { IN: "Böyüt", OUT: "Kiçilt", RESET: "Miqyası sıfırla" },
 OPTIONS: { READONLY: "Yalnız oxu", READONLY_TOOLTIP: "Blokların redaktə edilə biləcəyini seçin", STAGE: "Səhnə", STAGE_TOOLTIP: "Səhnə növünü seçin", STAGE_TYPES: { CODE: "Kod", CANVAS: "Kətan" }, AVAILABLE_BLOCKS: "Mövcud bloklar", AVAILABLE_BLOCKS_TOOLTIP: "Alətlər qutusunda mövcud olan blokları seçin" },
 CONTROLS: { DUPLICATE_BLOCK: "Dublikat yarat", CROSS_TAB_COPY: "Kopyala", CROSS_TAB_PASTE: "Yapışdır", DELETE: "Sil" },
 BLOCKS: {
 WHEN_START_CLICKED: "%1 kliklənəndə", WHEN_SPRITE_CLICKED: "bu personaj kliklənəndə", WHEN_KEY_PRESSED: "%1 düyməsi basılanda", KEY_ANY: "istənilən düymə", KEY_SPACE: "boşluq", KEY_ARROW_UP: "yuxarı ox", KEY_ARROW_DOWN: "aşağı ox", KEY_ARROW_LEFT: "sol ox", KEY_ARROW_RIGHT: "sağ ox",
 WAIT: "%1 saniyə gözlə", REPEAT: "%1 dəfə təkrarla", FOREVER: "həmişə", IF: "əgər %1, onda", ELSE: "əks halda", STOP: "dayandır", RANDOM: "%1 ilə %2 arasında təsadüfi ədəd seç", AND: "%1 və %2", OR: "%1 və ya %2", NOT: "%1 deyil", JOIN: "%1 və %2-ni birləşdir", ABSOLUTE: "%1-in mütləq qiyməti",
 SAY: "%1 de", SAY_FOR_SECONDS: "%1-i %2 saniyə de", SET_COLOR: "rəng effektini %1 et", SET_BACKGROUND_COLOR: "fon rəngini %1 et", MOVE: "%1 addım hərəkət et", ROTATE: "%1 dərəcə fırlan", SET_ROTATION: "istiqaməti %1 dərəcə et", SET_X: "x-i %1 et", SET_Y: "y-ni %1 et", SET_XY: "x-i %1, y-ni %2 et", GET_X: "x mövqeyi", GET_Y: "y mövqeyi", TIMER: "taymer", RESET_TIMER: "taymeri sıfırla", PLAY_SOUND: "%1 səsini səsləndir", PLAY_SOUND_UNTIL_DONE: "%1 səsini bitənədək səsləndir", STOP_ALL_SOUNDS: "bütün səsləri dayandır", SOUND_POP: "part", SOUND_FAILURE: "uğursuzluq", SOUND_SUCCESS: "uğur"
 }, CATEGORY: { CONTROLS: "İdarəetmə", EVENTS: "Hadisələr", OPERATORS: "Operatorlar", LOOKS: "Görünüş", MOTIONS: "Hərəkət", VARIABLES: "Dəyişənlər", SENSING: "Hiss etmə", SOUNDS: "Səslər" }
};

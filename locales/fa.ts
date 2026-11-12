import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "شروع اجرا", RESTART: "اجرای دوباره", STOP: "توقف اجرا", FULLSCREEN: "نمایش تمام‌صفحه", FULLSCREEN_EXIT: "خروج از تمام‌صفحه", HELP: "راهنما", ERROR: "خطایی رخ داد!", EXECUTION_OPTIONS: "تنظیمات اجرا", RESET_STAGE: "بازنشانی صحنه", SHORTCUTS: "میانبرهای صفحه‌کلید",
 DIALOG: { CANCEL: "لغو", SAVE: "ذخیره", NO: "خیر", YES: "بله", OK: "تأیید" }, ZOOM: { IN: "بزرگ‌نمایی", OUT: "کوچک‌نمایی", RESET: "بازنشانی بزرگ‌نمایی" },
 OPTIONS: { READONLY: "فقط‌خواندنی", READONLY_TOOLTIP: "انتخاب کنید که بلوک‌ها قابل ویرایش باشند یا نه", STAGE: "صحنه", STAGE_TOOLTIP: "نوع صحنه را انتخاب کنید", STAGE_TYPES: { CODE: "کد", CANVAS: "بوم" }, AVAILABLE_BLOCKS: "بلوک‌های در دسترس", AVAILABLE_BLOCKS_TOOLTIP: "بلوک‌های در دسترس در جعبه‌ابزار را انتخاب کنید" },
 CONTROLS: { DUPLICATE_BLOCK: "تکثیر", CROSS_TAB_COPY: "رونوشت", CROSS_TAB_PASTE: "چسباندن", DELETE: "حذف" },
 BLOCKS: {
 WHEN_START_CLICKED: "وقتی روی %1 کلیک شود", WHEN_SPRITE_CLICKED: "وقتی روی این شخصیت کلیک شود", WHEN_KEY_PRESSED: "وقتی کلید %1 فشرده شود", KEY_ANY: "هر کلیدی", KEY_SPACE: "فاصله", KEY_ARROW_UP: "پیکان بالا", KEY_ARROW_DOWN: "پیکان پایین", KEY_ARROW_LEFT: "پیکان چپ", KEY_ARROW_RIGHT: "پیکان راست",
 WAIT: "%1 ثانیه صبر کن", REPEAT: "%1 بار تکرار کن", FOREVER: "برای همیشه", IF: "اگر %1، آنگاه", ELSE: "وگرنه", STOP: "توقف", RANDOM: "یک عدد تصادفی از %1 تا %2 انتخاب کن", AND: "%1 و %2", OR: "%1 یا %2", NOT: "نه %1", JOIN: "%1 و %2 را به هم وصل کن", ABSOLUTE: "قدر مطلق %1",
 SAY: "%1 را بگو", SAY_FOR_SECONDS: "%1 را به مدت %2 ثانیه بگو", SET_COLOR: "جلوهٔ رنگ را روی %1 تنظیم کن", SET_BACKGROUND_COLOR: "رنگ پس‌زمینه را روی %1 تنظیم کن", MOVE: "%1 گام حرکت کن", ROTATE: "%1 درجه بچرخ", SET_ROTATION: "جهت را روی %1 درجه تنظیم کن", SET_X: "x را روی %1 تنظیم کن", SET_Y: "y را روی %1 تنظیم کن", SET_XY: "x را روی %1 و y را روی %2 تنظیم کن", GET_X: "موقعیت x", GET_Y: "موقعیت y", TIMER: "زمان‌سنج", RESET_TIMER: "زمان‌سنج را بازنشانی کن", PLAY_SOUND: "صدای %1 را پخش کن", PLAY_SOUND_UNTIL_DONE: "صدای %1 را تا پایان پخش کن", STOP_ALL_SOUNDS: "همهٔ صداها را متوقف کن", SOUND_POP: "ترق", SOUND_FAILURE: "شکست", SOUND_SUCCESS: "موفقیت"
 }, CATEGORY: { CONTROLS: "کنترل", EVENTS: "رویدادها", OPERATORS: "عملگرها", LOOKS: "ظاهر", MOTIONS: "حرکت", VARIABLES: "متغیرها", SENSING: "حسگرها", SOUNDS: "صداها" }
};

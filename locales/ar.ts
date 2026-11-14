import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "بدء التشغيل", RESTART: "إعادة تشغيل التنفيذ", STOP: "إيقاف التنفيذ", FULLSCREEN: "ملء الشاشة", FULLSCREEN_EXIT: "إنهاء وضع ملء الشاشة", HELP: "مساعدة", ERROR: "حدث خطأ!", EXECUTION_OPTIONS: "خيارات التنفيذ", RESET_STAGE: "إعادة ضبط المنصة", SHORTCUTS: "اختصارات لوحة المفاتيح",
 DIALOG: { CANCEL: "إلغاء", SAVE: "حفظ", NO: "لا", YES: "نعم", OK: "حسنًا" }, ZOOM: { IN: "تكبير", OUT: "تصغير", RESET: "إعادة ضبط التكبير" },
 OPTIONS: { READONLY: "للقراءة فقط", READONLY_TOOLTIP: "اختر ما إذا كان يمكن تعديل الكتل", STAGE: "المنصة", STAGE_TOOLTIP: "اختر نوع المنصة", STAGE_TYPES: { CODE: "الشفرة", CANVAS: "لوحة الرسم" }, AVAILABLE_BLOCKS: "الكتل المتاحة", AVAILABLE_BLOCKS_TOOLTIP: "اختر الكتل المتاحة في صندوق الأدوات" },
 CONTROLS: { DUPLICATE_BLOCK: "تكرار", CROSS_TAB_COPY: "نسخ", CROSS_TAB_PASTE: "لصق", DELETE: "حذف" },
 BLOCKS: {
 WHEN_START_CLICKED: "عند النقر على %1", WHEN_SPRITE_CLICKED: "عند النقر على هذا الكائن", WHEN_KEY_PRESSED: "عند ضغط المفتاح %1", KEY_ANY: "أي مفتاح", KEY_SPACE: "مسافة", KEY_ARROW_UP: "السهم لأعلى", KEY_ARROW_DOWN: "السهم لأسفل", KEY_ARROW_LEFT: "السهم لليسار", KEY_ARROW_RIGHT: "السهم لليمين",
 WAIT: "انتظر %1 ثانية", REPEAT: "كرر %1 مرة", FOREVER: "إلى الأبد", IF: "إذا %1، فـ", ELSE: "وإلا", STOP: "توقف", RANDOM: "اختر عددًا عشوائيًا من %1 إلى %2", AND: "%1 و%2", OR: "%1 أو %2", NOT: "ليس %1", JOIN: "ضم %1 إلى %2", ABSOLUTE: "القيمة المطلقة لـ %1",
 SAY: "قل %1", SAY_FOR_SECONDS: "قل %1 لمدة %2 ثانية", SET_COLOR: "اضبط تأثير اللون على %1", SET_BACKGROUND_COLOR: "اضبط لون الخلفية على %1", MOVE: "تحرك %1 خطوة", ROTATE: "استدر بمقدار %1 درجة", SET_ROTATION: "اضبط الاتجاه على %1 درجة", SET_X: "اضبط x على %1", SET_Y: "اضبط y على %1", SET_XY: "اضبط x على %1 وy على %2", GET_X: "موضع x", GET_Y: "موضع y", TIMER: "المؤقت", RESET_TIMER: "إعادة ضبط المؤقت", PLAY_SOUND: "شغّل الصوت %1", PLAY_SOUND_UNTIL_DONE: "شغّل الصوت %1 حتى ينتهي", STOP_ALL_SOUNDS: "إيقاف جميع الأصوات", SOUND_POP: "فرقعة", SOUND_FAILURE: "إخفاق", SOUND_SUCCESS: "نجاح"
 }, CATEGORY: { CONTROLS: "التحكم", EVENTS: "الأحداث", OPERATORS: "العوامل", LOOKS: "المظاهر", MOTIONS: "الحركة", VARIABLES: "المتغيرات", SENSING: "الاستشعار", SOUNDS: "الأصوات" }
};

import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "התחלת הרצה", RESTART: "הפעלה מחדש", STOP: "עצירת ההרצה", FULLSCREEN: "מעבר למסך מלא", FULLSCREEN_EXIT: "יציאה ממסך מלא", HELP: "עזרה", ERROR: "אירעה שגיאה!", EXECUTION_OPTIONS: "אפשרויות הרצה", RESET_STAGE: "איפוס הבמה", SHORTCUTS: "קיצורי מקלדת",
 DIALOG: { CANCEL: "ביטול", SAVE: "שמירה", NO: "לא", YES: "כן", OK: "אישור" }, ZOOM: { IN: "הגדלה", OUT: "הקטנה", RESET: "איפוס הזום" },
 OPTIONS: { READONLY: "לקריאה בלבד", READONLY_TOOLTIP: "בחרו אם ניתן לערוך את הבלוקים", STAGE: "במה", STAGE_TOOLTIP: "בחרו את סוג הבמה", STAGE_TYPES: { CODE: "קוד", CANVAS: "משטח ציור" }, AVAILABLE_BLOCKS: "בלוקים זמינים", AVAILABLE_BLOCKS_TOOLTIP: "בחרו אילו בלוקים יהיו זמינים בארגז הכלים" },
 CONTROLS: { DUPLICATE_BLOCK: "שכפול", CROSS_TAB_COPY: "העתקה", CROSS_TAB_PASTE: "הדבקה", DELETE: "מחיקה" },
 BLOCKS: {
 WHEN_START_CLICKED: "כאשר לוחצים על %1", WHEN_SPRITE_CLICKED: "כאשר לוחצים על הדמות הזאת", WHEN_KEY_PRESSED: "כאשר לוחצים על המקש %1", KEY_ANY: "כל מקש", KEY_SPACE: "רווח", KEY_ARROW_UP: "חץ למעלה", KEY_ARROW_DOWN: "חץ למטה", KEY_ARROW_LEFT: "חץ שמאלה", KEY_ARROW_RIGHT: "חץ ימינה",
 WAIT: "המתנה של %1 שניות", REPEAT: "חזרה %1 פעמים", FOREVER: "לעד", IF: "אם %1, אז", ELSE: "אחרת", STOP: "עצירה", RANDOM: "בחירת מספר אקראי בין %1 ל־%2", AND: "%1 וגם %2", OR: "%1 או %2", NOT: "לא %1", JOIN: "חיבור %1 ו־%2", ABSOLUTE: "הערך המוחלט של %1",
 SAY: "אמירת %1", SAY_FOR_SECONDS: "אמירת %1 למשך %2 שניות", SET_COLOR: "הגדרת אפקט הצבע ל־%1", SET_BACKGROUND_COLOR: "הגדרת צבע הרקע ל־%1", MOVE: "תזוזה של %1 צעדים", ROTATE: "סיבוב של %1 מעלות", SET_ROTATION: "הגדרת הכיוון ל־%1 מעלות", SET_X: "הגדרת x ל־%1", SET_Y: "הגדרת y ל־%1", SET_XY: "הגדרת x ל־%1 ו־y ל־%2", GET_X: "מיקום x", GET_Y: "מיקום y", TIMER: "שעון עצר", RESET_TIMER: "איפוס שעון העצר", PLAY_SOUND: "השמעת הצליל %1", PLAY_SOUND_UNTIL_DONE: "השמעת הצליל %1 עד סופו", STOP_ALL_SOUNDS: "עצירת כל הצלילים", SOUND_POP: "פופ", SOUND_FAILURE: "כישלון", SOUND_SUCCESS: "הצלחה"
 }, CATEGORY: { CONTROLS: "בקרה", EVENTS: "אירועים", OPERATORS: "אופרטורים", LOOKS: "מראה", MOTIONS: "תנועה", VARIABLES: "משתנים", SENSING: "חישה", SOUNDS: "צלילים" }
};

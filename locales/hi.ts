import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "चलाना शुरू करें", RESTART: "फिर से चलाएँ", STOP: "चलाना रोकें", FULLSCREEN: "पूर्ण स्क्रीन करें", FULLSCREEN_EXIT: "पूर्ण स्क्रीन से बाहर निकलें", HELP: "सहायता", ERROR: "एक त्रुटि हुई!", EXECUTION_OPTIONS: "चलाने के विकल्प", RESET_STAGE: "स्टेज रीसेट करें", SHORTCUTS: "कीबोर्ड शॉर्टकट",
 DIALOG: { CANCEL: "रद्द करें", SAVE: "सहेजें", NO: "नहीं", YES: "हाँ", OK: "ठीक है" }, ZOOM: { IN: "ज़ूम इन", OUT: "ज़ूम आउट", RESET: "ज़ूम रीसेट करें" },
 OPTIONS: { READONLY: "केवल पढ़ने के लिए", READONLY_TOOLTIP: "चुनें कि ब्लॉक संपादित किए जा सकते हैं या नहीं", STAGE: "स्टेज", STAGE_TOOLTIP: "स्टेज का प्रकार चुनें", STAGE_TYPES: { CODE: "कोड", CANVAS: "कैनवास" }, AVAILABLE_BLOCKS: "उपलब्ध ब्लॉक", AVAILABLE_BLOCKS_TOOLTIP: "टूलबॉक्स में उपलब्ध ब्लॉक चुनें" },
 CONTROLS: { DUPLICATE_BLOCK: "डुप्लिकेट करें", CROSS_TAB_COPY: "कॉपी करें", CROSS_TAB_PASTE: "पेस्ट करें", DELETE: "हटाएँ" },
 BLOCKS: {
 WHEN_START_CLICKED: "जब %1 पर क्लिक हो", WHEN_SPRITE_CLICKED: "जब इस स्प्राइट पर क्लिक हो", WHEN_KEY_PRESSED: "जब %1 कुंजी दबाई जाए", KEY_ANY: "कोई भी कुंजी", KEY_SPACE: "स्पेस", KEY_ARROW_UP: "ऊपर का तीर", KEY_ARROW_DOWN: "नीचे का तीर", KEY_ARROW_LEFT: "बाएँ का तीर", KEY_ARROW_RIGHT: "दाएँ का तीर",
 WAIT: "%1 सेकंड प्रतीक्षा करें", REPEAT: "%1 बार दोहराएँ", FOREVER: "हमेशा", IF: "यदि %1, तो", ELSE: "अन्यथा", STOP: "रोकें", RANDOM: "%1 से %2 तक कोई यादृच्छिक संख्या चुनें", AND: "%1 और %2", OR: "%1 या %2", NOT: "नहीं %1", JOIN: "%1 और %2 जोड़ें", ABSOLUTE: "%1 का निरपेक्ष मान",
 SAY: "%1 कहें", SAY_FOR_SECONDS: "%1 को %2 सेकंड तक कहें", SET_COLOR: "रंग प्रभाव को %1 पर सेट करें", SET_BACKGROUND_COLOR: "पृष्ठभूमि का रंग %1 पर सेट करें", MOVE: "%1 कदम चलें", ROTATE: "%1 डिग्री घूमें", SET_ROTATION: "दिशा %1 डिग्री पर सेट करें", SET_X: "x को %1 पर सेट करें", SET_Y: "y को %1 पर सेट करें", SET_XY: "x को %1 और y को %2 पर सेट करें", GET_X: "x-स्थिति", GET_Y: "y-स्थिति", TIMER: "टाइमर", RESET_TIMER: "टाइमर रीसेट करें", PLAY_SOUND: "ध्वनि %1 चलाएँ", PLAY_SOUND_UNTIL_DONE: "ध्वनि %1 पूरी होने तक चलाएँ", STOP_ALL_SOUNDS: "सभी ध्वनियाँ रोकें", SOUND_POP: "पॉप", SOUND_FAILURE: "विफलता", SOUND_SUCCESS: "सफलता"
 }, CATEGORY: { CONTROLS: "नियंत्रण", EVENTS: "घटनाएँ", OPERATORS: "ऑपरेटर", LOOKS: "रूप", MOTIONS: "गति", VARIABLES: "चर", SENSING: "सेंसिंग", SOUNDS: "ध्वनियाँ" }
};

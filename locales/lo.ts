import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "ເລີ່ມການເຮັດວຽກ", RESTART: "ເລີ່ມການເຮັດວຽກອີກຄັ້ງ", STOP: "ຢຸດການເຮັດວຽກ", FULLSCREEN: "ເປີດເຕັມຈໍ", FULLSCREEN_EXIT: "ອອກຈາກເຕັມຈໍ", HELP: "ຊ່ວຍເຫຼືອ", ERROR: "ເກີດຂໍ້ຜິດພາດ!", EXECUTION_OPTIONS: "ຕົວເລືອກການເຮັດວຽກ", RESET_STAGE: "ຕັ້ງຄ່າເວທີຄືນໃໝ່", SHORTCUTS: "ປຸ່ມລັດ",
 DIALOG: { CANCEL: "ຍົກເລີກ", SAVE: "ບັນທຶກ", NO: "ບໍ່", YES: "ແມ່ນ", OK: "ຕົກລົງ" }, ZOOM: { IN: "ຂະຫຍາຍ", OUT: "ຫຍໍ້", RESET: "ຕັ້ງຄ່າການຊູມຄືນໃໝ່" },
 OPTIONS: { READONLY: "ອ່ານຢ່າງດຽວ", READONLY_TOOLTIP: "ເລືອກວ່າຈະແກ້ໄຂບລັອກໄດ້ຫຼືບໍ່", STAGE: "ເວທີ", STAGE_TOOLTIP: "ເລືອກປະເພດຂອງເວທີ", STAGE_TYPES: { CODE: "ລະຫັດ", CANVAS: "ຜືນຜ້າໃບ" }, AVAILABLE_BLOCKS: "ບລັອກທີ່ມີໃຫ້ໃຊ້", AVAILABLE_BLOCKS_TOOLTIP: "ເລືອກບລັອກທີ່ຈະມີໃນກ່ອງເຄື່ອງມື" },
 CONTROLS: { DUPLICATE_BLOCK: "ສຳເນົາ", CROSS_TAB_COPY: "ສຳເນົາ", CROSS_TAB_PASTE: "ວາງ", DELETE: "ລຶບ" },
 BLOCKS: {
 WHEN_START_CLICKED: "ເມື່ອຄລິກ %1", WHEN_SPRITE_CLICKED: "ເມື່ອຄລິກຕົວລະຄອນນີ້", WHEN_KEY_PRESSED: "ເມື່ອກົດປຸ່ມ %1", KEY_ANY: "ປຸ່ມໃດກໍໄດ້", KEY_SPACE: "ປຸ່ມວ່າງ", KEY_ARROW_UP: "ລູກສອນຂຶ້ນ", KEY_ARROW_DOWN: "ລູກສອນລົງ", KEY_ARROW_LEFT: "ລູກສອນຊ້າຍ", KEY_ARROW_RIGHT: "ລູກສອນຂວາ",
 WAIT: "ລໍຖ້າ %1 ວິນາທີ", REPEAT: "ເຮັດຊ້ຳ %1 ຄັ້ງ", FOREVER: "ຕະຫຼອດໄປ", IF: "ຖ້າ %1, ແລ້ວ", ELSE: "ມິສະນັ້ນ", STOP: "ຢຸດ", RANDOM: "ເລືອກຕົວເລກສຸ່ມຈາກ %1 ຫາ %2", AND: "%1 ແລະ %2", OR: "%1 ຫຼື %2", NOT: "ບໍ່ແມ່ນ %1", JOIN: "ລວມ %1 ແລະ %2", ABSOLUTE: "ຄ່າສຳບູນຂອງ %1",
 SAY: "ເວົ້າ %1", SAY_FOR_SECONDS: "ເວົ້າ %1 ເປັນເວລາ %2 ວິນາທີ", SET_COLOR: "ຕັ້ງຄ່າເອັບເຟັກສີເປັນ %1", SET_BACKGROUND_COLOR: "ຕັ້ງສີພື້ນຫຼັງເປັນ %1", MOVE: "ເຄື່ອນທີ່ %1 ກ້າວ", ROTATE: "ໝຸນ %1 ອົງສາ", SET_ROTATION: "ຕັ້ງທິດທາງເປັນ %1 ອົງສາ", SET_X: "ຕັ້ງ x ເປັນ %1", SET_Y: "ຕັ້ງ y ເປັນ %1", SET_XY: "ຕັ້ງ x ເປັນ %1 ແລະ y ເປັນ %2", GET_X: "ຕຳແໜ່ງ x", GET_Y: "ຕຳແໜ່ງ y", TIMER: "ໂມງຈັບເວລາ", RESET_TIMER: "ຕັ້ງໂມງຈັບເວລາຄືນໃໝ່", PLAY_SOUND: "ຫຼິ້ນສຽງ %1", PLAY_SOUND_UNTIL_DONE: "ຫຼິ້ນສຽງ %1 ຈົນຈົບ", STOP_ALL_SOUNDS: "ຢຸດສຽງທັງໝົດ", SOUND_POP: "ປັອບ", SOUND_FAILURE: "ລົ້ມເຫຼວ", SOUND_SUCCESS: "ສຳເລັດ"
 }, CATEGORY: { CONTROLS: "ການຄວບຄຸມ", EVENTS: "ເຫດການ", OPERATORS: "ຕົວດຳເນີນການ", LOOKS: "ຮູບລັກສະນະ", MOTIONS: "ການເຄື່ອນໄຫວ", VARIABLES: "ຕົວປ່ຽນແປງ", SENSING: "ການຮັບຮູ້", SOUNDS: "ສຽງ" }
};

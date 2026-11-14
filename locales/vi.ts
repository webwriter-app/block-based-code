import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Bắt đầu chạy", RESTART: "Chạy lại", STOP: "Dừng chạy", FULLSCREEN: "Chuyển sang toàn màn hình", FULLSCREEN_EXIT: "Thoát toàn màn hình", HELP: "Trợ giúp", ERROR: "Đã xảy ra lỗi!", EXECUTION_OPTIONS: "Tùy chọn chạy", RESET_STAGE: "Đặt lại sân khấu", SHORTCUTS: "Phím tắt",
 DIALOG: { CANCEL: "Hủy", SAVE: "Lưu", NO: "Không", YES: "Có", OK: "OK" }, ZOOM: { IN: "Phóng to", OUT: "Thu nhỏ", RESET: "Đặt lại thu phóng" },
 OPTIONS: { READONLY: "Chỉ đọc", READONLY_TOOLTIP: "Chọn xem có thể chỉnh sửa các khối hay không", STAGE: "Sân khấu", STAGE_TOOLTIP: "Chọn loại sân khấu", STAGE_TYPES: { CODE: "Mã", CANVAS: "Khung vẽ" }, AVAILABLE_BLOCKS: "Khối có sẵn", AVAILABLE_BLOCKS_TOOLTIP: "Chọn các khối có trong hộp công cụ" },
 CONTROLS: { DUPLICATE_BLOCK: "Nhân bản", CROSS_TAB_COPY: "Sao chép", CROSS_TAB_PASTE: "Dán", DELETE: "Xóa" },
 BLOCKS: {
 WHEN_START_CLICKED: "khi nhấp vào %1", WHEN_SPRITE_CLICKED: "khi nhấp vào nhân vật này", WHEN_KEY_PRESSED: "khi nhấn phím %1", KEY_ANY: "phím bất kỳ", KEY_SPACE: "dấu cách", KEY_ARROW_UP: "mũi tên lên", KEY_ARROW_DOWN: "mũi tên xuống", KEY_ARROW_LEFT: "mũi tên trái", KEY_ARROW_RIGHT: "mũi tên phải",
 WAIT: "đợi %1 giây", REPEAT: "lặp lại %1 lần", FOREVER: "liên tục", IF: "nếu %1 thì", ELSE: "nếu không", STOP: "dừng", RANDOM: "chọn số ngẫu nhiên từ %1 đến %2", AND: "%1 và %2", OR: "%1 hoặc %2", NOT: "không phải %1", JOIN: "nối %1 và %2", ABSOLUTE: "giá trị tuyệt đối của %1",
 SAY: "nói %1", SAY_FOR_SECONDS: "nói %1 trong %2 giây", SET_COLOR: "đặt hiệu ứng màu thành %1", SET_BACKGROUND_COLOR: "đặt màu nền thành %1", MOVE: "di chuyển %1 bước", ROTATE: "xoay %1 độ", SET_ROTATION: "đặt hướng thành %1 độ", SET_X: "đặt x thành %1", SET_Y: "đặt y thành %1", SET_XY: "đặt x thành %1 và y thành %2", GET_X: "vị trí x", GET_Y: "vị trí y", TIMER: "đồng hồ bấm giờ", RESET_TIMER: "đặt lại đồng hồ", PLAY_SOUND: "phát âm thanh %1", PLAY_SOUND_UNTIL_DONE: "phát âm thanh %1 đến khi xong", STOP_ALL_SOUNDS: "dừng tất cả âm thanh", SOUND_POP: "bốp", SOUND_FAILURE: "thất bại", SOUND_SUCCESS: "thành công"
 }, CATEGORY: { CONTROLS: "Điều khiển", EVENTS: "Sự kiện", OPERATORS: "Toán tử", LOOKS: "Giao diện", MOTIONS: "Chuyển động", VARIABLES: "Biến", SENSING: "Cảm biến", SOUNDS: "Âm thanh" }
};

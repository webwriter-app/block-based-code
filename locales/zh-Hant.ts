import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "開始執行", RESTART: "重新執行", STOP: "停止執行", FULLSCREEN: "進入全螢幕", FULLSCREEN_EXIT: "離開全螢幕", HELP: "說明", ERROR: "發生錯誤！", EXECUTION_OPTIONS: "執行選項", RESET_STAGE: "重設舞台", SHORTCUTS: "鍵盤快捷鍵",
 DIALOG: { CANCEL: "取消", SAVE: "儲存", NO: "否", YES: "是", OK: "確定" }, ZOOM: { IN: "放大", OUT: "縮小", RESET: "重設縮放" },
 OPTIONS: { READONLY: "唯讀", READONLY_TOOLTIP: "選擇是否允許編輯積木", STAGE: "舞台", STAGE_TOOLTIP: "選擇舞台類型", STAGE_TYPES: { CODE: "程式碼", CANVAS: "畫布" }, AVAILABLE_BLOCKS: "可用積木", AVAILABLE_BLOCKS_TOOLTIP: "選擇工具箱中可用的積木" },
 CONTROLS: { DUPLICATE_BLOCK: "複製", CROSS_TAB_COPY: "複製", CROSS_TAB_PASTE: "貼上", DELETE: "刪除" },
 BLOCKS: {
 WHEN_START_CLICKED: "當點擊 %1 時", WHEN_SPRITE_CLICKED: "當點擊這個角色時", WHEN_KEY_PRESSED: "當按下 %1 鍵時", KEY_ANY: "任意鍵", KEY_SPACE: "空白鍵", KEY_ARROW_UP: "向上鍵", KEY_ARROW_DOWN: "向下鍵", KEY_ARROW_LEFT: "向左鍵", KEY_ARROW_RIGHT: "向右鍵",
 WAIT: "等待 %1 秒", REPEAT: "重複 %1 次", FOREVER: "重複執行", IF: "如果 %1，那麼", ELSE: "否則", STOP: "停止", RANDOM: "從 %1 到 %2 中隨機取數", AND: "%1 且 %2", OR: "%1 或 %2", NOT: "非 %1", JOIN: "連接 %1 和 %2", ABSOLUTE: "%1 的絕對值",
 SAY: "說 %1", SAY_FOR_SECONDS: "說 %1 持續 %2 秒", SET_COLOR: "將顏色效果設為 %1", SET_BACKGROUND_COLOR: "將背景顏色設為 %1", MOVE: "移動 %1 步", ROTATE: "旋轉 %1 度", SET_ROTATION: "將方向設為 %1 度", SET_X: "將 x 設為 %1", SET_Y: "將 y 設為 %1", SET_XY: "將 x 設為 %1，y 設為 %2", GET_X: "x 座標", GET_Y: "y 座標", TIMER: "計時器", RESET_TIMER: "重設計時器", PLAY_SOUND: "播放音效 %1", PLAY_SOUND_UNTIL_DONE: "播放音效 %1 直到結束", STOP_ALL_SOUNDS: "停止所有音效", SOUND_POP: "啵", SOUND_FAILURE: "失敗", SOUND_SUCCESS: "成功"
 }, CATEGORY: { CONTROLS: "控制", EVENTS: "事件", OPERATORS: "運算", LOOKS: "外觀", MOTIONS: "動作", VARIABLES: "變數", SENSING: "偵測", SOUNDS: "音效" }
};

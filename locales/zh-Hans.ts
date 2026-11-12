import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "开始运行", RESTART: "重新运行", STOP: "停止运行", FULLSCREEN: "进入全屏", FULLSCREEN_EXIT: "退出全屏", HELP: "帮助", ERROR: "发生错误！", EXECUTION_OPTIONS: "运行选项", RESET_STAGE: "重置舞台", SHORTCUTS: "键盘快捷键",
 DIALOG: { CANCEL: "取消", SAVE: "保存", NO: "否", YES: "是", OK: "确定" }, ZOOM: { IN: "放大", OUT: "缩小", RESET: "重置缩放" },
 OPTIONS: { READONLY: "只读", READONLY_TOOLTIP: "选择是否允许编辑积木", STAGE: "舞台", STAGE_TOOLTIP: "选择舞台类型", STAGE_TYPES: { CODE: "代码", CANVAS: "画布" }, AVAILABLE_BLOCKS: "可用积木", AVAILABLE_BLOCKS_TOOLTIP: "选择工具箱中可用的积木" },
 CONTROLS: { DUPLICATE_BLOCK: "复制", CROSS_TAB_COPY: "复制", CROSS_TAB_PASTE: "粘贴", DELETE: "删除" },
 BLOCKS: {
 WHEN_START_CLICKED: "当点击 %1 时", WHEN_SPRITE_CLICKED: "当点击这个角色时", WHEN_KEY_PRESSED: "当按下 %1 键时", KEY_ANY: "任意键", KEY_SPACE: "空格", KEY_ARROW_UP: "上箭头", KEY_ARROW_DOWN: "下箭头", KEY_ARROW_LEFT: "左箭头", KEY_ARROW_RIGHT: "右箭头",
 WAIT: "等待 %1 秒", REPEAT: "重复 %1 次", FOREVER: "重复执行", IF: "如果 %1，那么", ELSE: "否则", STOP: "停止", RANDOM: "从 %1 到 %2 中随机取数", AND: "%1 且 %2", OR: "%1 或 %2", NOT: "非 %1", JOIN: "连接 %1 和 %2", ABSOLUTE: "%1 的绝对值",
 SAY: "说 %1", SAY_FOR_SECONDS: "说 %1 持续 %2 秒", SET_COLOR: "将颜色效果设为 %1", SET_BACKGROUND_COLOR: "将背景颜色设为 %1", MOVE: "移动 %1 步", ROTATE: "旋转 %1 度", SET_ROTATION: "将方向设为 %1 度", SET_X: "将 x 设为 %1", SET_Y: "将 y 设为 %1", SET_XY: "将 x 设为 %1，y 设为 %2", GET_X: "x 坐标", GET_Y: "y 坐标", TIMER: "计时器", RESET_TIMER: "重置计时器", PLAY_SOUND: "播放声音 %1", PLAY_SOUND_UNTIL_DONE: "播放声音 %1 直到结束", STOP_ALL_SOUNDS: "停止所有声音", SOUND_POP: "啵", SOUND_FAILURE: "失败", SOUND_SUCCESS: "成功"
 }, CATEGORY: { CONTROLS: "控制", EVENTS: "事件", OPERATORS: "运算", LOOKS: "外观", MOTIONS: "动作", VARIABLES: "变量", SENSING: "侦测", SOUNDS: "声音" }
};

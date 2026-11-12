import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "実行", RESTART: "再実行", STOP: "停止", FULLSCREEN: "全画面表示", FULLSCREEN_EXIT: "全画面表示を終了", HELP: "ヘルプ", ERROR: "エラーが発生しました！", EXECUTION_OPTIONS: "実行オプション", RESET_STAGE: "ステージをリセット", SHORTCUTS: "キーボードショートカット",
 DIALOG: { CANCEL: "キャンセル", SAVE: "保存", NO: "いいえ", YES: "はい", OK: "OK" }, ZOOM: { IN: "拡大", OUT: "縮小", RESET: "ズームをリセット" },
 OPTIONS: { READONLY: "読み取り専用", READONLY_TOOLTIP: "ブロックを編集できるかどうかを選択します", STAGE: "ステージ", STAGE_TOOLTIP: "ステージの種類を選択します", STAGE_TYPES: { CODE: "コード", CANVAS: "キャンバス" }, AVAILABLE_BLOCKS: "使用できるブロック", AVAILABLE_BLOCKS_TOOLTIP: "ツールボックスで使用できるブロックを選択します" },
 CONTROLS: { DUPLICATE_BLOCK: "複製", CROSS_TAB_COPY: "コピー", CROSS_TAB_PASTE: "貼り付け", DELETE: "削除" },
 BLOCKS: {
 WHEN_START_CLICKED: "%1 をクリックしたとき", WHEN_SPRITE_CLICKED: "このスプライトをクリックしたとき", WHEN_KEY_PRESSED: "%1 キーが押されたとき", KEY_ANY: "任意のキー", KEY_SPACE: "スペース", KEY_ARROW_UP: "上矢印", KEY_ARROW_DOWN: "下矢印", KEY_ARROW_LEFT: "左矢印", KEY_ARROW_RIGHT: "右矢印",
 WAIT: "%1 秒待つ", REPEAT: "%1 回繰り返す", FOREVER: "ずっと", IF: "もし %1 なら", ELSE: "でなければ", STOP: "停止", RANDOM: "%1 から %2 までの乱数", AND: "%1 かつ %2", OR: "%1 または %2", NOT: "%1 ではない", JOIN: "%1 と %2 をつなげる", ABSOLUTE: "%1 の絶対値",
 SAY: "%1 と言う", SAY_FOR_SECONDS: "%1 と %2 秒間言う", SET_COLOR: "色の効果を %1 にする", SET_BACKGROUND_COLOR: "背景色を %1 にする", MOVE: "%1 歩動かす", ROTATE: "%1 度回す", SET_ROTATION: "向きを %1 度にする", SET_X: "x を %1 にする", SET_Y: "y を %1 にする", SET_XY: "x を %1、y を %2 にする", GET_X: "x 座標", GET_Y: "y 座標", TIMER: "タイマー", RESET_TIMER: "タイマーをリセット", PLAY_SOUND: "音 %1 を鳴らす", PLAY_SOUND_UNTIL_DONE: "音 %1 を最後まで鳴らす", STOP_ALL_SOUNDS: "すべての音を止める", SOUND_POP: "ポン", SOUND_FAILURE: "失敗", SOUND_SUCCESS: "成功"
 }, CATEGORY: { CONTROLS: "制御", EVENTS: "イベント", OPERATORS: "演算", LOOKS: "見た目", MOTIONS: "動き", VARIABLES: "変数", SENSING: "調べる", SOUNDS: "音" }
};

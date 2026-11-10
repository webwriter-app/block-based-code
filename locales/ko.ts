import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "실행", RESTART: "다시 실행", STOP: "실행 중지", FULLSCREEN: "전체 화면", FULLSCREEN_EXIT: "전체 화면 종료", HELP: "도움말", ERROR: "오류가 발생했습니다!", EXECUTION_OPTIONS: "실행 옵션", RESET_STAGE: "무대 초기화", SHORTCUTS: "키보드 단축키",
 DIALOG: { CANCEL: "취소", SAVE: "저장", NO: "아니요", YES: "예", OK: "확인" }, ZOOM: { IN: "확대", OUT: "축소", RESET: "확대/축소 초기화" },
 OPTIONS: { READONLY: "읽기 전용", READONLY_TOOLTIP: "블록을 편집할 수 있는지 선택하세요", STAGE: "무대", STAGE_TOOLTIP: "무대 유형을 선택하세요", STAGE_TYPES: { CODE: "코드", CANVAS: "캔버스" }, AVAILABLE_BLOCKS: "사용 가능한 블록", AVAILABLE_BLOCKS_TOOLTIP: "도구 상자에서 사용할 블록을 선택하세요" },
 CONTROLS: { DUPLICATE_BLOCK: "복제", CROSS_TAB_COPY: "복사", CROSS_TAB_PASTE: "붙여넣기", DELETE: "삭제" },
 BLOCKS: {
 WHEN_START_CLICKED: "%1을(를) 클릭했을 때", WHEN_SPRITE_CLICKED: "이 스프라이트를 클릭했을 때", WHEN_KEY_PRESSED: "%1 키를 눌렀을 때", KEY_ANY: "아무 키", KEY_SPACE: "스페이스", KEY_ARROW_UP: "위쪽 화살표", KEY_ARROW_DOWN: "아래쪽 화살표", KEY_ARROW_LEFT: "왼쪽 화살표", KEY_ARROW_RIGHT: "오른쪽 화살표",
 WAIT: "%1초 기다리기", REPEAT: "%1번 반복", FOREVER: "계속 반복", IF: "만약 %1이라면", ELSE: "아니면", STOP: "중지", RANDOM: "%1부터 %2 사이의 임의의 수 선택", AND: "%1 그리고 %2", OR: "%1 또는 %2", NOT: "%1이(가) 아님", JOIN: "%1과 %2 연결", ABSOLUTE: "%1의 절댓값",
 SAY: "%1 말하기", SAY_FOR_SECONDS: "%1을(를) %2초 동안 말하기", SET_COLOR: "색상 효과를 %1로 설정", SET_BACKGROUND_COLOR: "배경색을 %1로 설정", MOVE: "%1만큼 이동", ROTATE: "%1도 회전", SET_ROTATION: "방향을 %1도로 설정", SET_X: "x를 %1로 설정", SET_Y: "y를 %1로 설정", SET_XY: "x를 %1, y를 %2로 설정", GET_X: "x 위치", GET_Y: "y 위치", TIMER: "타이머", RESET_TIMER: "타이머 초기화", PLAY_SOUND: "%1 소리 재생", PLAY_SOUND_UNTIL_DONE: "%1 소리가 끝날 때까지 재생", STOP_ALL_SOUNDS: "모든 소리 중지", SOUND_POP: "팝", SOUND_FAILURE: "실패", SOUND_SUCCESS: "성공"
 }, CATEGORY: { CONTROLS: "제어", EVENTS: "이벤트", OPERATORS: "연산", LOOKS: "모양", MOTIONS: "동작", VARIABLES: "변수", SENSING: "감지", SOUNDS: "소리" }
};

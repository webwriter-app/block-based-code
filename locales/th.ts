import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "เริ่มทำงาน", RESTART: "เริ่มทำงานอีกครั้ง", STOP: "หยุดทำงาน", FULLSCREEN: "แสดงเต็มหน้าจอ", FULLSCREEN_EXIT: "ออกจากโหมดเต็มหน้าจอ", HELP: "ช่วยเหลือ", ERROR: "เกิดข้อผิดพลาด!", EXECUTION_OPTIONS: "ตัวเลือกการทำงาน", RESET_STAGE: "รีเซ็ตเวที", SHORTCUTS: "แป้นพิมพ์ลัด",
 DIALOG: { CANCEL: "ยกเลิก", SAVE: "บันทึก", NO: "ไม่ใช่", YES: "ใช่", OK: "ตกลง" }, ZOOM: { IN: "ขยาย", OUT: "ย่อ", RESET: "รีเซ็ตการซูม" },
 OPTIONS: { READONLY: "อ่านอย่างเดียว", READONLY_TOOLTIP: "เลือกว่าจะอนุญาตให้แก้ไขบล็อกหรือไม่", STAGE: "เวที", STAGE_TOOLTIP: "เลือกประเภทของเวที", STAGE_TYPES: { CODE: "โค้ด", CANVAS: "แคนวาส" }, AVAILABLE_BLOCKS: "บล็อกที่ใช้ได้", AVAILABLE_BLOCKS_TOOLTIP: "เลือกบล็อกที่ใช้ได้ในกล่องเครื่องมือ" },
 CONTROLS: { DUPLICATE_BLOCK: "ทำซ้ำ", CROSS_TAB_COPY: "คัดลอก", CROSS_TAB_PASTE: "วาง", DELETE: "ลบ" },
 BLOCKS: {
 WHEN_START_CLICKED: "เมื่อคลิก %1", WHEN_SPRITE_CLICKED: "เมื่อคลิกตัวละครนี้", WHEN_KEY_PRESSED: "เมื่อกดปุ่ม %1", KEY_ANY: "ปุ่มใดก็ได้", KEY_SPACE: "เว้นวรรค", KEY_ARROW_UP: "ลูกศรขึ้น", KEY_ARROW_DOWN: "ลูกศรลง", KEY_ARROW_LEFT: "ลูกศรซ้าย", KEY_ARROW_RIGHT: "ลูกศรขวา",
 WAIT: "รอ %1 วินาที", REPEAT: "ทำซ้ำ %1 ครั้ง", FOREVER: "ตลอดไป", IF: "ถ้า %1 แล้ว", ELSE: "มิฉะนั้น", STOP: "หยุด", RANDOM: "สุ่มตัวเลขตั้งแต่ %1 ถึง %2", AND: "%1 และ %2", OR: "%1 หรือ %2", NOT: "ไม่ใช่ %1", JOIN: "รวม %1 กับ %2", ABSOLUTE: "ค่าสัมบูรณ์ของ %1",
 SAY: "พูด %1", SAY_FOR_SECONDS: "พูด %1 เป็นเวลา %2 วินาที", SET_COLOR: "ตั้งค่าเอฟเฟกต์สีเป็น %1", SET_BACKGROUND_COLOR: "ตั้งค่าสีพื้นหลังเป็น %1", MOVE: "เคลื่อนที่ %1 ก้าว", ROTATE: "หมุน %1 องศา", SET_ROTATION: "ตั้งทิศทางเป็น %1 องศา", SET_X: "ตั้งค่า x เป็น %1", SET_Y: "ตั้งค่า y เป็น %1", SET_XY: "ตั้งค่า x เป็น %1 และ y เป็น %2", GET_X: "ตำแหน่ง x", GET_Y: "ตำแหน่ง y", TIMER: "ตัวจับเวลา", RESET_TIMER: "รีเซ็ตตัวจับเวลา", PLAY_SOUND: "เล่นเสียง %1", PLAY_SOUND_UNTIL_DONE: "เล่นเสียง %1 จนจบ", STOP_ALL_SOUNDS: "หยุดเสียงทั้งหมด", SOUND_POP: "ป๊อป", SOUND_FAILURE: "ล้มเหลว", SOUND_SUCCESS: "สำเร็จ"
 }, CATEGORY: { CONTROLS: "การควบคุม", EVENTS: "เหตุการณ์", OPERATORS: "ตัวดำเนินการ", LOOKS: "รูปลักษณ์", MOTIONS: "การเคลื่อนไหว", VARIABLES: "ตัวแปร", SENSING: "การตรวจจับ", SOUNDS: "เสียง" }
};

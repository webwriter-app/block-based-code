import { Dictionary } from "../types";
export const dictionary: Dictionary = {
 START: "Mulai eksekusi", RESTART: "Jalankan ulang", STOP: "Hentikan eksekusi", FULLSCREEN: "Masuk ke layar penuh", FULLSCREEN_EXIT: "Keluar dari layar penuh", HELP: "Bantuan", ERROR: "Terjadi kesalahan!", EXECUTION_OPTIONS: "Opsi eksekusi", RESET_STAGE: "Atur ulang panggung", SHORTCUTS: "Pintasan keyboard",
 DIALOG: { CANCEL: "Batal", SAVE: "Simpan", NO: "Tidak", YES: "Ya", OK: "Oke" }, ZOOM: { IN: "Perbesar", OUT: "Perkecil", RESET: "Atur ulang zoom" },
 OPTIONS: { READONLY: "Hanya baca", READONLY_TOOLTIP: "Pilih apakah blok dapat diedit", STAGE: "Panggung", STAGE_TOOLTIP: "Pilih jenis panggung", STAGE_TYPES: { CODE: "Kode", CANVAS: "Kanvas" }, AVAILABLE_BLOCKS: "Blok yang tersedia", AVAILABLE_BLOCKS_TOOLTIP: "Pilih blok yang tersedia di kotak alat" },
 CONTROLS: { DUPLICATE_BLOCK: "Duplikat", CROSS_TAB_COPY: "Salin", CROSS_TAB_PASTE: "Tempel", DELETE: "Hapus" },
 BLOCKS: {
 WHEN_START_CLICKED: "ketika %1 diklik", WHEN_SPRITE_CLICKED: "ketika sprite ini diklik", WHEN_KEY_PRESSED: "ketika tombol %1 ditekan", KEY_ANY: "tombol apa saja", KEY_SPACE: "spasi", KEY_ARROW_UP: "panah atas", KEY_ARROW_DOWN: "panah bawah", KEY_ARROW_LEFT: "panah kiri", KEY_ARROW_RIGHT: "panah kanan",
 WAIT: "tunggu %1 detik", REPEAT: "ulangi %1 kali", FOREVER: "selamanya", IF: "jika %1, maka", ELSE: "jika tidak", STOP: "hentikan", RANDOM: "pilih angka acak dari %1 hingga %2", AND: "%1 dan %2", OR: "%1 atau %2", NOT: "bukan %1", JOIN: "gabungkan %1 dan %2", ABSOLUTE: "nilai absolut dari %1",
 SAY: "katakan %1", SAY_FOR_SECONDS: "katakan %1 selama %2 detik", SET_COLOR: "atur efek warna ke %1", SET_BACKGROUND_COLOR: "atur warna latar ke %1", MOVE: "bergerak %1 langkah", ROTATE: "putar %1 derajat", SET_ROTATION: "atur arah ke %1 derajat", SET_X: "atur x ke %1", SET_Y: "atur y ke %1", SET_XY: "atur x ke %1 dan y ke %2", GET_X: "posisi x", GET_Y: "posisi y", TIMER: "pengatur waktu", RESET_TIMER: "atur ulang pengatur waktu", PLAY_SOUND: "putar suara %1", PLAY_SOUND_UNTIL_DONE: "putar suara %1 hingga selesai", STOP_ALL_SOUNDS: "hentikan semua suara", SOUND_POP: "letup", SOUND_FAILURE: "gagal", SOUND_SUCCESS: "berhasil"
 }, CATEGORY: { CONTROLS: "Kontrol", EVENTS: "Peristiwa", OPERATORS: "Operator", LOOKS: "Tampilan", MOTIONS: "Gerakan", VARIABLES: "Variabel", SENSING: "Sensor", SOUNDS: "Suara" }
};

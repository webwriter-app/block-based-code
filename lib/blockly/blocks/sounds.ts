import { BlockDefinition } from "../types";

const soundOptions: [string, string][] = [
  ["%{BKY_SOUND_POP}", "pop"],
  ["%{BKY_SOUND_SUCCESS}", "success"],
  ["%{BKY_SOUND_FAILURE}", "failure"],
];

export const blocks = [
  {
    type: "sounds:play",
    message0: "%{BKY_PLAY_SOUND}",
    args0: [
      {
        type: "field_dropdown",
        name: "SOUND_MENU",
        options: soundOptions,
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "sounds",
    style: "sound_blocks",
  } as const,
  {
    type: "sounds:play_until_done",
    message0: "%{BKY_PLAY_SOUND_UNTIL_DONE}",
    args0: [
      {
        type: "field_dropdown",
        name: "SOUND_MENU",
        options: soundOptions,
      },
    ],
    nextStatement: null,
    previousStatement: null,
    category: "sounds",
    style: "sound_blocks",
  } as const,
  {
    type: "sounds:stop_all_sounds",
    message0: "%{BKY_STOP_ALL_SOUNDS}",
    nextStatement: null,
    previousStatement: null,
    category: "sounds",
    style: "sound_blocks",
  } as const,
] satisfies BlockDefinition[];

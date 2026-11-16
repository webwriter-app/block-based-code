import { BlockTypes } from "../blocks/blocks";
import type { GeneratorFunction } from "../generator-types";

export const generators = {
  "sounds:play": (block) => {
    const sound = block.getFieldValue("SOUND_MENU");
    return `playSound("${sound}");\n`;
  },
  "sounds:play_until_done": (block) => {
    const sound = block.getFieldValue("SOUND_MENU");
    return `await playSoundUntilDone("${sound}");\n`;
  },
  "sounds:stop_all_sounds": () => "stopAllSounds();\n",
} satisfies Partial<Record<BlockTypes, GeneratorFunction>>;

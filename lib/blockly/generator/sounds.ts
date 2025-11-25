import { BlockTypes } from "../blocks";
import type { GeneratorFunction } from "../types/generator";

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

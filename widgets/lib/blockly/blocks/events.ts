import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { BlockType, CategoryKey } from "../types";

export const blocks = [{
  type: BlockType.WHEN_START_CLICKED,
  message0: "%{BKY_WHEN_START_CLICKED}",
  args0: [
    {
      type: "field_image",
      src: PlayerPlayIcon,
      width: 24,
      height: 24,
      alt: "play",
    },
  ],
  nextStatement: null,
  category: CategoryKey.EVENTS,
  style: "event_blocks",
}];

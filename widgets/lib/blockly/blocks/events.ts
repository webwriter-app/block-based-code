import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { BlockDefinition } from "../types";

export const blocks = [
  {
    type: "events:when_start_clicked",
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
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "SUBSTACK",
      },
    ],
    category: "events",
    style: "event_blocks",
  } as const,
] satisfies BlockDefinition[];

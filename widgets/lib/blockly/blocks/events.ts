import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";
import { generateBlockDefinition } from "./utils";

const whenStartClickedBlock = generateBlockDefinition({
  name: "when_start_clicked",
  category: "event",
  next: null,
  tooltip: "",
  helpUrl: "",
  hat: "cap",
}, [
  {
    type: "input_dummy",
    text: "when",
  },
  {
    type: "field_image",
    src: PlayerPlayIcon,
    width: 24,
    height: 24,
    alt: "*",
    flipRtl: false,
  },
  {
    type: "input_dummy",
    text: "clicked",
  },
]);

export const eventBlocks = [
  whenStartClickedBlock,
];

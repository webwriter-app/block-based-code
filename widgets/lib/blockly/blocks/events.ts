import PlayerPlayIcon from "@tabler/icons/outline/player-play.svg";

const whenStartClickedBlock = {
  type: "when_start_clicked",
  message0: "When %1 %2 %3 clicked",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "field_image",
      src: PlayerPlayIcon,
      width: 15,
      height: 15,
      alt: "*",
      flipRtl: false,
    },
    {
      type: "input_dummy",
    },
  ],
  style: "event_blocks",
  inputsInline: true,
  nextStatement: null,
  tooltip: "",
  helpUrl: "",
  hat: "cap",
};

export const eventBlocks = [
  whenStartClickedBlock,
];

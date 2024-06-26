import * as Blockly from "blockly";
import { EventBlocks } from "./events";
import { OperatorBlocks } from "./operators";
import { ControlBlocks } from "./controls";
import { MotionBlocks } from "./motions";

MotionBlocks.defineBlocks();
ControlBlocks.defineBlocks();
EventBlocks.defineBlocks();
OperatorBlocks.defineBlocks();

delete Blockly.Blocks.math_change;

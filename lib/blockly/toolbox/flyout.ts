import { VerticalFlyout } from "blockly";

/**
 * The custom WebWriter flyout for Blockly.
 */
export class WebWriterFlyout extends VerticalFlyout {
  public override getFlyoutScale(): number {
    return 0.7;
  }
}

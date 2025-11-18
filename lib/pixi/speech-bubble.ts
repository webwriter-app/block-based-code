import {
  Container, Graphics, Text, Sprite,
} from "pixi.js";

/**
 * SpeechBubble class for displaying text next to a sprite, similar to Scratch
 */
export class SpeechBubble extends Container {
  private bubble: Graphics;

  private textDisplay: Text;

  private isOnRightSide: boolean = true;

  private readonly padding = 12;

  private readonly cornerRadius = 12;

  private readonly tailSize = 16;

  private readonly distanceFromSprite = 4;

  private readonly maxWidth = 256;

  private readonly canvasWidth: number;

  private readonly canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    super();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.label = "speechBubble";

    // Create the text display
    this.textDisplay = new Text({
      text: "",
      style: {
        fontFamily: "Helvetica Neue, Segoe UI, Helvetica, sans-serif",
        fontSize: 24,
        fill: 0x000000,
        wordWrap: true,
        wordWrapWidth: this.maxWidth - this.padding * 2,
        align: "left",
      },
    });

    // Create the bubble graphics
    this.bubble = new Graphics();

    // Add children in correct order (bubble first, then text on top)
    this.addChild(this.bubble);
    this.addChild(this.textDisplay);

    this.visible = false;
  }

  /**
   * Updates the speech bubble with new text and positions it relative to the sprite
   * @param text The text to display
   * @param sprite The sprite to position the bubble relative to
   */
  public setText(text: string, sprite: Sprite): void {
    if (!text || text.trim() === "") {
      this.visible = false;
      return;
    }

    this.textDisplay.text = text;
    this.visible = true;

    // Calculate bubble dimensions based on text size
    const { width: bubbleWidth, height: bubbleHeight } = this.getDimensions();

    // Determine if bubble should be on right or left side
    const showOnRight = this.shouldShowOnRight(sprite);

    // Position the bubble
    this.updatePosition(sprite, bubbleWidth, bubbleHeight);

    // Draw the bubble
    this.drawBubble(bubbleWidth, bubbleHeight, showOnRight);

    // Position the text within the bubble
    this.textDisplay.x = this.padding;
    this.textDisplay.y = this.padding;
  }

  /**
   * Updates the position of the speech bubble relative to the sprite
   * @param sprite The sprite to position relative to
   * @param bubbleWidth Width of the bubble
   * @param bubbleHeight Height of the bubble
   */
  public updatePosition(sprite: Sprite, bubbleWidth: number, bubbleHeight: number): void {
    const showOnRight = this.shouldShowOnRight(sprite);

    if (showOnRight !== this.isOnRightSide) {
      // Redraw bubble if side has changed
      this.drawBubble(bubbleWidth, bubbleHeight, showOnRight);
    }

    const spriteBounds = sprite.getBounds();

    if (showOnRight) {
      // Position to the right of the sprite
      this.x = spriteBounds.x + spriteBounds.width + this.tailSize + this.distanceFromSprite;
    } else {
      // Position to the left of the sprite
      this.x = spriteBounds.x - bubbleWidth - this.tailSize - this.distanceFromSprite;
    }
    this.y = spriteBounds.y + (spriteBounds.height / 4) - bubbleHeight / 2;

    // Ensure bubble stays within canvas bounds
    this.x = Math.max(
      this.tailSize + this.distanceFromSprite,
      Math.min(this.x, this.canvasWidth - bubbleWidth - this.tailSize - this.distanceFromSprite),
    );
    this.y = Math.max(
      this.distanceFromSprite,
      Math.min(this.y, this.canvasHeight - bubbleHeight - this.distanceFromSprite),
    );
  }

  /**
   * Draws the speech bubble background
   * @param width Width of the bubble
   * @param height Height of the bubble
   * @param tailOnLeft Whether the tail should be on the left side
   */
  private drawBubble(width: number, height: number, tailOnLeft: boolean): void {
    this.bubble.clear();

    const tailY = height / 2;

    // Draw bubble and tail as one continuous path
    this.bubble.beginPath();

    if (tailOnLeft) {
      // Start at tail tip
      this.bubble.moveTo(-this.tailSize, tailY);
      // Draw to bubble edge (top of tail connection)
      this.bubble.lineTo(0, tailY - this.tailSize / 2);
      // Draw rounded rect clockwise from left side
      this.bubble.lineTo(0, this.cornerRadius);
      this.bubble.arcTo(0, 0, this.cornerRadius, 0, this.cornerRadius);
      this.bubble.lineTo(width - this.cornerRadius, 0);
      this.bubble.arcTo(width, 0, width, this.cornerRadius, this.cornerRadius);
      this.bubble.lineTo(width, height - this.cornerRadius);
      this.bubble.arcTo(width, height, width - this.cornerRadius, height, this.cornerRadius);
      this.bubble.lineTo(this.cornerRadius, height);
      this.bubble.arcTo(0, height, 0, height - this.cornerRadius, this.cornerRadius);
      this.bubble.lineTo(0, tailY + this.tailSize / 2);
      // Complete tail
      this.bubble.lineTo(-this.tailSize, tailY);
      this.isOnRightSide = true;
    } else {
      // Start at tail tip
      this.bubble.moveTo(width + this.tailSize, tailY);
      // Draw to bubble edge (top of tail connection)
      this.bubble.lineTo(width, tailY - this.tailSize / 2);
      // Draw rounded rect counter-clockwise from right side
      this.bubble.lineTo(width, this.cornerRadius);
      this.bubble.arcTo(width, 0, width - this.cornerRadius, 0, this.cornerRadius);
      this.bubble.lineTo(this.cornerRadius, 0);
      this.bubble.arcTo(0, 0, 0, this.cornerRadius, this.cornerRadius);
      this.bubble.lineTo(0, height - this.cornerRadius);
      this.bubble.arcTo(0, height, this.cornerRadius, height, this.cornerRadius);
      this.bubble.lineTo(width - this.cornerRadius, height);
      this.bubble.arcTo(width, height, width, height - this.cornerRadius, this.cornerRadius);
      this.bubble.lineTo(width, tailY + this.tailSize / 2);
      // Complete tail
      this.bubble.lineTo(width + this.tailSize, tailY);
      this.isOnRightSide = false;
    }

    this.bubble.closePath();
    this.bubble.fill({ color: 0xffffff });
    this.bubble.stroke({ color: 0xbbbbbb, width: 2 });
  }

  /**
   * Hides the speech bubble
   */
  public hide(): void {
    this.visible = false;
  }

  /**
   * Gets the current dimensions of the bubble
   */
  public getDimensions(): { width: number; height: number } {
    const textBounds = this.textDisplay.getBounds();
    return {
      width: textBounds.width + this.padding * 2,
      height: textBounds.height + this.padding * 2,
    };
  }

  /**
   * Checks if the bubble should be shown on the right side based on sprite position
   */
  public shouldShowOnRight(sprite: Sprite): boolean {
    const spriteBounds = sprite.getBounds();
    const spriteRight = spriteBounds.x + spriteBounds.width;
    const spriteLeft = spriteBounds.x;
    const spaceOnRight = this.canvasWidth - spriteRight;
    const spaceOnLeft = spriteLeft;

    const { width } = this.getDimensions();
    return spaceOnRight > width + 2 * this.tailSize + this.distanceFromSprite || spaceOnRight >= spaceOnLeft;
  }
}

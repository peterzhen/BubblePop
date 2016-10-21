
class Bubble {
  constructor(xpos, ypos, shifted, color){
    this.x = xpos;
    this.y = ypos;
    this.shifted = shifted;
    this.color = color;
    this.bubble = new createjs.Sprite(window.blueSheet, "animate");
    this.createBubble(this.color);
  }

  // window.blueBubble = new createjs.Sprite(blueBubble, "animate");

  createBubble(color){
    // this.bubble.graphics.beginFill("red").drawCircle(0, 0, 15);
    this.bubble.x = this.x;
    if (this.shifted) this.bubble.x += 16;
    this.bubble.y = this.y;
  }

  updateBubble(xpos, ypos){
    this.x = xpos;
    this.y = ypos;
    this.bubble.x = this.x + 15;
    if (this.shifted) this.bubble.x += 15;
    this.bubble.y = this.y + 15;
  }
}

module.exports = Bubble;

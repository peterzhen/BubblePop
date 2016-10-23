
class Bubble {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.vx = 0;
    this.vy = 0;
    this.shifted = options.shifted;
    // this.color = color;
    this.bubble = new createjs.Sprite(options.sheet, "animate");
    this.createBubble(this.color);
  }

  tick(){
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + 32 >= window.stage.canvas.width ) {
      this.vx = -this.vx;
    }

    if ( this.y <= 0 ){
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }

    this.updateBubble(this.x, this.y);
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
    this.bubble.x = this.x;
    if (this.shifted) this.bubble.x += 16;
    this.bubble.y = this.y;
  }
}

module.exports = Bubble;

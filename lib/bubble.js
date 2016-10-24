
class Bubble {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.vx = 0;
    this.vy = 0;
    this.shifted = options.shifted;
    this.bubble = new createjs.Sprite(options.sheet, "animate");
    this.pseudoBubble = new createjs.Shape();
    this.createBubble(this.color);
  }

  tick(){
    this.x += this.vx;
    this.y += this.vy;

    //bounce sides
    if (this.x <= 0 || this.x + 34 >= window.stage.canvas.width ) {
      this.vx = -this.vx;
    }

    //stick top
    if ( this.y <= 0 ){
      this.y = 0;
      this.stopBubble();
      this.snapBubble();
    }

    this.updateBubble(this.x, this.y);
  }
  // window.blueBubble = new createjs.Sprite(blueBubble, "animate");

  createBubble(color){
    // this.bubble.graphics.beginFill("red").drawCircle(0, 0, 15);
    this.bubble.x = this.x;
    if (this.shifted) this.shiftRow();
    this.bubble.y = this.y;
  }

  updateBubble(xpos, ypos, shifted = this.shifted){
    this.x = xpos;
    this.y = ypos;
    this.shifted = shifted;
    this.bubble.x = this.x;
    if (this.shifted) this.shiftRow();
    this.bubble.y = this.y;
  }

  //I HAD THIS AT FLOOR
  getGridPosition(){
    const gridx = Math.round(this.x / 34);
    const gridy = Math.round(this.y / 30);
    return {
      x: gridx,
      y: gridy
    }
  }

  snapBubble(){
    const grid = this.getGridPosition();
    const x = grid.x * 34;
    const y = grid.y * 30;
    //TODO: snap to closest grid position and check if bubble exists in current grid
    grid.y % 2 === 1 ? this.updateBubble(x, y, true) : this.updateBubble(x, y);
  }

  stopBubble(){
    this.vx = 0;
    this.vy = 0;
  }

  shiftRow(){
    this.bubble.x += 17;
  }
}

module.exports = Bubble;

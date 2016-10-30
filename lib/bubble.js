class Bubble {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.vx = 0;
    this.vy = 0;
    this.shifted = options.shifted;
    this.color = options.color;
    this.processed = false;
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

  getGridPosition(rowOffset = 0){
    const gridy = Math.floor((this.y + radius) / rowHeight);

    let offset = 0;
    //add rowoffset? (gridy + rowoffset) ass row grows
    if ((gridy  + rowOffset) % 2 === 1) offset = radius;

    const gridx = Math.floor(((this.x - offset) + radius) / rowWidth);

    return {
      x: gridx,
      y: gridy
    }
  }

  snapBubble(rowOffset){
    const grid = this.getGridPosition(rowOffset = 0);
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
    this.bubble.x += radius;
  }
}

module.exports = Bubble;

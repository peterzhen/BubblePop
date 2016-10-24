const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(stage){
    this.stage = stage;
    this.bubbleGrid = [];
    this.bubbles = []
    this.player = new Player({ game: this });
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(8, 13);

    this.tick = this.tick.bind(this);
  }

  tick(){
    if (this.player.shooting){
      this.currentBubble.tick();
      this.player.tick();
      this.checkCollisions();
    }
    window.stage.update();
  }

  generateBubbles(rows, cols) {
    for (let i = 0; i < cols; i++) {
        this.bubbleGrid[i] = [];
        for (let j = 0; j < rows; j++) {
          if (i % 2 === 1){
            if (j < rows - 1){
              this.bubbleGrid[i][j] = 0;
            }
          } else {
            this.bubbleGrid[i][j] = 0;
          }
        }
    }

    level1.forEach( (bubble) => {
      if (bubble.i % 2 === 1){
        if (bubble.j < rows - 1){
          this.bubbleGrid[bubble.i][bubble.j] = new Bubble({
            x: bubble.j * 34,
            y: bubble.i * 30,
            shifted: true,
            sheet: bubble.sheet
          });
        }
      } else {
        this.bubbleGrid[bubble.i][bubble.j] = new Bubble({
          x: bubble.j * 34,
          y: bubble.i * 30,
          shifted: false,
          sheet: bubble.sheet
        });
      }
      this.bubbles.push(this.bubbleGrid[bubble.i][bubble.j])
    });
  }

  checkCollisions(){
    this.bubbles.forEach((bubble) => {
      if (this.checkCollision(bubble.bubble, this.currentBubble.bubble)){
        this.currentBubble.stopBubble();
        this.currentBubble.snapBubble();
        const grid = this.currentBubble.getGridPosition();
        this.bubbles.push(this.currentBubble);
        this.bubbleGrid[grid.y][grid.x] = this.currentBubble;
      }
    });
  }

  checkCollision(bubble1, bubble2){
    const bubblew = 32;
    const bubbleh = 32;

    const bubble1x = bubble1.x;
    const bubble1y = bubble1.y;

    const bubble2x = bubble2.x;
    const bubble2y = bubble2.y;

    if (    bubble1x >= bubble2x + bubblew
        ||  bubble1x + bubblew <= bubble2x
        ||  bubble1y >= bubble2y + bubbleh
        ||  bubble1y + bubbleh <= bubble2y) {
      return false;
    } else {
      return true;
    }
  }

  allObjects() {
    let flatBubbles = [].concat.apply([], this.bubbles);

    return [].concat(flatBubbles, this.currentBubble, this.nextBubble);
  }

  fillCanvas(){
    this.stage.addChild(this.shooter.shooter);
    this.allObjects().map ( (bubble) => this.stage.addChild(bubble.bubble));
  }

  updateBubbles(currentBubble, nextBubble){
    this.currentBubble = currentBubble;
    this.nextBubble = nextBubble;
  }
}

module.exports = Game;

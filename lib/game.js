const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(stage){
    this.stage = stage;
    this.bubbles = [];
    this.player = new Player();
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(9, 6);
  }

  generateBubbles(rows, cols, color) {
    for (let i = 0; i < cols; i++) {
        this.bubbles[i] = [];
        for (let j = 0; j < rows; j++) {
          if (i % 2 !== 0){
            this.bubbles[i][j] = new Bubble(j * 32, i * 28, true);
          } else {
            this.bubbles[i][j] = new Bubble(j * 32, i * 28, false);
          }
        }
    }
  }

  allObjects() {
    let flatBubbles = [].concat.apply([], this.bubbles);

    return [].concat(flatBubbles, this.currentBubble, this.nextBubble);
  }

  fillCanvas(){
    this.stage.addChild(this.shooter);
    this.allObjects().map ( (bubble) => this.stage.addChild(bubble.bubble));
  }
}

module.exports = Game;

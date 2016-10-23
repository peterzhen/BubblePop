const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(stage){
    this.stage = stage;
    this.bubbles = [];
    this.player = new Player({ game: this });
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(9, 6);

    this.tick = this.tick.bind(this);
  }

  tick(){
    if (this.player.shooting) this.currentBubble.tick();
    window.stage.update();
  }

  generateBubbles(rows, cols, color) {
    for (let i = 0; i < cols; i++) {
        this.bubbles[i] = [];
        for (let j = 0; j < rows; j++) {
          if (i % 2 !== 0){
            this.bubbles[i][j] = new Bubble({
              x: j * 32,
              y: i * 28,
              shifted: true,
              sheet: randomSheet()
            });
          } else {
            this.bubbles[i][j] = new Bubble({
              x: j * 32,
              y: i * 28,
              shifted: false,
              sheet: randomSheet()
            });
          }
        }
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

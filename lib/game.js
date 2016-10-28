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
    this.generateBubbles(rows, cols);

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
            sheet: bubble.sheet,
            color: bubble.color,
            processed: false;
          });
        }
      } else {
        this.bubbleGrid[bubble.i][bubble.j] = new Bubble({
          x: bubble.j * 34,
          y: bubble.i * 30,
          shifted: false,
          sheet: bubble.sheet,
          color: bubble.color,
          processed: false;
        });
      }
      this.bubbles.push(this.bubbleGrid[bubble.i][bubble.j])
    });
  }

  checkCollisions(){
    let flatBubbles = [].concat.apply([], this.bubbleGrid);
    flatBubbles.forEach((bubble) => {
      if (bubble !== 0) {
        if (this.checkCollision(bubble.bubble, this.currentBubble.bubble)){
          this.currentBubble.stopBubble();
          this.currentBubble.snapBubble();
          const grid = this.currentBubble.getGridPosition();
          this.bubbles.push(this.currentBubble);
          this.bubbleGrid[grid.y][grid.x] = this.currentBubble;

          // findclusters
        }
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

  findCluster(bubble, matchType, reset, skipRemoved){
    if (reset) this.resetBubbles();

    const targetBubble = bubble;

    const topProcess = [targetBubble];
    targetBubble.processed = true;
    let foundCluster = [];

    while (topProcess.length > 0){
      let currentBubble = topProcess.pop();

      if (skipRemoved && currentBubble.removed){
        continue;
      }

      //matchtype === color?
      if (!matchType || (currentBubble.color == targetBubble.color)) {
         foundcluster.push(currentBubble);

         let neighbors = this.getNeighbors(currentBubble);

         for (let i = 0; i < neighbors.length; i++) {
           if (!neighbors[i].processed) {
               toprocess.push(neighbors[i]);
               neighbors[i].processed = true;
           }
         }
      }
    }

    return foundcluster;
}

  getNeighbors(bubble) {
    let grid = bubble.getGridPosition();
    const neighbors = [];

    const deltas = neighborDeltas[grid.y % 2];

    for (let i = 0; i < deltas.length; i++) {
        let deltax = grid.x + deltas[i][0];
        let deltay = grid.y + deltas[i][1];

        if (deltax >= 0 && deltax < rows && deltay >= 0 && deltay < cols) {
            if (this.bubbleGrid[deltay][deltax] !== 0) neighbors.push(this.bubbleGrid[deltay][deltax]);
        }
    }

    return neighbors;
  }

  resetBubbles() {
    for (var i=0; i<cols; i++) {
        for (var j=0; j<rows; j++) {
          if (this.bubbleGrid[i][j] !== 0) this.bubbleGrid[i][j].processed = false;
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

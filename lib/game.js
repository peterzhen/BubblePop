const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(stage){
    this.stage = stage;
    this.bubbleGrid = [];
    this.rowOffset = 0;
    this.player = new Player({ game: this });
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(rows, cols);

    this.tick = this.tick.bind(this);
  }

  tick(){
    this.allBubbles().forEach(bubble => bubble.tick());
    if (this.player.shooting){
      this.currentBubble.tick();
      this.player.tick();
      this.checkCollisions();
    }
    stage.update();
  }

  generateBubbles(rows, cols) {
    for (let i = 0; i < rows; i++) {
        this.bubbleGrid[i] = [];
        for (let j = 0; j < cols; j++) {
          if (i % 2 === 1){
            if (j < cols - 1){
              this.bubbleGrid[i][j] = -1;
            }
          } else {
            this.bubbleGrid[i][j] = -1;
          }
        }
    }

    level1.forEach( (bubble) => {
      if (bubble.i % 2 === 1){
        if (bubble.j < cols - 1){
          this.bubbleGrid[bubble.i][bubble.j] = new Bubble({
            x: bubble.j * rowWidth,
            y: bubble.i * rowHeight,
            shifted: true,
            sheet: bubble.sheet,
            color: bubble.color,
            processed: false
          });
        }
      } else {
        this.bubbleGrid[bubble.i][bubble.j] = new Bubble({
          x: bubble.j * rowWidth,
          y: bubble.i * rowHeight,
          shifted: false,
          sheet: bubble.sheet,
          color: bubble.color,
          processed: false
        });
      }
    });
  }

  checkCollisions(){

    this.allBubbles().forEach((bubble) => {
      if (bubble !== -1) {
        if (this.checkCollision(bubble.bubble, this.currentBubble.bubble)
            || this.currentBubble.y <= 0){
          this.currentBubble.stopBubble();
          this.currentBubble.snapBubble();
          this.addToGrid(this.currentBubble);
          this.burstMatching(this.currentBubble);
        }
      }
    });
  }

  addToGrid(bubble){
    const grid = bubble.getGridPosition();
    this.bubbleGrid[grid.y][grid.x] = bubble;
  }

  checkCollision(bubble1, bubble2){
    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bubbleWidth) return true;

    return false;
  }

  burstMatching(bubble){
    const matchingBubbles = this.findMatching(bubble);

    if (matchingBubbles.length >= 3){
      console.log(`clusters - ${matchingBubbles}`);
      matchingBubbles.forEach( bubble => {
        this.removeBubble(bubble);
      });
      this.dropFloatingBubbles();
    }
  }

  findMatching(bubble){
    this.resetBubbles();

    const uncheckedBubbles = [bubble];
    bubble.processed = true;
    const matching = [];

    while (uncheckedBubbles.length > 0){
      let currentBubble = uncheckedBubbles.pop();

      if (currentBubble.color === bubble.color) {
         matching.push(currentBubble);

         let neighbors = this.getNeighbors(currentBubble);

         neighbors.forEach( bubble => {
           if(!bubble.processed){
             uncheckedBubbles.push(bubble);
             bubble.processed = true;
           }
         });
      }
    }

    return matching;
  }

  dropFloatingBubbles(){
    this.resetBubbles();

    let floating = [];

    this.allBubbles().forEach( bubble => {
      if(!bubble.processed){

        const cluster = this.findFloating(bubble);

        if (cluster.every( bubble => bubble.y !== 0)){
          floating = floating.concat(cluster);
        }
      }
    });

    console.log(`bubbles to drop: ${floating}`);
    floating.forEach( bubble => {
      const grid = bubble.getGridPosition();
      bubble.vy = 13;
      setTimeout(() => {
        this.bubbleGrid[grid.y][grid.x] = -1;
        stage.removeChild(bubble.bubble);
        console.log(`grid[${grid.y}][${grid.x}] - removed ${bubble.color}`);
      }, 1000);
    });
  }

  findFloating(bubble) {

    const unchecked = [bubble];
    bubble.processed = true;
    const floating = [];

    while (unchecked.length > 0) {
      const currentBubble = unchecked.pop();

      floating.push(currentBubble);

      const neighbors = this.getNeighbors(currentBubble);

      neighbors.forEach( bubble => {
        if(!bubble.processed){
          unchecked.push(bubble);
          bubble.processed = true;
        }
      });
    }

    return floating;
  }

  getNeighbors(bubble) {
    let grid = bubble.getGridPosition();
    const neighbors = [];

    const deltas = neighborDeltas[grid.y % 2];

    for (let i = 0; i < deltas.length; i++) {
      let deltax = grid.x + deltas[i][0];
      let deltay = grid.y + deltas[i][1];

      if (deltax >= 0 && deltax < cols && deltay >= 0 && deltay < rows) {
        if (this.bubbleGrid[deltay][deltax]){
          if (this.bubbleGrid[deltay][deltax] !== -1){
            neighbors.push(this.bubbleGrid[deltay][deltax]);
          }
        }
      }
    }

    return neighbors;
  }

  removeBubble(bubble){
    const grid = bubble.getGridPosition();
    this.bubbleGrid[grid.y][grid.x] = -1;
    stage.removeChild(bubble.bubble);
    console.log(`grid[${grid.y}][${grid.x}] - removed ${bubble.color}`);
  }

  resetBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbleGrid);
    flatBubbles.forEach( bubble => {
      if ( bubble !== -1 ) bubble.processed = false;
    });
  }

  allBubbles(){
    let flatBubbles = [].concat.apply([], this.bubbleGrid);
    const bubbles = flatBubbles.filter ( bubble => bubble !== -1 );
    return bubbles;
  }

  allObjects() {
    return [].concat(this.allBubbles(), this.currentBubble, this.nextBubble);
  }

  fillCanvas(){
    this.stage.addChild(this.shooter.shooter);
    this.allObjects().map ( (bubble) => this.stage.addChild(bubble.bubble));
  }

  updateBubbles(currentBubble, nextBubble){
    this.currentBubble = currentBubble;
    this.nextBubble = nextBubble;
  }

  checkGameOver(){

  }
}

module.exports = Game;

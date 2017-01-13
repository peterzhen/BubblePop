const Bubble = require("./bubble");
const Player = require("./player");

class Game {
  constructor(stage){
    this.stage = stage;
    this.bubbleGrid = [];
    window.rowOffset = 0;
    this.currentLevel = 0;
    this.turnCount = 0;
    this.score = 0;
    this.bricks = [];
    this.player = new Player({ game: this });
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(rows, cols);
    // this.startModal();

    this.tick = this.tick.bind(this);
  }

  resetBoard(){
    const gameContainer = document.getElementsByClassName("game-container");
    gameContainer[0].style.backgroundColor = 'rgb(94, 168, 214)';
    this.stage.removeAllChildren();
    this.bubbleGrid = [];
    this.turnCount = 0;
    window.rowOffset = 0;
    this.player = new Player({ game: this });
    this.currentBubble = this.player.currentBubble;
    this.nextBubble = this.player.nextBubble;
    this.shooter = this.player.shooter;
    this.generateBubbles(rows, cols);

    this.fillCanvas();
  }

  resetGame(){
    this.currentLevel = 0;
    this.resetBoard();
  }

  nextLevel(){
    this.currentLevel += 1;
    this.resetBoard();
  }

  tick(){
    this.checkGameOver();
    this.allBubbles().forEach(bubble => bubble.tick());
    if (this.player.shooting){
      this.currentBubble.tick();
      this.player.tick();
      this.checkCollisions();
      this.checkGameOver();
      this.checkTurnCount();
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

    levels[this.currentLevel].forEach( (bubble) => {
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

  checkTurnCount(){
    const gameContainer = document.getElementsByClassName("game-container");
    if (this.turnCount < 3){
      gameContainer[0].style.backgroundColor = 'rgb(133, 226, 127)';
    } else if (this.turnCount === 3){
      gameContainer[0].style.backgroundColor = 'rgb(216, 171, 112)';
    } else if (this.turnCount === 4){
      gameContainer[0].style.backgroundColor = 'rgb(224, 85, 85)';
    } else if (this.turnCount === 5) {
      gameContainer[0].style.backgroundColor = 'rgb(133, 226, 127)';
      this.addBricks();
      this.turnCount = 0;
      window.rowOffset += 1;
      this.allBubbles().forEach( bubble => {
        bubble.y += rowHeight;
      });

      this.bubbleGrid.splice(-1,1);
    }
  }

  checkCollisions(){
    this.allBubbles().forEach((bubble) => {
      if (bubble !== -1) {
        if (this.checkCollision(bubble.bubble, this.currentBubble.bubble)){
          this.currentBubble.stopBubble();
          this.currentBubble.snapBubble();
          this.addToGrid(this.currentBubble);
          this.burstMatching(this.currentBubble);
        }
      }
    });

    if (this.currentBubble.y <= (window.rowOffset * rowHeight)){
      this.currentBubble.stopBubble();
      this.currentBubble.snapBubble();
      this.addToGrid(this.currentBubble);
      this.burstMatching(this.currentBubble);
    }
  }

  addBricks(){
    this.bricks.forEach( brick => {
      brick.y += 30;
    });
    const brick = new createjs.Bitmap("./assets/images/bricks.png");
    brick.x = 0;
    brick.y = -5;
    this.bricks.push(brick);
    this.stage.addChild(brick);
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

      matchingBubbles.forEach( bubble => {
        this.removeBubble(bubble);
      });
      this.dropFloatingBubbles();
    } else {
      this.turnCount++;
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

        if (cluster.every( bubble => bubble.y !== (window.rowOffset * rowHeight))){
          floating = floating.concat(cluster);
        }
      }
    });

    floating.forEach( bubble => {
      const grid = bubble.getGridPosition();
      bubble.vy = 13;
      setTimeout(() => {
        this.bubbleGrid[grid.y][grid.x] = -1;
        stage.removeChild(bubble.bubble);
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

    const deltas = grid.y % 2 === 1 ? oddDeltas : evenDeltas;

    for (let i = 0; i < deltas.length; i++) {
      let deltax = grid.x + deltas[i][1];
      let deltay = grid.y + deltas[i][0];

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
    this.checkLose();
    this.checkWin();
  }

  checkLose(){
    const lastRow = this.bubbleGrid[this.bubbleGrid.length - 1];
    const remainingBubbles = lastRow.filter( bubble => bubble !== -1);
    if (remainingBubbles.length > 0){
      this.openModal("YOU LOSE, TRY AGAIN!");
      this.resetGame();
    }
  }

  checkWin(){
    if (this.bubbleGrid[0].filter( bubble => bubble !== -1).length === 0){
      if (this.currentLevel === maxLevel){
        this.openModal("YOU WIN!");
        this.resetGame();
      } else {
        this.nextLevelModal("GOOD JOB!, PREPARE FOR THE NEXT LEVEL!");
        this.nextLevel();
      }
    }
  }

  nextLevelModal(){
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.style.height = "250px";
    modalContent.style.width = "200px";

    const nextLevelModal = document.createElement("div");
    nextLevelModal.className = "next-level-modal";
    nextLevelModal.innerHTML = `GREAT JOB!`;

    const nextLevelText = document.createElement("div");
    nextLevelText.className = "next-level-text";
    nextLevelText.innerHTML = `GET READY FOR \nLEVEL ${this.currentLevel + 2}`;
    modal.style.display = "block";

    const playButton = document.createElement("div");
    playButton.className = "play-button";
    playButton.innerHTML = "START";

    modalContent.appendChild(nextLevelModal);
    modalContent.appendChild(nextLevelText);
    modalContent.appendChild(playButton);

    playButton.onclick = event => {
      modalContent.innerHTML = "";
      modal.style.display = "none";
      this.nextLevel();
    }
  }

  restartModal(){

  }

  endModal(){

  }

}

module.exports = Game;

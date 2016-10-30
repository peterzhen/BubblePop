/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	const init =  () => {
	  const canvasEl = document.getElementById("canvas");
	  canvasEl.width = 275;
	  canvasEl.height = 455;
	  const ctx = canvasEl.getContext("2d");
	
	  window.stage = new createjs.Stage("canvas");
	  const game = new Game(window.stage);
	  game.fillCanvas();
	
	  createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener("tick", game.tick);
	}
	
	$(document).ready(init);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	const Player = __webpack_require__(3);
	
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
	    if (this.player.shooting){
	      this.currentBubble.tick();
	      this.player.tick();
	      this.checkCollisions();
	    }
	    stage.update();
	  }
	
	  generateBubbles(rows, cols) {
	    for (let i = 0; i < cols; i++) {
	        this.bubbleGrid[i] = [];
	        for (let j = 0; j < rows; j++) {
	          if (i % 2 === 1){
	            if (j < rows - 1){
	              this.bubbleGrid[i][j] = -1;
	            }
	          } else {
	            this.bubbleGrid[i][j] = -1;
	          }
	        }
	    }
	
	    level1.forEach( (bubble) => {
	      if (bubble.i % 2 === 1){
	        if (bubble.j < rows - 1){
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
	        if (this.checkCollision(bubble.bubble, this.currentBubble.bubble)){
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
	      matchingBubbles.forEach( bubble => {
	        let bubbleGrid = bubble.getGridPosition();
	        this.bubbleGrid[bubbleGrid.y][bubbleGrid.x] = -1;
	        this.stage.removeChild(bubble.bubble)
	      });
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
	
	  getNeighbors(bubble) {
	    let grid = bubble.getGridPosition();
	    const neighbors = [];
	
	    const deltas = neighborDeltas[grid.y % 2];
	
	    for (let i = 0; i < deltas.length; i++) {
	        let deltax = grid.x + deltas[i][0];
	        let deltay = grid.y + deltas[i][1];
	
	        if (deltax >= 0 && deltax < rows && deltay >= 0 && deltay < cols) {
	            if (this.bubbleGrid[deltay][deltax] !== -1) neighbors.push(this.bubbleGrid[deltay][deltax]);
	        }
	    }
	
	    return neighbors;
	  }
	
	  dropFloatingBubbles(){
	
	    
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
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	const Shooter = __webpack_require__(4);
	
	const currentBubbleX = 135;
	const currentBubbleY = 390;
	const nextBubbleX = 90;
	const nextBubbleY = 410;
	
	class Player {
	  constructor(options){
	    this.currentBubble;
	    this.nextBubble;
	    this.shooting = false;
	    this.game = options.game;
	    this.initStage();
	    this.shooter = new Shooter();
	    this.bindKeyHandlers();
	
	    this.updateGameBubble = this.updateGameBubble.bind(this);
	  }
	
	  tick(){
	    if (this.shooting && this.currentBubble.vx === 0 && this.currentBubble.vy === 0){
	      this.shooting = false;
	      this.setCurrentBubble();
	      this.setNextBubble();
	      this.updateGameBubble();
	    }
	  }
	
	  bindKeyHandlers(){
	    document.addEventListener("keydown", (event) => {
	      switch(event.keyCode){
	
	        case 32:
	        event.preventDefault();
	        this.shootBubble();
	
	        default:
	          return;
	      }
	    });
	  }
	
	  initStage() {
	    const currentRandom = randomColor();
	    this.currentBubble = new Bubble({
	      x: currentBubbleX,
	      y: currentBubbleY,
	      shifted: false,
	      sheet: currentRandom.sheet,
	      color: currentRandom.color
	    });
	
	    const nextRandom = randomColor();
	    this.nextBubble = new Bubble({
	      x: nextBubbleX,
	      y: nextBubbleY,
	      shifted: false,
	      sheet: nextRandom.sheet,
	      color: nextRandom.color
	    });
	  }
	
	  shootBubble(){
	    if (this.shooting === false){
	      this.shooter.fireBubble(this.currentBubble);
	      this.shooting = true;
	
	    }
	  }
	
	  updateGameBubble(){
	    this.game.updateBubbles(this.currentBubble, this.nextBubble)
	  }
	
	  setCurrentBubble(){
	    this.currentBubble = this.nextBubble;
	    this.currentBubble.updateBubble(currentBubbleX, currentBubbleY);
	    this.shooter.updateCurrentBubble(this.currentBubble);
	  }
	
	  setNextBubble(){
	    const newBubble = randomColor();
	    this.nextBubble = new Bubble({
	      x: nextBubbleX,
	      y: nextBubbleY,
	      shifted: false,
	      sheet: newBubble.sheet,
	      color: newBubble.color
	    });
	    window.stage.addChild(this.nextBubble.bubble);
	  }
	}
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(3);
	const Util = __webpack_require__(5);
	
	class Shooter {
	  constructor (){
	    this.shooter = this.createShooter();
	    this.handleRotation = this.handleRotation.bind(this);
	
	    this.bindKeyHandlers();
	  }
	
	  bindKeyHandlers(){
	    document.addEventListener("keydown", this.handleRotation);
	  }
	
	  handleRotation(event) {
	    const code = event.keyCode;
	    if (code === 37){
	      event.preventDefault();
	      if (this.shooter.rotation > -85) this.shooter.rotation -= 2.5;
	    } else if (code === 39){
	      event.preventDefault();
	      if (this.shooter.rotation < 85) this.shooter.rotation += 2.5;
	    }
	  }
	
	  fireBubble(bubble){
	    const rad = Util.convertToRads(this.shooter.rotation + 90);
	    bubble.vx = Math.cos(rad)* -13;
	    bubble.vy = Math.sin(rad)* -13;
	  }
	
	  createShooter(){
	    const img = new Image();
	    img.src = "./assets/images/shooter.png";
	    const shooter = new createjs.Bitmap(img);
	
	    const shooterContainer = new createjs.Container();
	    shooterContainer.x = 150;
	    shooterContainer.y = 410;
	    shooter.regX = 11.5;
	    shooter.regY = 40.5;
	    shooter.x = 0;
	    shooter.y = 0;
	    shooterContainer.addChild(shooter);
	    return shooterContainer;
	  }
	
	  updateCurrentBubble(bubble){
	    this.currentBubble = bubble;
	  }
	
	}
	
	module.exports = Shooter;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	
	  convertToDeg (rad) {
	    return rad * 180 / Math.PI;
	  },
	
	  convertToRads (deg) {
	    return deg * Math.PI / 180;
	  },
	
	  circleIntersection(x1, y1, r1, x2, y2, r2) {
	      // Calculate the distance between the centers
	      var dx = x1 - x2;
	      var dy = y1 - y2;
	      var len = Math.sqrt(dx * dx + dy * dy);
	
	      if (len < r1 + r2) {
	          // Circles intersect
	          return true;
	      }
	
	      return false;
	  }
	
	
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
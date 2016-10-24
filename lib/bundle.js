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
	    this.currentBubble = new Bubble({
	      x: currentBubbleX,
	      y: currentBubbleY,
	      shifted: false,
	      sheet: randomSheet()
	    });
	
	    this.nextBubble = new Bubble({
	      x: nextBubbleX,
	      y: nextBubbleY,
	      shifted: false,
	      sheet: randomSheet()
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
	    this.nextBubble = new Bubble({
	      x: nextBubbleX,
	      y: nextBubbleY,
	      shifted: false,
	      sheet: randomSheet()
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
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  findDistance(coord1, coord2) {
	    let dist = Math.sqrt(
	      Math.pow(coord1[0] - coord2[0], 2) +
	      Math.pow(coord1[1] - coord2[1], 2)
	    );
	
	    return dist;
	  },
	
	  convertToRads (deg) {
	  return deg * Math.PI / 180;
	  }
	
	
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
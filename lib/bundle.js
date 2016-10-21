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
	  canvasEl.width = 305;
	  canvasEl.height = 455;
	  const ctx = canvasEl.getContext("2d");
	
	  window.stage = new createjs.Stage("canvas");
	  const game = new Game(window.stage);
	  game.fillCanvas();
	
	  createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener("tick", event => {
	    window.stage.update();
	  });
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Bubble {
	  constructor(xpos, ypos, shifted, color){
	    this.x = xpos;
	    this.y = ypos;
	    this.shifted = shifted;
	    this.color = color;
	    this.bubble = new createjs.Sprite(window.blueSheet, "animate");
	    this.createBubble(this.color);
	  }
	
	  // window.blueBubble = new createjs.Sprite(blueBubble, "animate");
	
	  createBubble(color){
	    // this.bubble.graphics.beginFill("red").drawCircle(0, 0, 15);
	    this.bubble.x = this.x;
	    if (this.shifted) this.bubble.x += 16;
	    this.bubble.y = this.y;
	  }
	
	  updateBubble(xpos, ypos){
	    this.x = xpos;
	    this.y = ypos;
	    this.bubble.x = this.x + 15;
	    if (this.shifted) this.bubble.x += 15;
	    this.bubble.y = this.y + 15;
	  }
	}
	
	module.exports = Bubble;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Bubble = __webpack_require__(2);
	
	class Player {
	  constructor(){
	    this.currentBubble;
	    this.nextBubble;
	    this.shooter = this.createShooter();
	    this.initStage();
	    this.bindKeyHandlers();
	  }
	
	  createShooter(){
	    const img = new Image();
	    img.src = "./assets/images/shooter.png";
	    const shooter = new createjs.Bitmap(img);
	
	    const shooterContainer = new createjs.Container();
	    shooterContainer.x = 195;
	    shooterContainer.y = 510;
	    shooter.regX = 13;
	    shooter.regY = 30.5;
	    shooter.x = 0;
	    shooter.y = 0;
	    shooterContainer.addChild(shooter);
	    return shooterContainer;
	  }
	
	  bindKeyHandlers(){
	    document.addEventListener("keydown", (event) => {
	      switch(event.keyCode){
	
	        case 32:
	          this.shootBubble();
	          break;
	
	        case 37:
	          this.shooter.rotation -= 5;
	          break;
	
	        case 39:
	          this.shooter.rotation += 5;
	          break;
	
	        default:
	          return;
	      }
	    });
	  }
	
	  initStage() {
	    const currentBubbleX = 180;
	    const currentBubbleY = 500;
	    const nextBubbleX = 130;
	    const nextBubbleY = 540;
	
	    this.currentBubble = new Bubble(currentBubbleX, currentBubbleY, false);
	    this.nextBubble = new Bubble(nextBubbleX, nextBubbleY, false);
	  }
	
	  shootBubble(){
	    setInterval(() => { this.currentBubble.bubble.y -= 5 }, 10);
	    this.currentBubble = this.nextBubble;
	    this.currentBubble.updateBubble(180, 500);
	    this.setNextBubble();
	  }
	
	  setNextBubble(){
	    this.nextBubble = new Bubble(130, 540, false);
	    window.stage.addChild(this.nextBubble.bubble);
	  }
	
	
	}
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
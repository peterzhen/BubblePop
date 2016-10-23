const Bubble = require("./bubble");
const Shooter = require("./shooter");

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
    this.shooting = true;
    this.shooter.fireBubble(this.currentBubble);
    this.setCurrentBubble();
    this.setNextBubble();
    window.setTimeout(this.updateGameBubble, 2000);
  }

  updateGameBubble(){
    this.shooting = false;
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

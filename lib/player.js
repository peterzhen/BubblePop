const Bubble = require("./bubble");
const Shooter = require("./shooter");

const currentBubbleX = 135;
const currentBubbleY = 390;
const nextBubbleX = 90;
const nextBubbleY = 410;

class Player {
  constructor(){
    this.currentBubble;
    this.nextBubble;
    this.initStage();
    this.shooter = new Shooter({
      currentBubble: this.currentBubble
    });
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", (event) => {
      switch(event.keyCode){

        case 32:
        event.preventDefault();
        this.shootBubble();
        break;

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
    this.shooter.fireBubble();
    this.currentBubble = this.nextBubble;
    this.currentBubble.updateBubble(currentBubbleX, currentBubbleY);
    this.shooter.updateCurrentBubble(this.currentBubble);
    this.setNextBubble();
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

const Bubble = require("./bubble");
const Shooter = require("./shooter");

const currentBubbleX = 115;
const currentBubbleY = 390;
const nextBubbleX = 60;
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
    const shoot = document.getElementById("shoot");
    shoot.onclick = event => this.moveLeft();

    document.addEventListener("keydown", (event) => {
      const code = event.keyCode;

      if (code === 32 ||
          code === 87 ||
          code === 38){
        event.preventDefault();
        this.shootBubble();
      }
    });
  }

  initStage() {
    let currentRandom = randomColor(this.game.currentLevel);
    if (this.game.currentLevel === 1){
      currentRandom = allSprites[0];
    }
    this.currentBubble = new Bubble({
      x: currentBubbleX,
      y: currentBubbleY,
      shifted: false,
      sheet: currentRandom.sheet,
      color: currentRandom.color
    });

    const nextRandom = randomColor(this.game.currentLevel);
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
    const newBubble = randomColor(this.game.currentLevel);
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

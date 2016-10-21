const Bubble = require("./bubble");

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

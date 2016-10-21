const Util = require('./util');

class Shooter {
  constructor (options){
    this.currentBubble = options.currentBubble;
    this.shooter = this.createShooter();
    this.bindKeyHandlers();
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", (event) => {
      switch(event.keyCode){

        case 37:
          event.preventDefault();
          this.shooter.rotation -= 5;
          break;

        case 39:
          event.preventDefault();
          this.shooter.rotation += 5;
          break;

        default:
          return;
      }
    });
  }

  fireBubble(){
    const rad = Util.convertToRads(this.shooter.rotation + 90);
    this.currentBubble.vx = Math.cos(rad)*-800/60;
    this.currentBubble.vy = Math.sin(rad)*-800/60;
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

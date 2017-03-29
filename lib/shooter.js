const Player = require('./player');
const Util = require('./util');

class Shooter {
  constructor (){
    this.shooter = this.createShooter();
    this.handleRotation = this.handleRotation.bind(this);

    this.bindKeyHandlers();
    this.bindOnScreenButtons();
  }

  bindOnScreenButtons(){
    let rotationInterval;
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.onmousedown =  (event) => {
      rotationInterval = setInterval( () => this.moveLeft(), 50);
    };

    right.onmousedown =  (event) => {
      rotationInterval = setInterval( () => this.moveRight(), 50);
    };

    left.onmouseup =  event => clearInterval(rotationInterval);
    right.onmouseup = event => clearInterval(rotationInterval);
  }

  bindKeyHandlers(){
    document.addEventListener("keydown", this.handleRotation);
  }

  removeKeyHandlers(){
    document.removeEventListener("keydown", this.handleRotation);
  }

  handleRotation(event) {
    const code = event.keyCode;

    if (code === 37 || code === 65){
      event.preventDefault();
      this.moveLeft();
    } else if (code === 39 || code === 68){
      event.preventDefault();
      this.moveRight();
    }
  }

  fireBubble(bubble){
    const rad = Util.convertToRads(this.shooter.rotation + 90);
    bubble.vx = Math.cos(rad)* -13;
    bubble.vy = Math.sin(rad)* -13;
  }

  moveLeft(){
    if (this.shooter.rotation > -85) this.shooter.rotation -= 2.5;
  }

  moveRight(){
    if (this.shooter.rotation < 85) this.shooter.rotation += 2.5;
  }

  createShooter(){
    const img = new Image();
    img.src = "./assets/images/shooter.png";
    const shooter = new createjs.Bitmap(img);

    const shooterContainer = new createjs.Container();
    shooterContainer.x = 130;
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

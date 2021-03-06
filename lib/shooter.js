const Player = require('./player');
const Util = require('./util');

class Shooter {
  constructor (){
    this.shooter = this.createShooter();
    this.rotationInterval = null;
    this.handleRotation = this.handleRotation.bind(this);
    this.removeRotation = this.removeRotation.bind(this);

    this.bindKeydownHandlers();
    this.bindOnScreenClickButtons();
  }

  bindOnScreenButtons(){
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.onclick = event => this.moveLeft();
    right.onclick = event => this.moveRight();
  }

  bindOnScreenClickButtons(){
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.onmousedown = event => {
      this.moveLeft();
      this.rotationInterval = setInterval( () => this.moveLeft() , 50);
    };
    right.onmousedown = event => {
      this.moveRight();
      this.rotationInterval = setInterval( () => this.moveRight(), 50);
    };

    document.onmouseup = () => clearInterval(this.rotationInterval);
  }

  bindOnScreenTouchButtons(){
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    left.addEventListener("touchstart", event => {
      this.rotationInterval = setInterval( () => this.moveLeft() , 50);
    });

    right.addEventListener("touchstart", event => {
      this.rotationInterval = setInterval( () => this.moveRight() , 50);
    });

    left.addEventListener("touchleave", event => {
      clearInterval(this.rotationInterval);
    });

    right.addEventListener("touchleave", event => {
      clearInterval(this.rotationInterval);
    });
  }

  bindKeydownHandlers(){
    document.addEventListener("keydown", this.handleRotation);
  }

  bindKeyupHandlers(){
    document.addEventListener("keyup", this.removeRotation);
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

  removeRotation(event) {
    const keyCodes = [37, 39, 65, 68];
    const code = event.keyCode;

    if (keyCodes.indexOf(code) >= 0) {
      event.preventDefault();
      clearInterval(this.rotationInterval);
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

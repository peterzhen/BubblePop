const Game = require("./game");

const init =  () => {
  const gameContainer = document.getElementById("game");
  const canvasEl = document.getElementById("canvas");
  gameContainer.style.display = "inline";
  canvasEl.width = 275;
  canvasEl.height = 455;
  const ctx = canvasEl.getContext("2d");

  window.stage = new createjs.Stage("canvas");
  const game = new Game(window.stage);
  game.fillCanvas();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", game.tick);
}

const startModal = () => {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.style.height = "300px";
  modalContent.style.width = "400px";
  modalContent.style.opacity = "1.0";
  modal.style.display = "block";

  // window.onclick = event => {
  //   if (event.target == modal) {
  //       modal.style.display = "none";
  //       this.generateBubbles(rows, cols);
  //   }
  // }
}

const displayLogo = () => {
  const logo = document.getElementById('logo');
  const logoImage = document.getElementById('logo-image');

  logoImage.style.opacity = "1.0";

  window.setTimeout( () => {
    logoImage.style.opacity = "0";
    logo.style.backgroundColor = "rgba(0,0,0,0.1)";
    window.setTimeout( () => {
      startModal();
    }, 2000);
  },2000);
}

$(document).ready(displayLogo);

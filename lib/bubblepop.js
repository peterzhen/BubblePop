const Game = require("./game");

const init =  () => {
  const gameContainer = document.getElementById("game");
  const canvasEl = document.getElementById("canvas");
  gameContainer.style.display = "inline";
  canvasEl.width = 275;
  canvasEl.height = 455;
  const ctx = canvasEl.getContext("2d");

  window.stage = new createjs.Stage("canvas");
  window.game = new Game(window.stage);
  game.fillCanvas();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", game.tick);
};

const startModal = () => {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.style.height = "550px";
  modalContent.style.width = "400px";
  modalContent.style.opacity = "1.0";
  modalContent.style.margin = "3% auto";
  modal.style.display = "block";

  const welcomeText = document.createElement("div");
  welcomeText.innerHTML = "WELCOME TO BUBBLEPOP!";
  welcomeText.className = "modal-header";

  const instructions = document.createElement("div");
  instructions.className = "modal-text";
  instructions.innerHTML = "THE GOAL OF THE GAME IS TO BREAK BUBBLES!  TO BREAK BUBBLES, SIMPLY MATCH THREE OR MORE BUBBLES OF THE SAME COLOR TOGETHER.  ALL BUBBLES ATTACHED BELOW IT WILL FALL WITH IT.  TO FINISH THE LEVEL, CLEAR THE SCREEN OF BUBBLES.";

  const controls = document.createElement("div");
  controls.className = "modal-img";

  const playButton = document.createElement("div");
  playButton.className = "modal-button";
  playButton.innerHTML = "LET'S PLAY!";

  modalContent.appendChild(welcomeText);
  modalContent.appendChild(instructions);
  modalContent.appendChild(controls);
  modalContent.appendChild(playButton);

  playButton.onclick = event => {
    modalContent.innerHTML = "";
    modal.style.display = "none";
    init();
  };
};

const displayLogo = () => {
  const logo = document.getElementById('logo');
  const logoImage = document.getElementById('logo-image');

  logoImage.style.opacity = "1.0";
  logoImage.style.transform = "scale(1.1)";

  window.setTimeout( () => {
    logoImage.style.opacity = "0";
    window.setTimeout( () => {
      logo.style.display = "none";
      startModal();
    }, 2000);
  },2000);
};

// $(document).ready(displayLogo);

document.addEventListener('DOMContentLoaded', () => displayLogo());

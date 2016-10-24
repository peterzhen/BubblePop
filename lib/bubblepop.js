const Game = require("./game");

const init =  () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 275;
  canvasEl.height = 455;
  const ctx = canvasEl.getContext("2d");

  window.stage = new createjs.Stage("canvas");
  const game = new Game(window.stage);
  game.fillCanvas();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", game.tick);
}

$(document).ready(init);

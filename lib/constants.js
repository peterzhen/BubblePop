const rows = 13;
const cols = 8;
const rowHeight = 30;
const rowWidth = 34;
const radius = 16;
const bubbleHeight = 32;
const bubbleWidth = 32;
const maxLevel = 2;

window.blue = {
  color: "blue",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/blue-bubble.png"],
    "frames": {
      "regX": 0,
      "regY": 0,
      "width": 32,
      "height": 32,
      "count": 6
    },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.black = {
  color: "black",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/black-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.green = {
  color: "green",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/green-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.orange = {
  color: "orange",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/orange-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.purple = {
  color: "purple",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/purple-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.red = {
  color: "red",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/red-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.white = {
  color: "white",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/white-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

window.yellow = {
  color: "yellow",
  sheet: new createjs.SpriteSheet({
    framerate: 30,
    "images": ["./assets/images/yellow-bubble.png"],
    "frames": {
              "regX": 0,
              "regY": 0,
              "width": 32,
              "height": 32,
              "count": 6
              },
    "animations": {
      "animate": [0, 5, "animate", .15],
    }
  })
};

const allSprites = [
                  window.black,
                  window.blue,
                  window.green,
                  window.orange,
                  window.purple,
                  window.red,
                  window.white,
                  window.yellow
                  ];

const evenDeltas = [[-1,-1], [-1,0], [0,-1], [0, 1], [1,-1], [1,0]];

const oddDeltas = [[-1,0], [-1,1], [0,-1], [0, 1], [1,0], [1,1]];

const level1 = [
  { i: 0, j: 0, sheet: window.red.sheet, color: window.red.color },
  { i: 0, j: 1, sheet: window.red.sheet, color: window.red.color },
  { i: 0, j: 2, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 0, j: 3, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 0, j: 4, sheet: window.blue.sheet, color: window.blue.color },
  { i: 0, j: 5, sheet: window.blue.sheet, color: window.blue.color },
  { i: 0, j: 6, sheet: window.green.sheet, color: window.green.color },
  { i: 0, j: 7, sheet: window.green.sheet, color: window.green.color },

  { i: 1, j: 0, sheet: window.red.sheet, color: window.red.color },
  { i: 1, j: 1, sheet: window.red.sheet, color: window.red.color },
  { i: 1, j: 2, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 1, j: 3, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 1, j: 4, sheet: window.blue.sheet, color: window.blue.color },
  { i: 1, j: 5, sheet: window.blue.sheet, color: window.blue.color },
  { i: 1, j: 6, sheet: window.green.sheet, color: window.green.color },

  { i: 2, j: 0, sheet: window.blue.sheet, color: window.blue.color },
  { i: 2, j: 1, sheet: window.blue.sheet, color: window.blue.color },
  { i: 2, j: 2, sheet: window.green.sheet, color: window.green.color },
  { i: 2, j: 3, sheet: window.green.sheet, color: window.green.color },
  { i: 2, j: 4, sheet: window.red.sheet, color: window.red.color },
  { i: 2, j: 5, sheet: window.red.sheet, color: window.red.color },
  { i: 2, j: 6, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 2, j: 7, sheet: window.yellow.sheet, color: window.yellow.color },

  { i: 3, j: 0, sheet: window.blue.sheet, color: window.blue.color },
  { i: 3, j: 1, sheet: window.green.sheet, color: window.green.color },
  { i: 3, j: 2, sheet: window.green.sheet, color: window.green.color },
  { i: 3, j: 3, sheet: window.red.sheet, color: window.red.color },
  { i: 3, j: 4, sheet: window.red.sheet, color: window.red.color },
  { i: 3, j: 5, sheet: window.yellow.sheet, color: window.yellow.color },
  { i: 3, j: 6, sheet: window.yellow.sheet, color: window.yellow.color }
];

const sprites1 = [
                  window.blue,
                  window.green,
                  window.red,
                  window.yellow
                  ];


const level2 = [
  { i: 0, j: 3, sheet: window.black.sheet, color: window.black.color },
  { i: 0, j: 4, sheet: window.black.sheet, color: window.black.color },

  { i: 1, j: 3, sheet: window.blue.sheet, color: window.blue.color },

  { i: 2, j: 3, sheet: window.red.sheet, color: window.red.color },

  { i: 3, j: 3, sheet: window.purple.sheet, color: window.purple.color },

  { i: 4, j: 3, sheet: window.white.sheet, color: window.white.color },

  { i: 5, j: 3, sheet: window.white.sheet, color: window.white.color },

  { i: 6, j: 3, sheet: window.purple.sheet, color: window.purple.color },

  { i: 7, j: 3, sheet: window.purple.sheet, color: window.purple.color }
];

const sprites2 = [
                  window.black,
                  window.blue,
                  window.purple,
                  window.red,
                  window.white,
                  ];

const levels = [level1, level2];
const sprites = [sprites1, sprites2];

const randomColor = (level) => {
  return sprites[level][Math.floor(Math.random() * sprites[level].length)];
};

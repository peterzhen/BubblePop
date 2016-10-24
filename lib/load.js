window.blueSheet = new createjs.SpriteSheet({
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
});

window.blackSheet = new createjs.SpriteSheet({
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
});

window.greenSheet = new createjs.SpriteSheet({
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
});

window.orangeSheet = new createjs.SpriteSheet({
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
});

window.purpleSheet = new createjs.SpriteSheet({
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
});

window.redSheet = new createjs.SpriteSheet({
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
});

window.whiteSheet = new createjs.SpriteSheet({
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
});

window.yellowSheet = new createjs.SpriteSheet({
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
});

const spriteSheets = [
                      window.blackSheet,
                      window.blueSheet,
                      window.greenSheet,
                      window.orangeSheet,
                      window.purpleSheet,
                      window.redSheet,
                      window.whiteSheet,
                      window.yellowSheet
                      ];

const randomSheet = () => {
  return spriteSheets[Math.floor(Math.random() * spriteSheets.length)];
};

const level1 = [
  { i: 0, j: 0, sheet: window.redSheet },
  { i: 0, j: 1, sheet: window.redSheet },
  { i: 0, j: 2, sheet: window.yellowSheet },
  { i: 0, j: 3, sheet: window.yellowSheet },
  { i: 0, j: 4, sheet: window.blueSheet },
  { i: 0, j: 5, sheet: window.blueSheet },
  { i: 0, j: 6, sheet: window.greenSheet },
  { i: 0, j: 7, sheet: window.greenSheet },

  { i: 1, j: 0, sheet: window.redSheet },
  { i: 1, j: 1, sheet: window.redSheet },
  { i: 1, j: 2, sheet: window.yellowSheet },
  { i: 1, j: 3, sheet: window.yellowSheet },
  { i: 1, j: 4, sheet: window.blueSheet },
  { i: 1, j: 5, sheet: window.blueSheet },
  { i: 1, j: 6, sheet: window.greenSheet },

  { i: 2, j: 0, sheet: window.blueSheet },
  { i: 2, j: 1, sheet: window.blueSheet },
  { i: 2, j: 2, sheet: window.greenSheet },
  { i: 2, j: 3, sheet: window.greenSheet },
  { i: 2, j: 4, sheet: window.redSheet },
  { i: 2, j: 5, sheet: window.redSheet },
  { i: 2, j: 6, sheet: window.yellowSheet },
  { i: 2, j: 7, sheet: window.yellowSheet },

  { i: 3, j: 0, sheet: window.blueSheet },
  { i: 3, j: 1, sheet: window.greenSheet },
  { i: 3, j: 2, sheet: window.greenSheet },
  { i: 3, j: 3, sheet: window.redSheet },
  { i: 3, j: 4, sheet: window.redSheet },
  { i: 3, j: 5, sheet: window.yellowSheet },
  { i: 3, j: 6, sheet: window.yellowSheet }
];

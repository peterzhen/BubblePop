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

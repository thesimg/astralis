var camX = 0;
var camY = 0;
var blocks = [];
var scene = "ascent";
var deathY = 4500;

function setup() {
  createCanvas(400, 400);
  generateBlocks(scene);
}


function draw() {
  switch (scene) {
    case "home":
      background(125, 225, 150);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);
      //{
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].pack();
      }
      //}

      p.draw();
      pop();
      break;
    case "ascent":
      background(150 + p.y / 60, 200 + p.y / 50, 250 + p.y / 40);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);
      //{
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].pack();
      }
      //}

      p.draw();
      pop();
      fill(0, -p.y / 100);
      rect(0, 0, 400, 400);
      break;
    case "ascentxl":
      background(150 + p.y / 600, 200 + p.y / 500, 250 + p.y / 400);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);
      //{
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].pack();
      }
      //}

      p.draw();
      pop();
      fill(0, -p.y / 500);
      rect(0, 0, 400, 400);
      break;
  }
  fill(0, 0, 0);
  text(Math.round(p.x), 10, 10);
  text(Math.round(p.y), 10, 30);
  text(p.y / 600, 10, 60);
  if (p.y > deathY) {
    p.y = -50;
    p.x = -10;
  }
}

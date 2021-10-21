var camX = 0;
var camY = 0;
var blocks = [];
var scene = "home";
var deathY = 4500;

var blockSize = 20;

var canvasWidth = 1440;
var canvasHeight = 720;

var godmode = false;

var fullscreen = false;
var fullscreenToggle = false;

var worldSeed = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  generateBlocks(scene);
}

function draw() {
  if (godmode) {
    scale(0.5);
    translate(650, 400);
  }
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
        if(blocks[i].toDestroy){
          if(blocks[i].type === "cursed"){
            blocks.splice(i, 2);
          } else {
            blocks.splice(i, 1);
          }
          
        }
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
      rect(0, 0, width, height);
      break;
    case "lose":
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
      rect(0, 0, width, height);
      break;
  }

  if (keys[70] && fullscreenToggle) {
    fullscreen = !fullscreen;
    fullscreenToggle = false;
    print("fullscreen " + fullscreen);
    if(fullscreen){
      resizeCanvas(windowWidth, windowHeight);
    } else if(!fullscreen) {
      resizeCanvas(canvasWidth, canvasHeight);
    }
  }
  if (!keys[70]) {
    fullscreenToggle = true;
  }

  if (!fullscreen) {
    if (canvasHeight === windowHeight || canvasWidth === windowWidth) {
      resizeCanvas(canvasWidth, canvasHeight);
    }
  }

  fill(0, 0, 0);
  text(Math.round(p.x), 10, 10);
  text(Math.round(p.y), 10, 30);
  text(p.y / 600, 10, 60);
  text(scene, 10, 80);
  if (p.y > deathY) {
    p.y = -1000;
    p.x = -10;
  }
}

function windowResized() {
  if (fullscreen) {
    resizeCanvas(windowWidth, windowHeight);
    print("windowResized in fullscreen");
  }
  print("windowResized outside fullscreen");
}

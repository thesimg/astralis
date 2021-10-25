var camX = 0;
var camY = 0;

var blockData = [];
var chunkData = [];
var blocks = [];
var chunks = [];

var scene = "loading";
var deathY = 4500;

const blockSize = 20;
const chunkSize = blockSize * 15;

const canvasWidth = 1440; //1440
const canvasHeight = 720;

var godmode = false;

var fullscreen = true;
var fullscreenToggle = true;

var seed;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  seed = getUrlParameter("seed") || round(random(999999));
  randomSeed(seed);
  noiseSeed(seed);
  print("seed: " + seed);
  print("url: " + getUrlParameter("seed"));
  print(seed);

  fullscreenToggle = false;
  //print("fullscreen " + fullscreen);
  if (fullscreen) {
    resizeCanvas(windowWidth, windowHeight);
  } else if (!fullscreen) {
    resizeCanvas(canvasWidth, canvasHeight);
  }
  fullscreen = !fullscreen;
}

function draw() {
  if (godmode) {
    scale(0.5);
    translate(650, 400);
  }
  switch (scene) {
    case "loading":
      for (var i = 0; i < 150; i++) {
        blockData.push({
          x: round(random(-200, 200)) * blockSize,
          y: round(random(0, 400)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "normal",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
      }
      for (var i = 0; i < 100; i++) {
        blockData.push({
          x: round(random(-200, 200)) * blockSize,
          y: round(random(0, 400)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
        blockData.push({
          x: round(random(-200, 200)) * blockSize,
          y: round(random(0, 400)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
      } //home

      for (var i = 0; i < 1300; i++) {
        blockData.push({
          x: round(random(-5, 100)) * blockSize,
          y: round(random(0, -1000)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "onetouch"
        });
      }
      for (var i = 0; i < 200; i++) {
        blockData.push({
          x: round(random(-5, 100)) * blockSize,
          y: round(random(0, -1000)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "onetouch"
        });
      }

      scene = "home";
      print(chunks);
      generateBlocks("home");
      break;
    case "home":
      background(0);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);
      //{
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].toDestroy) {
          blocks.splice(i, 1);
        }
        blocks[i].pack();
      }

      //}

      p.draw();
      pop();
      break;
    case "onetouch":
      p.dashCooldownMax = 50;
      background(0);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].toDestroy) {
          blocks.splice(i, 1);
        }
        blocks[i].pack();
      }

      p.draw();
      pop();
      fill(0, -p.y / 100);
      rect(0, 0, width, height);
      break;
    case "traversal":
      background(0);
      rectMode(CORNER);
      p.move();

      camX = round(lerp(camX, width / 2 - p.x, 0.05));
      camY = round(lerp(camY, height / 2 - p.y, 0.05));
      push();
      translate(camX, camY);

      for (var i = 0; i < chunks.length; i++) {
        if (chunks[i].generated) {
          chunks.splice(i, 1);
          print(chunks.length);
        }
        chunks[i].pack();
      }
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].toDestroy) {
          blocks.splice(i, 1);
        }
        blocks[i].pack();
      }

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
  /*if (keys[70] && fullscreenToggle) {
    fullscreenToggle = false;
    //print("fullscreen " + fullscreen);
    if (fullscreen) {
      resizeCanvas(windowWidth, windowHeight);
    } else if (!fullscreen) {
      resizeCanvas(canvasWidth, canvasHeight);
    }
    fullscreen = !fullscreen;
  }
  if (!keys[70]) {
    fullscreenToggle = true;
  }

  if (!fullscreen) {
    if (canvasHeight === windowHeight || canvasWidth === windowWidth) {
      resizeCanvas(canvasWidth, canvasHeight);
    }
  }*/

  fill(0, 0, 0);
  text(Math.round(p.x), 10, 10);
  text(Math.round(p.y), 10, 30);
  text(p.y / 600, 10, 60);
  text(scene, 10, 80);
  if (p.y > deathY) {
    blocks = [];
    generateBlocks(scene);
    p.y = -50;
    p.x = -10;
  }
}

function windowResized() {
  if (fullscreen) {
    resizeCanvas(windowWidth, windowHeight);
  }
}

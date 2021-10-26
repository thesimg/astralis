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

var timerInterval;
var runTimer = 0;
var running = false;
var win = false;

let cleanTimer;
let minutes;
let seconds;
let milliseconds;
let cleanRunTime;

let WayfarersToyBox;
function preload() {
  WayfarersToyBox = loadFont(
    "/WayfarersToyBoxRegular.ttf" // https://cdn.glitch.me/d29dff3c-e5f7-4437-a9ed-0c8eda33a8ed%2FWayfarersToyBoxRegular.ttf?v=1635217553502 https://github.com/thesimg/astralis/blob/47b4fb336e3c720358dc06cabb2244aaf84884e1/WayfarersToyBoxRegular.ttf
  );
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  textFont(WayfarersToyBox);

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
  }
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
          x: round(random(-100, 100)) * blockSize,
          y: round(random(15, 200)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "normal",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
      }
      for (var i = 0; i < 100; i++) {
        blockData.push({
          x: round(random(-100, 100)) * blockSize,
          y: round(random(15, 200)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
        blockData.push({
          x: round(random(-100, 100)) * blockSize,
          y: round(random(15, 200)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "home"
        });
      } //home

      for (var i = 0; i < 600; i++) {
        blockData.push({
          x: round(random(2, 100)) * blockSize,
          y: round(random(0, -500)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "foddianLite"
        });
      }
      for (var i = 0; i < 100; i++) {
        //top -10000
        blockData.push({
          x: round(random(2, 100)) * blockSize,
          y: round(random(0, -500)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "foddianLite"
        });
      }

      for (var i = 0; i < 1600; i++) {
        blockData.push({
          x: round(random(2, 100)) * blockSize,
          y: round(random(0, -1250)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "foddian"
        });
      }
      for (var i = 0; i < 400; i++) {
        //top -20000
        blockData.push({
          x: round(random(2, 100)) * blockSize,
          y: round(random(0, -1250)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "foddian"
        });
      }

      for (var i = 0; i < 800; i++) {
        blockData.push({
          x: round(random(2, 50)) * blockSize,
          y: round(random(0, -1250)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "foddianExtreme"
        });
      }
      for (var i = 0; i < 100; i++) {
        //top -10000
        blockData.push({
          x: round(random(2, 50)) * blockSize,
          y: round(random(0, -1250)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "foddianExtreme"
        });
      }

      /*for (var i = 0; i < 500; i++) {
        blockData.push({
          x: round(random(2, 500)) * blockSize,
          y: round(random(0, -100)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "normal",
          destroyCounter: round(2 + random(3)),
          mode: "traversalLite"
        });
      }
      for (var i = 0; i < 200; i++) {
        blockData.push({
          x: round(random(2, 500)) * blockSize,
          y: round(random(0, -100)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "traversalLite"
        });
      }
      for (var i = 0; i < 100; i++) {
        blockData.push({
          x: round(random(2, 500)) * blockSize,
          y: round(random(0, -100)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "traversalLite"
        });
      }
      
      
      for (var i = 0; i < 50; i++) {
        blockData.push({
          x: round(random(2, 1000)) * blockSize,
          y: round(random(0, -25)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "normal",
          destroyCounter: round(2 + random(3)),
          mode: "traversal"
        });
      }
      for (var i = 0; i < 200; i++) {
        blockData.push({
          x: round(random(2, 1000)) * blockSize,
          y: round(random(0, -25)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "broken",
          destroyCounter: round(2 + random(3)),
          mode: "traversal"
        });
      }
      for (var i = 0; i < 150; i++) {
        blockData.push({
          x: round(random(2, 1000)) * blockSize,
          y: round(random(0, -25)) * blockSize,
          w: (1 + round(random(7))) * blockSize,
          h: (1 + round(random(7))) * blockSize,
          type: "vanishing",
          destroyCounter: round(2 + random(3)),
          mode: "traversal"
        });
      }*/

      switchScene("home");
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
    case "foddian":
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

      var playerProgress = (abs(p.y) / 3200) * 100;
      rectMode(CORNER);
      fill(255);
      rect(0, windowHeight - 5, 5, -playerProgress);

      //print(playerProgress);
      if (p.x > 30 && !running) {
        if (runTimer <= 0) {
          print("timer started");
          running = true;
          timerInterval = setInterval(function() {
            runTimer += 0.01;
          }, 10);
        }
      }

      if (p.y < -25000 && running) {
        win = true;
        running = false;
        print("win");
        clearInterval(timerInterval);
        print("timer stopped");
      }
      break;

    case "foddianLite":
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

      var playerProgress = (abs(p.y) / 1250) * 100;
      rectMode(CORNER);
      fill(255);
      rect(0, windowHeight - 5, 5, -playerProgress);

      //print(playerProgress);
      if (p.x > 30 && !running) {
        if (runTimer <= 0) {
          print("timer started");
          running = true;
          timerInterval = setInterval(function() {
            runTimer += 0.01;
          }, 10);
        }
      }

      if (p.y < -10000 && running) {
        win = true;
        running = false;
        print("win");
        clearInterval(timerInterval);
        print("timer stopped");
      }
      break;

    case "foddianExtreme":
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

      var playerProgress = (abs(p.y) / 3200) * 100;
      rectMode(CORNER);
      fill(255);
      rect(0, windowHeight - 5, 5, -playerProgress);

      //print(playerProgress);
      if (p.x > 30 && !running) {
        if (runTimer <= 0) {
          print("timer started");
          running = true;
          timerInterval = setInterval(function() {
            runTimer += 0.01;
          }, 10);
        }
      }

      if (p.y < -25000 && running) {
        win = true;
        running = false;
        print("win");
        clearInterval(timerInterval);
        print("timer stopped");
      }
      break;
    /*case "traversal":
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
      
      var playerProgress = (abs(p.x)/7500)*100;
      rectMode(CORNER);
      fill(255);
      rect(0, windowHeight-5, 5, playerProgress);

      //print(playerProgress);
      if (p.x > 30 && !running) {
        if (runTimer <= 0) {
          print("timer started");
          running = true;
          timerInterval = setInterval(function() {
            runTimer += 0.01;
          }, 10);
        }
      }

      if (p.y < -20000 && running) {
        win = true;
        running = false;
        print("win");
        clearInterval(timerInterval);
        print("timer stopped");
      }
      break;*/
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

  /*
  textSize(20);
  text(Math.round(p.x), 10, 100);
  text(Math.round(p.y), 10, 130);
  text(p.y / 600, 10, 160);
  text(scene, 10, 180);*/
  fill(255);
  textSize(35);
  text(cleanRunTime, 30, 60);

  cleanTimer = new Date(runTimer * 1000);
  minutes = cleanTimer.getUTCMinutes();
  seconds = cleanTimer.getSeconds();
  milliseconds = cleanTimer.getUTCMilliseconds();

  cleanRunTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    ":" +
    milliseconds.toString().padStart(2, "0");

  if (p.y > deathY) {
    regenWorld();
  }
  if (keys[82]) {
    regenWorld();
  }
  if (keys[67]) {
    print(window.location.href.split("?")[0] + "?seed=" + seed);
    copyToClipboard(window.location.href.split("?")[0] + "?seed=" + seed);
  }
}

function windowResized() {
  if (fullscreen) {
    resizeCanvas(windowWidth, windowHeight);
  }
}

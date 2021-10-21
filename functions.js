function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

var keys = [];
keyPressed = function() {
  keys[keyCode] = true;
};
keyReleased = function() {
  keys[keyCode] = false;
};

var platform = function(x, y, w, h, type) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.type = type || "normal";
  this.touchCounter = 0;
  this.hasTouched = false;
  this.destroyCounter = round(2+random(3));
  this.toDestroy = false;
};
platform.prototype.draw = function() {
  noStroke();
  switch(this.type){
    case "normal":
      fill(180, 255, 180);
      break;
    case "vanishing":
      fill(255, 180, 180);
      break;
    case "broken":
      fill(255, 255, 180);
      break;
    case "fake":
      fill(180, 255, 255);
      break;
    case "cursed":
      fill(255, 80, 255);
      break;
  }
  rect(this.x, this.y, this.w, this.h, 3);
  fill(0);
  text(this.touchCounter, this.x+10, this.y+10);
};
platform.prototype.collide = function() {
  if (
    p.x + p.w > this.x &&
    p.y + p.h > this.y &&
    p.x < this.x + this.w &&
    p.y < this.y + this.h
  ) {
    p.gravity = 0;
    p.jumpable = true;
    this.hasTouched = true
    //p.dashAllowed = true;
    if (p.previous.x + p.w <= this.x) {
      p.x = this.x - p.w;
      p.sticking = "left";
    }else if (p.previous.y + p.h <= this.y) {
      p.y = this.y - p.h;
      p.sticking = "top";
    }else if (p.previous.x >= this.x + this.w) {
      p.x = this.x + this.w;
      p.sticking = "right";
    }else if (p.previous.y >= this.y + this.h) {
      p.y = this.y + this.h;
      p.sticking = "bottom";
    }
  } 
  if(this.hasTouched && p.sticking === false) {
    this.touchCounter++;
    this.hasTouched = false;
  }
};
platform.prototype.pack = function() {
  if (dist(this.x+this.w/2, this.y+this.h/2, p.x, p.y) < 500) {
    if(this.type != "fake"){
      this.collide();
    }
  }
  if (Math.abs(p.y - this.y) < 600 && Math.abs(p.x - this.x) < 1000) {
    this.draw();
  }
  switch(this.type){
    case "broken":
      if(this.touchCounter >= this.destroyCounter){
        this.toDestroy = true;
      }
      break;
    case "cursed":
      if(this.touchCounter >= this.destroyCounter){
        this.toDestroy = true;
      }
      break;
    case "vanishing":
      if(this.touchCounter > 0){
        this.toDestroy = true;
      }
      break;
  }
};

var portal = function(x, y, w, h, to) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.to = to;
};
portal.prototype.draw = function() {
  noStroke();
  fill(255, 100, 255, 150);
  rect(this.x, this.y, this.w, this.h, 3);
};
portal.prototype.collide = function() {
  if (
    p.x + p.w > this.x &&
    p.y + p.h > this.y &&
    p.x < this.x + this.w &&
    p.y < this.y + this.h
  ) {
    switchScene(this.to);
  }
};
portal.prototype.pack = function() {
  this.draw();
  this.collide();
};

var chunk = function(x, y, w, h, theta) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.theta = theta;
  this.type = round(random(4));
  this.size = round(random(4));
};
chunk.prototype.draw = function() {
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(this.w, this.h, this.x, this.y);
};
chunk.prototype.generate = function() {
  switch(this.type){
    case 0: //normal
      blocks.push()
      break;
      
  }
};
chunk.prototype.pack = function() {
  this.draw();
  if (!this.generated) {
    this.generate();
  }
};

function switchScene(sceneTo) {
  blocks = [];
  p.x = -10;
  p.y = -50;
  generateBlocks(sceneTo);
  scene = sceneTo;
}

function star(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}
star.prototype.draw = function() {
  fill(255, 255, 255);
  noStroke();
  ellipse(this.x, this.y, this.size, this.size);
};

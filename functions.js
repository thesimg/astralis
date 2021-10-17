//jshint ignore : start
var keys = [];
keyPressed = function() {
  keys[keyCode] = true;
};
keyReleased = function() {
  keys[keyCode] = false;
};

var platform = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};
platform.prototype.draw = function() {
  noStroke();
  fill(180, 255, 180);
  rect(this.x, this.y, this.w, this.h, 3);
};
platform.prototype.collide = function() {
  if (
    p.x + p.w > this.x &&
    p.y + p.h > this.y &&
    p.x < this.x + this.w &&
    p.y < this.y + this.h
  ) {
    if (p.previous.x + p.w <= this.x) {
      p.x = this.x - p.w;
    }
    p.gravity = 0;
    p.jumpable = true;
    if (p.previous.y + p.h <= this.y) {
      p.y = this.y - p.h;
    }
    if (p.previous.x >= this.x + this.w) {
      p.x = this.x + this.w;
    }
    if (p.previous.y >= this.y + this.h) {
      p.y = this.y + this.h;
    }
  }
};
platform.prototype.pack = function() {
  if(dist(this.x, this.y, p.x, p.y) < 500){
    this.collide();
  }
  if (Math.abs(p.y - this.y) < 600 && Math.abs(p.x - this.x) < 1000) {
    this.draw();
    this.collide();
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



function switchScene(sceneTo) {
  blocks = [];
  p.x = -10;
  p.y = -50;
  generateBlocks(sceneTo);
  scene = sceneTo;
}

function star(x, y, size){
  this.x = x;
  this.y = y;
  this.size = size;
}
star.prototype.draw = function(){
  fill(255, 255, 255);
  noStroke();
  ellipse(this.x, this.y, this.size, this.size);  
}

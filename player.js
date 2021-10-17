var p = {
  speed: 4,
  gravity: 6,
  jumpable: false,
  x: -10,
  y: -50,
  w: 20,
  h: 20,
  previous: {
    x: 0,
    y: -50,
  },
  accy: 0,
  accx: 0,
  move: function () {
    p.previous.x = p.x;
    p.previous.y = p.y;

    p.y += p.gravity;

    p.gravity += 0.3;

    if(p.gravity > 20){
      p.gravity = 20;
    }
    
    if (p.accx > 2 && keyIsPressed) {
      p.accx = 2;
    }
    if (p.accx < -2 && keyIsPressed) {
      p.accx = -2;
    }

    if (!keyIsPressed && p.accx > 0) {
      p.accx -= 0.1;
    } else if (!keyIsPressed && p.accx < 0) {
      p.accx += 0.1;
    }
    if (!keys[38] && p.accy > 0 || keys[87] && p.jumpable) {
      p.accy -= 0.2;
    }
    if (keys[38] && p.jumpable || keys[87] && p.jumpable) {
      p.gravity = -8;
      p.jumpable = false;
      p.accy += 0.5;
    }
    if (keys[37] || keys[65]) {
      p.x -= p.speed;
      p.accx -= 0.2;
    }
    if (keys[39] || keys[68]) {
      p.x += p.speed;
      p.accx += 0.2;
    }
  },
  draw: function () {
    noStroke();
    fill(255, 255, 255);
    rect(p.x, p.y, p.w, p.h);
    rectMode(CENTER);
    fill(89, 89, 89);
    rect(p.x + 5 + p.accx, p.y + 10 - p.accy, 2, 10, 10);
    rect(p.x + 14 + p.accx, p.y + 10 - p.accy, 2, 10, 10);
    //ellipse(p.x+5, p.y+9, 3, 12); 
    //ellipse(p.x+14, p.y+9, 3, 12); 

  },
};
ad
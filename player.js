var p = {
  speed: 4,
  gravityAdd: 0.4,
  gravity: 0,
  friction: 1.1,
  accxCap: 3,
  accxAdd: 0.5,
  
  sticking: false,
  
  jumpable: false,
  x: 100,
  y: -50,
  w: 20,
  h: 20,
  previous: {
    x: 0,
    y: 0,
  },
  accy: 0,
  accx: 0,
  move: function () {
    p.previous.x = p.x;
    p.previous.y = p.y;

    p.y += p.gravity;

    p.gravity += p.gravityAdd;

    if(p.gravity > 20){
      p.gravity = 20;
    }

    if (keys[38] && p.jumpable || keys[87] && p.jumpable) {
      p.gravity = -8;
      p.jumpable = false;
      print("jumping" + random(1))
    }
    print("x "+p.accx);
    print("y "+p.gravity);
    print("sticking "+p.sticking);
    if (keys[37] || keys[65]) {
      p.x -= p.speed;
      p.accx -= p.accxAdd;
    }
    if (keys[39] || keys[68]) {
      p.x += p.speed;
      p.accx += p.accxAdd;
    }
    
    
    if (p.accx > p.accxCap && keyIsPressed) {
      p.accx = p.accxCap;
    }
    if (p.accx < -p.accxCap && keyIsPressed) {
      p.accx = -p.accxCap;
    }
    if (p.accx > 0.1 && !keyIsPressed) {
      p.accx -= p.accxAdd*1.1;
    }
    if (p.accx < 0.1 && !keyIsPressed) {
      p.accx += p.accxAdd*1.1;
    }
    if(p.accx <= 0.4 && p.accx >= -0.4){
      p.accx = 0;
    }

  },
  draw: function () {
    noStroke();
    fill(255, 255, 255);
    rect(p.x, p.y, p.w, p.h);
    rectMode(CENTER);
    fill(89, 89, 89);
    rect(p.x + 5 + p.accx, p.y + 10 - p.gravity*(3/4), 2, 10, 10);
    rect(p.x + 14 + p.accx, p.y + 10 - p.gravity*(3/4), 2, 10, 10);
    //ellipse(p.x+5, p.y+9, 3, 12); 
    //ellipse(p.x+14, p.y+9, 3, 12); 

  },
};
ad
var p = {
  speed: 4,
  gravityAdd: 0.4,
  gravity: 0,
  friction: 1.1,
  accxCap: 3,
  accxAdd: 0.5,

  sticking: false, //left, right, top, bottom
  dashing: false, //up, upright, right, downright, down, downleft, left, upleft
  dashTime: 0,
  dashMax: 5,
  dashAllowed: false,
  dashCooldown: 0,
  dashCooldownMax: 100,
  dashSpeedY: 8,
  dashSpeedX: 12,
  diagRatio: (3/5),

  jumpable: false,
  x: 100,
  y: -50,
  w: 20,
  h: 20,
  previous: {
    x: 0,
    y: 0
  },
  accy: 0,
  accx: 0,
  move: function() {
    p.previous.x = p.x;
    p.previous.y = p.y;

    p.y += p.gravity;

    p.gravity += p.gravityAdd;

    if (p.gravity > 20) {
      p.gravity = 20;
    }

    if (!p.dashing) {
      if ((keys[38] && p.jumpable) || (keys[87] && p.jumpable)) {
        p.gravity = -8;
        p.jumpable = false;
        print("jumping" + random(1));
      }
      if (keys[37] || keys[65]) {
        p.x -= p.speed;
        p.accx -= p.accxAdd;
      }
      if (keys[39] || keys[68]) {
        p.x += p.speed;
        p.accx += p.accxAdd;
      }
    }
    
    /*
    up: 38
    down: 40
    left: 37
    right: 39
    
    w: 87
    a: 83
    s: 65
    d: 68
    
    shift: 16
    
       w             a            s            d
    !keys[87] && !keys[83] && !keys[65] && !keys[68]
    
      up           down          left        right
    !keys[38] && !keys[40] && !keys[37] && !keys[39]
    
    !keys[87] && !keys[83] && !keys[65] && !keys[68] || !keys[38] && !keys[40] && !keys[37] && !keys[39]
    
     else if(!keys[87] && !keys[83] && !keys[65] && !keys[68] || !keys[38] && !keys[40] && !keys[37] && !keys[39]){ //
        p.gravity = -p.dashSpeedY;
        p.x += p.dashSpeedX;
        p.accx += p.accxAdd;
        p.dashing = "";
      }
    */
    
    if(keys[16] && p.dashAllowed){
      if(keys[87] && !keys[83] && !keys[65] && !keys[68] || keys[38] && !keys[40] && !keys[37] && !keys[39]){ //up
        p.gravity = -p.dashSpeedY;
        p.dashing = "up";
      } else if(keys[87] && !keys[83] && !keys[65] && keys[68] || keys[38] && !keys[40] && !keys[37] && keys[39]){ //upright
        p.gravity = -p.dashSpeedY*p.diagRatio;
        p.x += p.dashSpeedX*p.diagRatio;
        p.accx += p.accxAdd;
        p.dashing = "upright";
      } else if(!keys[87] && !keys[83] && !keys[65] && keys[68] || !keys[38] && !keys[40] && !keys[37] && keys[39]){ //right
        p.x += p.dashSpeedX;
        p.accx += p.accxAdd;
        p.gravity = 0;
        p.dashing = "right";
      }else if(!keys[87] && keys[83] && !keys[65] && keys[68] || !keys[38] && keys[40] && !keys[37] && keys[39]){ //downright
        p.gravity = p.dashSpeedY*p.diagRatio;
        p.x += p.dashSpeedX*p.diagRatio;
        p.accx += p.accxAdd;
        p.dashing = "downright";
      }else if(!keys[87] && keys[83] && !keys[65] && !keys[68] || !keys[38] && keys[40] && !keys[37] && !keys[39]){ //down
        p.gravity = p.dashSpeedY;
        p.dashing = "down";
      }else if(!keys[87] && keys[83] && keys[65] && !keys[68] || !keys[38] && keys[40] && keys[37] && !keys[39]){ //downleft
        p.gravity = p.dashSpeedY*p.diagRatio;
        p.x -= p.dashSpeedX*p.diagRatio;
        p.accx -= p.accxAdd;
        p.dashing = "downleft";
      }else if(!keys[87] && !keys[83] && keys[65] && !keys[68] || !keys[38] && !keys[40] && keys[37] && !keys[39]){ //left
        p.gravity = 0;
        p.x -= p.dashSpeedX;
        p.accx -= p.accxAdd;
        p.dashing = "left";
      }else if(keys[87] && !keys[83] && keys[65] && !keys[68] || keys[38] && !keys[40] && keys[37] && !keys[39]){ //upleft
        p.gravity = -p.dashSpeedY*p.diagRatio;
        p.x -= p.dashSpeedX*p.diagRatio;
        p.accx -= p.accxAdd;
        p.dashing = "upleft";
      }
    }
    
    if(p.dashing != false){
      p.dashTime++;
      if(p.dashTime > p.dashMax){
        p.dashAllowed = false;
        p.dashing = false;
        p.dashTime = 0;
      }
    }
    if(!p.dashAllowed){
      p.dashCooldown++;
    }
    if(p.dashCooldown > p.dashCooldownMax){
      p.dashAllowed = true;
      p.dashCooldown = 0;
    }
    
    if(p.dashAllowed && p.dashTime > 0 &&!keys[16]){
      p.dashTime = 0;
      p.dashing = false;
      p.dashAllowed = false;
    }

    if (p.accx > p.accxCap && keyIsPressed) {
      p.accx = p.accxCap;
    }
    if (p.accx < -p.accxCap && keyIsPressed) {
      p.accx = -p.accxCap;
    }
    if (p.accx > 0.1 && !keyIsPressed) {
      p.accx -= p.accxAdd * 1.1;
    }
    if (p.accx < 0.1 && !keyIsPressed) {
      p.accx += p.accxAdd * 1.1;
    }
    if (p.accx <= 0.4 && p.accx >= -0.4) {
      p.accx = 0;
    }

//     print("dashing " + p.dashing);
//     print("dashTime " + p.dashTime);
//     print("dashAllowed " + p.dashAllowed);
//     print("sticking " + p.sticking);
  },
  draw: function() {
    noStroke();
    if(p.dashAllowed){
      fill(255, 255, 255);
    }else{
      fill(200, 200, 200);
    }
    rect(p.x, p.y, p.w, p.h);
    rectMode(CENTER);
    fill(89, 89, 89);
    if (p.sticking === "top") {
      rect(p.x + 5 + p.accx, p.y + 10 - p.gravity * (3 / 4), 2, 10, 10);
      rect(p.x + 14 + p.accx, p.y + 10 - p.gravity * (3 / 4), 2, 10, 10);
    } else {
      rect(p.x + 5 + p.accx, p.y + 13, 2, 10, 10);
      rect(p.x + 14 + p.accx, p.y + 13, 2, 10, 10);
    }

    //ellipse(p.x+5, p.y+9, 3, 12);
    //ellipse(p.x+14, p.y+9, 3, 12);
  }
};
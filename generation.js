function generateBlocks(genScene) {
  switch (genScene) {
    case "home":
      for (var i = 0; i < 500; i++) {
        var x = random(-2000, 2000);
        var y = random(0, 4000);
        blocks.push(new platform(x, y, random(50, 100), random(50, 100)));
      }
      blocks.push(new platform(0, 0, 400, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "ascent"));
      deathY = 4500;
      break;
    case "ascent":
      for (var i = 0; i < 700; i++) {
        var x = random(-1000, 1000);
        var y = random(-100, -10000);
        blocks.push(new platform(x, y, random(50, 100), random(50, 100)));
      }
      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
    case "lose":
      for (var i = 0; i < 5000; i++) {
        var x = random(-400, 400);
        var y = random(-50, -100000);
        blocks.push(new platform(x, y, random(50, 100), random(50, 100)));
      }
      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
  }
}
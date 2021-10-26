function generateBlocks(genScene) {
  switch (genScene) {
    case "home":
      /*for (var i = 0; i < 150; i++) {
        blocks.push(new platform(round(random(-200, 200))*blockSize, round(random(0, 400))*blockSize, random(50, 100), random(50, 100), "normal"));
      }
      for (var i = 0; i < 100; i++) {
        blocks.push(new platform(round(random(-200, 200))*blockSize, round(random(0, 400))*blockSize, random(50, 100), random(50, 100), "broken"));
      }
      for (var i = 0; i < 100; i++) {
        blocks.push(new platform(round(random(-200, 200))*blockSize, round(random(0, 400))*blockSize, random(50, 100), random(50, 100), "vanishing"));
      }*/
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "home") {
          //print(blockData[i]);
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-25, 0, 50, 400));
      blocks.push(new platform(-300, 0, 200, 20));
      blocks.push(new portal(-300, -100, 100, 100, "foddianLite"));
      blocks.push(new platform(-300, 150, 200, 20));
      blocks.push(new portal(-50, -250, 100, 100, "foddian"));
      blocks.push(new platform(-300, 300, 200, 20));
      blocks.push(new portal(200, -100, 100, 100, "foddianExtreme"));
      blocks.push(new platform(100, 0, 200, 20));

      /*blocks.push(new platform(-25, 0, 50, 400));
      blocks.push(new platform(-300, 0, 200, 20));
      blocks.push(new portal(-300, -100, 100, 100, "foddianLite"));
      blocks.push(new platform(-300, 150, 200, 20));
      blocks.push(new portal(-300, 50, 100, 100, "foddian"));
      blocks.push(new platform(-300, 300, 200, 20));
      blocks.push(new portal(-300, 200, 100, 100, "foddianExtreme"));
      blocks.push(new platform(100, 0, 200, 20));
      //blocks.push(new portal(200, -100, 100, 100, "traversal"));*/
      deathY = 4500;
      break;
    /*case "traversal":
      blocks.push(new platform(-50, 0, 300, 20, "normal"));
      blocks.push(new platform(-350, 0, 200, 20, "normal"));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      
      // for(var i = 0; i < blockData.length; i++){
      //   if(blockData[i].mode === "traversal"){
      //     print(blockData[i]);
      //     blocks.push(new platform(blockData[i].x, blockData[i].y, blockData[i].w, blockData[i].h, blockData[i].type, blockData[i].destroyCounter));
      //   }
      // }
      // for(var k = -10; k < 1; k++){
      //   for(var h = 0; h < 25; h++){
      //     //chunkData.push({x: h*chunkSize, y: k*chunkSize, w: chunkSize, h: chunkSize, theta: round(random((h+abs(k))/10)), blockW: round(1 + random(8)), blockH: round(1 + random(8)), type: round(random(9)), mode: "traversal"});
      //     chunks.push(new chunk(h*chunkSize, k*chunkSize, chunkSize, chunkSize, round(random((h+abs(k))/10)), round(1 + random(8)), round(1 + random(8)), round(random(9)), "traversal"));
      //   }
      // }//traversal

      for(var i = 0; i < blockData.length; i++){
        if(blockData[i].mode === "traversal"){
          //print(blockData[i]);
          blocks.push(new platform(blockData[i].x, blockData[i].y, blockData[i].w, blockData[i].h, blockData[i].type, blockData[i].destroyCounter));
        }
      }
      
      deathY = 500;
      break;*/
    case "foddian":
      /*
      for (var i = 0; i < 1300; i++) {
        blocks.push(new platform(round(random(-5, 100))*blockSize, round(random(0, -1000))*blockSize, (1+round(random(7)))*blockSize, (1+round(random(7)))*blockSize, "vanishing"));
      }
      for (var i = 0; i < 200; i++) {
        blocks.push(new platform(round(random(-5, 100))*blockSize, round(random(0, -1000))*blockSize, (1+round(random(7)))*blockSize, (1+round(random(7)))*blockSize, "broken"));
      }
      */

      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddian") {
          //print(blockData[i]);
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
    case "foddianLite":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddianLite") {
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
    case "foddianExtreme":
      for (var i = 0; i < blockData.length; i++) {
        if (blockData[i].mode === "foddianExtreme") {
          blocks.push(
            new platform(
              blockData[i].x,
              blockData[i].y,
              blockData[i].w,
              blockData[i].h,
              blockData[i].type,
              blockData[i].destroyCounter
            )
          );
        }
      }

      blocks.push(new platform(-50, 0, 100, 20));
      blocks.push(new platform(-350, 0, 200, 20));
      blocks.push(new portal(-350, -100, 100, 100, "home"));
      deathY = 500;
      break;
  }
}

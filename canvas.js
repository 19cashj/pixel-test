let canvas = document.getElementById("pixelCanvas");
canvas.width = 500;
canvas.height = 550;
let ctx = canvas.getContext("2d"); //c = context, which is the gateway to everything 2d canvas
let pixelObjectArray = [];
let shadedPixelArray = [];
let savedPatternArray = [];
let cursorPos = [];
let hoverPos = [];
var interval = null;

class Pixel {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    drawPixel(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x,this.y,50,50);
    }

    ghostPixel(ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x-10,this.y-40,25,25);
    }
}

function createPixel(x,y) {
    pixelObjectArray.push({x:+x,y:+y});
}

function shadePixel(shadedPixel) {
    let pixel = new Pixel(shadedPixel.x,shadedPixel.y);
    pixel.drawPixel(ctx);
    shadedPixelArray.push(shadedPixel);
}

function hoverPixel(hoveredPixel) {
    let pixel = new Pixel(hoveredPixel.x, hoveredPixel.y);
    pixel.ghostPixel(ctx);
    setTimeout(function(){
        ctx.clearRect(hoveredPixel.x-10, hoveredPixel.y-40, 25, 25);
    },100);
}

function removeShading() {
    shadedPixelArray = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function randomizeShading() {
    removeShading();
    for (let i = 0; i < 120; i+=1) {
        let randomPixel = Math.floor(Math.random()*120);
        shadePixel(pixelObjectArray[randomPixel]);
    }
}

function clickListener(e) {
    cursorPos = [];
    let cursorX = Math.round(e.clientX / 50)*50;
    let cursorY = Math.round(e.clientY / 50)*50-50;
    cursorPos = [{x:+cursorX,y:+cursorY}]
    shadePixel(cursorPos[0]);
}

function hoverListener(e) {
    hoverPos = [];
    let cursorX = Math.round(e.clientX / 25)*25;
    let cursorY = Math.round(e.clientY / 25)*25;
    hoverPos = [{x:+cursorX,y:+cursorY}];
    hoverPixel(hoverPos[0]);
}

function editPixelToggle() {
    let checkBox = document.getElementById("editPixelToggle");
    if (checkBox.checked == true){
        canvas.addEventListener("click", clickListener, false);
      }
    else if (checkBox.checked == false){
        canvas.removeEventListener("click", clickListener, false);
    }
}

function editHoverToggle() {
    let checkBox = document.getElementById("editHoverToggle");
    if (checkBox.checked == true){
        canvas.addEventListener("mousemove", hoverListener, false);
      }
    else if (checkBox.checked == false){
        canvas.removeEventListener("mousemove", hoverListener, false);
    }
}

/*function savePattern() {
    shadedPixelArray.forEach(function(i){
        savedPatternArray.push(shadedPixelArray[i]);
    });
    localStorage.setItem("savedPattern", JSON.stringify(savedPatternArray));
    console.log("Saved Pixels: " + savedPatternArray);
    //JSON.stringify
}

function loadPattern() {
    removeShading();
    let savedPattern = JSON.parse(localStorage.getItem("savedPattern"));
    savedPattern.forEach(function(i){
        pixelObjectArray.push(savedPattern[i]);
        shadePixel(pixelObjectArray[i]);
    });
    console.log("Loaded Pixels: " + savedPattern);
    //JSON.parse
}*/

function stopAnimation() {
    clearInterval(interval);
}

function patternSelector(patternValue) {
    document.getElementById("patternSelector").value = patternValue;
    let patternPixels = [];
    //let patternShaded = [];
    removeShading();
    switch (patternValue) {
        case "None":
            break;
        case "Pattern 1":
            for (let i = 0; i < 120; i+=2) {
                shadePixel(pixelObjectArray[i]);
            }
            break;
        case "Pattern 2":
            for (let i = 0, j = 9; i <=8; i++, j+=9) {
                patternPixels.push(i);
                patternPixels.push(j);
                patternPixels.push(j+8);
                patternPixels.push(i+90);
            }
            patternPixels.forEach(function(i){
                shadePixel(pixelObjectArray[i]);
            });
            break;
        case "Pattern 3":
            for (let i = 74; i <= 78; i++) {
                patternPixels.push(i);
            }
            patternPixels.push(20,24,64,70);
            patternPixels.forEach(function(i){
                shadePixel(pixelObjectArray[i]);
            });
            break;
    }
    //
}

function animationSelector(animationValue) {
    removeShading();
    document.getElementById("animationSelector").value = animationValue;
    let frame = 0;
    let animationStorage = [];
    switch (animationValue) {
        case "None":
            stopAnimation();
            break;
        case "Animation 1": 
            frame = 0;
            interval = setInterval(function(){
                if (frame==1) {
                    removeShading();
                    animationStorage = [];
                    shadePixel(pixelObjectArray[49]);
                    console.log(frame)
                }
                else if (frame==2) {
                    removeShading();
                    animationStorage.push(31, 39, 41, 47, 51, 57, 59, 67);
                    animationStorage.forEach(function(i){
                        shadePixel(pixelObjectArray[i]);
                    });
                    console.log(frame);
                }
                else if (frame==3) {
                    removeShading();
                    animationStorage = [];
                    animationStorage.push(21, 22, 23, 29, 33, 37, 43, 46, 52, 55, 61, 65, 69, 75, 76, 77);
                    animationStorage.forEach(function(i){
                        shadePixel(pixelObjectArray[i]);
                    });
                    console.log(frame)
                }
                else if (frame==4) {
                    removeShading();
                    animationStorage = [];
                    animationStorage.push(12, 13, 14, 20, 24, 28, 34, 36, 44, 45, 53, 54, 62, 64, 70, 74, 78, 84, 85, 86);
                    animationStorage.forEach(function(i){
                        shadePixel(pixelObjectArray[i]);
                    });
                    console.log(frame)
                    frame = 0;
                }
                frame++;
            }, 500);
            break;
        case "Animation 2":
            //
            break;
        case "Animation 3":
            //
            break;
    }
    //
}
for (let i = 0, x = 0, y = 0; i < 120; i++) {
    createPixel(x,y);
    if (x >= canvas.width) {
        x=0;
        y+=50;
    }
    else {
        x+=50;
    }
}
console.log(pixelObjectArray);
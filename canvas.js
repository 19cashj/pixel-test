let canvas = document.getElementById("pixelCanvas");
canvas.width = 500;
canvas.height = 550;
let ctx = canvas.getContext("2d"); //c = context, which is the gateway to everything 2d canvas
let pixelObjectArray = [];
let shadedPixelArray = [];
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
}

function createPixel(x,y) {
    pixelObjectArray.push({x:+x,y:+y});
}

function shadePixel(shadedPixel) {
    let pixel = new Pixel(shadedPixel.x,shadedPixel.y);
    pixel.drawPixel(ctx);
    shadedPixelArray.push(shadedPixel);
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

function roundNum(num){
    return Math.round(num / 50)*50;
}

function pixelListener(e) {
    let cursorPos = [];
    console.log(e.clientX+", "+e.clientY);
    let cursorX = roundNum(e.clientX);
    let cursorY = roundNum(e.clientY);
    cursorPos = [{x:+cursorX,y:+cursorY}]
    console.log(cursorPos);
    shadePixel(cursorPos[0]);
    //maybe matching cursorPos with entires in pixelElementArray would be better
}

function editPixelToggle() {
    let checkBox = document.getElementById("editPixelToggle");
    if (checkBox.checked == true){
        canvas.addEventListener("click", pixelListener, false);
      }
    else if (checkBox.checked == false){
        canvas.removeEventListener("click", pixelListener, false);
    }
}

function savePattern() {
    let savedPatternArray = [];
    shadedPixelArray.forEach(function(i){
        savedPatternArray.push(shadedPixelArray[i]);
    });
    localStorage.setItem("savedPattern", savedPatternArray);
    console.log("Saved Pixels: " + savedPatternArray);
    //JSON.stringify
}

function loadPattern() {
    removeShading();
    let savedPattern = localStorage.getItem("savedPattern");
    let savedShadedArray = savedStringShadedArray.map(Number);
    savedShadedArray.forEach(function(i){
        pixelObjectArray.push(savedShadedArray[i]);
        shadePixel(pixelObjectArray[i]);
    });
    console.log("Loaded Pixels: " + savedPattern);
    //JSON.parse
}

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
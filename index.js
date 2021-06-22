let pixelStringArray = [];
let pixelElementArray = [];
let container = document.querySelector(".container");
var pixelAmount; //should really be using this
var interval = null;

function createPixel(pixelDiv, pixelContainer, i) {
    var pixelDiv = document.createElement("div");
    pixelDiv.classList.add("pixel");
    pixelDiv.setAttribute("id", "pixel" + i);
    pixelContainer.appendChild(pixelDiv);
    pixelStringArray.push("pixel" + i);
    pixelElementArray.push(pixelDiv);
}

function shadePixel(pixel) {
    pixel.classList.toggle("shaded");
}

var pixelListener = function () {
    this.classList.toggle("shaded");
}

function editPixelToggle() {
    let checkBox = document.getElementById("editPixelToggle");
    if (checkBox.checked == true){
        for (var i = 0; i < 99; i++) {
            pixelElementArray[i].addEventListener("click", pixelListener);
        }
      }
    else if (checkBox.checked == false){
        for (var i = 0; i < 99; i++) {
            pixelElementArray[i].removeEventListener("click", pixelListener);
        }
    }
}

function removeShading() {
    for (let i = 0; i < 99; i+=1) {
        pixelElementArray[i].classList.remove("shaded");
    }
}

function randomizeShading() {
    removeShading();
    for (let i = 0; i < 99; i+=1) {
        let randomPixel = Math.floor(Math.random()*99);
        shadePixel(pixelElementArray[randomPixel]);
    }
}

function savePattern() {
    let savedPatternArray = [];
    for (let i = 0; i < 99; i+=1) {
        if (pixelElementArray[i].classList.contains("shaded")) {
            savedPatternArray.push(pixelStringArray[i]);
        }
    }
    localStorage.setItem("savedPattern", savedPatternArray);
    console.log("Saved Pixels: " + savedPatternArray);
}

function loadPattern() {
    removeShading();
    let savedPattern = localStorage.getItem("savedPattern");
    let pixelStringsRemoved = savedPattern.replaceAll("pixel", "");
    let savedStringShadedArray = pixelStringsRemoved.split(',');
    let savedShadedArray = savedStringShadedArray.map(Number);
    savedShadedArray.forEach(function(i){
        pixelElementArray.push(savedShadedArray[i]);
        shadePixel(pixelElementArray[i]);
    });
    console.log("Loaded Pixels: " + savedPattern);
}

function stopAnimation() {
    clearInterval(interval);
}

function patternSelector(patternValue) {
    document.getElementById("patternSelector").value = patternValue;
    let patternPixels = [];
    let patternShaded = [];
    removeShading();
    switch (patternValue) {
        case "None":
            break;
        case "Pattern 1":
            for (let i = 0; i < 99; i+=2) {
                shadePixel(pixelElementArray[i]);
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
                patternShaded.push(pixelElementArray[i]);
            });
            patternShaded.forEach(function(i){
                shadePixel(i);
            });
            break;
        case "Pattern 3":
            for (let i = 74; i <= 78; i++) {
                patternPixels.push(i);
            }
            patternPixels.push(20,24,64,70);
            patternPixels.forEach(function(i){
                patternShaded.push(pixelElementArray[i]);
            });
            patternShaded.forEach(function(i){
                shadePixel(i);
            });
            break;
    }
}

function animationSelector(animationValue) {
    removeShading();
    document.getElementById("animationSelector").value = animationValue;
    let frame = 0;
    let animationStorage = [];
    let animationShaded = [];
    switch (animationValue) {
        case "None":
            stopAnimation();
            break;
        case "Animation 1": 
            frame = 0;
            interval = setInterval(function(){
                if (frame==1) {
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    animationStorage = [];
                    animationShaded = [];
                    shadePixel(pixelElementArray[49]);
                    console.log(frame)
                }
                else if (frame==2) {
                    shadePixel(pixelElementArray[49]);
                    animationStorage.push(31, 39, 41, 47, 51, 57, 59, 67);
                    animationStorage.forEach(function(i){
                        animationShaded.push(pixelElementArray[i]);
                    });
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    console.log(frame);
                }
                else if (frame==3) {
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    animationStorage = [];
                    animationShaded = [];
                    animationStorage.push(21, 22, 23, 29, 33, 37, 43, 46, 52, 55, 61, 65, 69, 75, 76, 77);
                    animationStorage.forEach(function(i){
                        animationShaded.push(pixelElementArray[i]);
                    });
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    console.log(frame)
                }
                else if (frame==4) {
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    animationStorage = [];
                    animationShaded = [];
                    animationStorage.push(12, 13, 14, 20, 24, 28, 34, 36, 44, 45, 53, 54, 62, 64, 70, 74, 78, 84, 85, 86);
                    animationStorage.forEach(function(i){
                        animationShaded.push(pixelElementArray[i]);
                    });
                    animationShaded.forEach(function(i){
                        shadePixel(i);
                    });
                    console.log(frame)
                    frame = 0;
                }
                frame++;
            }, 1000);
            break;
        case "Animation 2":
            //
            break;
        case "Animation 3":
            //
            break;
    }
}
for (let i = 0; i < 99; i++) {
    createPixel("pixel"+i, container, i);
    pixelAmount+=1;
}
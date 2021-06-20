let pixelStringArray = [];
let pixelElementArray = [];
let container = document.querySelector(".container");
var pixelAmount;

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

function shadePattern1() {
    removeShading();
    for (let i = 0; i < 99; i+=2) {
        shadePixel(pixelElementArray[i]);
    }
}

function shadePattern2() {
    removeShading();
    let pattern2Pixels = [];
    for (let i = 0, j = 9; i <=8; i++, j+=9) {
        pattern2Pixels.push(i);
        pattern2Pixels.push(j);
        pattern2Pixels.push(j+8);
        pattern2Pixels.push(i+90);
    }
    let pattern2Shaded = [];
    pattern2Pixels.forEach(function(i){
        pattern2Shaded.push(pixelElementArray[i]);
    });
    pattern2Shaded.forEach(function(i){
        shadePixel(i);
    });
}

function shadePattern3() {
    removeShading();
    let pattern3Pixels = [];
    for (let i = 74; i <= 78; i++) {
        pattern3Pixels.push(i);
    }
    pattern3Pixels.push(20,24,64,70);
    let pattern3Shaded = [];
    pattern3Pixels.forEach(function(i){
        pattern3Shaded.push(pixelElementArray[i]);
    });
    console.log(pattern3Shaded);
    pattern3Shaded.forEach(function(i){
        shadePixel(i);
    });
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

function patternSelector(patternValue) {
    document.getElementById("patternSelector").value = patternValue;
    switch (patternValue) {
        case "None":
            //removeShading();
            break;
        case "Pattern 1":
            shadePattern1();
            break;
        case "Pattern 2":
            shadePattern2();
            break;
        case "Pattern 3":
            shadePattern3();
            break;
    }
}

for (let i = 0; i < 99; i++) {
    createPixel("pixel"+i, container, i);
    pixelAmount+=1;
}

//Create an animation selector similar to patterns which would play an animation
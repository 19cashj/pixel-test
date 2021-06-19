let pixelStringArray = [];
let pixelElementArray = [];
let container = document.querySelector(".container");
//var pixelAmount = pixelElementArray.length;
// Global pixel amount not working with the for loops for some reason

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
    for (let i = 0; i < 99; i+=2) {
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
    for (let i = 10, j = 19; i < 17; i++, j+=9) {
        pattern2Pixels.push(i);
        pattern2Pixels.push(j);
        pattern2Pixels.push(j+6);
    }
    let pattern2Shaded = [];
    pattern2Pixels.forEach(function(i){
        pattern2Shaded.push(pixelElementArray[i]);
    });
    pattern2Shaded.forEach(function(i){
        shadePixel(i);
    });
}

function patternSelector() {
    var value = document.getElementById("patternSelector").value;
    switch (value) {
        case "None":
            removeShading();
            break;
        case "Pattern 1":
            shadePattern1();
            break;
        case "Pattern 2":
            shadePattern2();
            break;
    }
}

for (let i = 0; i < 99; i++) {
    createPixel("pixel"+i, container, i);
}

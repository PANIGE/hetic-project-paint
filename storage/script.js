var currentTool = 0;
//Sincs JS don't have the basics implementation of ENUMS, i have to use ints instead, that are... less good implementation
// 0 = square
// 1 = round
// 2 = triangles
// 3 = text
var bCircle;
var bSquare;
var bTriangle;
var bText;

var hexcolor = "#FFF";


window.onload = () => {
    //Region button inits

    bCircle = document.getElementById("bCircle");
    bSquare = document.getElementById("bSquare");
    bTriangle = document.getElementById("bTriangle");
    bText = document.getElementById("bText");

    bSquare.onclick = () => changeTool(0);
    bCircle.onclick = () => changeTool(1);
    bTriangle.onclick = () => changeTool(2);
    bText.onclick = () => changeTool(3);

    //EndRegion
    window.onresize = reportWindowSize;
    reportWindowSize();
}

function changeTool(tool) {
    [bCircle, bSquare, bTriangle, bText].forEach(s => s.classList.remove("active"));
    switch (tool) {
        case 0:
            currentTool = 0;
            bSquare.classList.add("active")
            break;
        case 1:
            currentTool = 1;
            bCircle.classList.add("active")
            break;
        case 2:
            currentTool = 2;
            bTriangle.classList.add("active")
            break;
        case 3:
            currentTool = 3;
            bText.classList.add("active")
            break;

    }
}


function reportWindowSize() {
    console.log(document.body.clientHeight);
    let canvas = document.getElementById('myCanvas');
    canvas.width=document.body.clientWidth*0.75;
    canvas.height = ((document.body.clientWidth*0.75) / 16) * 9
}

function color(){
    let red = document.getElementById('slideR')
    let green = document.getElementById('slideG')
    let blue = document.getElementById('slideB')
    
    hexcolor = "#" + parseInt(red.value).toString(16) + parseInt(green.value).toString(16) + parseInt(blue.value).toString(16);
    document.getElementById("primary-prev").setAttribute("style", "background-color:"+hexcolor+";");
    console.log(hexcolor);

}
function draws(){
    switch (currentTool) {
        case 0:
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            ctx.rect(10, 10, 100, 100);
            ctx.fill();
            break;

        case 1:
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(95,50,40,0,2*Math.PI);
            ctx.fill();
            break;

        case 2:
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(50, 50);
            ctx.lineTo(80, 5);
            ctx.lineTo(110, 50);
            ctx.fill();
            break;

        case 3:
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            ctx.font = "30px Arial";
            ctx.fillText(prompt("AAAAAAAAAAA"), 10, 50);
            break;
    }

}


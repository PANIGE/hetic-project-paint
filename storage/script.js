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

var PrimaryColor = "#000";
var SecondaryColor = "#FFF";
var Selected = NaN; // ID of the selected element

var canChangeColors = true; //This var is here just to avoid the sliders to calls colors when i'm updating thoses

var elements = [
    {
        "ID":1,
        "Type":0,
        "X":0.1,
        "Y":0.05,
        "Height":0.2,
        "Width":0.2,
        "PrimaryColor":"#F0F",
        "SecondaryColor":"#0F0",
    },
    {
        "ID":2,
        "Type":1,
        "X":0.7,
        "Y":0.05,
        "Height":0.2,
        "Width":0.2,
        "PrimaryColor":"#00F",
        "SecondaryColor":"#FF0",
    },
    
    {
        "ID":3,
        "Type":2,
        "X":0.1,
        "Y":0.3,
        "Height":0.2,
        "Width":0.2,
        "PrimaryColor":"#0F0",
        "SecondaryColor":"#F0F",
    },
    
    {
        "ID":4,
        "Type":3,
        "X":0.6,
        "Y":0.4,
        "Height":0.07,
        "Width":0.02, 
        "PrimaryColor":"#F00",
        "SecondaryColor":"#000",
        "Font": "Arial",
        "Text": "AAAAAAA"
    },

];
//This is a List of Dictionnary
//Dicts are represented like this :
// X, Y, Width, Height are calculated relative to canvas Width
//{
//    "ID" : id,
//    "Type": type_as_seen_as_currentTool,
//    "X": x,
//    "Y": y,
//    "Height" : height,
//    "Width" : width,
//    "PrimaryColor": hexcolor,
//    "SecondaryColor": hexcolor,
//    OPTIONNAL (For text)
//    "Text": text,
//    "Font": font
//}
//


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


    //Region Colors Sliders

    let red = document.getElementById('slideR');
    let green = document.getElementById('slideG');
    let blue = document.getElementById('slideB');
    red.onmousemove = () => color();
    green.onmousemove = () => color();
    blue.onmousemove = () => color();

    //Endregion
    window.onresize = WindowResize;
    WindowResize();
    setInterval(draws, 16);


    let canvas = document.getElementById('myCanvas');
    canvas.addEventListener("click", (e) => CanvasClick(e));

    let selectionBox = document.getElementById("selection");
    selectionBox.addEventListener("drag", e)
}

function CanvasClick(e) 
{
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 

    for (let i=0; i < elements.length;i++) {
        let el = elements[i];
        let x = el.X;
        let y = el.Y;
        let endX = el.X + el.Width;
        let endY = el.Y + el.Height;

        console.log(curX + " > " + x);
        console.log(curX + " < " + endX);
        console.log(curY + " > " + x);
        console.log(curY + " < " + x);
        if (curX > x && curX < endX && curY > y && curY < endY) {
            Select(el.ID);
            return;
        }
    }
    Select(-1);
}



function changeTool(tool) 
{
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


function ExchangeColors() 
{



    let temp = PrimaryColor;
    PrimaryColor = SecondaryColor;
    SecondaryColor = temp;
    ReloadSliders();

}

function ReloadSliders() 
{
    canChangeColors = false;
    let red = document.getElementById('slideR');
    let green = document.getElementById('slideG');
    let blue = document.getElementById('slideB');
    hR = parseInt(PrimaryColor.substring(1,3), 16)
    hG = parseInt(PrimaryColor.substring(3,5), 16)
    hB = parseInt(PrimaryColor.substring(5,7), 16)
    red.value = hR;
    blue.value = hB;
    green.value = hG;
    canChangeColors = true;
    
    color();
}

function WindowResize() 
{
    let canvas = document.getElementById('myCanvas');
    canvas.width=document.body.clientWidth*0.75;
    canvas.height = ((document.body.clientWidth*0.75) / 16) * 9
}

function color()
{
    if (!canChangeColors)
        return;
    let red = document.getElementById('slideR');
    let green = document.getElementById('slideG');
    let blue = document.getElementById('slideB');

    let hexR = parseInt(red.value).toString(16);
    let hexG = parseInt(green.value).toString(16);
    let hexB = parseInt(blue.value).toString(16);

    if (hexR.length == 1)
        hexR = "0" + hexR;

    if (hexG.length == 1)
        hexG = "0" + hexG;

    if (hexB.length == 1)
        hexB = "0" + hexB;
    
    PrimaryColor = "#" + hexR + hexG + hexB;
    document.getElementById("primary-prev").setAttribute("style", "background-color:"+PrimaryColor+";");
    document.getElementById("secondary-prev").setAttribute("style", "background-color:"+SecondaryColor+";");
    if (!isNaN(Selected)) 
    {
        getElementByID(Selected).PrimaryColor = PrimaryColor;
        getElementByID(Selected).SecondaryColor = SecondaryColor;
    }

}


function Select(id) 
{
    if (id === -1) 
    {
        node = document.getElementById("selection");
        node.style.opacity = 0;
        Selected = NaN;
        return;
    }
    let el = getElementByID(id);
    let canvas = document.getElementById('myCanvas');
    if (el === null) {
        console.warn("Trying to select unknwown ID ("+id+")")
        return;
    }
    Selected = id;
    node = document.getElementById("selection");
    console.log(el["Width"]*canvas.width);
    node.style.opacity = 1;
    node.style.width = Math.floor(el["Width"]*canvas.width)+12 + "px";
    node.style.height = Math.floor(el["Height"]*canvas.width)+12+ "px";
    node.style.top = Math.floor(el["Y"]*canvas.width)-6+ "px";
    node.style.left = Math.floor(el["X"]*canvas.width)-6+ "px";

    PrimaryColor = el.PrimaryColor;
    SecondaryColor = el.SecondaryColor;
    ReloadSliders();
}

function getElementByID(id) 
{
    for (let x=0; x < elements.length;x++) {
        if (elements[x]["ID"] === id) {
            return elements[x]
        }
    }
    return null;
}

function draws()
{
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(s => {
        ctx.strokeStyle = s["PrimaryColor"];
        ctx.fillStyle = s["SecondaryColor"];
        switch (s["Type"]) {

            case 0:
                
                ctx.strokeRect(s["X"]*canvas.width, s["Y"]*canvas.width, s["Width"]*canvas.width, s["Height"]*canvas.width);
                ctx.rect(s["X"]*canvas.width, s["Y"]*canvas.width, s["Width"]*canvas.width, s["Height"]*canvas.width);
                ctx.fill();

                break;
    
            case 1:

                ctx.beginPath();
                ctx.arc(s["X"]*canvas.width + (s["Width"]/2)*canvas.width, 
                        s["Y"]*canvas.width + (s["Height"]/2)*canvas.width,
                        (Math.min(s["Width"], s["Height"])*canvas.width)/2,
                        0,2*Math.PI);
                ctx.stroke()
                ctx.fill();
                break;
    
            case 2:

                finalX = s["X"]*canvas.width;
                finalY = s["Y"]*canvas.width;
                finalWidth = s["Width"]*canvas.width;
                finalHeight = s["Height"]*canvas.width;

                ctx.beginPath();
                ctx.moveTo(finalX, finalY + finalHeight);
                ctx.lineTo(finalX + (finalWidth*0.5), finalY);
                ctx.lineTo(finalX + finalWidth, finalY + finalHeight);
                ctx.lineTo(finalX, finalY + finalHeight);
                ctx.stroke()
                ctx.fill();
                break;
    
            case 3:
                
                ctx.font = Math.floor(s["Height"]*canvas.width) + "px " + s["Font"];//"30px Arial";
                ctx.fillText(s["Text"], s["X"]*canvas.width, s["Y"]*canvas.width);
                break;
        }
    });
    

}


var currentTool = 0;
//Sincs JS don't have the basics implementation of ENUMS, i have to use ints instead, that are... less good implementation
// 0 = square
// 1 = round
// 2 = triangles
// 3 = text

//Thoses are buttons
var bCircle;
var bSquare;
var bTriangle;
var bText;

//Thoses are colors
var PrimaryColor = "#000";
var SecondaryColor = "#FFF";
var canChangeColors = true; //This var is here just to avoid the sliders to calls colors when i'm updating thoses

// ID of the selected element
var Selected = NaN; 



var Font = "Arial";
var rgb = false;
hueval = 0;


var draggingFirstPos = {
    "X": NaN,
    "Y": NaN,
    "ElX" : NaN,
    "ElY": NaN,
}

var elements = [
    {
        "ID":1,
        "Type":1,
        "X":-1,
        "Y":-1,
        "Height":0.2,
        "Width":0.2,
        "PrimaryColor":"#F0F",
        "SecondaryColor":"#0F0",
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

    bSquare.onclick = () => CreateElement(0);
    bCircle.onclick = () => CreateElement(1);
    bTriangle.onclick = () => CreateElement(2);
    bText.onclick = () => CreateElement(3);
    
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
    selectionBox.addEventListener("drag", (e) => CanvasDrag(e));
    selectionBox.addEventListener("dragenter", (e) => CanvasDragStart(e));
    selectionBox.addEventListener("dragend", (e) => CanvasDragEnd(e));


    let Resize = document.getElementById("resize");
    Resize.addEventListener("drag", (e) => ResizeDrag(e));
    Resize.addEventListener("dragenter", (e) => ResizeDragStart(e));
    Resize.addEventListener("dragend", (e) => ResizeDragEnd(e));


    document.getElementById("file-input").addEventListener('change', upload);

    document.onkeydown = function(e){
        var key = e.key;
        if( (e.which == 8 || e.which == 46) && !isNaN(Selected) ) { //i know this is deprecated but the doc wont give me any replacement...
            elements.splice(elements.indexOf(getElementByID(Selected)),1);
            Select(-1);
        }
    };
    

}
function font(FontName){
    Font = FontName;    
}

function colors(){
    rgb = !rgb;
}

function drawForExport() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF"
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    draws(false);
    jgp();
}

/*save jpg front
function jgp(){
    var canvas =document.getElementById('myCanvas');
    var image = canvas.toDataURL();
    var aDownloadLink = document.getElementById('downloader');
    var DocName = document.getElementById('title');
    aDownloadLink.download = DocName.value + '.png';
    aDownloadLink.href = image;
    aDownloadLink.click();*/
// }



function downloadFile(){
    
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(save());
    var DocName = document.getElementById('title');
    var dlAnchorElem = document.getElementById('downloader');
    dlAnchorElem.setAttribute("href",dataStr);
    dlAnchorElem.setAttribute("download", DocName.value + '.json');
    dlAnchorElem.click();
}

function download(){
    var XHR = new XMLHttpRequest();
    var DocName = document.getElementById('title');
    
    urlEncodedData = encodeURIComponent("JSON") + '=' + encodeURIComponent(save()) + "&NAME=" + encodeURIComponent(DocName.value).replace(/%20/g, '+');
    XHR.open('POST', '/submit.php');
    XHR.addEventListener('load', function(event) {
        alert('Données sauvegardées');
      });
    XHR.addEventListener('error', function(event) {
        alert('Sauvegardé échouée');
      })
    //JSON = tonjson
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//Juste pour que PHP comprennent ce qu'on vien d'écrire
    XHR.send(urlEncodedData);
}

function ResizeDragStart(e) {
    e.stopPropagation();
    if (!isNaN(draggingFirstPos.X))
        return;
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    draggingFirstPos = {
        "X": curX,
        "Y": curY,
        "ElX" : getElementByID(Selected).Width,
        "ElY" : getElementByID(Selected).Height
    }

    node = document.getElementById("selection");
    node.style.opacity = 0;
}
function ResizeDrag(e) {
    e.stopPropagation();
    if (isNaN(draggingFirstPos.X))
    return;
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    el = getElementByID(Selected);
    el.Width = draggingFirstPos.ElX + (curX - draggingFirstPos.X);
    el.Height = draggingFirstPos.ElY + (curY - draggingFirstPos.Y);

    node = document.getElementById("selection");
    node.style.width = Math.floor(el["Width"]*canvas.width)+12 + "px";
    node.style.height = Math.floor(el["Height"]*canvas.width)+12+ "px";
}
function ResizeDragEnd(e) {
    e.stopPropagation();
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();   
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    node = document.getElementById("selection");
    
    node.style.opacity = 1;
    node.style.width = Math.floor(el["Width"]*canvas.width)-6+ "px";
    node.style.height = Math.floor(el["Height"]*canvas.width)-6+ "px";

    el = getElementByID(Selected);
    el.Width = draggingFirstPos.ElX + (curX - draggingFirstPos.X);
    el.Height = draggingFirstPos.ElY + (curY - draggingFirstPos.Y);

    draggingFirstRes = {
        "X": NaN,
        "Y": NaN,
        "ElX" : NaN,
        "ElY": NaN,
    }
}

//GET : Toi qui demande une page
//POST : Tu appui sur un bouton login => envoie des données aux serveur

function CanvasDragStart(e) {
    if (!isNaN(draggingFirstPos.X))
        return;
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    draggingFirstPos = {
        "X": curX,
        "Y": curY,
        "ElX" : getElementByID(Selected).X,
        "ElY" : getElementByID(Selected).Y
    }

    node = document.getElementById("selection");
    node.style.opacity = 0;

}
function CanvasDrag(e) {
    if (isNaN(draggingFirstPos.X))
        return;
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    getElementByID(Selected).X = draggingFirstPos.ElX + (curX - draggingFirstPos.X);
    getElementByID(Selected).Y = draggingFirstPos.ElY + (curY - draggingFirstPos.Y);

    node = document.getElementById("selection");

}
function CanvasDragEnd(e) {
    let canvas = document.getElementById('myCanvas');
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var curX = Math.round(e.clientX - cRect.left) / canvas.width;  // Subtract the 'left' of the canvas 
    var curY = Math.round(e.clientY - cRect.top) / canvas.width; 
    el = getElementByID(Selected);
    el.X = draggingFirstPos.ElX + (curX - draggingFirstPos.X);
    el.Y = draggingFirstPos.ElY + (curY - draggingFirstPos.Y);

    node = document.getElementById("selection");
    node.style.opacity = 1;
    node.style.top = Math.floor(el["Y"]*canvas.width)-6+ "px";
    node.style.left = Math.floor(el["X"]*canvas.width)-6+ "px";
    draggingFirstPos = {
        "X": NaN,
        "Y": NaN,
        "ElX" : NaN,
        "ElY": NaN,
    }
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

        if (curX > x && curX < endX && curY > y && curY < endY) {
            Select(el.ID);
            return;
        }
    }
    Select(-1);
}



function CreateElement(tool) 
{
    let id;
    console.log(elements.length === 0)
    if (elements.length !== 0) {
        id = Math.max.apply(Math, elements.map(function(o) { return o.ID; }))+1;
    }
    else {
        id = 1;
    }
    
    console.log(id)
    el = {
    "ID":id,
    "Type":tool,
    "X":0.4,
    "Y":0.4,
    "Height":0.2,
    "Width":0.2,
    "PrimaryColor":PrimaryColor,
    "SecondaryColor":SecondaryColor,
    }
    if (tool == 3) {
        el["Font"]= Font,
        el["Text"]= prompt("Enter text") 
    }
    elements.push(el);
    Select(id);
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

    var r = document.getElementById('rValue');
    r.innerHTML = red.value;

    var g = document.getElementById('gValue');
    g.innerHTML = green.value;

    var b = document.getElementById('bValue');
    b.innerHTML = blue.value;


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

function save() {
    return JSON.stringify(elements)
}

function upload() {
    
    if (typeof window.FileReader !== 'function') {
        alert("loading files isn't supported on this browser yet.");
        return;
    }
    let input = document.getElementById('file-input');


    var fr=new FileReader();
    fr.onload=function(){
        
        elements = JSON.parse(fr.result);
        console.log(elements);
    }
    fr.readAsText(input.files[0])
}

function load() {
    let name = prompt("Le nom de votre document");
    window.location.replace("/?name="+name);
}

function draws(clear = true)
{
    if (rgb) {
        document.documentElement.style.setProperty('--main-color', 'hsl('+hueval+', 100%, 40%)');
        hueval++;
    }
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 10;
    if (clear)
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
                s.Width = ctx.measureText(s["Text"]).width / canvas.width;
                ctx.fillStyle = s.SecondaryColor;
                ctx.rect(s["X"]*canvas.width, s["Y"]*canvas.width, s["Width"]*canvas.width, s["Height"]*canvas.width);
                
                ctx.fill();
                ctx.fillStyle = s.PrimaryColor;
                ctx.fillText(s["Text"], s["X"]*canvas.width, (s["Y"]+s["Height"])*canvas.width);

                ctx.strokeStyle = s["PrimaryColor"];
                ctx.fillStyle = s["SecondaryColor"];
                break;
            default:
                console.error("Unknown type "+s.Type)
                break;
        }
    });

}

/* on doit importer html2canvas
    function png(){
        var doc=getDocumentById(myCanvas)
            html2canvas({
                onRendered:function(canvas){
                    var a = document.createElement('a')
                    a.href=canvas.toDataURL("image/png")
                    a.download=doc.value
                    a.clik();
                }
            })
        }
*/



<?php
$dsn = 'mysql:host=localhost;dbname=sys;port=3306';
$pdo = new PDO($dsn, 'root' , 'Pikachu2003!');
$query = $pdo->query("SELECT manga FROM ID");
$resultat = $query->fetchAll();
var_dump($resultat);
?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <link href="storage/main.css" rel="stylesheet">
      <script src="https://kit.fontawesome.com/cc08db76b3.js" crossorigin="anonymous"></script>
      <script src="storage/script.js"></script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BETTER THAN PAINT</title>
   </head>
   <body>
      <div class="title">
         <h1 class="main-title"><span>B</span>ETTER <span>T</span>HAN <span>P</span>AINT</h1>
      </div>
      <div class="main-container">
         <div class="header">
            <input type="text" value="Sans Titre" placeholder="Art Name" id="title">
         </div>
         <div class="wrapper">
            <div class="header-secondary">
                <div>
                    <button id="circle" onclick="download()">
                    <i class="fas fa-save"></i>
                    </button> 
                </div>
                <div>
                   <button id="import" onclick="document.getElementById('file-input').click();">
                      <i class="fas fa-file-import"></i></i>
                      <input id="file-input" type="file" name="file" style="display: none;" />
                     </button>
                </div>
                <div>
                   <button onclick="colors()"id="rgb">
                     <i class="fas fa-palette"></i>
                   </button>
                </div>
                <div class="dropdown">
                  <button class="dropbtn">font</button>
                  <div class="conteneur">
                        <p onclick="font('Roboto')">Roboto</p>
                        <p onclick="font('Inspiration')">Inpiration</p>
                        <p onclick="font('Torus')">Torus</p>
                        <p onclick="font('Noto Sans Japanese')">Noto Sans Japanese</p>
                     </div>  
                  </div>
               </div>
               <div class="block">
                  
                  <div class="card">
                     
                     <div class="workspace">
                        <div  class="selectionBox"><div draggable="true" id="selection" style="opacity:0;width:0;height:0;top:0;left:0;"><span id="resize" draggable="true"></span></div></div>
                        <canvas id="myCanvas" width="848" height="480" style="border:1px solid black;"></canvas>
                     </div>
                     <div class="tools">
                        
                        <div>
                           <button id="bSquare">
                              <i class="fas fa-square"></i>
                           </button>
                        </div>
                        <div>
                           <button id="bCircle">
                              <i class="fas fa-circle"></i>
                           </button>
                        </div>
                        <div>
                           <button id="bTriangle">
                              <i class="fas fa-caret-up"></i>
                           </button>
                        </div>          
                        <div>
                           <button id="bText">
                              <i class="fas fa-bold"></i>
                           </button>
                        </div>
                        
                     </div>
                  </div>
                  <div class="color-slider">
                     <div class="dotContainer">
                        <span class="dot" id="primary-prev" onclick="ExchangeColors()"></span>
                        <span class="dot2" id="secondary-prev"></span>
                     </div>
                     <div class="slider">
                        <div class="red-value">
                           <div id="rValue">0</div>
                           <input type="range" onchange="color()" value="00" min="0" max="255" id="slideR">
                        </div>
                        <div class="green-value">
                           <div id="gValue">0</div>
                           <input type="range" onchange="color()" value="00" min="0" max="255" id="slideG">
                        </div>
                        <div class="blue-value">
                           <div id="bValue">0</div>
                           <input type="range" onchange="color()" value="00" min="0" max="255" id="slideB">
                        </div>
                        <script>
                           var slider = document.getElementById("slider");
                        </script>
                        </div>
                        <a id="downloader" style="display:hidden;"></a>
                     </div>
               </div>
               <div>
                  <span class="rgb_container"id="measure"></span>
               </div>
                  </div>
               </div>
               <div class="footer">
                  </div>
               </div>
            </div>
            
         </body>
         </html>
         
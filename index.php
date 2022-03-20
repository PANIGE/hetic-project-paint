<?php
require_once("include/SQL.php");
$json = "[]";
$name = "Sans-Titre";
if (isset($_GET['name'])) {
   $name = $_GET['name']; 
   $IP = $_SERVER['REMOTE_ADDR'];
   $req = $pdo->prepare("SELECT json FROM save WHERE ip = :ip AND name = :name");
   $req->execute([
      ":ip" => $IP,
      ":name" => $name
   ]);
   $result = $req->fetch(PDO::FETCH_ASSOC);
   if ($result) {
      $json = $result["json"];
      $name = $_GET["name"];
   }
   else {
      echo '<script>alert("Nom non trouvé dans votre base de donnée")</script>';
   }
}


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

      <!-- <div class="home page">
         <div class="intro">
         <h1 class="project-name">
            <span class="letter">B</span><span class="letter">ETTER</br></span> <span class="letter">T</span><span class="letter">HAN </span> <span class="letter">P</span><span class="letter">AINT</span>
         </h1>
         <img src="https://cdn-icons-png.flaticon.com/512/815/815546.png" id="pic" alt="logo">
         </div>
      </div> -->

      <div class="title">
         <h1 class="main-title"><span>B</span>ETTER <span>T</span>HAN <span>P</span>AINT</h1>
      </div>
      <div class="main-container">
         <div class="header">
            <input type="text" value=<?= $name ?> placeholder="Art Name" id="title">
         </div>
         <div class="wrapper">
            <div class="header-secondary">
                <div title="Download the file locally">
                    <button id="circle" onclick="downloadFile()">
                    <i class="fas fa-download"></i>
                    </button> 
                </div>
                <div title="Save file to the server (Be sure to remember the name !)">
                    <button id="circle" onclick="download()" >
                    <i class="fas fa-save"></i>
                    </button> 
                </div>
                <div title="Download file locally">
                   <button id="circle" id="import" onclick="load()">
                   <i class="fas fa-cloud-download-alt"></i>
                  </button>
                </div>
                <div title="Get a file locally">
                   <button id="circle" onclick="document.getElementById('file-input').click();">
                   <i class="fas fa-cloud-upload-alt"></i>
                      <input id="file-input" type="file" name="file" style="display: none;" />
                     </button>
                </div>
                <div title="Export to PNG">
                   <button id="circle" >
                     <i class="fas fa-file-image"></i>
                   </button>
                </div>
                <div  title="Export to PDF">
                   <button id="circle" >
                     <i class="fas fa-file-pdf"></i>
                   </button>
                </div>
                <div  title="Who wouldn't have some RGB ?">
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
         <script type="text/javascript">elements=<?= $json ?></script>
         </html>
         
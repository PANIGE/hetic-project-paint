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
                    <button id="circle">
                    <i class="fas fa-save"></i>
                    </button> 
                </div>
                <div>
                    <button id="import">
                        <i class="fas fa-file-import"></i></i>
                    </button>
                </div>  
            </div>
            <div class="card">
               <div class="workspace">
                  <canvas id="myCanvas" width="848" height="480" style="border:1px solid black;"></canvas>
               </div>
               <div class="tools">
                  <div>
                     <button>
                     <i class="fas fa-square"></i>
                     </button>
                  </div>
                  <div>
                     <button>
                     <i class="fas fa-circle"></i>
                     </button>
                  </div>
                  <div>
                    <button>
                    <i class="fas fa-caret-up"></i>
                    </button>
                </div>
               <div>
                  <button>
                  <i class="fas fa-bold"></i>
                  </button>
               </div>
            </div>
         </div>
         <div class="footer">
         </div>
      </div>
      </div>
   </body>
</html>

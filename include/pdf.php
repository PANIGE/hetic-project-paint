<?php
//on doit importer dompdf//
ob_start();//charge l html dans la mémoire
require_once ("app.php");
$html=ob_get_contents; //je recuperére l html//
ob_end_clean();//enleve html de la mémoire//
$dompdf = new $dompdf();
$dompdf->loadHtml($html) ;
$dompdf->setPaper('A4','portrait');
$dompdf->render;
$fichier = 'nom-du-fichier';//je sais pas comment le recupérer// 
$dompdf->stream();

?>
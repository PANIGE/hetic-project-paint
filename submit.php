<?php 

if($_SERVER["REQUEST_METHOD"] == "POST") {

    require_once("include/SQL.php");


    $name = $_POST['NAME']; 
    $data = $_POST['JSON']; 
    $IP = $_SERVER['REMOTE_ADDR'];
    
    
    $query=$pdo->prepare('
    INSERT INTO save
    (IP, json, name)
        VALUES
            (:ip, :data, :name)
    ON DUPLICATE KEY UPDATE
            json = VALUES(json);');
    $query->execute([
        ":ip" => $IP,
        ":data" => $data,
        ":name" => $name
    ]);

}
?>
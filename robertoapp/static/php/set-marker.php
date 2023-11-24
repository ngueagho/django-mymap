<?php
$connect= new mysqli("localhost","root","","bd_mymap");

$marker_table=[];
$temp=[];

$req = $connect->query("SELECT * from villes WHERE id");
foreach ($req as $key){
    $marker_table[]=$key;
}

header('Content-Type: application/json');
echo json_encode($marker_table);

mysqli_close($connect);
?>
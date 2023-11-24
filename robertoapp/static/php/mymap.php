<?php
$connecter = new mysqli("localhost", "root","", "bd_mymap");

    $nom_ville = $_GET["nom_ville"];
    $latitude = $_GET["latitude"];
    $longitude = $_GET["longitude"];
    $req2 = $connecter->query("INSERT INTO villes (nom_ville,latitude,longitude) VALUES ('$nom_ville','$latitude','$longitude');");
    mysqli_close($connecter);
?> 
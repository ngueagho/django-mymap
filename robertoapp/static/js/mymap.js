var map = L.map('map').setView([3.8796405, 11.5455742], 10);

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
    console.log(e.latlng);
    console.log(L);
}
map.on('click', onMapClick);


function block4(){
    document.getElementById("block4").style.display = "block";
    document.getElementById("block3").style.display = "none";
}

function block3(){
    document.getElementById("block4").style.display = "none";
    document.getElementById("block3").style.display = "block";
}












window.onload = function(){
    var OpenStreetMap_Roberto = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 30,
        minZoom: 10,
        subdomains:['mt0','mt1','mt2','mt3'],
        attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        name:"tile"// permettra de ne pas supprimer la couche;
        }).addTo(map);  
        
        // gestion des champs
        let champsVille = document.getElementById('ville')
        let champsDistance = document.getElementById('distance')
        let champsValeur_distance = document.getElementById('valeur_distance')
        // let result_elmt = document.getElementById('result-list');
        let bouton=  document.getElementById('search');
        let bouton2=  document.getElementById('search2');
        const currentMarkers = [];







        bouton_recherche= document.getElementById("bouton_recherche");
        ville_recherche = document.getElementById("search");
        bouton_recherche.addEventListener('click',()=>{
            
            ville_recherche.value += " cameroun"
            alert(ville_recherche.value)
            fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + ville_recherche.value)
            .then(resultat=>resultat.json())
            .then(parsedResult=>{
                setResultList(parsedResult);
            })
            ville_recherche.value =" "
        })
        
        function setResultList(parsedResult) {
            console.log(parsedResult);
            if (parsedResult.length == 0) {
                alert("Entrez une vrai ville");
            }
            else{
                // for (let i = 0; i < parsedResult.length; i++) {
                for (let i = 0; i < 1; i++) {
                    // debut : ici on ajoute le nom de la ville sur le marker lors de la recherche 
                    var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);
                    marker.bindPopup(parsedResult[i].name)
                    // fin 
                }
                for (const marker of currentMarkers) {
                    map.removeLayer(marker);
                }
            }
            parsedResult =[];
        }
}


var marker = L.marker([3.848004, 11.5467]).addTo(map);
marker.bindPopup("<P>roberto</p>")





















// cette fonction premet de dessiner les marker sur la map
function draw_marker(){
        fetch("set-marker.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (marker_table) {
            console.log(marker_table); // Affiche le tableau complet dans la console
            let z=0;
            // Manipulez les valeurs du tableau ici
            for ( z = 0; z < marker_table.length; z++) {
                var marker = marker_table[z];
                // console.log(marker.nom_ville);
                // console.log(marker.latitude);
                // console.log(marker.longitude);
                var greenIcon = L.icon({
                    iconUrl: 'images/png.webp',
                    iconSize:     [20, 30], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [marker.latitude, marker.longitude], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                L.marker([marker.latitude, marker.longitude], {icon: greenIcon}).addTo(map);
            }
        })
        .catch(function (error) {
            console.log("Erreur : " + error);
        });
}
draw_marker();

function lancer_recherche(){
    document.getElementById("logo_itinearire").style.display = "none";
    document.getElementById("block_recherche").style.display = "none";
    document.getElementById("block_itinireraire").style.display = "block"
    document.getElementById("search2").style.display = "block";
}
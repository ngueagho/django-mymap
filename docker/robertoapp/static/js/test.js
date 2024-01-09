var map = L.map('map').setView([3.8796405, 11.5455742], 10);

function block4(){
    document.getElementById("block4").style.display = "block";
    document.getElementById("block3").style.display = "none";
}

function block3(){
    document.getElementById("block4").style.display = "none";
    document.getElementById("block3").style.display = "block";
}

function rechercher_ville(){
    bouton_recherche= document.getElementById("bouton_recherche");
    ville_recherche = document.getElementById("search").value;
    bouton_recherche.addEventListener('click',()=>{
        fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + ville_recherche)
        .then(resultat=>resultat.json())
        .then(parsedResult=>{
            setResultList(parsedResult);
        })
    })
}




function setResultList(parsedResult) {
    result_elmt.innerHTML = "";
    var greenIcon = L.icon({
        iconUrl: 'images/png.webp',
        iconSize:     [20, 30], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [parsedResult[0].lat, parsedResult[0].lon+0.5], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([parsedResult[0].lat, parsedResult[0].lon], {icon: greenIcon}).addTo(map);

    for (let i = 0; i < parsedResult.length; i++) {
        result_elmt.appendChild(liElement);
        var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);

        // debut : ici on ajoute le nom de la ville sur le marker lors de la recherche 
        var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);
        marker.bindPopup(parsedResult[i].name)
        // fin 
    }
    for (const marker of currentMarkers) {
        map.removeLayer(marker);
    }

        liElement.addEventListener('click', (event) => {
            for(const child of result_elmt.children) {
                child.classList.remove('active');
            }
            alert( "name : "+parsedResult[i].display_name + "\nlat :"+ parsedResult[i].lat + "lon:"+ parsedResult[i].lon)
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            currentMarkers.push(new L.marker(position).addTo(map));
            parsedResult =[];

        })
        alert("okkk");
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
        let result_elmt = document.getElementById('result-list');
        let bouton=  document.getElementById('search');
        let bouton2=  document.getElementById('search2');
        const currentMarkers = [];

        // champsDistance.addEventListener("change",function(){
        //     distance= this.value;
        //     champsValeur_distance.innerText = distance + "  KM"
        // })

        // champsVille.addEventListener('change', function(){
        //     // on envoi lla requette ajax vers nominatim 
        //     ajaxGet('https://nominatim.openstreetmap.org/search?q=${this.value}&format=json&addressdetails=1&limit=1&polygon_svg=1')
        //     .then(response => {
        //         console.log(responsew)
        //     })
        // })


                            // voici la fonnction qui se charge du premier type de recherche 
                            // bouton.addEventListener('click',()=>{
                            //     fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + champsVille.value)
                            //     .then(resultat=>resultat.json())
                            //     .then(parsedResult=>{
                            //         // console.log(parsedResult)
                            //         // alert(parsedResult.length)
                            //         setResultList(parsedResult);
                            //     })
                            // })





        // bouton2.addEventListener('click', ()=>{
        //     // depart= document.getElementById("ville_depart");
        //     // arrive= document.getElementById("ville_depart");
        //     // if(depart.value == ""){
        //     //     alert("veillez reseigner un depart !!!");
        //     // }else if(arrive.value == ""){
        //     //     alert("veillez reseigner une arrive !!!");
        //     // }
        //     let depart= "paris";
        //     arrive= document.getElementById("emana cameroun");
        //     // if(depart.value !="" && arrive.value != ""){
        //         if(0==0){
        //         fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + depart)
        //         .then(resultat=>resultat.json())
        //         .then(parsedResult1=>{
        //             // console.log(parsedResult)
        //             // alert(parsedResult.length)
        //             setResultList1(parsedResult1);
        //         })
        //     }
        //     // alert(arrive.value); 
        // })



        



        function setResultList1(parsedResult1) {
            result_elmt.innerHTML = "";
            console.log(parsedResult1);


            // debut: ici on centre la carte et le marker sur la recherche de l'utilisateur. 
            let ville = [51,-0.09]
            console.log(ville);
            map.panTo(ville);
            // fin



            var marker = L.marker([parsedResult1[0].lat, parsedResult1[0].lon]).addTo(map);
                var popup = L.popup()
                .setLatLng([parsedResult1[0].lat+2, parsedResult1[0].lon])
                .setContent(parsedResult1[0].address.state)
                .openOn(map);

            // for (let i = 0; i < parsedResult1.length; i++) {
            //     var marker = L.marker([parsedResult1[i].lat, parsedResult1[i].lon]).addTo(map);
            //     var popup = L.popup()
            //     .setLatLng([parsedResult1[i].lat+2, parsedResult1[i].lon])
            //     .setContent(parsedResult1[i].address.state)
            //     .openOn(map);

            // }
        }





        


        // function setResultList6(parsedResult) {
        //     result_elmt.innerHTML = "";
        //     var greenIcon = L.icon({
        //         iconUrl: 'images/png.webp',
        //         iconSize:     [20, 30], // size of the icon
        //         shadowSize:   [50, 64], // size of the shadow
        //         iconAnchor:   [parsedResult[0].lat, parsedResult[0].lon+0.5], // point of the icon which will correspond to marker's location
        //         shadowAnchor: [4, 62],  // the same for the shadow
        //         popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        //     });
        //     L.marker([parsedResult[0].lat, parsedResult[0].lon], {icon: greenIcon}).addTo(map);



        //     //debut :ici on redefinit l'icone pour identifier notre ville recherche
        //     // var greenIcon = L.icon({
        //     //     iconUrl: 'images/location_map_pin_mark_icon_148685.png',
        //     //     iconSize:     [50, 70], // size of the icon
        //     //     shadowSize:   [20, 30], // size of the shadow
        //     //     iconAnchor:   [0, 2], // point of the icon which will correspond to marker's location
        //     //     // shadowAnchor: [4, 62],  // the same for the shadow
        //     //     // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        //     // });
        //     // L.marker([parsedResult[0].lat, parsedResult[0].lon], {icon: greenIcon}).addTo(map);
        //     // L.marker([parsedResult[0].lat, parsedResult[0].lon], {icon: greenIcon}).addTo(map).bindPopup(parsedResult[0].name);
        //     // fin



        //     for (let i = 0; i < parsedResult.length; i++) {
        //         var liElement = document.createElement('li');
        //         liElement.textContent = "name : "+parsedResult[i].display_name + "\nlat :"+ parsedResult[i].lat + "lon:"+ parsedResult[i].lon;
        //         result_elmt.appendChild(liElement);
        //         var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);

        //         // debut : ici on ajoute le nom de la ville sur le marker lors de la recherche 
        //         var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);
        //         marker.bindPopup(parsedResult[i].name)
        //         // fin 
        //     }
        //     for (const marker of currentMarkers) {
        //         map.removeLayer(marker);
        //     }


        //     // map.flyTo(new L.LatLng(20.13847, 1.40625), 2);


        //     // for (const result of parsedResult) {
        //     //     const li = document.createElement('li');
        //     //     li.classList.add('list-group-item', 'list-group-item-action');
        //     //     li.innerHTML = JSON.stringify({
        //     //         displayName: result.display_name,
        //     //         lat: result.lat,
        //     //         lon: result.lon
        //     //     }, undefined, 2);



        //         liElement.addEventListener('click', (event) => {
        //             for(const child of result_elmt.children) {
        //                 child.classList.remove('active');
        //             }
        //             alert( "name : "+parsedResult[i].display_name + "\nlat :"+ parsedResult[i].lat + "lon:"+ parsedResult[i].lon)
        //             const position = new L.LatLng(clickedData.lat, clickedData.lon);
        //             currentMarkers.push(new L.marker(position).addTo(map));
        //             parsedResult =[];
        //             // event.target.classList.add('active');
        //             // const clickedData = JSON.parse(event.target.innerHTML);
        //             // const position = new L.LatLng(clickedData.lat, clickedData.lon);
        //             // map.flyTo(position, 10);
        //         })



        //     //     const position = new L.LatLng(result.lat, result.lon);
        //     //     currentMarkers.push(new L.marker(position).addTo(map));
        //     //     result_elmt.appendChild(li);
        //     // }
        // }











































        // partie qui cree la zone de recherche 
        // L.Routing.control({
        // geocoder: L.Control.Geocoder.nominatim(),
        // lineOptions:{
        //     styles: [{
        //         color: '#839c49',
        //         opacity: 1,
        //         weight:7
        //     }]
        // },
         
        // router: new L.Routing.osrmv1({
        //     language: "fr",
        //     profile: "car"
        // })
        // }).addTo(map);

        // var routeControl = L.Routing.control({
        //     waypoints: [
        //       L.latLng(4.28, 10.10),
        //       L.latLng(4.37, 11.6),
        //       L.latLng(4.55, 11.5)
        //     ]
        // }).addTo(map);
        // routeControl.on('routesfound', function(e) {
        // var routes = e.routes;
        // var summary = routes[0].summary;
        // console.log(e);
        // // alert distance and time in km and minutes
        // let heure= Math.floor(summary.totalTime/3600)
        // let minutes= (summary.totalTime - (heure*3600))/60
        // minutes = Math.round(minutes);
        // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + heure + ' heures'+ minutes+ ' minutes');
        // });

        

        // donne la latitude et la longitud du point sur lequel on cliquee
        function onMapClick(e) {
            alert("You clicked the map at " + e.latlng);
            console.log(e.latlng);
            console.log(L);
        }
        map.on('click', onMapClick);

        // L.Routing.control({
        //     geocoder: L.Control.Geocoder.nominatim()
        // }).addTo(map);
}



// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// subdomains: 'abcd',
// maxZoom: 20
// }).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<P>roberto</p>")




// var popup = L.popup()
// .setLatLng([4.40, 11])
// .setContent("mymap")
// .openOn(map);





// var icone=L.icon({
//     iconUrl:"images/png.webp",
//     iconSize: [50,50],
// })





















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

















// var greenIcon = L.icon({
//     iconUrl: 'images/png.webp',
//     iconSize:     [50, 50], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);


function lancer_recherche(){
    document.getElementById("logo_itinearire").style.display = "none";
    document.getElementById("block_recherche").style.display = "none";
    document.getElementById("block_itinireraire").style.display = "block"
    document.getElementById("search2").style.display = "block";
}


// cette fonction nous premetra de recuperer les lat et logitudes dans la base de donne afin de dessiner les marker.
function dessiner_marker(){

}

var map = L.map('map').setView([3.839855, 11.507743], 13);
let markerlist = [];
let townslist = []



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
        minZoom: 3,
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

        bouton_recherche= document.getElementById("bouton_recherche");
        ville_recherche = document.getElementById("search");
       

        // // Créez une instance du contrôleur de routage
        // let routingControl = L.Routing.control({
        //   waypoints: [
        //     L.latLng(51.5, -0.1), // Point de départ
        //     L.latLng(51.3, -0.12) // Point d'arrivée
        //   ],
        //   routeWhileDragging: true // Permet de recalculer automatiquement l'itinéraire lors du déplacement des marqueurs de départ ou d'arrivée
        // }).addTo(map);

        // // Écoutez l'événement de calcul d'itinéraire pour obtenir les détails de l'itinéraire
        // routingControl.on('routesfound', function (e) {
        //   var routes = e.routes;
        //   // Traitez les détails de l'itinéraire ici
        // });

        













        

        document.getElementById("search").addEventListener("keypress", function(e) {  
            if(e.key === "Enter"){
              fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + ville_recherche.value+ ' cameroun')
              // fetch('https://maps.googleapis.com/maps/api/geocode/json?address={ville_recherche.value}&key={AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg}')
              .then(resultat=>resultat.json())
              .then(parsedResult=>{
                  setResultList(parsedResult);
                  autoCompleteHandler("search","suggestions");
              })

            }
        })
            
        


        

        document.getElementById("depart").addEventListener("keypress", function(e) {
          if(e.key === "Enter"){
            fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + document.getElementById("depart").value+ ' cameroun')
            // fetch('https://maps.googleapis.com/maps/api/geocode/json?address={ville_recherche.value}&key={AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg}')
            
            .then(resultat=>resultat.json())
            .then(parsedResult=>{
                setResultList(parsedResult);
                document.getElementById("suggestions_itin2").innerHTML = ''
                autoCompleteHandler("depart","suggestions_itin1");
                return;
            })

          }
        })

        document.getElementById("arrive").addEventListener("keypress", function(e) {
          if(e.key === "Enter"){
            fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + document.getElementById("arrive").value+ ' cameroun')
            // fetch('https://maps.googleapis.com/maps/api/geocode/json?address={ville_recherche.value}&key={AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg}')
            
            .then(resultat=>resultat.json())
            .then(parsedResult=>{
                setResultList(parsedResult);
                document.getElementById("suggestions_itin1").innerHTML = ''
                autoCompleteHandler("arrive","suggestions_itin2");
                return;
            })

          }
        })


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
                // alert("Entrez une vrai ville");
            }
            else{
              removeMarkers()
              for (let i = 0; i < parsedResult.length; i++) {
                  console.log( "name : "+parsedResult[i].display_name + "\nlat :"+ parsedResult[i].lat + "lon:"+ parsedResult[i].lon);
                    // debut : ici on ajoute le nom de la ville sur les markers lors de la recherche 
                    //on se doit d'effacer le mot camerou a la fin pour les future recherche et on le stocke dans new name
                    let new_name = parsedResult[i].display_name.replace(/, Cameroon\b/,"");
                    destination.push(new_name)
                    
                    var marker = L.marker([parsedResult[i].lat, parsedResult[i].lon]).addTo(map);
                    marker.bindPopup(parsedResult[i].name)
                    markerlist.push(marker);
                    // fin 
              }
            }
            /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
            
            console.log(destination)
            // destination.splice(0,destination.length);
            
            // parsedResult =[];
          }
}


function geolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          alert(latitude +"  et   "+ longitude);
          // Faites quelque chose avec les coordonnées (latitude, longitude) ici
            // nous allons afficher un marker sur cette position.
            var marker_roberto = L.marker([latitude, longitude]).addTo(map);
            marker_roberto.bindPopup("<P>ROBERTO your location</p>")
        }, function(error) {
          // Gestion des erreurs
          console.log(error.message);
        });
      } else {
        console.log("La géolocalisation n'est pas supportée par ce navigateur.");
      }
}
geolocation();




function removeMarkers() {
  markerlist.forEach(function(markerlist) {
    markerlist.removeFrom(map);
  });
  // Videz le tableau des marqueurs
  markerlist = [];
}



















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




let destination = ["Italy", "Spain", "Portugal", "Brazil", "Brazi", "Brazil"];




function autoCompleteHandler(id,field) {
  let inputField = document.getElementById(id);
  let ulField = document.getElementById(field);
  ulField.addEventListener('click', selectItem);
  changeAutoComplete();

  function changeAutoComplete() {
    let data = inputField.value;
    ulField.innerHTML = '';
    if (data.length) {
      let autoCompleteValues = autoComplete(data);
      autoCompleteValues.forEach(value => {
        addItem(value);
      });
    }
  }

  function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  function autoComplete(inputValue) {
    const normalizedInputValue = removeDiacritics(inputValue.toLowerCase());
    return destination.filter((value) => {
      const normalizedValue = removeDiacritics(value.toLowerCase());
      return normalizedValue.includes(normalizedInputValue);
    });
  }

  function addItem(value) {
    ulField.innerHTML += `<li>${value}</li>`;
  }

  function selectItem({ target }) {
    document.getElementById(id).value = ''
    if (target.tagName === 'LI') {
      inputField.value = target.textContent;
      ulField.innerHTML = '';

      // fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + target.textContent)              
      // .then(resultat=>resultat.json())
      // .then(parsedResult=>{
      //     removeMarkers()
      //     var marker = L.marker([parsedResult[0].lat, parsedResult[0].lon]).addTo(map);
      //     marker.bindPopup(parsedResult[0].name)
      //     markerlist.push(marker);
      //     //pour tracer la route 
      //     // autoCompleteHandler(id,field);
      //     return;
      // })  
    }
  }
  // return 0;
 
}

















function tracer_route() {
  let lat1, lat2, lon1, lon2;

  // Effacer tous les marqueurs sur la carte
  removeMarkers();

  if (document.getElementById("depart").value === "" || document.getElementById("arrive").value === "") {
    // Gérer le cas où les champs de départ ou d'arrivée sont vides
  } else {
    let depart = document.getElementById("depart").value;
    let arrive = document.getElementById("arrive").value;
    console.log(depart)
    alert(arrive)
    Promise.all([
      fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + depart + ' cameroun'),
      fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + arrive + ' cameroun')
    ])
      .then(respon => Promise.all(respon.map(respons => respons.json())))
      .then(parsedResul => {
        console.log(parsedResul);
        lat1 = parsedResul[0][0].lat;
        lon1 = parsedResul[0][0].lon;
        lat2 = parsedResul[1][0].lat;
        lon2 = parsedResul[1][0].lon;
        console.log(lat1)
        console.log(lon1)
        console.log(lat2)
        console.log(lon2)


        // Créez une instance du contrôleur de routage
        var routingControl = L.Routing.control({
          waypoints: [
            L.latLng(lat1, lon1), // Point de départ
            L.latLng(lat2, lon2) // Point d'arrivée
          ],
          routeWhileDragging: true // Permet de recalculer automatiquement l'itinéraire lors du déplacement des marqueurs de départ ou d'arrivée
        }).addTo(map);

        routingControl.on('routesfound', function (e) {
          // Le reste de votre code pour le style du tableau...
        });
      })
      .catch(error => {
        // Gérer les erreurs lors de l'appel à Nominatim
      });
  }
}
















// function tracer_route(){
//   let lat1,lat2,lon1,lon2;
//   // effacer tout les marker sur la carte
//   removeMarkers()
//               if(document.getElementById("depart").value === "" || document.getElementById("arrive").value === "")
//               {
//               }
//               else{
//                 let depart = document.getElementById("depart").value
//                 let arrive = document.getElementById("arrive").value
//                 alert(document.getElementById("depart").value)
//                 alert(document.getElementById("arrive").value)
//                 fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + depart+ ' cameroun')                
//                 .then(resultat=>resultat.json())
//                 .then(parsedResult=>{
//                   alert("ready for the road");
//                   alert(parsedResult)
//                   console.log(parsedResult)
//                    lat1= parsedResult[0].lat
//                    lon1= parsedResult[0].lon
//                 })
                

//                 fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + arrive+ ' cameroun')                
//                 .then(resultat=>resultat.json())
//                 .then(parsedResult=>{
//                    lat2= parsedResult[0].lat
//                    lon2= parsedResult[0].lon
//                 })
                
                
//                 // Créez une instance du contrôleur de routage
//                 var routingControl = L.Routing.control({
//                   waypoints: [
//                     L.latLng(lat1, lon1), // Point de départ
//                     L.latLng(lat2, lon2) // Point d'arrivée
//                   ],
//                   routeWhileDragging: true // Permet de recalculer automatiquement l'itinéraire lors du déplacement des marqueurs de départ ou d'arrivée
//                 }).addTo(map);

//                 routingControl.on('routesfound', function (e) {
//                   var routes = e.routes;

//                   // Ajouter un délai avant de modifier le style
//                   setTimeout(function() {
//                     // Récupérer le tableau des détails de l'itinéraire
//                     var table = document.querySelector('.leaflet-routing-container table');
                    
//                     if (table) {
//                       // Modifier les styles du tableau...
//                       console.log(table)

//                       // Modifier les styles du tableau
//                       table.style.backgroundColor = '#f2f2f2';
//                       table.style.border = '1px solid #ccc';


//                       // Masquer l'élément parent du tableau
//                       var parentElement = table.parentNode;
//                       parentElement.style.maxHeight = '500px';
//                       parentElement.style.overflowY= 'auto';
                      
//                       // Modifier les styles des cellules du tableau
//                       var tableCells = table.querySelectorAll('td');
//                       tableCells.forEach(function(cell) {
//                         cell.style.padding = '5px';
//                         cell.style.border = '1px solid #ccc';
//                       });
                      
//                       // Modifier les styles des lignes paires du tableau
//                       var tableRowsEven = table.querySelectorAll('tr:nth-child(even)');
//                       tableRowsEven.forEach(function(row) {
//                         row.style.backgroundColor = '#e6e6e6';
//                       });
                      
//                       // Modifier les styles de la première ligne du tableau
//                       var tableFirstRow = table.querySelector('tr:first-child');
//                       tableFirstRow.style.fontWeight = 'bold';  
//                     }
//                   }, 100);
//                 });
              
//               }
// }


// function tracer_route() {
//   alert("Ready for the road");

//   if (document.getElementById("depart").value === "" || document.getElementById("arrive").value === "") {
//     // Handle empty inputs if needed
//   } else {
//     // Create an instance of the routing control
//     var routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(51.5, -0.1), // Departure point
//         L.latLng(51.3, -0.12) // Arrival point
//       ],
//       routeWhileDragging: true // Recalculate the route automatically when dragging the start or end markers
//     }).addTo(map);

//     routingControl.on('routesfound', function (e) {
//       var routes = e.routes;
//       console.log(routes);

//       // Add a delay before modifying the style
//       setTimeout(function () {
//         // Get the table element containing the route details
//         var table = document.querySelector('.leaflet-routing-container table');

//         if (table) {
//           // Modify the table styles
//           table.style.backgroundColor = '#f2f2f2';
//           table.style.border = '1px solid #ccc';
//           table.style.width = '100%';

//           // Position the table at the left corner of the page
//           table.style.position = 'absolute';
//           table.style.top = '0';
//           table.style.left = '0';

//           // Hide the parent element of the table
//           var parentElement = table.parentNode;
//           // parentElement = parentElement.parentNode;
//           // parentElement = parentElement.parentNode;
//           parentElement.style.position = 'relative';
//           parentElement.style.top = '500px';
//           parentElement.style.paddingTop = '200px';
//           parentElement.style.overflowY = 'auto';
//           // parentElement = parentElement.parentElement;
//           // parentElement.style.display = 'none';
//         }
//       }, 100);
//     });
//   }
// }
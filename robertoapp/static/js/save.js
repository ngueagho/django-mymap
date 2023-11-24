function save() {
    let nom_ville =document.getElementById('nom_ville').value;
    let latitude= document.getElementById('latitude').value;
    let longitude= document.getElementById('longitude').value;

    //debut de la requette asynchrone avec ajax
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "mymap.php?nom_ville="+nom_ville + "&latitude="+latitude +"&longitude="+longitude ,true)
    xhr.send();
    alert("partie")
}


// cette fonction nous premetra de recuperer les lat et logitudes dans la base de donne afin de dessiner les marker.
function draw_marker(){
    // let xml = new XMLHttpRequest() ;
    // xml.onreadystatechange = function (){
    //     if (xml.readyState == 4 && xml.status ==200){
    //         alert ("-------------->  "+this.response);
    //         console.log(this.response);








    //     }
    // }
    // xml.open("GET","set-marker.php", true)
    // xml.send()












}
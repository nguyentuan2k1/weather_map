var mymap = L.map('mapid');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVvdmFubWVveHgiLCJhIjoiY2tyNHRpdW53Mno0MDJ2bzhzZXU2OXZhdSJ9.z9bdsi-GlnxmToSg5njRcA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 10,
    //  zoom:-2,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidGVvdmFubWVveHgiLCJhIjoiY2tyNHRpdW53Mno0MDJ2bzhzZXU2OXZhdSJ9.z9bdsi-GlnxmToSg5njRcA'
}).addTo(mymap);

var iconxx = L.icon({
    iconSize: [20,20],
    iconUrl: 'img/map-origin.svg'

});
//var iconurl = "https://lh3.googleusercontent.com/proxy/mNhHjrTXxoO54NRdrquf4L2eqJa0_aQUvnnL0GzTWAoP9zva1ENOy-wR6ZtG_kX5vF3M1bN344N8uRWzAaT3OybS16gBUAOLeR_MBfCx-H4GYUK9DVyuFzwS9iaek6Syj2JkQKdXwFttlcvLvGhwEfe9OIFJ8Azx5w";

var markerold ;
var markerfirst ; 

mymap.on('click',(element)=>{
    if(markerfirst != undefined)
    {
        mymap.removeLayer(markerfirst);
    }
    //let url2 = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=79301b378464f8229c8cd05137e2f33d"
    
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+element.latlng.lat+'&lon='+element.latlng.lng+'&lang=vi&appid=79301b378464f8229c8cd05137e2f33d';
    fetch(url)
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
      console.log(data);
        if(markerold!= undefined)
        {
            mymap.removeLayer(markerold);
        }
        let weather = data.weather[0].description;
        let temp = Math.round(data.main.temp - 273.15);
        let icon = data.weather[0].icon;
        let marker = L.marker([element.latlng.lat,element.latlng.lng], { icon: iconxx }).addTo(mymap).bindPopup('Your position is in:'+data.name+'<br>'+datatoPopup(weather,temp,icon)+'').openPopup();        ;
        markerold = marker;
    //    document.querySelector('.leaflet-pane .leaflet-marker-pane').click;


    })
       // mymap.fitBounds(marker.getBounds());

})


navigator.geolocation.getCurrentPosition(success,error);

function success(pos) {
    var crd = pos.coords;
    
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+crd.latitude+'&lon='+crd.longitude+'&lang=vi&appid=79301b378464f8229c8cd05137e2f33d';
    fetch(url)
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        console.log(data);
        let weather = data.weather[0].description;
        let temp = Math.round(data.main.temp - 273.15);
        let icon = data.weather[0].icon;
        let marker = L.marker([crd.latitude,crd.longitude], { icon: iconxx }).addTo(mymap);
        mymap.setView([crd.latitude, crd.longitude],18);
        markerfirst = marker;
        marker.bindPopup('Your position is in:'+data.name+'<br>'+datatoPopup(weather,temp,icon)+'').openPopup();


    })
    
   
  };

  function error(error)
  {
    mymap.setView([16.0669077, 108.2137987], 8);
  }
  

  function datatoPopup(weather,temp,icon){
    let data ='<div style="display:flex; align-items: center;"><div> Weather:'+weather+'<br>Temp:'+temp+'&#186C<br></div><div style="margin-left:0.375rem;padding-left:1rem;text-align:center;border-left:0.0625rem solid black;"><img class="img-weather" src="img/'+icon+'.png"></div></div>'
    return data;
}
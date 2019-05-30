var express = require("express");
var bodyParser = require("body-parser");
const fetch = require('node-fetch');

var app = express();
var jsonParser = bodyParser.json();

var result;
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 3000;

let latitude, longitude;

app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/api", jsonParser, function(request, response){
  latitude = request.body.latitude;
  longitude = request.body.longitude;
  if ((latitude === undefined) || (longitude === undefined)) {
    latitude = 49.233123;
    longitude = 28.468439;
  }
  var urlAPI = 'https://api.darksky.net/forecast/af49ee175e30af7db4effabdaa3956e6/' + latitude + ',' + longitude;
  fetch(urlAPI)
      .then(res => res.json())
      .then(json => result = json)
      .then(() => {
        if (result.currently.icon == 'clear-day') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/sun-icon-64-2033094031.png' + '" alt="clear-day">';
        if (result.currently.icon == 'clear-night') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/moon-icon-64-1178664423.png' + '" alt="clear-night">';
        if (result.currently.icon == 'rain') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/rain-icon-64.png' + '" alt="rain">';
        if (result.currently.icon == 'snow') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/snow-icon-64.png' + '" alt="snow">';
        if (result.currently.icon == 'sleet') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/sleet-icon-64.png' + '" alt="sleet">';
        if (result.currently.icon == 'wind') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/wind-turbine-icon-64.png' + '" alt="wind">';
        if (result.currently.icon == 'fog') result.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/fog-day-icon-64.png' + '" alt="fog">';
        if (result.currently.icon == 'cloudy') result.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/clouds-icon-64.png' + '" alt="cloudy">';
        if (result.currently.icon == 'partly-cloudy-day') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/partly-cloudy-day-icon-64.png' + '" alt="partly-cloudy-day">';
        if (result.currently.icon == 'partly-cloudy-night') result.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/partly-cloudy-night-icon-64.png' + '" alt="partly-cloudy-night">';
        if (result.currently.icon == 'hail') result.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/hail-icon-64.png' + '" alt="hail">';
        if (result.currently.icon == 'thunderstorm') result.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/1665515987.png' + '" alt="thunderstorm">';
        if (result.currently.icon == 'tornado') result.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/13945230231448270544.png' + '" alt="tornado(Все дуже погано)">';
        response.send(result);
      });
  });

app.listen(PORT, function(){
    console.log(`App started on http://localhost:${PORT}`);
});

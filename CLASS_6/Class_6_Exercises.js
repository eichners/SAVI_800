exercise code from Class 6

EXERCISE 1

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>

  <style>
  html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#map {
  width: 100%;
  height: 100%; 
}
</style>

</head>
<body>
  <div id="map"></div>
</body>
</html>

//JAVASCRIPT:
// Leaflet: styling circle markers
//
// Show the top 25 most expensive AirBnB rentals in New York
// using CartoDB's SQL API.
//

$(document).ready(function() {
      // Create a map centered on NYC
      var map = L.map('map').setView([40.731649, -73.977814], 10);

      // Add a base layer. We're using Stamen's Toner:
      //  http://maps.stamen.com/#toner
      L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        maxZoom: 18
      }).addTo(map);

      // Ask CartoDB for the top 25 most expensive features, as GeoJSON
      $.getJSON('https://eric.cartodb.com/api/v2/sql?q=SELECT * FROM airbnb2 ORDER BY price DESC LIMIT 25&format=GeoJSON')

      // When it's done, add the results to the map
      .done(function(data) {
        L.geoJson(data, {

          style: function(feature) {
              console.log(feature.properties);
              var style = {
                fillColor: 'red',
                fillOpacity: 0.4,
                radius: feature.properties.price / 500,
                stroke: false
              };
              if (feature.properties.price > 4000) {
                style.fillColor = 'orange';
                style.stroke = true;
                style.weight=1;
                style.color='black';
                style.opacity = 1;
                
              }
              return style;

            },
            // Create circles instead of standard markers
            //
          pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
          },
        }).addTo(map);
      });
});

      //
      // Use an object to style the circle markers.
      //
      // If you wanted to, you could make this a function
      // that takes the feature and returns a style specific
      // to that feature.
      //
      /*
      style: {
        fillColor: '#0f0f91',
        fillOpacity: 0.5,
        radius: 8,
        stroke: false
      }
      */
      //style: function (feature) {
      // var style = {
      //   fillColor: '#0f0f91',
      //  fillOpacity: 0.5,
      //  radius: 8,
      //  stroke: false
      // };
      //if (feature.properties.price > 4000) {
      // style.fillColor = 'red';
      //}
      // return style;
      //}
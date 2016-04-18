// Leaflet: styling circle markers
//
// Show the top 25 most expensive AirBnB rentals in New York
// using CartoDB's SQL API.
//

$(document).ready(function () {
  // Create a map centered on NYC
  var map = L.map('map').setView([40.588928,-73.781776], 10);
  
  // Add a base layer. We're using Stamen's Toner:
  //  http://maps.stamen.com/#toner
  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    maxZoom: 18
}).addTo(map);

  // Ask CartoDB for the top 25 most expensive features, as GeoJSON
  $.getJSON('http://eric.cartodb.com/api/v2/sql?q=SELECT * FROM airbnb2 ORDER BY price DESC LIMIT 25&format=GeoJSON')

    // When it's done, add the results to the map
    .done(function (data) {
      L.geoJson(data, {
        //
        // Create circles instead of standard markers
        //
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        },
         onEachFeature: function(feature, layer){
        layer.bindPopup ('This place is in ' +  feature.properties.neighbourhood + ' and it costs $' + feature.properties.price + ' a night.');
          },
        //
        // Use an object to style the circle markers.
        // If you wanted to, you could make this a function
        // that takes the feature and returns a style specific
        // to that feature.
        /*
        style: {
          fillColor: '#0f0f91',
          fillOpacity: 0.5,
          radius: 8,
          stroke: false
        }
        */
        style: function (feature) {
          var style = {
            fillColor: '#red',
            fillOpacity: 0.5,
            radius: feature.properties.availability_365 / 20,
            stroke: 1,
            color: 'black'
          };
          if (feature.properties.price > 1000 && feature.properties.price <= 4000) {
            style.fillColor = 'orange';
          }
          else if (feature.properties.price > 4000) {
            style.fillColor = 'red';
          }
          return style;
        }
      }).addTo(map);   
    });
});
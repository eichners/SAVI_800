$(document).ready(function () {
  var map = L.map('map').setView([45.489502,-73.578873], 10);
  
  // Add a base layer. We're using Stamen's Toner:
  //  http://maps.stamen.com/#toner
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
maxZoom: 19
}).addTo(map);

  console.log('anything');
  // Ask CartoDB for the top 25 most expensive features, as GeoJSON


  $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT * FROM listings &format=GeoJSON')
    .done(function (data) {
      L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        },

        style: function (feature) {
          var value = feature.properties.listings;
              var style = {
                radius: 4,
                stroke: false,
                fillOpacity: 0.5,
                fillColor: 'red'
              };
         return style;
         }
       //}).addTo(map);  
      
      }).addTo(map);  
    });
})
$(document).ready(function () {
  var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT MIN(price) AS minimum, MAX(price) AS maximum, AVG(price) AS average FROM listings'
  });
  $.getJSON(url)

     .done(function (data) {
      $('.total').text(data.rows[0].count);
      $('.average').text(data.rows[0].avg);
      $('.minimum').text(data.rows[0].min);
      $('.maximum').text(data.rows[0].max);
    });
});




//'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png' 

function addTileLayer(map) { 
	L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
	   attribution: 'Map tiles by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	    maxZoom: 18
	}).addTo(map);
}

  // add sql data from cartodb odd lots file	
function addDataToMap(dataLayer, choice) {
  var sql =  'SELECT * FROM bk_oddlots ';
   //  if ('$(this).val() === ownertype') {
   //    }
  	// else { 
  	// 	sql = 'WHERE ownertype = "' +  ("$(this.val()) + '");
  	// }

  var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
      q: sql,
      format: 'GeoJSON'
  });
  $.getJSON(url)
    
  // When it's done, add the results to the map
    .done(function (data) {
    dataLayer.clearLayers();
    dataLayer.addData(data);
    console.log(data);

  });
}
   
$(document).ready(function () {
var map = L.map('map').setView([40.731649,-73.977814], 10);
var dataLayer = L.geoJson(null).addTo(map);

  addTileLayer(map);
  addDataToMap(dataLayer);
 
  $('.choice').change(function() {
    addDataToMap(dataLayer, $(this).val());
 
          var oddlotsLayer = data
          var lotStyle = {
           color: '#ff4000',
           fillColor : "#ff4000",
           weight: 3,
           opacity: 0.9
           };

        var lotClick = function (feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.address + "</strong>" + "," + "<br/>" + feature.properties.ownername );
        }
     
        oddLotsData = L.geoJson(dataLayer, {
          style: lotStyle,
          onEachFeature: lotClick
        }).addTo(map); 
        
        map.fitBounds(oddLotsData.getBounds());
  });
    });

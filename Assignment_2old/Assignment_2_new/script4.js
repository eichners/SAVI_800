
$(document).ready(function() {
      var map = L.map('map').setView([40.731649, -73.977814], 10);

//function addTileLayer(map) {
	L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
	   attribution: 'Map tiles by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	    maxZoom: 18
	}).addTo(map);


	function addDataToMap(dataLayer) {

	  var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
	  	q: 'SELECT * FROM bk_oddlots',
//	      q: sql,
	    format: 'GeoJSON'
	  });

	$.getJSON(url)

	    .done(function (data) {
		console.log(data);
		var oddlotsLayer = L.geoJson(data, 
			onEachFeature: function(feature,layer)  {
				Layer.on('click',function() {
					var $content = $('<div></div>')
					$content.text(<strong>feature.properties.address</strong> + "," + "<br/>" + feature.properties.ownername);
				layer.bindPopup($content.html()).openPopup();
				});
			}),

		style = {
			color: '#ff4000',
			fillColor : "#ff4000",
			weight: 3,
		    opacity: 0.9
		},
	    
		oddLotsLayer.eachLayer(function (layer) {
			console.log(layer.feature.properties);
		}
		}).addTo(map); 
		     

		//    dataLayer.clearLayers();
	 	  // 	dataLayer.addData(data);
	console.log(data);	

		//addTileLayer(map);
  	addDataToMap(oddlotsLayer);
};

//});




// move to below style definitions so it gets called after styles and data are defined
// use empty parameter rather than data so that it is empty and doesn't load twice
var wreckClickLayer= L.geoJson(null, {
pointToLayer: wrecClickPointToLayer
}):

// need to create an empty layer to define clearLayer so move 

map.on('click', function(e) {
	clickLat = e.latlng.lat;
	clickLng= e.latlng.clickLng
	var url3 =  cartodb. etc. + $.param({
	q: 'SeLECT * WHERE ST_DWIthin(the_geom_wemercatro, ST_Transform(CDB_LatLng('clickLat + ', + clickLng + '), 3857), 5000)',
	 format: 'GeoJSON'
		}):

//moved L.geJson definition up, so now need to add data

$.getJSON(url2).done(Function(data){
	wreckClickLayer.clearLayers();
	wreckClickLayer.addData(data);
	// now styles are broken: move the var wreckClickLayer = L.geoJson(null, etc... from top to below this)
wreckClickLayer = L.geoJson(data, {
	pointToLayer: wrecClickPOintTOLayer
}):
wreckClickLayer,addTo(map);
});

var wreckClickLayer= L.geoJson(null, {
	pointToLayer: wreckClickPointToLayer
}):



ON EACH FEATURE
OPTIONAL, loops over data; when calling it later it's set 
within onEachFeature you can have as many events as you want, 

----------------------------------------------------------------------
CARTODB.JS

add a dibe cakkbacj',dibe truggered wgeb vusyakuzatuib us created
cartodb.createVis(....) Just like (document).done (function(data))
.done(function(vis, layers) {
	console.log('vis loaded!);
layers is an array of layershere are mthods like in jquery like layer.show(
	layer.setOpacity(opacitysetting here)
	
	cartodb.createVis(....) 
.done(function(vis, layers) {
	layers[1].hide();

Layers[1]
Is everything in the visualization. This is where you can get to all data and layers in visualization


});
});
.done(function)etc.
/\ /\
when a semicolon comes in front of a .done, access is cut off to data in front. 
WONT WORK.

sublayers give you access to everything you ahve in CartoDB UI SQL etc,  one can change things like the SQL dynamically

- this method is faster because CDB data is rasterized

Getting data from sublayers: the code below worked:

$(document).ready(function () {
	cartodb.createVis('map', 'https://eichnersara.cartodb.com/api/v2/viz/67189420-0106-11e6-857c-0ecd1babdde5/viz.json',{
		cartodb_logo: false,
		search: false,
					  
	})
.done(function(vis, layers){
	
	console.log(layers[0]);
	layers[1].setOpacity(0.9);

	//layers[1].getSubLayer(1).hide();
	var sublayer = layers[1].getSubLayer(1);
	sublayer.setSQL('SELECT * FROM listings limit 30');
});
});

create layer at top and set in .done functionif to use a sublayer 

still use jquery to pick anything on the page - use console to find what is what and hide it if unwanted


Code as of exercise 4
$(document).ready(function () {
	
  var cheapLayer;
  var expensiveLayer;
	
  cartodb.createVis('map', 'https://eichnersara.cartodb.com/api/v2/viz/67189420-0106-11e6-857c-0ecd1babdde5/viz.json',{
	cartodb_logo: false,
	search: false,
	})
	
  .done(function(vis, layers){
	console.log(layers[0]);
	 // cheapLayerStyle = function
	  // moved variable cheapLayers up top so instead of var cheapLayer =, just leave all the same but take away var

	  cheapLayer=layers[1].getSubLayer(1);
	  expensiveLayer=layers[1].getSubLayer(1);
  });
	
  $('.mapButton').on('click',function() {
     cheapLayer.setSQL("SELECT * FROM listings WHERE price < 50");
	});
	

  $('.mapButton2').on('click', function() {
	 expensiveLayer.setCartoCSS('#listings{marker-fill:green;}');
		
		// this has to look just like it does in cartodb. cut and paste
	});

});

//'map = vis.getnativemap'

HTML:
<!DOCTYPE html>
<html>
<head>
	<title>spatial sql 1</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
	 <script type="text/javascript" src="jQuery/jquery-1.11.2.min.js"></script>
	<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
	  <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.12/themes/css/cartodb.css" />
	  <script src="http://libs.cartocdn.com/cartodb.js/v3/3.12/cartodb.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
  <!-- Load cartodb.js -->

  <title>JS Bin</title>
</head>
<body>
	<div id='map'</div>
	<button class ="mapButton">cheap</button>
	<button class ="mapButton2">expensive</button>
		<button class ="mapButton3">text here</button>
</body>
</html>

CSS:
body {
    padding: 0;
    margin: 0;
}
html, body, #map {
    height: 100%;
}
.mapButton {
  margin: 5px;
  width: 150px;

}
.mapButton2 {
  margin: 5px;
  width: 150px;

}
.mapButton3 {
  margin: 5px;
  width: 150px;

}
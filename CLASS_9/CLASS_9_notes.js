
// move to below style definitions so it gets called after styles and data are defined
// use empty parameter rather than data so that it is empty and doesn't load twice
// var wreckClickLayer= L.geoJson(null, {
// 	pointToLayer: wrecClickPointToLayer
// }):

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
})


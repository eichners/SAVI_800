SPATIAL SQL 
BULIT ON POSTGIS

you don't need cartodb to use POSTGIS installed on computer so not for this class

BUFFERING POINTS
500 meter points 
geometry ST_Buffer(geometry) g1, radius);

SELECT cartodb_id, ST_Buffer(the_geom_webmercator, 500) AS the_geom_webmercator
FROM listings
LIMIT 5

WHY USE AS?
without as, the column name for webmercator becomes "geometry"
geom_webmercator is needed if you want to map anything in cartodb so name is important

changes points to polygons

The_geom vs : always in wgs84
the_geom_webmercator : always in web mercator, always in meters

tiles are in webmercator : defacto web projection
both fields get updated when data is changed in cartodb
web mercator is in EPSG 3857

this is what you need for geoJSON: make a column the_geom for leaflet or non-cartodb maps
SELECT ST_Transform(ST_Buffer(the_geom_webmercator, 500), 4326) AS the_geom FROM listings

/////////////////////////////////////////////////////////////////
CONVEX HULL:
USE TO GROUP A FEW POINTS OR GEOMETRIES 
kind of lke the SELECT AVG(price)

in cartodb:
SELECT ST_Collect(the_geom_webmercator) 
AS the_geom_webmercator 
FROM 
use GROUP 

SELECT ST_Convexhull(ST_Collect(the_geom_webmercator))
AS the_geom_webmercator 
FROM listings
GROUP BY neighbourhood

AGGREGATE or dissolve
a dissolve from qgis is called "ST_Union" in POST GIS 

ST_DWithin
gets features wthin a certain distance of apont

go to slides from clas 8 for text for thisi

SELECT * FROM crashes WHERE ST_DWithin(the_geom_webmercator)

ST_X gets x coordinate

under ST documentation, lots of functions that use spatial relations 

///////////////////
CARTO DB HAS TUTORIALS AND VIDEOS FOR REFERENCE

///////////////////////////////////

CARTODB.JS  
make maps on cartobd host on own webpage
you can use sql changes to change what shows on map rather than using javascript
Leaflet is slower with lots of data

another library, use more code from cartodb cdn for .js and .css 
look in documentatino for links
create a div id = "map" just like other maps

$(document).ready(function (){
	cartodb.createVis('map', 'big url string from cartodb.js publish  - copy');
});
})

html:

---------------------------------------------
code from class:

<script>

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

 $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_Buffer(the_geom_webmercator, 1000), 4326) AS the_geom FROM listings WHERE price > 400 &format=GeoJSON')
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
        }).addTo(map);  
    });
	 $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_Convexhull(ST_Collect(the_geom_webmercator)), 4326) AS the_geom FROM listings GROUP BY neighbourhood&format=GeoJSON')
   .done(function (data) {
	  L.geoJson(data, {

        style: function (feature) {
            var value = feature.properties.listings;
                var style = {
                radius: 4,
                stroke: false,
                fillOpacity: 0.5,
                fillColor: 'green'
                };
           return style;
        }
        }).addTo(map);  
    });
});

</script>
Tried above code and did not get it to work.
Code below worked from class 8 JSbin:

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

 $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_Buffer(the_geom_webmercator, 1000), 4326) AS the_geom FROM listings WHERE price > 400 &format=GeoJSON')
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
        }).addTo(map);  
    });
   $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_Convexhull(ST_Collect(the_geom_webmercator)), 4326) AS the_geom FROM listings GROUP BY neighbourhood&format=GeoJSON')
   .done(function (data) {
    L.geoJson(data, {

        style: function (feature) {
            var value = feature.properties.listings;
                var style = {
                radius: 4,
                stroke: false,
                fillOpacity: 0.5,
                fillColor: 'green'
                };
           return style;
        }
        }).addTo(map);  
    });
});

CSS:
body {
    padding: 0;
    margin: 0;
}
html, body, #map {
    height: 100%;
}
#map {
    height: 100%;
    width: 100%;
}

HTML:
<!DOCTYPE html>
<html>
<head>
  <title>spatial sql 1</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
   <script type="text/javascript" src="jQuery/jquery-1.11.2.min.js"></script>
  <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />

  <title>JS Bin</title>
</head>
<body>
  <div id='map'</div>
</body>
</html>
// two ways to use coordinates from an api


first a variable of coordinates was created so the below code does not do it all
see jsbins from 4/6 streetview 

 The .join jquery command concatinates. It takes everything in an array 
 and joins them and inserts whatever is between quotes in between each 
 element or feature or whatever it is.
.reverse() reverses the order of the array often needed for lat long

with the following array: [40.12374, -73.019283074]
location: coordinates.reverse().join(',')
will return: -73.019283074, 40.12374

or 

location: coordinates [1] + ',' + coordinates [0]

above is the more standard way to concantinate data from arrays

go to mozilla developer to find other methods for using data from arrays

maps.googleapi

general practice is to definte functions at top, making them global
function getStreetview(lat,lng) {

}


// function callback or call

var coordinates = data.features [0].geomoetry.coordinates;
getStreetview)

// leaflet events

**** SUBLIME PLUGINS: 
js.format helps to format and clean up indentations
go to jsFormat and read documentation


LEAFLET STYLES

styling GeoJSON layers
go to documentation for geojson doc on leaflet page
look under PATH for differnet options or identifiers or 
first paramter is data, then the second parameter (still in paranthesis) 
is in curly brackets and is the OBJECT, 
use style key value pairs for this: style: 

L.geoJson(data, {
    style: function (feature) {
    	console.log(feature.properties);
    	var style = {
    		fillColor: 'red',
    		fillOpacity: feature.properties.price/8000.0,
    		radius: feature.properties.price/5000.0,
    	};
    	if (feature.ropterties.price > 4000) 
    		{style.fillColor='red';
    }
        return style;
    },
    pointToLayer: function (feature, latlng) {
    	return L.circleMarker(latlng);
    }
});.addTom(map);

point to layers creates a layer that translates data to markes. without we will 
have default markers
pointToLayer takes two options latlng, 
parses lat long and passes along with the properties of that feature to the point/marker
l.circleMarker on the map and will then look for a style function to tell how to style markers

order of options does not matter
other options can come between

**** afer each key value there is a comma between , so when two objects are part of a key 
value, there should be a comma after the first object curly bracket

    }]

        {color: feature.properties.color};
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.description);
    }
}).addTo(map);

set up base style oject for all features (must be declared with style:)
// ************ 
homeowrk #2 
for drop down info or select thing -- must come after call back for data 
	which is usually .done and whatever is in the function for that .done call

events
l.geoJson
onEachFeature
no need for listeners with leaflet, 
a function that takes 

popups
.leaflet-popup {
	style here: 
}

dynamic popuups you need click handler 
example on jsbin from class 6 for this

FROM POPUP WINDOW EXERCISE:
Leaflet: styling circle markers
//

//

$(document).ready(function () {
  // Create a map centered on NYC
  var map = L.map('map').setView([40.731649,-73.977814], 10);
  
  // Add a base layer. We're using Stamen's Toner:
  //  http://maps.stamen.com/#toner
  L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    maxZoom: 18
}).addTo(map);

  // Ask CartoDB for the top 25 most expensive features, as GeoJSON
  $.getJSON('https://eric.cartodb.com/api/v2/sql?q=SELECT * FROM airbnb2 ORDER BY price DESC LIMIT 25&format=GeoJSON')

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
        layer.bindPopup ('this place is in the ' +  feature.properties.neighbourhood + ' and it costs $' + feature.properties.price + ' a night');
          },
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

HOMEWORK

pick a leaflet plugin and READ documentation carefully



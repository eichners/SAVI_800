var map = L.map('map').setView([40.71,-73.93], 12);

// set a tile layer to be CartoDB tiles

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
maxZoom: 19
}).addTo(map);

// two datasets, both geojson:
// should I leave parameters empty and load at end? if so, how is that var defined?
// I can nadd data name here (NYBBPolygon) or at start of function which would be defined here 
// and framed around function


//var NYBBgeoJSON;
//NYBBgeoJSON.addTo(map);

var datalayer = L.geoJson(null, {
    style: lotStyle,
    onEachFeature: lotClick
});//.addTo(map);

// STYLES FOR NYBB POLYGON
addNYBB(); 

function addNYBB() {
$.getJSON( "geojson/nybb.geojson", function( data ) {
    var NYBBPolygon = data; 
//console.log('anything');
    var NYBBstyle = function (feature) {
        var value = feature.properties.BoroCode;
        if(value === 3){
            fillColor = "#3f3f3f";
            color = "black";
            fillOpacity = 0.8;
        }
        if(value === 1){
            fillColor = "orange";
            color = "black";
            fillOpacity: 0.6;
        }
        if(value === 2){
            fillColor = "#3969B8";
            color = "black";
            fillOpacity = 0.6;
        }
        if(value === 4){
            fillColor = "green";
            color = "black";
            fillOpacity = 0.6;
        }
        if(value === 5){
            fillColor = "yellow";
            color = "black";
            fillOpacity = 0.6;
        }
        var style = {
            weight: 1,
            color:color,
            fillColor: fillColor,
            fillOpacity: fillOpacity
        };
        return style;
    }
 //   console.log(data);

    NYBBgeoJSON = L.geoJson(NYBBPolygon, {
        style: NYBBstyle
    }).addTo(map);

    //addOddLotsData();
});
}


// STYLES FOR LOT DATA/ DATALAYER

//lotStyle = pointToLayer(function (feature, layer){
var lotStyle = function (feature, dataLayer){

    var value = feature.properties.lottype;
    if(value === '1'){
        fillColor = "#fee5d9";
        color = "#fee5d9";
    }
    if(value === '6'){
        fillColor = "#5CB3FF";
        color = '#5CB3FF';
    }
    if(value === '7'){
        fillColor = "#00B2B2";
        color = '#00B2B2';
    }
    if(value === '9'){
        fillColor = "#FA550F";
        color = '#FA550F';
    }
    if(value === '8') { 
        fillColor = "#46a346";
        color = '#46a346';
    }

    var style = {
        weight: 3,
        opacity: 0.9,
        color: color,
        fillOpacity: 0.9,
        fillColor: fillColor
    };
    //console.log(feature);
    return style;
},

// ON EACH FEATURE FUNCTION
lotClick = function (feature, layer) {
    layer.bindPopup("This odd lot address is " + 
        "<strong>" + feature.properties.address + "</strong>" + 
        " and it is owned by " + 
        "<strong>" + feature.properties.ownername + "</strong>");
}

        console.log('this will never work');
// CHANGE FUNCTION
function addDataToMap(dataLayer, choice) {
    $('.choice').change(function () {
        console.log('this will never work');
        var sql = 'SELECT * FROM bk_oddlots';
        if ($(this).val() === 'lottype') {
        }
        else {
            sql += " WHERE lottype = '" + ($(this).val() + "'" );
        }
        console.log(sql);

        var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
            q: sql,
            format: 'GeoJSON'        
        });
        $.getJSON(url)

        .done(function (data) {
        //console.log(data);
        dataLayer.clearLayers();
        dataLayer.addData(data);

        });

    });
}

$(document).ready(function () {
    dataLayer = L.geoJson(null).addTo(map);
    //dataLayer.addTo(map);
    //addTileLayer(map);
    addDataToMap(dataLayer, 'lottype');
    $('.choice').change(function () {
        addDataToMap(dataLayer, $(this).val());
        ///addDataToMap( $(this).val());
        // not sure if this function should include the other addToMap calls
        //dataLayer.addTo(map);

    });
            map.fitBounds(dataLayer.getBounds());
}); 
//NYBBgeoJSON.addTo(map);
//oddLotsGeoJSON.addTo(map);



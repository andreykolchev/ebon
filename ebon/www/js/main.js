 
  var settings = {
          barWidth: 2.5,
          barHeight: 100
        };

$(document).on('pageshow', '#p1', function () {
   $("#bcTarget1").barcode("2236363227480", "ean13", settings);   
});

$(document).on('pageshow', '#p2', function () {
   $("#bcTarget2").barcode("309031", "int25", settings);   
});

$(document).on('pageshow', '#p3', function () {
   $("#bcTarget3").barcode("6110004164210", "int25", settings);   
});

//***********************************MAP**************************************//
function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
}

function max_height() {
    var h = $('div[data-role="header"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_height = w - h - 35;
    c.height(c_height);
}

$(document).on("pageshow", "#map_page", function() {

    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function (e) {
        max_height();
    });
    max_height();    
        
    var defaultLatLng = new google.maps.LatLng(50.45, 30.52);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    
});
//***********************************MAP**************************************//
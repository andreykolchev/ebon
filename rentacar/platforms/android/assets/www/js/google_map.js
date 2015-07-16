/*-----------------------------GAS STATIONS PAGE-----------------------------*/
var map;


$('body').addClass('ui-alt-icon');

$(document).on("pageshow", "#gas_stations_page", function () { // When entering pagetwo
    showMap();
    max_height();
});

function goHome(){
    window.location = "main.html";
    $.mobile.changePage($("#main_page"), {transition: "none"});
}

function showMap() {
    $(window).unbind();
    $(window).bind('pageshow resize orientationchange', function (e) {
        max_height();
    });
    google.load("maps", "3.8", {"callback": map, other_params: "sensor=true&language=en"});
}

function max_height() {
    var h = $('div[data-role="header"]').outerHeight(true);
    var w = $(window).height();
    var c = $('div[data-role="content"]');
    var c_height = w - h - 35;
    c.height(c_height);
}

function map() {
    var latlng = new google.maps.LatLng(50.450306, 30.523768);
    var myOptions = {
        zoom: 15,
        center: latlng,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);

   // google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
   //     watchID = navigator.geolocation.watchPosition(gotPosition, null, {maximumAge: 5000, timeout: 60000, enableHighAccuracy: true});
   // });
}

function gotPosition(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (!marker) {
        //create marker
        marker = new google.maps.Marker({
            position: point,
            map: map
        });
    } else {
        //move marker to new position
        marker.setPosition(point);
    }
}




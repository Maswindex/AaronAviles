
function myMap() {


    var LAstadium = {lat: 34.0430, lng: -118.2673};
    var VegasDay = {lat: 36.1162, lng: -115.1745};
    var SpaceNeedle = {lat: 47.6205, lng: -122.3493};


    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: VegasDay,
        zoom: 5
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);


    var markerLA = new google.maps.Marker(
        {
            position: LAstadium,
            map: map,
            title: "Los Angles"
        }
    );

    var markerLV = new google.maps.Marker(
        {
            position: VegasDay,
            map: map,
            title: "Las Vegas"

        }
    );

    var markerWA = new google.maps.Marker(
        {
            position: SpaceNeedle,
            map: map,
            title: "Space Needle"

        }
    );

}


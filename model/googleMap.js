function myMap() {

    var locations = [
        {
            position: {
                lat: 34.0430,
                lng: -118.2673
            },
            title: 'LAStadium'
        },{
            position: {
                lat: 36.1162,
                lng: -115.1745
            },
            title: 'VegasDay'
        },{
            position: {
                lat: 47.6205,
                lng: -122.3493
            },
            title: 'SpaceNeedle'
        }
    ];
    var markers = [];

    var mapCanvas = document.getElementById("map");

    var mapOptions = {
        center: locations[0].position,
        zoom: 5
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    for (var i = 0 ; i < locations.length ; i++) {
        markers[i] = new google.maps.Marker(
            {
                position: locations[i].position,
                map: map,
                title: locations[i].title
            }
        );
    }
}
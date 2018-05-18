"use strict";
var locations = [
    {
        position: {
            lat: 34.0430,
            lng: -118.2673
        }, events: [
            'Outdoors exploring inner peace.',
            'It was an amazing experience at CG Technology Event.',
            'Exploring the sky with a Drone',
            'First Meeting',
            'Where it all Begin'
        ],
        title: 'LAStadium'
    },
    {
        position: {
            lat: 36.1162,
            lng: -115.1745
        }, events: [
            'It was an amazing experience at CG Technology Event.',
            'Exploring the sky with a Drone',
            'Where it all Begin'
        ],
        title: 'VegasDay'
    },
    {
        position: {
            lat: 47.6205,
            lng: -122.3493
        }, events: [
            'First Meeting',
            'Where it all Begin'
        ],

        title: 'SpaceNeedle'
    },
    {
        position: {
            lat: 40.7128,
            lng: -74.0060
        },
        title: 'New York'
    }
];

function myMap() {
    var markers = [];
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: locations[0].position,
        zoom: 5
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);


    //autocompleete input
    // var input = document.getElementById('autocomplete');
    // var autocomplete = new google.maps.places.Autocomplete(input);

    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
    // google.maps.event.addListener(autocomplete, 'place_changed', function () {
    // var place = autocomplete.getPlace();

    // })


    //create each marker
    for (var i = 0; i < locations.length; i++) {
        markers[i] = new google.maps.Marker(
            {
                position: locations[i].position,
                map: map,
                title: locations[i].title
            }

            //add listeners to each to display modal
        ).addListener('click', function () {
            //alert(displayEvents(this.title));
            displayEvents(this.title);
        });
    }
}

function displayEvents(title) {

    //loop through locations
    for (var i = 0; i < locations.length; i++) {

        //when the location with the passed title is found
        if (locations[i].title == title) {

            //loops through events contained in location
            for (var j = 0; j < locations[i].events.length; j++) {

                //alerts the event
                var eventHeadline = locations[i].events[j];
                alert(eventHeadline);
            }
        }
    }
}
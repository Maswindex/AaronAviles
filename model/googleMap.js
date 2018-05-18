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

function myMap()
{
    var markers = [];
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: locations[0].position,
        zoom: 5
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

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

function displayEvents(locationTitle)
{
    var locationEvents = [];
    var track = 0;
    var locIndex;

    //loop through all location objects
    for (var i = 0; i < locations.length; i++)
    {
        //when the location with the passed title is found
        if (locations[i].title == locationTitle)
        {
            //log the index
            locIndex = i;
            i = locations.length;
        }
    }

    //grab all events from the events
    var totalEvents;
    $.getJSON("model/test_events.json", function(json) {
        console.log(json);
    });

    var locEventTitles = locations[locIndex].events;
    var event;

    //loops through events contained in the location
    for (var i = 0; i < locEventTitles.length; i++)
    {
        //loop through all the events to find the
        //full event based on passed title
        for (var j = 0; j < totalEvents.length; j++)
        {
            event = totalEvents[j].text;

            // if the event headline matches the event
            // title passed by the location matches
            if (event.headline == locEventTitles[i])
            {
                alert(event.text);
            }
        }
    }
}
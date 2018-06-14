/*
 *        author: Mason Hernandez
 *       version: 1.0
 *      creation: 05/12/2018
 *     last edit: 06/14/2018
 *     file name: googleMap.js
 *   description: file builds the necessary functions and
 *                markers in google map to be displayed
 */

"use strict";
var locations = [];
var events = {};

/*  Callback for Google Map API
    starts the program          */
function myMap() {
    fillLocations();
    fillEvents();

    var markers = [];
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: {
            lat: 39.8283,
            lng: -98.5795
        },
        zoom: 4,
        styles: [
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "none"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#28cb80"
                },
                {
                    "saturation": 100
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1bcf95"
                },
                {
                    "saturation": 100
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#33ca7e"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#20b065"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#33ca7e"
                },
                {
                    "saturation": 100
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#33ca7e"
                },
                {
                    "saturation": 100
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#33ca7e"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1ee185"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#0c3003"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e5e5e5"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#008040"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#62cbe6"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ]
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    //For every location object, create a marker, add a event listener -click, to display related items
    //create each marker
    for (var i = 0; i < locations.length; i++) {
        markers[i] = new google.maps.Marker(
            {
                position: locations[i].position,
                title: locations[i].title,
                icon: {
                    url: locations[i].icon,
                    size: {
                        width: 50,
                        height: 50,
                        widthUnit: 'px',
                        heightUnit: 'px'
                    },
                    scaledSize: {
                        width: 50,
                        height: 50,
                        widthUnit: 'px',
                        heightUnit: 'px'
                    }
                },
                //animation: google.maps.Animation.BOUNCE,
                map: map
            }

            //add listeners to each to display modal
        ).addListener('click', function () {
            displayEvents(this.title);
        });
    }
}

//fills locations with locations from the json file
function fillLocations() {
    locations = function () {
        var tmp = null;
        $.ajax({
            'async': false,
            'type': "POST",
            'global': false,
            'dataType': 'json',
            'url': "model/locations.json",
            'success': function (data) {
                tmp = data.locations;
            }
        });
        return tmp;
    }();
}

//fills events with events from the json file
function fillEvents() {
    events = function () {
        var tmp = null;
        $.ajax({
            'async': false,
            'type': "POST",
            'global': false,
            'dataType': 'json',
            'url': "model/test_events.json",
            'success': function (data) {
                tmp = data.events;
            }
        });
        return tmp;
    }();
}

//activated when a marker is clicked on
function displayEvents(locationTitle) {
    var locEventTitles;

    //clear the modal
    $("#eventList").html("");

    //loop through all location objects
    for (var i = 0; i < locations.length; i++) {
        //when the location with the passed title is found
        if (locations[i].title == locationTitle) {
            //log the related events
            locEventTitles = locations[i].events;

            //exit the loop
            i = locations.length;
        }
    }

    //loop through all events
    for (var i = 0; i < events.length; i++) {
        //loops through events in target location
        for (var j = 0; j < locEventTitles.length; j++) {
            // if the event headline matches the event
            // title passed by the location
            if (events[i].text.headline == locEventTitles[j]) {
                //add that event to the modal
                addEventToModal(i);
            }
        }
        $("#relatedEvents").modal();
    }
}

//adds one of related events to modal
function addEventToModal(index) {
    var event = events[index];
    var date = createDate(event.start_date);

    //creates the list item for the related events
    $("#eventList").append(
        "<a type='Submit' href='#' class='list-group-item list-group-item-action flex-column align-items-start event' id='e" + index + "'>" +
        "<div class='d-flex w-100 justify-content-between'>" +
        "<h5 class='mb-1'>" + event.text.headline + "</h5>" +
        "<small>" + date + "</small>" +
        "</div>" +
        "<p class='mb-1'>" + event.text.text.substr(0, 50) + "...</p>" +
        "</a>"
    );

    //creates the listeners for the displayed events
    $("#e" + index).click(function () {
        var headline = $(this).children("div").children("h5").text();
        displayEvent(headline);
    });
}

//reads the different date inputs to display properly
function createDate(start_date) {
    var date = "";

    if (start_date.year != null) {
        date = start_date.year;

        if (start_date.month != null) {

            if (start_date.day != null) {
                date = start_date.month + "/" +
                    start_date.day + "/" +
                    date;
            } else {
                date = start_date.month + "/" +
                    date;
            }
        }
    }

    return date;
}

/*  Displays the event in the selected event modal
    Activates when clicked on in modal              */
function displayEvent(eventHeadline) {
    var event = $('#targetEvent');
    event.attr('value', eventHeadline);
    $('#goToEvent').submit();
}

function formatIcons(target) {
    var checkExist = setInterval(function () {
        if ($(target).length) {
            console.log("Exists: " + target);
            $(target).css("border-radius", "100%");
            $(target).css("border", "solid black");
            $(target).css("animation", "breathing 3s ease-out infinite normal");
            $(target).css("-webkit-animation", "breathing 3s ease-out infinite normal");
            $(target).css("-webkit-font-smoothing", "antialiased");
            clearInterval(checkExist);
        }
    }, 100);
}

formatIcons(".gm-style > div > div > div > div > img");
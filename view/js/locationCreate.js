"use strict";
<!--
    Author: Toygan Sevim
      Date: 4/14/2018
   Updated: 6/14/2018
      Team: Remote Workers
-->

var autocomplete;

var events = [];
var locations = [];
var selectedEvents = ['selectedEvents:'];

//Pulled data and created

fillLocations();
fillEvents();

//append related events to the dropdown
createRelatedEvents();
pickRelatedEvents();


//Location Creater
function test() {
    //display of the form
    //This will hold the information to append to the local file
    const location =
        {
            country: document.getElementById('country')
        };
    //search bar for new location
    var input = document.getElementById('inputLocation');
    autocomplete = new google.maps.places.Autocomplete(input);


    //START THE FUNCTION as the place selected - get the data's
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        //autocomplete return
        var place = autocomplete.getPlace();

        var eventsFinalList = [];

        //display on screen the GOOGLE
        location.country.value = place.formatted_address;


        // When the button is clicked
        $("#locationAddButton").on("click", function () {

            event.preventDefault();
            updateJsonFile(place, selectedEvents);

        });


    });
}


//this function will display the results of the search on screen and then will update
//the location Json file with the appended new location
function updateJsonFile(place, finalList) {

    //to hold the json format and easier append
    var locationObject = new Object();
    locationObject.position = {};
    locationObject.position.lat = place.geometry.location.lat();
    locationObject.position.lng = place.geometry.location.lng();
    locationObject.events = [];
    locationObject.title = place.name;

    //Add Related Events | BEGIN from 1 to avoid the indicator
    if (!finalList.length <= 1) {
        for (var i = 1; i < finalList.length; i++) {
            locationObject.events.push(finalList[i]);
        }
    }

    //Use the uploaded image path / URL
    locationObject.icon = "https://upload.wikimedia.org/wikipedia/en/e/e7/Death_Note_L_ident.jpg";


    locationObject = JSON.stringify(locationObject);


    //Send validation
    $.post('././model/add-location.php',
        {
            postLocation: true,
            location: locationObject
        },

        function (results) {


        });
}

/**
 * This function will generate the items on a dropdown list as Related events to be selected
 */
function createRelatedEvents() {

//Fill the checkbox / dropdown
    for (var i = 0; i < events.length; i++) {

        //If there are given headers add to the list
        if (events[i].text.headline != "" || events[i].text.headline != " ") {

            $(".dropdown-menu").append('<a class="dropdown-item update-item" href="#">' + events[i].text.headline + "</a>");
        }
    }
}

/**
 * On aaron's click add the related events menu to appearing on the right for easy access
 */
function pickRelatedEvents() {

    $(".update-item").on('click', function () {

        //define selected items

        //Pick the selected item and put it on the right side as selected
        if (!selectedEvents.includes($(this).html())) {
            selectedEvents.push($(this).html());
            $(".added-list").append('<a class="list-group-item selected pr-1">' + $(this).html() + "</a>");
        }
        else {
            console.log("Was already in: " + $(this).html());
        }

    });

}

//Fill the events in the page by AJAX request
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

google.maps.event.addDomListener(window, 'load', test);


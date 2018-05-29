/*
 *        author: Mason Hernandez
 *       version: 1.0
 *      creation: 05/12/2018
 *     last edit: 05/29/2018
 *     file name: googleMap.js
 *   description: file builds the necessary functions and
 *                markers in google map to be displayed
 */

"use strict";
var locations = [];
var events = {};

/*  Callback for Google Map API
    starts the program          */
function myMap()
{
    fillLocations();
    fillEvents();

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
            displayEvents(this.title);
        });
    }
}

//fills locations with locations from the json file
function fillLocations()
{
    locations = function () {
        var tmp = null;
        $.ajax({
            'async': false,
            'type': "POST",
            'global': false,
            'dataType': 'json',
            'url': "model/locations.json",
            'success': function (data) {
                tmp = data;
            }
        });
        return tmp;
    }();
}

//fills events with events from the json file
function fillEvents()
{
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
function displayEvents(locationTitle)
{
    var locEventTitles;

    //clear the modal
    $("#eventList").html("");

    //loop through all location objects
    for (var i = 0; i < locations.length; i++)
    {
        //when the location with the passed title is found
        if (locations[i].title == locationTitle)
        {
            //log the related events
            locEventTitles = locations[i].events;

            //exit the loop
            i = locations.length;
        }
    }

    //loop through all events
    for (var i = 0; i < events.length; i++)
    {
        //loops through events in target location
        for (var j = 0; j < locEventTitles.length; j++)
        {
            // if the event headline matches the event
            // title passed by the location
            if (events[i].text.headline == locEventTitles[j])
            {
                //add that event to the modal
                addEventToModal(i);
            }
        }
        $("#relatedEvents").modal();
    }
}

//adds one of related events to modal
function addEventToModal(index)
{
    var event = events[index];
    var date = createDate(event.start_date);

    //creates the list item for the related events
    $("#eventList").append(
        "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start event' id='e"+index+"'>"+
        "<div class='d-flex w-100 justify-content-between'>" +
            "<h5 class='mb-1'>" + event.text.headline + "</h5>" +
            "<small>" + date + "</small>" +
        "</div>" +
        "<p class='mb-1'>" + event.text.text.substr(0, 50) + "...</p>" +
        "</a>"
    );

    //creates the listeners for the displayed events
    $("#e"+index).click(function () {
        var headline = $(this).children("div").children("h5").text();
        displayEvent(headline);
    });
}

//reads the different date inputs to display properly
function createDate(start_date)
{
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
function displayEvent(eventHeadline)
{
    var event;

    for (var i = 0; i < events.length; i++)
    {
        event = events[i];

        if (event.text.headline == eventHeadline)
        {
            $("#eventTitle").html(event.text.headline);
            $("#eventText").html(event.text.text);
        }
    }
    $("#selectedEvent").modal();
}
/*
This file is to create the navbar look of the admin page.
Toygan Sevim | Raine Padilla
adminNavigation.js

 */

// Hide each element until the corresponding sidebar button is clicked
$('#eventForm').show();
$('#locationForm').hide();
$('#partnersForm').hide();
$('.added-list').hide();

populateList("events");


// Show events
$('#viewEvents').click(function () {

    $('#eventForm').show();
    $('#locationForm').hide();
    $('#partnersForm').hide();
    $('.added-list').hide();

    populateList("events");


    return false;
});

// Show locations
$('#viewLocations').click(function () {
    $('#eventForm').hide();
    $('#locationForm').show();
    $('#partnersForm').hide();

    //THIS
    // $(".list-group").hide()

    $('.added-list').show();
    $('.list-group-flush').show();

    populateList("locations");
    return false;
});

// Show partners
$('#viewPartners').click(function () {
    $('#eventForm').hide();
    $('#locationForm').hide();

    populateList("partners");
    return false;
});

// Populate the lists with events/locations/partners pulled from json

// Click & activate a list item, then run populate function
$('.list-group-item').click(function () {
    $('.list-group-item.active').removeClass('active');
    $(this).addClass('active');
});

// Click & activate a list item, then run populate function
$('#changeList').click(function () {
    $('.list-group-item').click(function () {
        $('.list-group-item.active').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('eventItem')) {
            populateForm("events", $(this).html());
        }
        else if ($(this).hasClass('locationItem')) {
            populateForm("locations", $(this).html());
        }
    });
});


function populateForm(category, selected) {
    if (category == "events") {
        form = document.getElementById("eventForm");
        for (var i = 0; i < events.length; i++) {
            if (events[i].text.headline == selected) {
                // Fill the event name
                document.getElementById("eventName").value = events[i].text.headline;

                // Fill the event content
                document.getElementById("eventContent").value = events[i].text.text;

                // Event Category
                $('.group').each(function(category){

                    if(category.value == events[i].group)
                    {
                        category.find("option").setAttribute(selected, true);
                    }
                    else
                    {
                        category.find("option").setAttribute(selected, false);
                    }
                });

                // Event Date
                eventDate = events[i].start_date.year + "-" + events[i].start_date.month + "-"
                    + events[i].start_date.day;
                document.getElementById("startDate").value = eventDate;

                // Event URL
                document.getElementById("eventUrl").value = events[i].media.url;

                // Event Caption
                document.getElementById("urlCaption").value = events[i].media.caption;
            }
        }
    }
    else if (category == "locations") {
        form = document.getElementById("locationForm");

    }
}

//  Populate the lists with events/locations/partners pulled from json
function populateList(category) {
    display(category);

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

    function display(category) {
        if (category == "events") {
            fillEvents();
            var eventList = document.getElementById("changeList");
            eventList.innerHTML = "";
            for (var i = 0; i < events.length; i++) {
                var item = '<a href="#" class="list-group-item eventItem">' + events[i].text.headline + '</a>';
                eventList.innerHTML += item;
            }
        }

        else if (category == "locations") {
            fillLocations();
            var locationList = document.getElementById("changeList");
            locationList.innerHTML = "";
            for (var i = 0; i < locations.length; i++) {
                var item = '<a href="#" class="list-group-item locationItem">' + locations[i].title + '</a>';
                locationList.innerHTML += item;
            }
        }
    }
}

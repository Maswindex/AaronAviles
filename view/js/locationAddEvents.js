
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
        "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start event' id='e" + index + "'>" +
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
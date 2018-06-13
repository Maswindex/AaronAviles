google.maps.event.addDomListener(window, 'load', test);


var aaronSelected = new array();

//Location Creater
function test() {
    //display of the form
    //This will hold the information to append to the local file

    var events = {};
    var locations = [];


    const location =
        {
            // latitude: document.getElementById('latitude'),
            // longitude: document.getElementById('longitude'),
            // city: document.getElementById('city'),
            // state: document.getElementById('state'),
            country: document.getElementById('country')
        };
    //search bar for new location
    var input = document.getElementById('inputLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);


    //START THE FUNCTION as the place selected - get the data's
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        //autocomplete return
        var place = autocomplete.getPlace();
        var finalList = [];
//pulled the events
        var selectedEvents = [];
        var jsonString = JSON.stringify(place.geometry);

        //start the Events barxcv
        start(selectedEvents);


        //When the button is clicked
        $("#locationAddButton").on("click", function () {

            event.preventDefault();
            updateJsonFile(place, finalList);


        });


    });
    //
    // function recieveList(selectedEvents) {
    //
    //
    //     for (var i = 0; i < selectedEvents.length; i++) {
    //         this += selectedEvents[i];
    //     }
    //
    // }


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

        //Events
        for (var i = 0; i < finalList.length; i++) {
            locationObject.events += finalList[i];
        }

        //Use the uploaded image path / URL
        locationObject.icon = "https://upload.wikimedia.org/wikipedia/en/e/e7/Death_Note_L_ident.jpg";

        locationObject = JSON.stringify(locationObject);

        console.log("This is " + selectedEvents[0]);
        $.post('././model/add-location.php',
            {
                postLocation: true,
                location: locationObject
            },

            function (results) {

                // console.log("after post : <br>" + results);

            });


        //display on screen the GOOGLE
        location.country.value = place.formatted_address;


    }
}


//Start all function
function start(selectedEvents) {


    fillEvents();
    fillLocations();
    createRelatedEvents();
    pickRelatedEvents(selectedEvents);


}


function createRelatedEvents() {

//Fill the checkbox / dropdown
    for (var i = 0; i < events.length; i++) {
        // console.log("menu" + events[i].text.headline);

        if (events[i].text.headline != "" || events[i].text.headline != " ") {

            $(".dropdown-menu").append('<a class="dropdown-item update-item" href="#">' + events[i].text.headline + "</a>");
        }
    }
}

/**
 * On aaron's click add the related events menu to appearing on the right for easy access
 */
function pickRelatedEvents(selectedEvents) {

    $(".update-item").on('click', function () {

        //define selected items

        //Pick the selected list of events on the right side
        if (!selectedEvents.includes($(this).html())) {

            selectedEvents += $(this).html();

            // aaronSelected += $(this).html();
            aaronSelected[0] = " ";

            aaronSelected.push($(this).html());

            console.log("added" + $(this).html());

            console.log("Aaron selected: " + aaronSelected);


            // <span class='badg$(this).html()e badge-pill badge-danger'>Remove</span>
            $(".added-list").append('<a class="list-group-item selected pr-1">' + $(this).html() + "</a>");

        }
        else {
            console.log("Was already in" + $(this).html());
        }
        // saveEvents()
    });


    return selectedEvents;
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

/**
 * This function will not hold a value until remove/ uses siblings to add and remove badges
 */
function saveEvents() {

    //If there is a selected events list
    if ($(".selected").siblings().length > 1) {

        //This will save and have report
        // $(".selected").val = "<span class='badge badge-pill badge-danger'>Remove</span>";
    }

}

// google.maps.event.addDomListener(window, 'load', test);

//Location Creater
function test() {
    //display of the form
    //This will hold the information to append to the local file

    const location =
        {
            latitude: document.getElementById('latitude'),
            longitude: document.getElementById('longitude'),
            city: document.getElementById('city'),
            state: document.getElementById('state'),
            country: document.getElementById('country')
        };
    //search bar for new location
    var input = document.getElementById('inputLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);


    //START THE FUNCTION as the place selected - get the data's
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        //autocomplete return
        var place = autocomplete.getPlace();
        var jsonString = JSON.stringify(place.geometry);
        console.log(jsonString);
        //update the file


        $("#locationAddButton").on("click", function () {

            event.preventDefault();

            updateJsonFile(place);

        });


    });


    //this function will display the results of the search on screen and then will update
    //the location Json file with the appended new location
    function updateJsonFile(place) {

        //to hold the json format and easier append
        var locationObject = new Object();
        locationObject.position = {};
        locationObject.position.lat = place.geometry.location.lat();
        locationObject.position.lng = place.geometry.location.lng();
        locationObject.events = [];
        locationObject.title = place.name;


        //display on screen
        location.latitude.value = place.geometry.location.lat();
        location.city.value = place.name;
        location.longitude.value = place.geometry.location.lng();
        location.country.value = place.formatted_address;
        location.state.value = place.address_components[2].short_name;


        //this is the array of all locations in the map
        var mapLocations;


        //Json request URL
        var jsonURL = "http://tsevim.greenriverdev.com/355/AaronAviles/view/json/mapLocations.json";
        // locationObject.position = place.geometry.location.lat();

        //Recieve the current local Locations file to push the recieved changes
        var json = (function () {
            var json = null;
            $.ajax({
                url: jsonURL,
                async: true,
                success: function (result) {
                    console.log(locationObject);

                    console.log("Before::");
                    console.log(result);

                    result.push(locationObject);


                    mapLocations = JSON.stringify(result);

                    console.log(mapLocations);

                    console.log("Added");
                    console.log(result);

                }


            });
            return json;
        })();

        console.log("This is json" + json);


    }
}
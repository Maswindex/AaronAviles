"use strict";


//create a autocomplete location generator
function autoCompleteLocation() {
    const location = {
        latitude: document.getElementById('latitude'),
        longitude: document.getElementById('longitude'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        country: document.getElementById('country'),
        // clear: function () {
        //     this.latitude.val('').blur();
        // }
    }

    //select the input box
    var inputLocation = document.getElementById('inputLocation');

    //place the input to the google API / options can be passed in as parameters
    var autocomplete = new google.maps.places.Autocomplete(inputLocation);

    //On every Place change that occurs on the search box | add event listeners
    google.maps.event.addListener(autocomplete, 'place_chaged', function () {

        //get the response array of Google API
        var responseLocation = autocomplete.getPlaces();

        //Fill in the generated form

        //get latitude Value - Set it
        location.latitude.value = responseLocation.geometry.lat();

        //get Longitude value - set it
        location.longitude.value = responseLocation.geometry.lng();

        //Set city name
        location.city.value = responseLocation.city;

        //For country now do the address _ try
        location.country.value = responseLocation.formatted_address;


    });
}

google.maps.event.addDomListener(window, 'load', autoCompleteLocation);

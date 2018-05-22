// Small working copy

google.maps.event.addDomListener(window, 'load', test);

function test() {

    const location =
        {
            latitude: document.getElementById('latitude'),
            longitude: document.getElementById('longitude'),
            city: document.getElementById('city'),
            state: document.getElementById('state'),
            country: document.getElementById('country')
        };

    var input = document.getElementById('inputLocation');
    var autocomplete = new google.maps.places.Autocomplete(input);


    //START THE FUNCTION as the place selected - get the data's
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();

        var address = "<p>Address:</p>" + place.formatted_address + "</br>";
        address += "<li>Lat : </li>" + place.geometry.location[0] + "</br>";
        address += "<li>Lng : </li>" + place.geometry.location[1] + "</br>";

        location.latitude.value = place.geometry.location.lat();
        location.city.value = place.name;
        location.longitude.value = place.geometry.location.lng();
        location.country.value = place.formatted_address;
        location.state.value = place.address_components[2].short_name;



        // document.getElementsByClassName("address").value += address;


        //post the address below
    });
}
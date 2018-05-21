google.maps.event.addDomListener(window, 'load', test);

function test() {

    const location =
        {
            latitude: document.getElementById('latitude'),
            longitude: document.getElementById('longitude'),
            city: document.getElementById('city')
        };

    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
    //
    // location['latitude'].data = 'toygan';
    // location.latitude.html = 'toygan';
    // , {types: ['(cities)']});
    google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();

        var address = "<p>Address:</p>" + place.formatted_address + "</br>";
        address += "<li>Lat : </li>" + place.geometry.location[0] + "</br>";
        address += "<li>Lng : </li>" + place.geometry.location[1] + "</br>";

        location.latitude.value = place.geometry.location.lat();
        location.city.value = place.name;
        location.longitude.value = place.geometry.location.lng();

        document.getElementById("country").innerHTML = address;
    });


    var locationSelected = input;
    //
    // const locationFormFields =
    //     {
    //         name: $('#location_name'),
    //         address: $('#location_address'),
    //         website: $('#location_website'),
    //         phone: $('#location_phone'),
    //         hours: $('#location_hours'),
    //         type: $('#location_type'),
    //         latitude: $('#location_latitude'),
    //         longitude: $('#location_longitude'),
    //         condoms: document.getElementById('location_condoms'),
    //         hiv: document.getElementById('location_hiv'),
    //         sti: document.getElementById('location_sti'),
    //         queer_friendly: document.getElementById('location_queer_friendly'),
    //         id: $('#location-id'),
    //
    //         clear: function () {
    //             this.name.val('').blur();
    //             this.address.val('').blur();
    //             this.website.val('').blur();
    //             this.phone.val('').blur();
    //             this.hours.val('').blur();
    //             this.type.val('').blur();
    //             this.longitude.val('').blur();
    //             this.latitude.val('').blur();
    //             this.condoms.checked = false;
    //             this.hiv.checked = false;
    //             this.sti.checked = false;
    //             this.queer_friendly.checked = false;
    //             this.id.val('');
    //         },
    //
    //         populate: function (data = {}) {
    //             if (data.name) this.name.val(data.name).trigger('focus');
    //             if (data.address) this.address.val(data.address).trigger('focus');
    //             if (data.website) this.website.val(data.website).trigger('focus');
    //             if (data.phone) this.phone.val(data.phone).trigger('focus');
    //             if (data.hours) this.hours.val(data.hours).trigger('focus');
    //             if (data.type) this.type.val(data.type).trigger('focus');
    //             if (data.longitude) this.longitude.val(data.longitude).trigger('focus');
    //             if (data.latitude) this.latitude.val(data.latitude).trigger('focus');
    //             if (data.condoms) this.condoms.checked = true;
    //             if (data.hiv) this.hiv.checked = true;
    //             if (data.sti) this.sti.checked = true;
    //             if (data.queer_friendly) this.queer_friendly.checked = true;
    //         },
    //
    //         extract: function () {
    //             return {
    //                 name: this.name.val(),
    //                 address: this.address.val(),
    //                 website: this.website.val(),
    //                 phone: this.phone.val(),
    //                 hours: this.hours.val(),
    //                 type: this.type.val(),
    //                 longitude: this.longitude.val(),
    //                 latitude: this.latitude.val(),
    //                 condoms: this.condoms.checked,
    //                 hiv: this.hiv.checked,
    //                 sti: this.sti.checked,
    //                 queer_friendly: this.queer_friendly.checked
    //             };
    //         }
    //     };


}

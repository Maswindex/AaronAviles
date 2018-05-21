// /*
//     Author: Jacob Landowski
//     4-28-18
// */
//
// /* USEFUL PLACE OBJECT FIELDS
//
//     place.formatted_address
//     place.formatted_phone_number
//     place.geometry.location.lat()
//     place.geometry.location.lng()
//     place.name
//     place.opening_hours.weekday_text// [0-6] for mon-sun hours
//     place.types // could just grab [0] and strip _ and capitalize
//     place.icon // for card header icon pic
//     place.website
//     place.international_phone_number // if needed
// */
//
// /**
//  *  Callback that sets up search functionality once Google Map API
//  *  script loads.
//  */
// function initAutocomplete() {
//
//     //===========================================================================//
//     //                          PLACE SEARCH FUNCTIONS                           //
// //===========================================================================//
//
//     /**
//      *  Take a place Object from search and create a button
//      *  to represent the location. The location will include
//      *  the place's name, address and phone number if available.
//      *
//      *  @param  Object place the location to gather data from
//      *  @return JQueryObject holding the HTML and click event handler
//      *                       to represent this place
//      */
//     function renderPlaceButton(place) {
//         type = getPlaceType(place);
//         let header = type + ' ' + getPlaceIcon(place);
//         let name = place.name;
//         let phone = place.formatted_phone_number;
//         let address = place.formatted_address;
//
//         // Create Button HTML as JQuery Object to attach event handler
//         $placeButton = $('<div class="modal-body p-3 col-12 col-md-6 col-lg-4">' +
//             '<div class="btn w-100 h-100 place card p-0 m-0 waves-effect">' +
//             '<div class="card-header primary-color white-text d-flex justify-content-between align-items-center">' +
//             header +
//             '</div>' +
//             '<div class="card-body black-text">' +
//             '<h4 class="card-title text-center">' + name + '</h4>' +
//             '<p class="card-text">' + (address ? address : '') + '</p>' +
//             '<p class="card-text">' + (phone ? phone : '') + '</p>' +
//             '</div>' +
//             '</div>' +
//             '</div>');
//
//         // On location selection,
//         // Clear form fields
//         // Set with any available data from location
//         // Hide modal
//         $placeButton.on('click', function () {
//             locationFormFields.clear();
//
//             let website = place.website;
//             let hours = place.opening_hours ? place.opening_hours.weekday_text : undefined;
//             let latitude = place.geometry && place.geometry.location ?
//                 place.geometry.location.lat() : undefined;
//             let longitude = place.geometry && place.geometry.location ?
//                 place.geometry.location.lng() : undefined;
//
//             if (name) setInputValue(locationFormFields.name, name);
//             if (address) setInputValue(locationFormFields.address, address);
//             if (website) setInputValue(locationFormFields.website, website);
//             if (phone) setInputValue(locationFormFields.phone, phone);
//             if (hours) setInputValue(locationFormFields.hours, hours.join('|'));
//             setInputValue(locationFormFields.type, type);
//             if (latitude) setInputValue(locationFormFields.latitude, latitude);
//             if (longitude) setInputValue(locationFormFields.longitude, longitude);
//
//             setFormAddMode();
//
//             $placesModal.modal('hide');
//         });
//
//         return $placeButton;
//     }
//
//     /**
//      *  Take a place Object from search and create a button
//      *  to represent the location. The location will include
//      *  the place's name, address and phone number if available.
//      *
//      *  @param JQueryObject $input the HTML input element to set
//      *  @param String       value  the value to set the input to
//      */
//     function setInputValue($input, value) {
//         $input.val(value).trigger('focus');
//     }
//
//     /**
//      *  Grabs the first location type of a place object give
//      *  to or defaults to Location type.
//      *
//      *  @param  Object place the location to gather data from
//      *  @return String the string type of this place, default: 'Location'
//      */
//     function getPlaceType(place) {
//         if (place.types)
//             return place.types[0].replace(/_/g, ' ').replace(/\b\w/g, function (x) {
//                 return x.toUpperCase();
//             });
//
//         return 'Location';
//     }
//
//     /**
//      *  Grabs the icon picture representing this place type.
//      *
//      *  @param  Object place the location to gather data from
//      *  @return String the HTML of either an img tag with this
//      *                 place's icon or defaults to a building icon
//      */
//     function getPlaceIcon(place) {
//         return place.icon ? '<img src="' + place.icon + '" class="place-icon">' :
//             '<i class="fa fa-building light-green-text"></i>';
//     }
//
//
//     //===========================================================================//
//     //                               TOAST FUNCTIONS                             //
// //===========================================================================//
//     const toastRGB =
//         {
//             BLACK: 'rgba(0,0,0,0.8)',
//             WHITE: 'rgba(255,255,255,0.8)',
//             GREEN: 'rgba(130,255,140,0.6)',
//             RED: 'rgba(255,120,100,0.6)',
//             YELLOW: 'rgba(255,255,100,0.6)'
//         };
//
//     /**
//      *  Creates a temporary toast alert in the upper right corner
//      *  of the page.
//      *
//      *  @param String message   the toast message
//      *  @param String textColor the text color
//      *  @param String bgColor   the background color
//      */
//     function createToast(message, textColor='BLACK', bgColor='WHITE') {
//         let style = 'background-color:' + toastRGB[bgColor] + '; color:' + toastRGB[textColor] + ';';
//         let $toast = $('<div class="toast animated fadeInUp" style="' + style + '">' + message + '</div>');
//
//         oneTimeAnimationEvent($toast, function () {
//             setTimeout(function () {
//                 $toast.addClass('fadeOut');
//                 oneTimeAnimationEvent($toast, function () {
//                     $toast.remove();
//                 });
//
//             }, 1000);
//         });
//
//         $(document.body).append($toast);
//     }
//
//     function oneTimeAnimationEvent($element, action) {
//         $element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', action);
//     }
//
//     //===========================================================================//
//     //                               AJAX FUNCTIONS                              //
// //===========================================================================//
//
//     function ajax(url='/', method='GET', data={}, successHook={}, errorHook={}) {
//         let successMsg = successHook.responseMessage ? successHook.responseMessage : 'Success';
//         let noSuccessMsg = successHook.noResponseMessage ? successHook.noResponseMessage : 'Request didn\'t go through';
//         let errorMsg = errorHook.message ? errorHook.message : 'Error';
//
//         $.ajax
//         ({
//             url: url,
//             method: method,
//             data: data,
//             success: function (response) {
//                 if (response == 1) {
//                     createToast(successMsg, 'BLACK', 'GREEN');
//                     if (successHook.responseAction) successHook.responseAction();
//                 }
//                 else {
//                     createToast(noSuccessMsg + ': [' + response + ']', 'BLACK', 'YELLOW');
//                     if (successHook.noResponseAction) successHook.noResponseAction();
//                 }
//             },
//             error: function (someAjaxObject, error) {
//                 console.log(someAjaxObject);
//                 createToast(errorMsg + ' : ' + error, 'BLACK', 'RED');
//                 if (errorHook.action) errorHook.action();
//             }
//         }); // end ajax
//     }
//
//     function ajaxForm($form, successHook={}, errorHook={}) {
//         ajax($form.attr('action'), $form.attr('method'), $form.serialize(), successHook, errorHook);
//     }
//
//     //===========================================================================//
//     //                         DELETE/EDIT FUNCTIONS                             //
// //===========================================================================//
//
//     function enableLocationActions() {
//         $('.location.card').each(function (index, location) {
//             let $location = $(location);
//             let id = $location.data('id');
//
//
//             let successHook =
//                 {
//                     responseMessage: 'Successfully deleted location',
//                     noResponseMessage: 'Request for deleting location didn\'t go through',
//                     responseAction: function () {
//                         $location.remove();
//                     }
//                 };
//
//             let errorHook =
//                 {
//                     message: 'Failed to delete location'
//                 };
//
//             //  DELETE
//             $location.find('a.btn.delete').on('click', function (event) {
//                 event.preventDefault();
//                 ajax
//                 (
//                     $locationForm.attr('action'),
//                     'DELETE',
//                     {id: id},
//                     successHook,
//                     errorHook
//                 );
//             })
//
//             // EDIT
//             $location.find('a.btn.edit').on('click', function (event) {
//                 event.preventDefault();
//
//                 locationFormFields.clear();
//                 locationFormFields.populate(extractLocationCardData($location));
//                 $locationForm.attr('method', 'PUT');
//                 locationFormFields.id.val(id);
//                 $locationFormButton.html('Update Location&nbsp;&nbsp;&nbsp;<i class="fa fa-plus"></i>');
//                 $locationForm.data('location-card-id', $location.attr('id'));
//             });
//
//         }); // end for each
//     }
//
//     function extractLocationCardData($location) {
//         let $provisions = $location.find('.location-provides').html();
//
//         return {
//             name: $location.find('.location-name').html(),
//             address: $location.find('.location-address').html(),
//             website: $location.find('.location-website').html(),
//             phone: $location.find('.location-phone').html(),
//             hours: $location.find('.location-hours').html().replace(/<br>/g, '|'),
//             type: $location.find('.location-type').html(),
//             latitude: $location.data('latitude'),
//             longitude: $location.data('longitude'),
//             condoms: $provisions.includes('Condoms'),
//             hiv: $provisions.includes('HIV'),
//             sti: $provisions.includes('STI'),
//             queer_friendly: $provisions.includes('Queer Friendly')
//         };
//     }
//
//     function setLocationCardData($location, data={}) {
//         $location.find('.location-provides').html('');
//         if (data.name) $location.find('.location-name').html(data.name);
//         if (data.address) $location.find('.location-address').html(data.address);
//         if (data.website) $location.find('.location-website').html(data.website);
//         if (data.phone) $location.find('.location-phone').html(data.phone);
//         if (data.hours) $location.find('.location-hours').html(data.hours.replace(/\|/g, '<br>'));
//         if (data.type) $location.find('.location-type').html(data.type);
//         if (data.longitude) $location.data('latitude', data.longitude);
//         if (data.latitude) $location.data('longitude', data.latitude);
//         if (data.condoms) $location.find('.location-provides').append('Condoms ');
//         if (data.hiv) $location.find('.location-provides').append('HIV ');
//         if (data.sti) $location.find('.location-provides').append('STI ');
//         if (data.queer_friendly) $location.find('.location-provides').append('Queer Friendly ');
//     }
//
//     function setFormAddMode() {
//         $locationForm.attr('method', 'POST');
//         $locationForm.data('location-card-id', '');
//         $locationFormButton.html('Create Location&nbsp;&nbsp;&nbsp;<i class="fa fa-plus"></i>');
//     }
//
//     // MAY NEED TO REWORK AJAX RESPONSE TO GET NEW ROW ENTRY ID
//     // SO THAT I CAN LIVE ADD HTML CARD FOR LOCATION
//
//     // function createLocationCard()
//     // {
//     //     <div id="{{ 'location-' . @location['id'] }}"
//     //         class="location card"
//     //         data-id="{{ @location['id'] }}"
//     //         data-longitude="{{ @location['longitude'] }}"
//     //         data-latitude="{{ @location['latitude'] }}"
//     //     >
//     //     <div class="card-header primary-color-dark white-text d-flex justify-content-between align-items-center">
//     //         <span class="location-type">{{ @location['type'] }}</span><i class="fa fa-building white-text"></i>
//     //     </div>
//     //     <div class="card-body">
//     //         <h4 class="card-title location-name text-center">{{ @location['name'] }}</h4>
//     //         <div class="container-fluid p-0 m-0 mb-3">
//
//     //             <div class="row no-gutters">
//     //                 <div class="col-12 col-md-3 col-lg-4 text-right pr-3"><h6>Address:</h6></div>
//     //                 <div class="col-12 col-md-9 col-lg-8"><p class="location-address card-text">{{ @location['address'] }}</p></div>
//     //             </div>
//
//     //             <check if="{{ isset(@location['website']) }}">
//     //                 <true>
//     //                     <div class="row no-gutters">
//     //                         <div class="col-12 col-md-3 col-lg-4 text-right pr-3"><h6>Website:</h6></div>
//     //                         <div class="col-12 col-md-9 col-lg-8"><p class="location-website card-text">{{ @location['website'] }}</p></div>
//     //                     </div>
//     //                 </true>
//     //             </check>
//
//     //             <check if="{{ isset(@location['phone']) }}">
//     //                 <true>
//     //                     <div class="row no-gutters">
//     //                         <div class="col-12 col-md-3 col-lg-4 text-right pr-3"><h6>Phone:</h6></div>
//     //                         <div class="col-12 col-md-9 col-lg-8"><p class="location-phone card-text">{{ @location['phone'] }}</p></div>
//     //                     </div>
//     //                 </true>
//     //             </check>
//
//     //             <check if="{{ isset(@location['hours']) }}">
//     //                 <true>
//     //                     <div class="row no-gutters">
//     //                         <div class="col-12 col-md-3 col-lg-4 text-right pr-3"><h6>Hours:</h6></div>
//     //                         <div class="col-12 col-md-9 col-lg-8"><p class="location-hours card-text">{{ str_replace('|', '<br/>', @location['hours']) }}</p></div>
//     //                     </div>
//     //                 </true>
//     //             </check>
//
//     //             <div class="row no-gutters">
//     //                 <div class="col-12 col-md-3 col-lg-4 text-right pr-3"><h6>Provides:</h6></div>
//     //                 <div class="col-12 col-md-9 col-lg-8">
//     //                     <p class="location-provides card-text">
//     //                         {{ @location['condoms'] ? 'Condoms' : '' }}
//     //                         {{ @location['hiv'] ? 'HIV' : '' }}
//     //                         {{ @location['sti'] ? 'STI' : '' }}
//     //                         {{ @location['queer_friendly'] ? 'Queer Friendly' : '' }}
//     //                     </p>
//     //                 </div>
//     //             </div>
//
//     //         </div>
//     //         <div class="row justify-content-between px-3">
//     //             <a class="btn edit bg-mpowerment-lighter px-4">Edit&nbsp;&nbsp;&nbsp;<i class="fa fa-edit"></i></a>
//     //             <a class="btn delete bg-mpowerment-darker px-4">Delete&nbsp;&nbsp;&nbsp;<i class="fa fa-trash"></i></a>
//     //         </div>
//     //     </div>
//     // </div>
//     // }
//
//     //===========================================================================//
//     //                                   RUNTIME                                 //
// //===========================================================================//
//
//     // Jquery Select Search Components
//     const searchBoxInput = document.getElementById('search-box');
//     const $searchBoxInput = $(searchBoxInput);
//     const searchBox = new google.maps.places.SearchBox(searchBoxInput);
//     const $placesList = $('#places-list');
//     const $placesModal = $('#places-modal');
//
//     const washingtonBounds = new google.maps.LatLngBounds
//     (
//         new google.maps.LatLng(45.39667052046753, -125.25483554375),
//         new google.maps.LatLng(49.12256080261302, -116.46577304375)
//     );
//     searchBox.setBounds(washingtonBounds);
//
//     // List that holds location cards
//     const $locationList = $('#locations');
//
//
//     // Jquery Select Location Form Fields
//     const $locationHeader = $('#location-header');
//     const $locationForm = $('#location-form');
//     const $locationFormButton = $('#form-submit-button');
//     const locationFormFields =
//         {
//             name: $('#location_name'),
//             address: $('#location_address'),
//             website: $('#location_website'),
//             phone: $('#location_phone'),
//             hours: $('#location_hours'),
//             type: $('#location_type'),
//             latitude: $('#location_latitude'),
//             longitude: $('#location_longitude'),
//             condoms: document.getElementById('location_condoms'),
//             hiv: document.getElementById('location_hiv'),
//             sti: document.getElementById('location_sti'),
//             queer_friendly: document.getElementById('location_queer_friendly'),
//             id: $('#location-id'),
//
//             clear: function () {
//                 this.name.val('').blur();
//                 this.address.val('').blur();
//                 this.website.val('').blur();
//                 this.phone.val('').blur();
//                 this.hours.val('').blur();
//                 this.type.val('').blur();
//                 this.longitude.val('').blur();
//                 this.latitude.val('').blur();
//                 this.condoms.checked = false;
//                 this.hiv.checked = false;
//                 this.sti.checked = false;
//                 this.queer_friendly.checked = false;
//                 this.id.val('');
//             },
//
//             populate: function (data = {}) {
//                 if (data.name) this.name.val(data.name).trigger('focus');
//                 if (data.address) this.address.val(data.address).trigger('focus');
//                 if (data.website) this.website.val(data.website).trigger('focus');
//                 if (data.phone) this.phone.val(data.phone).trigger('focus');
//                 if (data.hours) this.hours.val(data.hours).trigger('focus');
//                 if (data.type) this.type.val(data.type).trigger('focus');
//                 if (data.longitude) this.longitude.val(data.longitude).trigger('focus');
//                 if (data.latitude) this.latitude.val(data.latitude).trigger('focus');
//                 if (data.condoms) this.condoms.checked = true;
//                 if (data.hiv) this.hiv.checked = true;
//                 if (data.sti) this.sti.checked = true;
//                 if (data.queer_friendly) this.queer_friendly.checked = true;
//             },
//
//             extract: function () {
//                 return {
//                     name: this.name.val(),
//                     address: this.address.val(),
//                     website: this.website.val(),
//                     phone: this.phone.val(),
//                     hours: this.hours.val(),
//                     type: this.type.val(),
//                     longitude: this.longitude.val(),
//                     latitude: this.latitude.val(),
//                     condoms: this.condoms.checked,
//                     hiv: this.hiv.checked,
//                     sti: this.sti.checked,
//                     queer_friendly: this.queer_friendly.checked
//                 };
//             }
//         };
//
//     // Clear List of Places on modal closing in
//     // order to have clean slate each time
//     $placesModal.on('hidden.bs.modal', function () {
//         $placesList.html('');
//     });
//
//     // Listen for the event fired when the user selects a prediction and
//     // populate modal place list with places and show modal.
//     searchBox.addListener('places_changed', function () {
//         let places = searchBox.getPlaces();
//
//         if (places.length == 0)
//             $placesList.html('No locations were found for this selection.');
//         else
//             places.forEach(function (place, index) {
//                 $placesList.append(renderPlaceButton(place));
//             });
//
//         $placesModal.modal('show');
//     });
//
//     $locationForm.on('submit', function (event) {
//         event.preventDefault();
//
//         let successHook =
//             {
//                 responseMessage: 'Success',
//                 noResponseMessage: 'Request didn\'t go through',
//                 responseAction: function () {
//                     $locationCardId = $locationForm.data('location-card-id');
//                     if ($locationCardId) {
//                         setLocationCardData($('#' + $locationCardId), locationFormFields.extract());
//                         setFormAddMode();
//                     }
//
//                     $searchBoxInput.val('');
//                     locationFormFields.clear();
//                 }
//             };
//
//         let errorHook =
//             {
//                 message: 'Failure'
//             };
//
//         ajaxForm($(this), successHook, errorHook);
//
//     }); // locationForm on click
//
//     enableLocationActions();
//
//
// } // end initAutoComplete()
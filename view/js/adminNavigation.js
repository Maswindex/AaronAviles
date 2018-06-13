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


// Show events
$('#viewEvents').click(function () {

    $('#eventForm').show();
    $('#locationForm').hide();
    $('#partnersForm').hide();

    populateList($this);
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

    populateList($this);
    return false;
});

// Show partners
$('#viewPartners').click(function () {
    $('#eventForm').hide();
    $('#locationForm').hide();

    populateList($this);
    return false;
});

// Populate the lists with events/locations/partners pulled from json

// Click & activate a list item, then run populate function
$('.list-group-item').click(function () {
    $('.list-group-item.active').removeClass('active');
    $(this).addClass('active');
});

// Populate Function
function populateForm() {
    // Detect which list it's in
    // Find correct form
    // Populate fields from correct json file into the form
}

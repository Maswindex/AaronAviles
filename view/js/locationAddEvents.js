// "use strict";
// var events = {};
// var locations = [];
//
// var selectedEvents = [];
//
// //pulled the events
//
// $(window).ready(locationActivate());
//
//
// function locationActivate() {
//
//     fillEvents();
//     fillLocations();
//     createRelatedEvents();
//     pickRelatedEvents();
//
// }
//
//
// function createRelatedEvents() {
//
// //Fill the checkbox / dropdown
//     for (var i = 0; i < events.length; i++) {
//         console.log("menu" + events[i].text.headline);
//
//         if (events[i].text.headline != "" || events[i].text.headline != " ") {
//
//             $(".dropdown-menu").append('<a class="dropdown-item update-item" href="#">' + events[i].text.headline + "</a>");
//         }
//     }
// }
//
// /**
//  * On aaron's click add the related events menu to appearing on the right for easy access
//  */
// function pickRelatedEvents() {
//
//     $(".update-item").on('click', function () {
//
//
//         //Pick the selected list of events on the right side
//         if (!selectedEvents.includes($(this).html())) {
//             selectedEvents += $(this).html();
//
//             console.log("added" + $(this).html());
//             // <span class='badge badge-pill badge-danger'>Remove</span>
//             $(".added-list").append('<a class="list-group-item selected pr-1">' + $(this).html() + "</a>");
//
//         }
//         else {
//             console.log("Was already in" + $(this).html());
//         }
//         saveEvents()
//     });
//
//
// }
//
// //Fill the events in the page by AJAX request
// function fillEvents() {
//     events = function () {
//         var tmp = null;
//         $.ajax({
//             'async': false,
//             'type': "POST",
//             'global': false,
//             'dataType': 'json',
//             'url': "model/test_events.json",
//             'success': function (data) {
//                 tmp = data.events;
//             }
//         });
//         return tmp;
//     }();
// }
//
// //fills locations with locations from the json file
// function fillLocations() {
//     locations = function () {
//         var tmp = null;
//         $.ajax({
//             'async': false,
//             'type': "POST",
//             'global': false,
//             'dataType': 'json',
//             'url': "model/locations.json",
//             'success': function (data) {
//                 tmp = data.locations;
//             }
//         });
//         return tmp;
//     }();
// }
//
// /**
//  * This function will not hold a value until remove/ uses siblings to add and remove badges
//  */
// function saveEvents() {
//
//     //If there is a selected events list
//     if ($(".selected").siblings().length() > 1) {
//
//         //This will save and
//         // $(".selected").val = "<span class='badge badge-pill badge-danger'>Remove</span>";
//     }
//
// }

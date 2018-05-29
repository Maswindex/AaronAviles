/*
 *        author: Raine Padilla
 *       version: 1.0
 *      creation: 05/29/2018
 *     last edit: 05/29/2018
 *     file name: populateLists.js
 *   description: File to populate the admin lists for event,
 *                location, and (eventually) partners
 */

function populateList(clicked)
{
    // Read from events json file into the eventList div on the admin page
    if(clicked === $('#viewEvents'))
    {
        $.getJson('model/test_events.json', function(data){
            var eventList = document.getElementById('eventList');
            $.each(data, function (key, value) {
                var item = '<a href="#" class="list-group-item">data.text.headline</a>';
                eventList.append();
            });
        });
    }

// Read from locations json file into the locationList div on the admin page
    if(clicked === $('#viewLocations'))
    {
        $.getJson('model/locations.json', function(data){
            var locationList = document.getElementById('locationList');
            $.each(data, function (key, value) {
                var item = '<a href="#" class="list-group-item">data.text.headline</a>';
                locationList.append()
            });
        });
    }
}
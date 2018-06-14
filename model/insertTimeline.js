var options = {
    timenav_mobile_height_percentage: 15,
    timenav_height_percentage: 15,
    timenav_height_min: 120,
    start_at_end: true
};

window.timeline = new TL.Timeline(
                    'timeline-embed',
                    'model/test_events.json',
                    options);
"use strict";

function alterSplash(target)
{
    var checkExist = setInterval(function() {
        if ($(target).length) {
            //var newPage = $('#newPage');
            console.log(target);

            //$(target).html((newPage).html());
            $(target).click();

            clearInterval(checkExist);
        }
    }, 100);
}

alterSplash('.tl-message-full');
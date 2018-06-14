"use strict";

function target(target) {
    var checkExist = setInterval(function () {
        if ($(target).length) {
            console.log("Exists: " + target);
            $(target).click();
            clearInterval(checkExist);
        }
    }, 100);
}
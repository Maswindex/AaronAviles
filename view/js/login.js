//checks validation of user while typing

$(document).ready(function () {
    validateUserInstant();
    validateSubmission();
});

/**
 * This function validates user input after loses focus
 */
function validateUserInstant() {

    $("#username").focusout(function () {
        $.post('model/aaronLogin.php',
            {
                fromJS: true,
                username: $(this).val(),
                forusername: true
            }, function (results) {
                $('#username_err').html(results);
            });
    });

//checks validation of user while typing
    $("#pass").focusout(function () {
        $.post('model/aaronLogin.php',
            {
                fromJS: true,
                password: $(this).val(),
                forpassword: true
            }, function (results) {
                $('#pass_err').html(results);
            });
    });
}

function validateSubmission() {

    //When Submission occurs
    $("#login").on('click', function () {

        //don't send to server
        event.preventDefault();

        if ($("#username").val() == "" || $("#pass").val() == "") {
            // alert("empty");
            $('#username_err').html("Missing Information");
        }
        else {

            //we can route ourselves
            $.post('model/aaronLogin.php',
                {
                    username: $("#username").val(),
                    password: $("#pass").val()
                }, function (results) {
                    $('#username_err').html(results);
                });

        }

    });
}
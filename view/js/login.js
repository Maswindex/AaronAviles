<!--
    Author: Toygan Sevim
      Date: 4/14/2018
   Updated: 6/14/2018
      Team: Remote Workers
-->


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

/**
 * This function will validate the user's input and make sure there is one to work with
 */
function validateSubmission() {

    //When Submission occurs
    $("#login").on('click', function () {

        //don't send to server
        event.preventDefault();

        //if EMPTY name / pass
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
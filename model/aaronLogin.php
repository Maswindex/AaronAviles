<?php
/**
 * Created by PhpStorm.
 * User: toygan
 * Date: 6/2/18
 * Time: 3:19 AM
 *
 * This file will instantiate the first checks for the login
 */

//bring the Password file
require_once "/home/tsevimgr/config.php";

validateAdmin();


//validateAdmin();

function redirectToAdmin()
{
    http_redirect("http://tsevim.greenriverdev.com/355/AaronAviles/admin");
}

/**
 * This function will validate aaron's input with the file in the "DB" existing file in the
 * structure
 */
function validateAdmin()
{
    //is the send data coming Submit button or JS ?
    if(!isset($_POST['fromJS']))
    {

        
        var_dump($_POST);


    } else
    {
        $checkUser = $checkPassword = false;
        //tried to enter password | clicked off input | Invoked JS function

        //Return a message to display on the Error position
        if(isset($_POST['forusername']) && $_POST['username'] != AA_USERNAME)
        {
            //Tried to enter username } failed
            echo "Invalid USERNAME";
        } else if(isset($_POST['forpassword']) && $_POST['password'] != AA_PASSWORD)
        {
            //Tried to enter Password } failed

            echo "INVALID password";
        } //check all
        if(isset($_POST['forusername']) && $_POST['username'] == AA_USERNAME)
        {
            echo "<span class='text-success'><i class=\"fa fa-check text-success \" aria-hidden=\"true\"></i></span>";
            $checkUser = true;

        } else if(isset($_POST['forpassword']) && $_POST['password'] == AA_PASSWORD)
        {
            echo "<span class='text-success'><i class=\"fa fa-check text-success \" aria-hidden=\"true\"></i></span>";
            $checkPassword = true;
        }

        //validated good to access
        if($checkPassword == 1 && $checkUser == 1)
        {
            redirectToAdmin();
        }
    }

}
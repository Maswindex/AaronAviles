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
session_start();


require_once "/home/tsevimgr/config.php";


$checkPassword = $checkUser = "";


validateAdmin();


//validateAdmin();

/**
 * This function will echo
 * @param $url
 */
function redirectToAdmin($url)
{
    $string = '<script type="text/javascript">';
    $string .= 'window.location = "' . $url . '"';
    $string .= '</script>';

    //redirect by echoing
    echo $string;
}


/**
 * This function will validate aaron's input with the file in the "DB" existing file in the
 * structure
 */
function validateAdmin()
{

    //This URL WILL BE A constant
    $url = "http://tsevim.greenriverdev.com/355/AaronAviles/admin";

    //data coming from submit button post
    if(!isset($_POST['fromJS']))
    {
        //if logged in person is aaron
        if($_SESSION['user'] == $_POST['username'])
        {
            //redirect
            redirectToAdmin($url);
        } else
        {
            echo "Invalid address please leave!";
        }


    } else //data from js validation
    {
        //tried to enter password | clicked off input | Invoked JS function

        //Return a message to display on the Error position
        if(isset($_POST['forusername']) && $_POST['username'] != AA_USERNAME)
        {
            //Tried to enter username } failed
            echo "Invalid username";
        } else if(isset($_POST['forpassword']) && $_POST['password'] != AA_PASSWORD)
        {
            //Tried to enter Password } failed

            echo "Invalid password";
        } //check all
        if(isset($_POST['forusername']) && $_POST['username'] == AA_USERNAME)
        {
            echo "<span class='text-success'><i class=\"fa fa-check text-success \" aria-hidden=\"true\"></i></span>";

        } else if(isset($_POST['forpassword']) && $_POST['password'] == AA_PASSWORD)
        {
            echo "<span class='text-success'><i class=\"fa fa-check text-success \" aria-hidden=\"true\"></i></span>";
        }
    }

}
<?php
/**
 * Created by PhpStorm.
 * User: toygan
 * Date: 5/24/18
 * Time: 10:02 AM
 *
 * This document will get a POST submission of AAron's location creation
 * want and will create a marker on the map with the given location's information.
 */


//Set Refresh header using PHP.
//header("refresh:5;url=../admin");

//var_dump($_POST);

//use file get contents
//include "../view/json/mapLocations.json";

//See if the post is submitted correctly

if(!isset($_POST['postLocation']))
{
    exit(0);

} else
{
    $jsonFile = json_decode($_POST['location']);

    // make sure the file is writable
    // if it is, write the temporary array back into the file.
    if(is_writable('locations.json'))
    {

        file_put_contents('locations.json', $jsonFile);
    }

}

//echo '<pre>' . print_r($_POST, true) . '</pre>';


//append the retrieved data in to the json file

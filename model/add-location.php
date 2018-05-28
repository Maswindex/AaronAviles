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
echo "connect";
if(!isset($_POST['submit']) && empty($_POST['latitude']) || empty($_POST['longitude']))
{

    //redirect back

} else
{


    //get the ltn lng as variable
    $longitute = $_POST['longitude'];
    $langitude = $_POST['latitude'];


    //2 most important are Lang, Long - see if they are empty
    if(isset($longitute) && isset($langitude))
    {

        //Data is clear ready to parse and json
        //format our data into required format


    }
}


$locations = file_get_contents("locations.json");

//decode
$jsonFile = json_decode($locations, true); //true for Assoc array

$jsonFile = JSON . parse($jsonFile);


//test print
echo '<pre>' . print_r($jsonFile, true) . '</pre>';


//append the retrieved data in to the json file

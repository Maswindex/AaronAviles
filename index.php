<?php
/**
 * Created by PhpStorm.
 * User: Tyler Bezera
 * Date: 4/30/2018
 * Time: 5:22 PM
 */
//require the autoload file
error_reporting(E_ALL);
ini_set("display_errors", TRUE);

require_once 'vendor/autoload.php';

//create an instance of the Base class
session_start();

$f3 = Base::instance();

//Main Route to the timeline ->for now
$f3->route('GET|POST /', function ($f3)
{
    if (isset($_POST['targetEvent'])) {
        $trimmed = strtolower(trim($_POST['targetEvent']));
        $trimmed = preg_replace("/([^A-Za-z0-9])+/", "-", $trimmed);
        $trimmed = $trimmed.'-marker';

        $f3->set('targeted', true);
        $f3->set('targetEvent', '#'.$trimmed);
    }

    echo Template::instance()->render('view/timeline.html');
});

/*
 * Places Route that Uses Google API
 */
$f3->route('GET /places', function ()
{
    $view = new View();
    echo $view->render('view/places.html');
});


/**
 * Admin route that will validate the user
 */
$f3->route('GET|POST /admin', function ($f3)
{
    $view = new View();

    //validate the session and the user
    if(empty($_SESSION['user']))
    {
        $f3->reroute('/login');
    }

    //Set the title as you please to the page
    $aaronTitle = "Aaron Aviles";

    $f3->set('title', $aaronTitle);

    echo $view->render('view/admin.html');
});


/**
 * Login route
 */
$f3->route('GET|POST /login', function ()
{
    include_once './model/helperFiles/database.php';

    $view = new View();
    require_once "model/aaronLogin.php";

    echo $view->render('view/login.html');
});


//location upload
$f3->route('POST|GET /logout', function ($f3)
{
    if(empty($_SESSION['user']))
    {
        $f3->reroute('/login');
    }

    require_once 'model/logout.php';

    if(empty($_SESSION['user']))
    {
        //Successfully logged out
        $f3->reroute('/');
    }
});


$f3->set('DEBUG', 3);

$f3->run();
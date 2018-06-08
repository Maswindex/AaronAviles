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


$f3->route('GET /', function ()
{
    $view = new View();
    echo $view->render('view/timeline.html');
});

$f3->route('GET /places', function ()
{
    $view = new View();
    echo $view->render('view/places.html');
});


$f3->route('GET|POST /admin', function ($f3)
{
    $view = new View();

    $aaronTitle = "Aaron Aviles";

    $f3->set('title', $aaronTitle);
    echo $view->render('view/admin.html');
});


$f3->route('GET|POST /login', function ($f3)
{
    include_once './model/helperFiles/database.php';

    $view = new View();

    $adminValid = "Toygan";
    require_once "model/aaronLogin.php";


    echo $view->render('view/login.html');
});


//location upload
$f3->route('POST|GET /admin/locationAdd', function ($f3)
{
    $view = new View();
    echo $view->render('view/citySearch.html');
});


$f3->set('DEBUG', 3);

$f3->run();
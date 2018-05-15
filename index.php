<?php
/**
 * Created by PhpStorm.
 * User: Tyler Bezera
 * Date: 4/30/2018
 * Time: 5:22 PM
 */
//require the autoload file
require_once 'vendor/autoload.php';

//create an instance of the Base class
$f3 = Base::instance();
session_start();

$f3->route('GET /', function() {
    $view = new View();
    echo $view->render('view/timeline.html');
});

$f3->route('GET /places', function() {
    $view = new View();
    echo $view->render('view/places.html');
});

$f3->route('GET /admin', function() {
    $view = new View();
    echo $view->render('view/admin.html');
});

$f3->set('DEBUG', 3);
$f3->run();
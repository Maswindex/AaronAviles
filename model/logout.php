<?php
/**
 * Created by PhpStorm.
 * User: Toygan Sevim
 * Date: 6/8/18
 * Time: 12:27 AM
 *
 * This file will kill the current session and will logout the user
 */

session_start();

unset($_SESSION['username']);
session_destroy();

define("AA_HOMEPAGE", "www.tsevim.greenriverdev.com/355/Aaronaviles");

header('Location: ' . AA_HOMEPAGE);



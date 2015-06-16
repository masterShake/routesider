<?php
require "core/init.php";
$user = new User();
$user->logout();
Redirect::to($_SERVER["DOCUMENT_ROOT"] . "/routesider/");


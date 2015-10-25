<?php

//-----------------------------------------------
//
//		test jumbotron json method
//
//-----------------------------------------------


include "../core/init.php";

$user = new User();

$business = $user->business();

$business = $business[0];

// echo $business->data("id");

$profile = $business->profile();

// echo $profile->business()->data("id");

$res = $profile->jumbo();

// echo $res;

echo "<pre>";

print_r($res);

// echo "</pre>";

// print_r($res->getSingleNodeByLabel("Jumbotron"));

// $j = $res->getSingleNodeByLabel("Jumbotron");

// print_r($j->getProperties());

// echo json_encode($j->getProperties());

echo "</pre>";






















?>
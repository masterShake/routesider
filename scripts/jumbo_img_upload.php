<?php

//-----------------------------------------------
//
//			jumbotron image upload
//		  --------------------------
//
// - upload a background image
//
// - upload a dragable imagee
//
//-----------------------------------------------


$fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

if ($fn) {

    $user = new User();

    $uFolder = $_SERVER["DOCUMENT_ROOT"]."/routesider/uploads/";

    // AJAX call
    file_put_contents(
        $uFolder . $fn,
        file_get_contents('php://input')
    );

    //-------------------------------------------
    // - create a unique name for the file
    // - e.g. "username_123.jpg";
    $fc = explode(".", $fn); // print_r($fc);
    $newName = rand(0, 1000);
    $newName = $user->data("username") . "_" . $newName . "." . $fc[1]; 

    // change the name of the file to ensure it is unique
    rename( $uFolder . $fn, $uFolder . $newName ); //change this

    // get the image dimensions
    $imgData = getimagesize($uFolder.$newName);

    //-----------------------------------------------
    // - get the image aspect ratio
    // - height is assumed to be 1
    // - width is expressed as a fraction of height 
    // - e.g. if the image is 900 x 1200, then the 
    //   dims (aspect ratio) is 1.33333

    $imgData = [ 
                 "image" => "uploads/".$newName,
                 "w" => 1,
                 "h" => round(($imgData["1"] / $imgData["0"]), 2) 
               ];

    exit( json_encode($imgData) );
}





























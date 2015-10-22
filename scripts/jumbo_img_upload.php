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

    //-------------------------------------------
    // - getfile information
    // - $ff[0] = random number
    // - $ff[1] = file extension
    // - $ff[2] = heroSwiperObject
    $ff = explode(".", $fn);

    $uFolder = $_SERVER["DOCUMENT_ROOT"]."/routesider/uploads/";

    // AJAX call
    file_put_contents(
        $uFolder . $ff[0].'.'.$ff[1],
        file_get_contents('php://input')
    );

    //-------------------------------------------
    // - create a unique name for the file
    // - e.g. "username_123.jpg";
    $newName = rand(0, 1000);
    $newName = $user->data("username") . "_" . $newName . "." . $ff[1]; 

    // change the name of the file to ensure it is unique
    rename( $uFolder . $ff[0].'.'.$ff[1], $uFolder . $newName ); //change this

    $json = [ "filename" => $newName];

    $json = json_encode($json);

    exit( $json );
}





























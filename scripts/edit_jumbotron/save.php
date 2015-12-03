<?php

//-----------------------------------------------
//
//          Save changes to jumbotron
//        -----------------------------
//
// - format the data
//
// - update the database
//
//-----------------------------------------------

if(Input::exists()){

    // save changes
	if(isset($_POST["json"])){

        // decode the json
        $jumbo = json_decode($_POST["json"]);

        // if the user added a new background image
        if(substr($jumbo->image, 0, 6) == "upload"){
            // remove the "uploads/" prefix
            $jumbo->image = substr($jumbo->image, 8);
            // isolate the server root
            $uRoot = $_SERVER["DOCUMENT_ROOT"]."/routesider/";
            // move the file by renaming it
            rename($uRoot . "uploads/" . $jumbo->image, $uRoot . "img/business/" . $jumbo->image);
        }

        // get the user's business
        $user = new User();

        $business = $user->business()[0];

        $cypher = 
        "MATCH (b:Business) WHERE b.id = " . $business->data("id") . " " .
        "MATCH (b)-[:HAS_PROFILE]->(p)-[q:HAS_JUMBO]->(j) " .
        "MATCH (j)-[:LAYOUT]->(m:Mobile) ".
        "SET q.active={$jumbo->active}, " .
        "j.image='{$jumbo->image}', ".
        "j.opacity={$jumbo->opacity}, ".
        "j.blur={$jumbo->blur}, ".
        "j.color='{$jumbo->color}', " .
        "j.ratio='{$jumbo->ratio}', " .
        "m.h={$jumbo->layouts->mobile->h}, ".
        "m.w={$jumbo->layouts->mobile->w}, ".
        "m.x={$jumbo->layouts->mobile->x}, ".
        "m.y={$jumbo->layouts->mobile->y}";

        $db = neoDB::getInstance();

        $db->q($cypher);

        exit("1");
    }
}
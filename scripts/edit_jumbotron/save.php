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

        // round the layout values
        $jumbo->layouts->mobile->x = round($jumbo->layouts->mobile->x, 2);
        $jumbo->layouts->mobile->y = round($jumbo->layouts->mobile->y, 2);
        $jumbo->layouts->mobile->scale = round($jumbo->layouts->mobile->scale, 2);
        $jumbo->layouts->mobile->angle = round($jumbo->layouts->mobile->angle, 2);

        // get the user's business
        $user = new User();

        $business = $user->business()[0];

        $cypher = 
        "MATCH (b:Business) WHERE b.id = " . $business->data("id") . " " .
        "MATCH (b)-[:HAS_PROFILE]->(p)-[q:HAS_JUMBO]->(j) " .
        "MATCH (j)-[:LAYOUT]->(m:Mobile) ".
        "MATCH (j)-[:LAYOUT]->(t:Tablet) ".
        "MATCH (j)-[:LAYOUT]->(d:Desktop) ".
        "SET q.active={$jumbo->active}, " .
        "j.image='{$jumbo->image}', ".
        "j.opacity={$jumbo->opacity}, ".
        "j.blur={$jumbo->blur}, ".
        "j.color='{$jumbo->color}', " .
        "j.ratio='{$jumbo->ratio}', " .
        "m.x= {$jumbo->layouts->mobile->x}, ".
        "m.y= {$jumbo->layouts->mobile->y}, ".
        "m.scale= {$jumbo->layouts->mobile->scale}, ".
        "m.angle= {$jumbo->layouts->mobile->angle}";
        // "t.x={$jumbo->layouts->tablet->x}, ".
        // "t.y={$jumbo->layouts->tablet->y}, ".
        // "t.scale={$jumbo->layouts->tablet->scale}, ".
        // "t.angle={$jumbo->layouts->tablet->angle}, ".
        // "d.x={$jumbo->layouts->desktop->x}, ".
        // "d.y={$jumbo->layouts->desktop->y}, ".
        // "d.scale={$jumbo->layouts->desktop->scale}, ".
        // "d.angle={$jumbo->layouts->desktop->angle}, ".

        $db = neoDB::getInstance();

        $db->q($cypher);

        exit("1");
    }
}
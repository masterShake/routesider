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
        if($jumbo->bg->image && substr($jumbo->bg->image, 0, 6) == "upload"){
            // remove the "uploads/" prefix
            $jumbo->bg->image = substr($jumbo->bg->image, 8);
            // isolate the server root
            $uRoot = $_SERVER["DOCUMENT_ROOT"]."/routesider/";
            // move the file by renaming it
            rename($uRoot . "uploads/" . $jumbo->bg->image, $uRoot . "img/business/" . $jumbo->bg->image);
        }

        // if the image is not a number, add single quotes
        if($jumbo->bg->image)
            $jumbo->bg->image = "'".$jumbo->bg->image."'";

        // round the layout values
        $jumbo->bg->layout->mobile->x = round($jumbo->bg->layout->mobile->x, 2);
        $jumbo->bg->layout->mobile->y = round($jumbo->bg->layout->mobile->y, 2);
        $jumbo->bg->layout->mobile->s = round($jumbo->bg->layout->mobile->s, 2);
        $jumbo->bg->layout->mobile->a = round($jumbo->bg->layout->mobile->a, 2);
        $jumbo->bg->layout->tablet->x = round($jumbo->bg->layout->tablet->x, 2);
        $jumbo->bg->layout->tablet->y = round($jumbo->bg->layout->tablet->y, 2);
        $jumbo->bg->layout->tablet->s = round($jumbo->bg->layout->tablet->s, 2);
        $jumbo->bg->layout->tablet->a = round($jumbo->bg->layout->tablet->a, 2);
        $jumbo->bg->layout->desktop->x = round($jumbo->bg->layout->desktop->x, 2);
        $jumbo->bg->layout->desktop->y = round($jumbo->bg->layout->desktop->y, 2);
        $jumbo->bg->layout->desktop->s = round($jumbo->bg->layout->desktop->s, 2);
        $jumbo->bg->layout->desktop->a = round($jumbo->bg->layout->desktop->a, 2);

        // get the user's business
        $user = new User();

        $business = $user->business()[0];

        $cypher = 
        "MATCH (a:Business) WHERE a.id = " . $business->data("id") . " " .
        "MATCH (a)-[:HAS_PROFILE]->(p:Profile)-[:SECTION]->(j:Jumbotron) " .
        "MATCH (j)-[:COMPONENT]->(b:Background) ".
        "MATCH (b)-[:LAYOUT]->(m:Mobile) ".
        "MATCH (b)-[:LAYOUT]->(t:Tablet) ".
        "MATCH (b)-[:LAYOUT]->(d:Desktop) ".
        "SET j.active={$jumbo->active}, ".
        "b.image={$jumbo->bg->image}, ".
        "b.opacity={$jumbo->bg->opacity}, ".
        "b.blur={$jumbo->bg->blur}, ".
        "b.color='{$jumbo->bg->color}', " .
        "b.ratio={$jumbo->bg->ratio}, " .
        "m.x= {$jumbo->bg->layout->mobile->x}, ".
        "m.y= {$jumbo->bg->layout->mobile->y}, ".
        "m.s= {$jumbo->bg->layout->mobile->s}, ".
        "m.a= {$jumbo->bg->layout->mobile->a}, ".
        "t.x= {$jumbo->bg->layout->tablet->x}, ".
        "t.y= {$jumbo->bg->layout->tablet->y}, ".
        "t.s= {$jumbo->bg->layout->tablet->s}, ".
        "t.a= {$jumbo->bg->layout->tablet->a}, ".
        "d.x= {$jumbo->bg->layout->desktop->x}, ".
        "d.y= {$jumbo->bg->layout->desktop->y}, ".
        "d.s= {$jumbo->bg->layout->desktop->s}, ".
        "d.a= {$jumbo->bg->layout->desktop->a}";

        $db = neoDB::getInstance();

        $db->q($cypher);

        exit("1");
    }
}
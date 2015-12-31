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

        //-----------------------------------------------
        // - function to round all of the values
        // - $x: an array of components (bg, tbs, imgs, btns) 
        function roundIt($components){
            // loop through the array of textboxes or whatever
            foreach($components as $component){
                // loop through each of the layouts
                foreach($component->layout as $device => $cssRules){
                    // loop through each of the values
                    foreach($cssRules as $rule => $val){
                        // round the value to the nearest hundredth
                        $component->layout->{$device}->{$rule} = round($val, 2);
                    }
                }
            }
        }
        // rounding function for bg only
        function roundBg($component){
            // loop through each of the layouts
            foreach($component->layout as $device => $cssRules){
                // loop through each of the values
                foreach($cssRules as $rule => $val){
                    // round the value to the nearest hundredth
                    $component->layout->{$device}->{$rule} = round($val, 2);
                }
            }
        }

        // decode the json
        $jumbo = json_decode($_POST["json"]); // print_r($jumbo); exit();

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

        // round out the layout values
        roundBg($jumbo->bg);
        roundIt($jumbo->tbs);
        // roundIt($jumbo->imgs);
        // roundIt($jumbo->btns);




        // // round the layout values
        // $jumbo->bg->layout->mobile->x = round($jumbo->bg->layout->mobile->x, 2);
        // $jumbo->bg->layout->mobile->y = round($jumbo->bg->layout->mobile->y, 2);
        // $jumbo->bg->layout->mobile->s = round($jumbo->bg->layout->mobile->s, 2);
        // $jumbo->bg->layout->mobile->a = round($jumbo->bg->layout->mobile->a, 2);
        // $jumbo->bg->layout->tablet->x = round($jumbo->bg->layout->tablet->x, 2);
        // $jumbo->bg->layout->tablet->y = round($jumbo->bg->layout->tablet->y, 2);
        // $jumbo->bg->layout->tablet->s = round($jumbo->bg->layout->tablet->s, 2);
        // $jumbo->bg->layout->tablet->a = round($jumbo->bg->layout->tablet->a, 2);
        // $jumbo->bg->layout->desktop->x = round($jumbo->bg->layout->desktop->x, 2);
        // $jumbo->bg->layout->desktop->y = round($jumbo->bg->layout->desktop->y, 2);
        // $jumbo->bg->layout->desktop->s = round($jumbo->bg->layout->desktop->s, 2);
        // $jumbo->bg->layout->desktop->a = round($jumbo->bg->layout->desktop->a, 2);

        //-----------------------------------------------
        // - loop through the properties of a component
        // - construct a cypher query to insert it
        // function constructComp($component){

        //     $x = "";

        //     // loop through the properties of the component
        //     foreach($component as $key => $value)

        //     foreach($c->layout as $device => $cssRules){

        //         $

        //     }
        // }

        // get the user's business
        $user = new User();

        $business = $user->business()[0];

        $db = neoDB::getInstance();

        // match jumbotron, delete all textboxes, images, & buttons 

        $cypher = 
        "MATCH (a:Business) WHERE a.id = " . $business->data("id") . " " .
        "MATCH (a)-[:HAS_PROFILE]->(p:Profile)-[:SECTION]->(j:Jumbotron) " .
        "MATCH (j)-[q:COMPONENT]->(t:Textbox) ".
        "MATCH (j)-[r:COMPONENT]->(b:Button) ".
        "MATCH (j)-[s:COMPONENT]->(i:Image) ".
        "DELETE q, t, r, b, s, i";

        $db->q($cypher);

        // reset the background

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

        $db->q($cypher);

        // add all the new components

        // loop through all the textboxes
        foreach($jumbo->tbs as $textbox){

            // do no perform query if deleted
            if($textbox->deleted) continue;

            $cypher = 
            "MATCH (a:Business) WHERE a.id = " . $business->data("id") . " " .
            "MATCH (a)-[:HAS_PROFILE]->(p:Profile)-[:SECTION]->(j:Jumbotron) ".
            "MERGE (j)-[:COMPONENT]->(t:Textbox { ".
                "html:'{$textbox->html}', ".
                "color:'{$textbox->color}', ".
                "opacity:{$textbox->opacity}, ".
                "blur:{$textbox->blur}". 
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Mobile { ".
                "w:{$textbox->layout->mobile->w}, ".
                "h:{$textbox->layout->mobile->h}, ".
                "x:{$textbox->layout->mobile->x}, ".
                "y:{$textbox->layout->mobile->y}, ".
                "s:{$textbox->layout->mobile->s}, ".
                "r:{$textbox->layout->mobile->r} ".
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Tablet { ".
                "w:{$textbox->layout->tablet->w}, ".
                "h:{$textbox->layout->tablet->h}, ".
                "x:{$textbox->layout->tablet->x}, ".
                "y:{$textbox->layout->tablet->y}, ".
                "s:{$textbox->layout->tablet->s}, ".
                "r:{$textbox->layout->tablet->r} ".
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Desktop { ".
                "w:{$textbox->layout->desktop->w}, ".
                "h:{$textbox->layout->desktop->h}, ".
                "x:{$textbox->layout->desktop->x}, ".
                "y:{$textbox->layout->desktop->y}, ".
                "s:{$textbox->layout->desktop->s}, ".
                "r:{$textbox->layout->desktop->r} ".
            "})";

            $db->q($cypher);

        }

            // merge them with the jumbotron

        exit("1");
    }
}
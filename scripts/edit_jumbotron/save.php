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
        // function roundBg($component){
        //     // loop through each of the layouts
        //     foreach($component->layout as $device => $cssRules){
        //         // loop through each of the values
        //         foreach($cssRules as $rule => $val){
        //             // round the value to the nearest hundredth
        //             $component->layout->{$device}->{$rule} = round($val, 2);
        //         }
        //     }
        // }

        //-----------------------------------------------
        // - move image from /uploads/ to /imgs/business/ 
        function moveImg($filename){
             // if this is NOT a new image
            if(substr($filename, 0, 6) != "upload") return $filename;
            // remove the "uploads/" prefix
            $filename = substr($filename, 8);
            // isolate the server root
            $uRoot = $_SERVER["DOCUMENT_ROOT"]."/routesider/";
            // move the file by renaming it
            rename($uRoot . "uploads/" . $filename, $uRoot . "img/business/" . $filename);
            // return the new name
            return $filename;
        }

        // decode the json
        $jumbo = json_decode($_POST["json"]); // print_r($jumbo); exit();

        // move the background image if necessary

        // if the image is not a number, add single quotes
        if($jumbo->bg[0]->image){
            $jumbo->bg[0]->image = moveImg($jumbo->bg[0]->image);
            $jumbo->bg[0]->image = "'".$jumbo->bg[0]->image."'";
        }

        // move the image overlays to permanent folder if necessary
        foreach ($jumbo->imgs as $key => $image)
            $image->src = moveImg($image->src);
        

        // round out the layout values
        roundIt($jumbo->bg);
        roundIt($jumbo->tbs);
        roundIt($jumbo->imgs);
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
        "MATCH (j)-[q:COMPONENT]->(m)-[r]->(n) ".
        "WHERE NOT m:Background ".
        "DELETE q, m, r, n";

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
        "b.image={$jumbo->bg[0]->image}, ".
        "b.opacity={$jumbo->bg[0]->opacity}, ".
        "b.blur={$jumbo->bg[0]->blur}, ".
        "b.color='{$jumbo->bg[0]->color}', " .
        "b.ratio={$jumbo->bg[0]->ratio}, " .
        "m.x= {$jumbo->bg[0]->layout->mobile->x}, ".
        "m.y= {$jumbo->bg[0]->layout->mobile->y}, ".
        "m.s= {$jumbo->bg[0]->layout->mobile->s}, ".
        "m.a= {$jumbo->bg[0]->layout->mobile->a}, ".
        "t.x= {$jumbo->bg[0]->layout->tablet->x}, ".
        "t.y= {$jumbo->bg[0]->layout->tablet->y}, ".
        "t.s= {$jumbo->bg[0]->layout->tablet->s}, ".
        "t.a= {$jumbo->bg[0]->layout->tablet->a}, ".
        "d.x= {$jumbo->bg[0]->layout->desktop->x}, ".
        "d.y= {$jumbo->bg[0]->layout->desktop->y}, ".
        "d.s= {$jumbo->bg[0]->layout->desktop->s}, ".
        "d.a= {$jumbo->bg[0]->layout->desktop->a}";

        $db->q($cypher);

        // create array of z indexes
        $z = [];

        // loop through all the textboxes
        foreach ($jumbo->tbs as $key => $textbox) 
            // put them in a seperate array
            $z[$textbox->z] = $textbox;

        // image overlays
        foreach ($jumbo->imgs as $key => $image)
            $z[$image->z] = $image;

        // sort $z array by z index
        ksort($z);

        // indexer
        $i = 0;

        // reset the z index
        foreach ($z as $zIndex => $component) {
             
             $i++; // increment

            // set a new z index for textbox object
            $component->z = $i;
         } 

        // loop through all the textboxes
        foreach($jumbo->tbs as $textbox){

            $cypher = 
            "MATCH (a:Business) WHERE a.id = " . $business->data("id") . " " .
            "MATCH (a)-[:HAS_PROFILE]->(p:Profile)-[:SECTION]->(j:Jumbotron) ".
            "MERGE (j)-[:COMPONENT]->(t:Textbox { ".
                "html:'{$textbox->html}', ".
                "color:'{$textbox->color}', ".
                "opacity:{$textbox->opacity}, ".
                "blur:{$textbox->blur}, ".
                "z:{$textbox->z}, ". 
                "round:{$textbox->round}".
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Mobile { ".
                "w:{$textbox->layout->mobile->w}, ".
                "h:{$textbox->layout->mobile->h}, ".
                "x:{$textbox->layout->mobile->x}, ".
                "y:{$textbox->layout->mobile->y}, ".
                "s:{$textbox->layout->mobile->s}, ".
                "a:{$textbox->layout->mobile->a}, ".
                "v:{$textbox->layout->mobile->v} ".
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Tablet { ".
                "w:{$textbox->layout->tablet->w}, ".
                "h:{$textbox->layout->tablet->h}, ".
                "x:{$textbox->layout->tablet->x}, ".
                "y:{$textbox->layout->tablet->y}, ".
                "s:{$textbox->layout->tablet->s}, ".
                "a:{$textbox->layout->tablet->a}, ".
                "v:{$textbox->layout->tablet->v} ".
            "}) ".
            "MERGE (t)-[:LAYOUT]->(:Desktop { ".
                "w:{$textbox->layout->desktop->w}, ".
                "h:{$textbox->layout->desktop->h}, ".
                "x:{$textbox->layout->desktop->x}, ".
                "y:{$textbox->layout->desktop->y}, ".
                "s:{$textbox->layout->desktop->s}, ".
                "a:{$textbox->layout->desktop->a}, ".
                "v:{$textbox->layout->desktop->v} ".
            "})";

            $db->q($cypher);
        }

        // loop through all the image overlays
        foreach($jumbo->imgs as $image){

            $cypher = 
            "MATCH (a:Business) WHERE a.id = " . $business->data("id") . " " .
            "MATCH (a)-[:HAS_PROFILE]->(p:Profile)-[:SECTION]->(j:Jumbotron) ".
            "MERGE (j)-[:COMPONENT]->(i:Image { ".
                "src:'{$image->src}', ".
                "color:'{$image->color}', ".
                "opacity:{$image->opacity}, ".
                "blur:{$image->blur}, ".
                "z:{$image->z}, ". 
                "round:{$image->round}".
            "}) ".
            "MERGE (i)-[:LAYOUT]->(:Mobile { ".
                "x:{$image->layout->mobile->x}, ".
                "y:{$image->layout->mobile->y}, ".
                "s:{$image->layout->mobile->s}, ".
                "a:{$image->layout->mobile->a}, ".
                "v:{$image->layout->mobile->v} ".
            "}) ".
            "MERGE (i)-[:LAYOUT]->(:Tablet { ".
                "x:{$image->layout->tablet->x}, ".
                "y:{$image->layout->tablet->y}, ".
                "s:{$image->layout->tablet->s}, ".
                "a:{$image->layout->tablet->a}, ".
                "v:{$image->layout->tablet->v} ".
            "}) ".
            "MERGE (i)-[:LAYOUT]->(:Desktop { ".
                "x:{$image->layout->desktop->x}, ".
                "y:{$image->layout->desktop->y}, ".
                "s:{$image->layout->desktop->s}, ".
                "a:{$image->layout->desktop->a}, ".
                "v:{$image->layout->desktop->v} ".
            "})";

            $db->q($cypher);
        }

        exit("1");
    }
}
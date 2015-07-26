<?php

//-----------------------------------------------
//
//				   update maps
//				 ---------------
//
// - update the map nodes for a business
//
//-----------------------------------------------

$user = new User();

$pins = json_decode( $_POST["pins"] );

$polygons = json_decode( $_POST["polygons"] );

foreach ($polygons as $polygon) {
    
    // format coords
    $polygon->coords = preg_replace("/\(/", "[", $polygon->coords);
    $polygon->coords = preg_replace("/\)/", "]", $polygon->coords);
    $polygon->coords = "[" . $polygon->coords . "]";

    // validate fill hex
	if( !preg_match("/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/", $polygon->fill_color) )

		$errors[] = "invalid fill hexidecimal value";

    // validate fill opacity
    if( 0 > (double)$polygon->fill_opacity || (double)$polygon->fill_opacity > 1 )

    	$errors[] = "invalid opacity numeric value";

    // validate stoke hex
	if( !preg_match("/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/", $polygon->stroke_color) )

		$errors[] = "invalid fill hexidecimal value";

    // validate stroke opacity
    if( 0 > (double)$polygon->stroke_opacity || (double)$polygon->stroke_opacity > 1 )

    	$errors[] = "invalid opacity numeric value";

    // clean description

}

// if are formatting errors
if( count($errors) ){

    echo json_encode($errors);

// update database
}else{
    // delete all previous pins and polygons
    $cypher = "MATCH (u:User) WHERE u.username = '" . $user->data("username") . "' " .
    		  "MATCH (u)-[:MANAGES_BUSINESS]->(b) " .
    		  "OPTIONAL MATCH (b)-[q:HAS_PIN]->(n) " .
    		  "OPTIONAL MATCH (b)-[r:HAS_POLYGON]->(y) " .
    		  "DELETE q, n " .
    		  "DELETE r, y ";

    // loop through all the pins
    foreach( $pins as $pin ){

        $cypher .= "CREATE (b)-[:HAS_PIN]->(:Pin { " .
                       "lat : " . (double)$pin->lat . ", " .
                       "lng : " . (double)$pin->lng . ", " .
                       "description : '" . $pin->description . 
                   "'}) ";
    }

    // loop through each of the polygons
    foreach( $polygons as $polygon ){

    	$cypher .= "CREATE (b)-[:HAS_POLYGON]->(:Polygon { " .
        			   "coords : '" . $polygon->coords . "', " .
        			   "stroke_color : '" . $polygon->stroke_color . "', " .
        			   "stroke_opacity : " . floatval($polygon->stroke_opacity) . ", " .
        			   "fill_color : '" . $polygon->fill_color . "', " .
        			   "fill_opacity : " . floatval($polygon->fill_opacity) . ", " .
        			   "description : '" . $polygon->description . 
                   "'}) ";
    }

    $db = neoDB::getInstance();

    $db->query( $cypher );

    // return success
 	echo "update successful";
}





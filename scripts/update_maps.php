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

// foreach ($pins as $pin) {
    
    // validate coords

    // clean description

// }

foreach ($polygons as $polygon) {
    
    // validate formatting of coords


    // validate fill hex
	if( !preg_match("/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/", $polygon->fill_color) )

		$errors[] = "invalid fill hexidecimal value";

    // validate fill opacity
    if( 0 <= (int)$polygon->fill_opacity && (int)$polygon->fill_opacity <= 1 )

    	$errors[] = "invalid opacity numeric value";

    // validate stoke hex
	if( !preg_match("/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/", $polygon->stroke_color) )

		$errors[] = "invalid fill hexidecimal value";

    // validate stroke opacity
    if( 0 <= (int)$polygon->stroke_opacity && (int)$polygon->stroke_opacity <= 1 )

    	$errors[] = "invalid opacity numeric value";

    // clean description

}

// if there are no formatting errors
if( count($errors) ){

    // delete all previous pins and polygons
    $cypher = "MATCH (u:User) WHERE u.username = '" . $user->data("username") . "' " .
    		  "MATCH (u)-[:MANAGES_BUSINESS]->(b) " .
    		  "OPTIONAL MATCH (b)-[q:HAS_PIN]->(n) " .
    		  "OPTIONAL MATCH (b)-[r:HAS_POLYGON]->(y) " .
    		  "DELETE q, n " .
    		  "DELETE r, y ";

    // loop through each of the polygons
    foreach( $polygons as $polygon )

    	// concat the query
    	$cypher .= "CREATE (b)-[:HAS_POLYGON]->(p:Polygon { " .
    			   "coords : '" . $polygon->coords . "', " .
    			   "stroke_color : '" . $polygon->stroke_color . "', " .
    			   "stroke_opacity : " . floatval($polygon->stroke_opacity) . ", " .
    			   "fill_color : '" . $polygon->fill_color . "', " .
    			   "fill_opacity : " . floatval($polygon->fill_opacity) . ", " .
    			   "description : '" . $polygon->description . "'}) ";

    $db = neoDB::getInstance();

    $db->query( $cypher );

    // create new pin and polygon nodes

    // return success
 	echo "update successful";

// else return errors
}else{

	echo json_encode($errors);

}





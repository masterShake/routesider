<?php

//-----------------------------------------------
//
//				   update maps
//				 ---------------
//
// - update the map nodes for a business
//
//-----------------------------------------------


$db = neoDB::getInstance();

$user = new User();

$business = $user->business()[0];

$pins = json_decode( $_POST["pins"] );

$polygons = json_decode( $_POST["polygons"] );

$fresh = array();

foreach ($polygons as $polygon) {
    
    // - format coords as google maps lat lng literals
    $polygon->coords = preg_replace('/\(/', '{ "lat" : ', $polygon->coords);
    $polygon->coords = preg_replace('/\)/', "}", $polygon->coords);
    $polygon->coords = preg_replace('/, /', ', "lng" : ', $polygon->coords);
    $polygon->coords = "[" . $polygon->coords . "]";
    $polygon->coords = json_decode($polygon->coords); //print_r($polygon->coords);

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

    // loop through each of the pins
    foreach( $pins as $pin ){

        $cypher = "MERGE (id:UniqueId{name:'Map'}) " .
                  "ON CREATE SET id.count = 1 " .
                  "ON MATCH SET id.count = id.count + 1 " .
                  "WITH id.count AS mid " .
                  "MATCH (u:User) WHERE u.username = '" . $user->data("username") . "' " .
                   "MATCH (u)-[:MANAGES_BUSINESS]->(b) " .
                    "CREATE (b)-[:HAS_PIN]->(:Pins { " .
                        "id : mid, " .
                        "description : '" . $pin->description . "'" .
                    "})-[:HAS_COORD]->(c:Coordinate {" . 
                        "lat : " . (double)$pin->lat . ", ".
                        "lng : " . (double)$pin->lng . " " . 
                    "})";

        $db->query( $cypher );

        echo "update successful";
    }

    // loop through each of the polygons
    foreach( $polygons as $polygon ){
        $cypher = "MERGE (id:UniqueId{name:'Map'}) " .
                  "ON CREATE SET id.count = 1 " .
                  "ON MATCH SET id.count = id.count + 1 " .
                  "WITH id.count AS mid " .
                  "MATCH (u:User) WHERE u.username = '" . $user->data("username") . "' " .
                   "MATCH (u)-[:MANAGES_BUSINESS]->(b) " .
    	            "CREATE (b)-[:HAS_POLYGON]->(p:Polygon { " .
                       "id : mid, " .
        			   "coords : '" . json_encode($polygon->coords) . "', " .
        			   "stroke_color : '" . $polygon->stroke_color . "', " .
        			   "stroke_opacity : " . floatval($polygon->stroke_opacity) . ", " .
        			   "fill_color : '" . $polygon->fill_color . "', " .
        			   "fill_opacity : " . floatval($polygon->fill_opacity) . ", " .
        			   "description : '" . $polygon->description . 
                   "'}) ";

        // loop through each of the coords
        foreach( $polygon->coords as $coord ){

            $cypher .= "CREATE (p)-[:HAS_COORD]->(:Coordinate " . 
                       "{ lat : " . (double)$coord->lat . ", " . 
                       " lng : " . (double)$coord->lng . "}) ";
        }

        $db->query( $cypher );

        echo "update successful";

    }
}





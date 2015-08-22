<?php

//-----------------------------------------------
//			  edit social media query
//			---------------------------
//
// - query social media for a given user
//
// - $_POST["q"] -> (string) user input
//
// - $_POST["n"] -> (json) array of networks to 
//						   include, default null
//
// - $_POST["i"] -> (bool) include posts w/ images
//
// - $_POST["v"] -> (bool) include posts w/ video
//
//-----------------------------------------------

// get the global variables

$user = new User();

$business = $user->business()[0];

$db = neoDB::getInstance();

// assemble the query
		  
			// match the business 
$cypher = 	"MATCH (b:Business) WHERE b.id=". $business->data("id") ." ". 
		  	// match the socialite(s) linked to the business act.
		  	"OPTIONAL MATCH (b)-[:LINKED_TO]->(s)<-[:HAS_MEMBER]-(n) ";

			// decode the json
			$networks = json_decode($_POST["n"]);

			if( count($networks) ){

				$cypher .= "WHERE ";

				// loop through the networks
				foreach ($networks as $network) {
				
					// add the parameter to the query
					$cypher .= "n.name='". $network ."' OR ";
				}

				$cypher = substr($cypher, 0, -3);

			}

			// match the posts associated with our business socialite
			$cypher .= "OPTIONAL MATCH (s)-[:POSTED]->(p:Post)";

			// if we want images and/or videos
			if( $_POST["i"] || $_POST["v"])

				$cypher .=	"-[h:HAS_MEDIA]->(m:Media) WHERE ";


			// include posts with images
			if( $_POST["i"] ){

				$cypher .=	"m.type='image' ";

				// if video too
				if( $_POST["v"] )

					$cypher .= "OR ";

			}

			// exclude posts with media objects
			if( $_POST["v"] ){

				$cypher .=	"m.type='video' ";

			}

			$cypher .= "RETURN p, h, m";

// execute the query
$results = $db->q( $cypher );

// create empty array
$a = [];

// get all the :Post nodes
$posts = $results->getNodes('Post');

// loop through all the posts
foreach( $posts as $post ){

	// isolate the properties
	$p = $post->getProperties();

	// create a media array
	$p["media"] = [];

	// loop through the connected media nodes
	$media = $post->getConnectedNodes();
	foreach ($media as $m){
		
		// push the media properties onto the p["media"] array
		$p["media"][] = $m->getProperties();
	}

	// push the post onto the array
	$a[] = $p;
}

echo json_encode($a);

exit();









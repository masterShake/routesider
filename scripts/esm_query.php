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

			// if the user specified certain networks
			if( $_POST["n"] ){

				// decode the json
				$networks = json_decode($_POST["n"]);

				$cypher .= "WHERE ".

				// loop through the networks
				foreach ($networks as $network) {
				
					// add the parameter to the query
					$cypher .= "n.name='". $network ."' OR ";
				}

				$cypher = substr($cypher, 0, -3);
			}

			// match the posts associated with our business socialite
			$cypher .= "OPTIONAL MATCH (s)-[:POSTED]->(p)";

			// if we want images and/or videos
			if( $_POST["i"] || $_POST["v"])

				$cypher .=	"-[:HAS_MEDIA]->(m) WHERE ";


			// include posts with images
			if( $_POST["i"] ){

				$cypher .=	"m.type='img' ";

				// if video too
				if( $_POST["v"] )

					$cypher .= "OR "

			}

			// exclude posts with media objects
			if( $_POST["v"] ){

				$cypher .=	"m.type='vid' ";

			}

			$cypher .= "RETURN p, m";

// execute the query
$results = $db->query( $cypher );

print_r($results);











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
// - $_POST["a"] -> (bool) 1 = assemble autocomplete 
//						   HTML, 0 = post HTML
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
			$cypher .= "OPTIONAL MATCH (s)-[:POSTED]->(p:Post) ";

			// if querying for text
			if( !empty($_POST["q"]) ){

				$cypher .= "WHERE p.text =~ '(?i).*".$_POST["q"].".*' ";

			}

			// if we want images and/or videos
			if( $_POST["i"] || $_POST["v"])

				$cypher .=	"OPTIONAL MATCH (p)-[h:HAS_MEDIA]->(m:Media) WHERE ";


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

			$cypher .= "RETURN p, h, m LIMIT ";

			// if this is an autocomplete request
			$cypher .= ($_POST["a"]) ? "4" : "10";

// execute the query
$results = $db->q( $cypher );

// if we got no results
if( !$results->getNodesCount() ){
	echo "<li style='text-align:center;'><i>no results</i></li>";
	exit(); // exit script
}

// get all the :Post nodes
$posts = $results->getNodes('Post');

//------------------------------------------------
// NOTE: great code below but not appropriate here

// // create empty array
// $a = [];

// // loop through all the posts
// foreach( $posts as $post ){

// 	// isolate the properties
// 	$p = $post->getProperties();

// 	// create a media array
// 	$p["media"] = [];

// 	// loop through the connected media nodes
// 	$media = $post->getConnectedNodes();
// 	foreach ($media as $m){
		
// 		// push the media properties onto the p["media"] array
// 		$p["media"][] = $m->getProperties();
// 	}

// 	// push the post onto the array
// 	$a[] = $p;
// }

// assemble autocomplete request HTML
if( $_POST["a"] ){ 

	//-----------------------------------------------
	// - helper function wrap the matching text with 
	//   <span class="match">
	function wrapMatches( $t, $m ){

		// get the length of the query
		$qLen = strlen($_POST["q"]);

		// trigger to help cut the size of the string
		$trig = 1;

		// loop through the matches
		foreach ($m as $match) {
			
			// insert the span tags around the matches
			$t = substr($t, 0, $match[1]).
					"<span class='match'>".
					substr($t, $match[1], $qLen).
					"</span>".
					substr($t, ($match[1] + $qLen));

			// if this is our first match
			if($trig){
				// pull the trigger
				$trig = 0;
				// if the match is more than 10 character from the beginning 
				if($match[1] > 10){
					// splice the string to 8 chars before first match
					$t = substr($t, ($match[1] - 8));
					$t = "..." . $t;
				}
			}
		}

		return $t;
	}

	// use regex pattern to isolate that matching text
	$pattern = '/'.$_POST["q"].'.*/i';

	foreach ($posts as $post) { 

		// match the text with the query
		preg_match($pattern, $post->getProperty("text"), $matches, PREG_OFFSET_CAPTURE);

		// wrap the matches in <span class="match"></span>
		$text = wrapMatches( $post->getProperty("text"), $matches );


		?>
		
        <li class="list-group-item" data-postid='<?= $post->getProperty("id"); ?>'>
            <div>
                <div class="date"><?= date("m.d.Y", $post->getProperty("created_time")); ?></div>
                <div class='icon icon-<?= $post->getProperty("icon"); ?>'></div>
                <div class="text"><?= $text; ?></div>
            </div>
        </li>

	<?php }

// assemble post HTML
}else{

	foreach ($posts as $post) { ?>
		
		<span>nuts!</span>

	<?php }
}

exit();









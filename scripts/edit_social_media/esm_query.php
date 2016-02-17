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

$profile = $business->profile();

$db = neoDB::getInstance();

// assemble the query
		  
			// match the business 
$cypher = 	"MATCH (b:Business) WHERE b.id=". $business->data("id") ." ". 
		  	// match the socialite(s) linked to the business act.
		  	"OPTIONAL MATCH (b)-[:LINKED_TO {active : 1}]->(s)<-[:HAS_MEMBER]-(n) ";

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
	// if this is an autocomplete request
	if( $_POST["a"] )
		echo "<li style='text-align:center;'><i>no results</i></li>";
	else
		echo "<p style='text-align:center;'><i>no results</i></p>";	
	exit(); // exit script
}

// get all the :Post nodes
$posts = $results->getNodes('Post');

//-----------------------------------------------
// if the user requested a single post 
$singleResult = null;
$singlePost = null; // a single post node

// if this was a query for a specific post
if( $_POST["pid"] != 0 ){

	$cypher = "MATCH (p:Post) WHERE p.id ='".$_POST["pid"]."' ". 
			  "OPTIONAL MATCH (p)-[h:HAS_MEDIA]->(m) ".
			  "RETURN p, h, m";

	$singleResult = $db->q($cypher);

	$singlePost = $singleResult->getNodes("Post");

}

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
        <li class="list-group-item" data-pid='<?= $post->getProperty("id"); ?>'>
            <div data-pid='<?= $post->getProperty("id"); ?>'>
                <div class="date"><?= date("m.d.Y", $post->getProperty("created_time")); ?></div>
                <div class='icon icon-<?= $post->getProperty("icon"); ?>'></div>
                <div class="text"  data-pid='<?= $post->getProperty("id"); ?>'><?= $text; ?></div>
            </div>
        </li>

	<?php }

	exit();
}

// if the user requested a single post
if( !is_null($singlePost) ){

    $post = $singlePost[0];
		
	// get all the media objects
    $media = $post->getConnectedNodes("OUT", "HAS_MEDIA");

    ?>

		<div class="thumbnail social-media-post" id='<?= $post->getProperty("id"); ?>' data-loading="0">
		    <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post->getProperty("network"); ?>' data-id='<?= $post->getProperty("id"); ?>'></div>
		    <?php // if the post has at least 1 media object
		          if( count($media) ){

		            // if the post has a video
		            if( $media[0]->getProperty("type") == "video" ){ ?>

		    <!-- temp image to iframe -->
		    <div class="top-img" data-url='<?= $media[0]->getProperty("url"); ?>'>
		        <img src='<?= $media[0]->getProperty("cover_image"); ?>' alt="social media post">
		        <h1><span class="glyphicon glyphicon-play-circle"></span></h1>
		    </div>
		    
		            <?php // if the post has more than 1 image
		            }else if( count($media) > 1 ){  ?>

		    <!-- gallery -->

		            <?php // if there is only 1 image
		            }else{ ?>

		    <!-- single image -->
		    <img src='<?= $media[0]->getProperty("url"); ?>' alt="social media post">
		    
		    <?php } } ?>

		    <div class="caption">
		        <table>
		            <tr>
		                <td>
		                    <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
		                </td>
		                <td>
		                    <p>
		                        <a href='https://instagram.com/<?= $post->getProperty("username"); ?>'>
		                            <span>&#64;<?= $post->getProperty("username"); ?></span>
		                        </a>
		                        <?= ($post->hasProperty("text")) ? $post->getProperty("text") : ""; ?>
		                    </p>
		                </td>
		            </tr>
		        </table>
		    </div>
		    <div class="social-post-link"><a href='<?= $post->getProperty("link"); ?>'><span class='icon-<?= $post->getProperty("icon"); ?>'></span></a></div>
		    <div class="likes">
		        <div class="glyphicon glyphicon-heart"></div><div style="font-size:10px">&nbsp;&nbsp;<?= $post->getProperty("likes"); ?></div>
		    </div>
		</div>

<?php }

// if there is more than 1 matching post
if( !is_null($singlePost) && count($posts) > 1){ ?>

		<h5 style="border-top: 1px solid #ccc; margin: 40px 15px;padding-top:10px;text-align:center">
			Similar posts matching <strong><i><?= $_POST["q"]; ?></i></strong>:
		</h5>

<?php }else if(count($posts) && !empty($_POST["q"])){ ?>

		<h5 style="border-top: 1px solid #ccc; margin: 0px 15px 40px;padding-top:10px;text-align:center">
			Posts matching <strong><i><?= $_POST["q"]; ?></i></strong>:
		</h5>

<?php }

// loop through the posts and assemble the HTML
foreach ($posts as $post) { // echo '<pre>'; print_r($post); echo '</pre>';
		
	// get all the media objects
    $media = $post->getConnectedNodes("OUT", "HAS_MEDIA");

    // if this is a duplicate
    if( !is_null($singlePost) && $post->getProperty("net_id") == $singlePost[0]->getProperty("net_id")){

    	// do nothing
    
    }else{

    ?>

		<div class="thumbnail social-media-post" id='<?= $post->getProperty("net_id"); ?>' data-loading="0">
		    <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post->getProperty("network"); ?>' data-id='<?= $post->getProperty("net_id"); ?>'></div>
		    <?php // if the post has at least 1 media object
		          if( count($media) ){

		            // if the post has a video
		            if( $media[0]->getProperty("type") == "video" ){ ?>

		    <!-- temp image to iframe -->
		    <div class="top-img" data-url='<?= $media[0]->getProperty("url"); ?>'>
		        <img src='<?= $media[0]->getProperty("cover_image"); ?>' alt="social media post">
		        <h1><span class="glyphicon glyphicon-play-circle"></span></h1>
		    </div>
		    
		            <?php // if the post has more than 1 image
		            }else if( count($media) > 1 ){  ?>

		    <!-- gallery -->

		            <?php // if there is only 1 image
		            }else{ ?>

		    <!-- single image -->
		    <img src='<?= $media[0]->getProperty("url"); ?>' alt="social media post">
		    
		    <?php } } ?>

		    <div class="caption">
		        <table>
		            <tr>
		                <td>
		                    <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
		                </td>
		                <td>
		                    <p>
		                        <a href='https://instagram.com/<?= $post->getProperty("username"); ?>'>
		                            <span>&#64;<?= $post->getProperty("username"); ?></span>
		                        </a>
		                        <?= ($post->hasProperty("text")) ? $post->getProperty("text") : ""; ?>
		                    </p>
		                </td>
		            </tr>
		        </table>
		    </div>
		    <div class="social-post-link"><a href='<?= $post->getProperty("link"); ?>'><span class='icon-<?= $post->getProperty("icon"); ?>'></span></a></div>
		    <div class="likes">
		        <div class="glyphicon glyphicon-heart"></div><div style="font-size:10px">&nbsp;&nbsp;<?= $post->getProperty("likes"); ?></div>
		    </div>
		</div>


<?php } }


exit();









<?php
/*
 * test_oauth_client.php
 *
 * @(#) $Id: test_oauth_client.php,v 1.5 2013/07/31 11:48:04 mlemos Exp $
 *
 */

	include_once '../../core/init.php';

	/*
	 *  Get the http.php file from http://www.phpclasses.org/httpclient
	 */
	require('../../classes/OAuth/http.php');
	require('../../classes/OAuth/oauth_client.php');

	// load the api keys
	require("credentials.php");

	/* Create the OAuth authentication client class */ 
	$client = new oauth_client_class;

	// instantiate a results variable
	$results = null;

	/*
	 * Set to true if you want to make the class dump
	 * debug information to PHP error log
	 */
	$client->debug = true;

	/*
	 * Set to true if you want to make the class also dump
	 * debug output of the HTTP requests it sends.
	 */
	$client->debug_http = false;

	/* OAuth server type name
	 * Setting this variable to one of the built-in supported OAuth servers
	 * will make the class automatically set all parameters specific of that
	 * type of server.
	 * 
	 * Currently, built-in supported types are: Facebook, github, Google,
	 * Microsoft, Foursquare, Twitter and Yahoo.
	 * 
	 * Send e-mail to mlemos at acm.org if you would like the class to have
	 * built-in support to access other OAuth servers.
	 * 
	 * Set to an empty string to use another type of OAuth server. Check the
	 * documentation to learn how to set other parameters to configure the
	 * class to access that server
	 */
	$client->server = ucfirst($_GET["n"]);

	/* OAuth authentication URL identifier
	 * This should be the current page URL without any request parameters
	 * used by OAuth, like state and code, error, denied, etc..
	 */
	$client->redirect_uri = 'http://'.$_SERVER['HTTP_HOST'].
		dirname(strtok($_SERVER['REQUEST_URI'],'?')).'/ra.php?n='.$_GET["n"]; // echo $client->redirect_uri; exit();

	/* OAuth client identifier
	 * Set this to values defined by the OAuth server for your application
	 */
	$client->client_id = $creds[$_GET["n"]]["client_id"];

	/* OAuth client secret
	 * Set this to values defined by the OAuth server for your application
	 */
	$client->client_secret = $creds[$_GET["n"]]["client_secret"];

	/* OAuth client permissions
	 * Set this to the name of the permissions you need to access the
	 * application API
	 */
	$client->scope = $creds[$_GET["n"]]["scope"];

	// if ajax post username
	if( isset($_POST["u"]) ){

		// instantiate some vars
		$db = neoDB::getInstance();
		$user = new User();
		$business = $user->business()[0];

		// format the data based on social network

		$icon = "";
		$account = null;
		$avatar = null;
		$posts = null;

		// initialize the client
		if(($success = $client->Initialize())){
			// process the client call
			$success = $client->Process();
			// ensure that the access token was recaptured
			if(strlen($client->access_token)){

				// curl and format the data based on network type
				switch ( $_POST["n"] ){

					// facebook
					case "facebook": include "curl_facebook.php"; break;

					// instagram
					case "instagram": include "curl_instagram.php"; break;

					// tumblr
					case "tumblr": include "curl_tumblr.php"; break;

					// linkedin
					case "linkedin": include "curl_linkedin.php"; break;

					// twitter
					case "twitter": include "curl_twitter.php"; break;

					// google+
					case "google": include "curl_google.php"; break;
				}
			} // ensure we received the access token
		} // initialize the client

		// if user has connected to this network before
		$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
				  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
                  "RETURN s";
        $results = $db->query($cypher);

        if( !empty( $results ) ){

			// update the linked_to socialite info
			$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
					  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
					  "SET l.active=1, l.login=1, s.auto_update=1";

			$db->query($cypher);

		// else never connected before
        }else{

			// create a new socialite
        	$cypher = "MATCH (b:Business) WHERE b.id=" . $business->data("id") . " " .
                  	  "MATCH (n:Network) WHERE n.name='" . $_POST["n"] . "' ".
                  	  "CREATE (s:Socialite { ".
                  	  	"username : '".$account->name."', ".
                  	  	"net_id : '".$account->name."', ".
                  	  	"profile_pic : '".$avatar."', ".
                  	  	"website : '".$account->url."', ".
                  	  	"full_name : '".$account->name."', ".
                  	  	"bio : '".$account->description."', ".
                  	  	"auto_update : 1".
                  	  "}) ".
					  "MERGE (b)-[:LINKED_TO {active:1,login:1}]->(s)<-[:HAS_MEMBER]-(n)";

            $db->query($cypher);

		}

		// loop through all the posts
		foreach($posts as $post){

			// if the post already exists
			$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
					  "WHERE p.net_id='".$post->id."' ".
					  "RETURN p";

			$results = $db->query($cypher);

			if( !empty($results) ){

				// update the post info
				$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
					  	  "WHERE p.net_id='".$post->id."' ".
					  	  "SET p.text='".((property_exists($post, "body")) ? $post->body : "")."', ".
					  	  "p.title='".((property_exists($post, "title")) ? $post->title : "")."', ".
					  	  "p.likes=".$post->note_count;

				$db->query($cypher);

				// update the media object

			// else 
			}else{

				// create new post node
				$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
				  		  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
				  		  "CREATE (p:Post { ".
				  		  	"username : '".$_POST["u"]."', ".
				  		  	"net_id : '".$post->id."', ".
				  		  	"created_time : ".$post->timestamp.", ".
				  		  	"title : '".((property_exists($post, "title")) ? $post->title : "")."', ".
				  		  	"text : '".((property_exists($post, "body")) ? $post->body : "")."', ".
				  		  	"likes : ".$post->note_count.", ".
				  		  	"link : '".$post->post_url."', ".
				  		  	"network : '".$_POST["n"]."', ".
				  		  	"icon : '".$icon."'".
				  		  " }) ".
						  "MERGE (s)-[:POSTED {deleted : 0} ]->(p)<-[:HAS_POST]-(n)";

				$db->query($cypher);

				// If the post contains image(s)
				if($post->type == "photo"){

					// loop through the photos
					foreach($post->photos as $photo){

						$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
					  	  		  "WHERE p.net_id='".$post->id."' ".
					  	  		  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
					  	  		  	"width : ".$photo->alt_sizes[0]->width.", ".
					  	  		  	"height : ".$photo->alt_sizes[0]->height.", ".
					  	  		  	"url : '".$photo->alt_sizes[0]->url."', ".
					  	  		  	"thumbnail : '".$photo->alt_sizes[count($photo->alt_sizes) - 1]->url."', ".
					  	  		  	"type : 'image'".
					  	  		  "})";
						
						// merge nodes
						$db->query($cypher);
					}
				
				// if the post contains a video
				}else if($post->type == "video"){

					$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
				  	  		  "WHERE p.id='".$post->id."' ".
				  	  		  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
				  	  		  	"width : ".$post->player[2]->width.", ".
				  	  		  	"height : NULL, ".
				  	  		  	"url : '".$post->player[2]->embed_code."', ".
				  	  		  	"thumbnail : NULL, ".
				  	  		  	"type : 'video'".
				  	  		  "})";
					
					// merge nodes
					$db->query($cypher);					
				
				// if the post contains an audio clip
				}

				// else if($post->type == "audio"){

				// 		$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
				// 	  	  		  "WHERE p.id='".$post->id."' ".
				// 	  	  		  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
				// 	  	  		  	"width : NULL, ".
				// 	  	  		  	"height : NULL, ".
				// 	  	  		  	"url : '".$post->player."', ".
				// 	  	  		  	"thumbnail : NULL, ".
				// 	  	  		  	"type : 'audio'".
				// 	  	  		  "})";
						
				// 		// merge nodes
				// 		$db->query($cypher);
				// }
				// answer
				// chat
				// quote
				// link
			}

			// if the post has notes
			if(property_exists($post, "notes")){

				// loop through all the likes
				foreach($post->notes as $note){

					// if the liker already exists

					$cypher = "MATCH (s)<-[:HAS_MEMBER]-(n) ".
							  "WHERE s.username='".$note->blog_name."' AND n.name='".$_POST["n"]."' ".
							  "RETURN s";

					$results = $db->query( $cypher );

					if( !empty($results) ){

						// merge like relationship
						$cypher = "MATCH (s)<-[:HAS_MEMBER]-(n) ".
							  	  "WHERE s.username='".$note->blog_name."' AND n.name='".$_POST["n"]."' ".
							  	  "MATCH (p:Post) WHERE p.id='".$post->id."' ".
							  	  "MERGE (s)-[:LIKED]->(p)";

						$db->query($cypher);

					// else
					}else if($note->type == "like"){

						// create new liker
						$cypher = "MATCH (p)<-[:HAS_POST]-(n) ".
								  "WHERE p.id='".$post->id."' ".
								  "MERGE (p)<-[:LIKED]-(s:Socialite { ".
								  	"username : '".$note->blog_name."'".
								  "})<-[:HAS_MEMBER]-(n)";

						$db->query($cypher);

					}
				}
			}
		}

	    // output HTML checkbox for dropdown and query
	    echo "  <input type='checkbox' class='form-control' value='".$_POST["n"]."' data-icon='".$icon."' checked>
	            <span class='icon-".$icon."'></span>
	            &nbsp;".ucfirst($_POST["n"]); print_r($post->type);

		exit();
	}
	
	/* Process the OAuth server interactions */
	else if(($success = $client->Initialize()))
	{
		/*
		 * Call the Process function to make the class dialog with the OAuth
		 * server. If you previously have retrieved the access token and set
		 * the respective class variables manually, you may skip this call and
		 * use the CallAPI function directly.
		 */
		$success = $client->Process();
		// Make sure the access token was successfully obtained before making
		// API calls
		if(strlen($client->access_token)){

				$client->CallAPI( $creds[$_GET["n"]]["url"],
											 "GET",
											 ["api_key" => $creds[$_GET["n"]]["client_id"]],
											 [],
											 $results
						   				   );


				// $success = Curl::get("http://api.tumblr.com/v2/user/info?access_token=".$client->access_token);

		 	}
		 
		
		/* Internal cleanup call
		 */
		$success = $client->Finalize($success);
	}
	/*
	 * If the exit variable is true, the script must not output anything
	 * else and exit immediately
	 */
	if($client->exit)
		exit;
	
	if( !is_null($results) )
	{ 

		$uname = ""; // blogname
		$atoken = $client->access_token;

		// format the data based on the network
		switch($_GET["n"]){

			case "instagram":
				$uname = $results->data->username;
				break;

			case "tumblr":
				$uname = $results->response->user->blogs[0]->name;
				break;

		}


		// echo "<pre>";

		// print_r($results);

		// echo "</pre>"; exit();

		/*
		 * The Output function call is here just for debugging purposes
		 * It is not necessary to call it in real applications
		 */

		// get the user
		// $u = $results->response->user;

		// // get the first blog
		// $name = $u->blogs[0]->name;

		?>
		
		<!DOCTYPE html>
		<html lang="en">
		  <head>
		    <meta charset="utf-8">
		    <meta http-equiv="X-UA-Compatible" content="IE=edge">
		    <meta name="viewport" content="width=device-width, initial-scale=1">
		    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		    <title>Bootstrap 101 Template</title>
		    <!-- Bootstrap -->
		    <link href="../../css/bootstrap.min.css" rel="stylesheet">
		    <link href="../../css/main.css" rel="stylesheet">

		    <style>
		        h1, h5{
		            text-align:center;
		            color:#5cb85c;
		        }
		        h1{
		            margin-top:150px;
		        }
		        h5{
		            margin-top: 30px;
		        }
		    </style>

		  </head>
		  <body>

			<!-- hour glass spinner -->
		    <h1>
		        <span class="glyphicon glyphicon-hourglass loading" aria-label="loading animation"></span>
		    </h1>

		    <h5>Retrieving posts, please wait...</h5>

		    <!-- javascript -->
		    <script>

		        (function(){
		            document.addEventListener("DOMContentLoaded", function(){

		                // var n = '<?= $_GET["n"]; ?>';

		                var ajax = new XMLHttpRequest();
		                ajax.open("POST", "", true);
		                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		                ajax.onreadystatechange = function() {
		                    if(this.readyState == 4 && this.status == 200) {
		                    	// document.body.innerHTML = this.responseText;
		                        // console.log( this.responseText );
		                        console.log( JSON.parse(this.responseText) );
		                        // window.opener.esmApp.smPosts.authorize( this.responseText );
		                        // window.close();
		                    }
		                }
		                ajax.send('n=<?= $_GET["n"]; ?>&u=<?= $uname; ?>&t=<?= $atoken; ?>');

		            }, true);   
		        })();

		    </script>

		  </body>
		</html><?php

		// use the results to get the blog posts

	}else{
		/* 
		 * If there was an unexpected error, display to the user
		 * some useful information
		 */
		?>
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
		<html>
			<head>
				<title>OAuth client error</title>
			</head>
			<body>
				<h1>OAuth client error</h1>
				<pre>Error: <?php echo HtmlSpecialChars($client->error); ?></pre>
			</body>
		</html>
		<?php
	}

?>
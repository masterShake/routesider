<?php
/*
 * test_oauth_client.php
 *
 * @(#) $Id: test_oauth_client.php,v 1.5 2013/07/31 11:48:04 mlemos Exp $
 *
 */

	include_once '../core/init.php';

	/*
	 *  Get the http.php file from http://www.phpclasses.org/httpclient
	 */
	require('../classes/OAuth/http.php');
	require('../classes/OAuth/oauth_client.php');

	/* Create the OAuth authentication client class */ 
	$client = new oauth_client_class;

	// keep all the keys here i guess
	$creds = [ "tumblr"   => [ "client_id" 	  => "aWWWsdicEuin5zGcICL7bt5AOI9cBJf5Fq6m303KBEdFEzwQPA",
							  "client_secret" => "gXVlxHAjUu7pllr8p7CsWjH1wfFLGWbuFfIaFD6Mpx9vt4mSOk",
							  "url" => "http://api.tumblr.com/v2/user/info"],
			   "twitter"  => [ "client_id" 	  => "vJvNzGoaIAAvSptz7ogR7JCrf",
			  				  "client_secret" => "MkVDp05HlDo1HUryt2H2fhmBozjeeePXKhnTtT4O36gEyN1K6l"],
			   "linkedin" => [ "client_id" 	  => "75vclbfv2gi86o",
			  				  "client_secret" => "BoICgYPZ2gbAleyv"],
			   "instagram"=> [ "client_id" 	  => "e500697f93794161b09ab35a8e05d405",
			  				  "client_secret" => "f7264f1c5b934055adadc71d19536712"],
			   "facebook" => [ "client_id" 	  => "",
			  				  "client_secret" => ""],
			   "google"   => [ "client_id" 	  => "130924136799",
			  				  "client_secret" => "vqYkTfbxWOHRztk23B2-4-88"]
			 ];

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
		dirname(strtok($_SERVER['REQUEST_URI'],'?')).'/ra.php?n='.$_GET["n"];

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
	$client->scope = '';

	// if ajax post username
	if( isset($_POST["u"]) ){

		// make api call for tumblr blog data
		$posts = Curl::get("http://api.tumblr.com/v2/blog/".$_POST["u"].".tumblr.com/posts?api_key=".$creds[$_GET["n"]]["client_id"]."&notes_info=true");

		// convert json
		$posts = json_decode($posts);
		$posts = $posts->response->posts;

		print_r($posts); exit();

		// instantiate some vars
		$db = neoDB::getInstance();
		$user = new User();
		$business = $user->business()[1];

		// format the data based on social network

		$icon = "";

		//-----------------------------------------------
		// tumblr
		if( $_POST["n"] == "tumblr" ){

			$icon = "tumblr2";

		}
		
		// if user has connected to this network before
		$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
				  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["network"] . "' " .
                  "RETURN s";
        $results = $db->query($cypher);
        if( !is_null( $results["s"][0] ) ){

			// update the linked_to socialite info
			$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
					  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["network"] . "' " .
					  "SET l.active=1, l.login=1";

			$db->query($cypher);

		// else never connected before
        }else{

			// create a new socialite
        	$cypher = "MATCH (b:Business) WHERE b.id=" . $business->data("id") . " " .
                  	  "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' ";

		}

		// loop through all the posts
		foreach($posts as $post){

			// if the post already exists
			$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
					  "WHERE p.id='".$post->id."' ".
					  "RETURN p";

			$results = $db->query($cypher);

			if( !is_null($results["p"][0]) ){

				// update the post info
				$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
					  	  "WHERE p.id='".$post->id."' ".
					  	  "SET p.text='".$post->body."', ".
					  	  "p.title='".$post->title."', ".
					  	  "p.likes=".$post->note_count;

				$db->query($cypher);

			// else 
			}else{

				// create new post node
				$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
				  		  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["network"] . "' " .
				  		  "CREATE (p:Post { ".
				  		  	"username : '".$_POST["u"]."', ".
				  		  	"id : '".$post->id."', ".
				  		  	"created_time : ".$post->timestamp.", ".
				  		  	"title : '".$post->title."', ".
				  		  	"text : '".$post->body."', ".
				  		  	"likes : ".$post->note_count.", ".
				  		  	"link : '".$post->post_url."', ".
				  		  	"network : '".$_POST["n"]."', ".
				  		  	"icon : '".$icon."'"
				  		  " }) ".
						  "MERGE (s)-[:POSTED]->(p)<-[:HAS_POST]-(n)";
			}

			// loop through all the likes

				// if the liker already exists

					// merge like relationship

				// else

					// create new liker
		}
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
		/*
		 * The Output function call is here just for debugging purposes
		 * It is not necessary to call it in real applications
		 */

		// get the user
		$u = $results->response->user;

		// get the first blog
		$name = $u->blogs[0]->name;

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
		    <link href="../css/bootstrap.min.css" rel="stylesheet">
		    <link href="../css/main.css" rel="stylesheet">

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

		                var n = '<?= $_GET["n"]; ?>';

		                var ajax = new XMLHttpRequest();
		                ajax.open("POST", "", true);
		                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		                ajax.onreadystatechange = function() {
		                    if(this.readyState == 4 && this.status == 200) {
		                        console.log( this.responseText );
		                        // console.log( JSON.parse(this.responseText) );
		                        // window.opener.esmApp.smPosts.authorize( this.responseText );
		                        // window.close();
		                    }
		                }
		                ajax.send('n='+n+'&u=<?= $name; ?>');

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
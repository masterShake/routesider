<?php
/*
 * test_oauth_client.php
 *
 * @(#) $Id: test_oauth_client.php,v 1.5 2013/07/31 11:48:04 mlemos Exp $
 *
 */

	/*
	 *  Get the http.php file from http://www.phpclasses.org/httpclient
	 */
	require('../classes/OAuth/http.php');
	require('../classes/OAuth/oauth_client.php');

	include_once '../core/init.php';

	/* Create the OAuth authentication client class */ 
	$client = new oauth_client_class;


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
	
	/* Process the OAuth server interactions */
	if(($success = $client->Initialize()))
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
		// $client->Output();

		// echo $client->access_token;
		?>
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
		<html>
		<head>
		<title>OAuth client error</title>
		</head>
		<body>
		<pre><?php

		// print_r($results);

		// get the user
		$u = $results->response->user;

		// get the first blog
		$blog = $u->blogs[0];

		// make api request for user posts
		$posts = Curl::get("http://api.tumblr.com/v2/blog/".$blog->name.".tumblr.com/posts?api_key=".$creds[$_GET["n"]]["client_id"]);

		$posts = json_decode($posts);

		print_r($posts);

		?></pre></body></html><?php

		// use the results to get the blog posts

	}
	else
	{
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
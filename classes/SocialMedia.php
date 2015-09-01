<?php

//-----------------------------------------------
//				Social Media Class
//			  ----------------------
//
// - connect to social network API with OAuth
//
// - required for tumblr, twitter, linkedin
//
//-----------------------------------------------

// load the necessary classes
require('OAuth/http.php');
require('OAuth/oauth_client.php');

class SocialMedia{
	
	// properties
	private $_client = null,
			$_network = "",
			$_credentials = [ "tumblr"   => [ "client_id" 	  => "aWWWsdicEuin5zGcICL7bt5AOI9cBJf5Fq6m303KBEdFEzwQPA",
											  "client_secret" => "gXVlxHAjUu7pllr8p7CsWjH1wfFLGWbuFfIaFD6Mpx9vt4mSOk"],
							  "twitter"  =>	[ "client_id" 	  => "vJvNzGoaIAAvSptz7ogR7JCrf",
							  				  "client_secret" => "MkVDp05HlDo1HUryt2H2fhmBozjeeePXKhnTtT4O36gEyN1K6l"],
							  "linkedin" =>	[ "client_id" 	  => "75vclbfv2gi86o",
							  				  "client_secret" => "BoICgYPZ2gbAleyv"]
							];

	// constructor
	public function __construct($network){

		// Create the OAuth authentication client class
		$this->_client = new oauth_client_class;

		// set the network server
		$this->_client->server = ucfirst($network);

		// set the redirect uri to the current page
		$this->_client->redirect_uri = __FILE__;
		// $this->_client->redirect_uri = 'http://'.$_SERVER['HTTP_HOST'].
		// 	dirname(strtok($_SERVER['REQUEST_URI'],'?')).'/test.php';

		// set the _client id and secret
		$this->_client->client_id = $this->_credentials[$network]["client_id"];
		$this->_client->client_secret = $this->_credentials[$network]["client_secret"];

		// set the scope if necessary
		// $this->_client->scope = "";

		// process the server interactions
		if(($success = $this->_client->Initialize())){

			// request an access token
			$success = $this->_client->Process();

			// internal cleanup call
			$success = $this->_client->Finalize($success);
		}


		/*
		 * If the exit variable is true, the script must not output anything
		 * else and exit immediately
		 */
		if($this->_client->exit)
			exit;
	}
}







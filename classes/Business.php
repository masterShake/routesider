<?php

/*-----------------------------------------

				Business
			  ------------

 - 

-----------------------------------------*/

class Business{
	
	
	private $_data = array(),
			$_user, 
			$_profile,
			$_social_media_posts = null;

	// constructor
	public function __construct( $user, $business, $profile ){

		// set the pointer to the user
		$this->_user = $user;

		// set the data
		$this->_data = $business;

		// create the profile object
		$this->_profile = new Profile($user, $this, $profile);

	}

	// retreive the business data
	public function data($prop = false){
		if($prop)
			return $this->_data[$prop];
		else
			return $this->_data;
	}

	// retrieve the Profile object
	public function profile(){
		return $this->_profile;
	}

	// retrieve social media posts
	public function getPosts( $network = "" ){

		// if we haven't already retrieved the social media posts
		if( is_null($this->_social_media_posts) ){

			$db = neoDB::getInstance();

			$cypher = "MATCH (u:User) WHERE u.username = '".$this->_user->data("username")."' ".
	                  "MATCH (u)-[:MANAGES_BUSINESS]->(b) ";

	                  // if there is a network variable
	                  if($network)
	                  	$cypher .= "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s:".$network.") ";
	                  else
	                  	$cypher .= "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s) ";
	                  
	        $cypher .= "MATCH (s)-[:POSTED]->(p) ".
	                   "RETURN s, p ORDER BY p.created_time";

	        $results = $db->query( $cypher );

	        $this->_social_media_posts = $results;
		}

		return $this->_social_media_posts;
	}

}







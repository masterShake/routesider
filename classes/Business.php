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
			$_db, 
			$_networks = null,
			$_social_media_posts = null,
			$_pins = null,
			$_polygons = null;

	// constructor
	public function __construct( $user, $business, $profile ){

		// set the pointer to the user
		$this->_user = $user;

		// set the data
		$this->_data = $business;

		// create the profile object
		$this->_profile = new Profile($user, $this, $profile);

		// set the database PDO object
		$this->_db = neoDB::getInstance();

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

			$cypher = "MATCH (u:User) WHERE u.username = '".$this->_user->data("username")."' ".
	                  "MATCH (u)-[:MANAGES_BUSINESS]->(b) ";

	                  // if there is a network variable
	                  if($network)
	                  	$cypher .= "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s:".$network.") ";
	                  else
	                  	$cypher .= "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s) ";
	                  
	        $cypher .= "MATCH (s)-[:POSTED]->(p) ".
	                   "RETURN p ORDER BY p.created_time DESC";

	        $this->_social_media_posts = $this->_db->query( $cypher );

	        $this->_social_media_posts = $this->_social_media_posts["p"];
		}

		return $this->_social_media_posts;
	}

	// retrieve polygons and pins
	public function getMaps(){

		// if we havent already retrieved the maps
		if( is_null($this->_pins) ){

			// first get the pins
			$cypher = "MATCH (u:User) WHERE u.username = '".$this->_user->data("username")."' ".
	                  "MATCH (u)-[:MANAGES_BUSINESS]->(b) ".
	                  "OPTIONAL MATCH (b)-[:HAS_PIN]->(pins)-[:HAS_COORD]->(c) ".
	                  "RETURN pins, c";

	        $results = $this->_db->query( $cypher ); 

	        // init the empty array
	        $this->_pins = array();

	        // if there are any pins
	        if( !is_null($results["pins"][0]) )

		        // loop through the pins
		        for($i = 0; $i < count($results["pins"]); $i++)
		        	// assemble the pins array
		        	array_push($this->_pins, array(

		        		"id" => $results["pins"][$i]["id"],
						"description" => $results["pins"][$i]["description"],
						"coords" => array(
							"lat" => $results["c"][$i]["lat"],
							"lng" => $results["c"][$i]["lng"]
							)
						)
		        	);

	        // now get the polygons
			$cypher = "MATCH (u:User) WHERE u.username = '".$this->_user->data("username")."' ".
	                  "MATCH (u)-[:MANAGES_BUSINESS]->(b) ".
	                  "OPTIONAL MATCH (b)-[:HAS_POLYGON]->(polys) ".
	                  "RETURN polys";

	        $this->_polygons = $this->_db->query( $cypher );

	        // if there are any polys
	        if( !is_null($this->_polygons["polys"][0]) ){

	        	$this->_polygons = $this->_polygons["polys"];

		        // loop through the polygons
		        for($i = 0; $i < count($this->_polygons); $i++)

		        	// decode the json coords
		        	$this->_polygons[$i]["coords"] = json_decode($this->_polygons[$i]["coords"]);
	        
	        }else{

	        	// no polygons, set empty array
	        	$this->_polygons = [];
	        }
	    }
		
		return array( "pins" => $this->_pins, "polys" => $this->_polygons );
	}

	//-----------------------------------------------
	// - return an array with the names of the social 
	//   networks attached to the account.
	public function networks(){

		if( is_null($this->_networks) ){

			$this->_networks = array();

			$cypher = "MATCH (b:Business) WHERE b.id = 2 " .
					  "OPTIONAL MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s) " .
					  "RETURN s";
					  
			$results = $this->_db->query($cypher);

			$results = $results["s"];

			foreach($results as $r)

				array_push($this->_networks, $r["network"]);

		}

		return $this->_networks;
	}
}







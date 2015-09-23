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
	public function getPosts($network = ""){

		$cypher = "MATCH (b:Business) WHERE b.id=". $this->_data["id"] ." ";

                  // if there is a network variable
        if($network)
            $cypher .= "OPTIONAL MATCH (b)-[l:LINKED_TO ]->(s)<-[:HAS_MEMBER]-(n) WHERE l.active=1 AND n.name='". $network ."' ";
        else
            $cypher .= "OPTIONAL MATCH (b)-[l:LINKED_TO ]->(s) WHERE l.active=1 ";
                  
        $cypher .= "OPTIONAL MATCH (s)-[r:POSTED {deleted : 0}]->(p) ".
        		   "OPTIONAL MATCH (p)-[hm:HAS_MEDIA]->(m) ".
        // 		   // "OPTIONAL MATCH (p)<-[l:LIKED]-(t) ".
                   "RETURN p, hm, m ORDER BY p.created_time DESC";

        $this->_social_media_posts = $this->_db->q( $cypher );

		return $this->_social_media_posts;
	}

	// retrieve polygons and pins
	public function getMaps(){

		// if we havent already retrieved the maps
		if( is_null($this->_pins) ){

			// first get the pins
			$cypher = "MATCH (b:Business) WHERE b.id=". $this->_data["id"] ." " .
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

			$cypher = "MATCH (b:Business) WHERE b.id = " . $this->_data["id"] . " " .
					  "OPTIONAL MATCH (b)-[l:LINKED_TO ]->(s)<-[:HAS_MEMBER]-(n) WHERE l.active=1 " .
					  "RETURN n, s, l";
					  
			$results = $this->_db->query($cypher);

			$this->_networks = [];

			if( !is_null($results["n"][0]))

				// loop through the networks organize the auto-update and login properties
				for ($i = 0; $i < count($results["n"]); $i++) {

					$n = $results["n"][$i]["name"];

					$this->_networks[$n] = $results["n"][$i];
					
					$this->_networks[$n]["login"] = $results["l"][$i]["login"];
					
					$this->_networks[$n]["auto_update"] = $results["s"][$i]["auto_update"];

				}

		}

		return $this->_networks;
	}
}







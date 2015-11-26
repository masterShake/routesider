<?php

/*-----------------------------------------

				Profile
			  -----------

 -> update() method used to update database 
    when user makes changes on the
    edit_profile.php page.

-----------------------------------------*/

class Profile{
	
	
	private $_db, 
			$_user, 
			$_business, 
			$_data = array();

	// constructor
	public function __construct( $user, $business, $profile ){

		// get the database connection
		$this->_db = neoDB::getInstance();

		// set the data
		$this->_data = $profile;

		// set the pointer to the user object
		$this->_user = $user;

		// set the pointer to the business object
		$this->_business = $business;
	}

	// retreive the profile data
	public function data($prop = false){
		if($prop)
			return $this->_data[$prop];
		else
			return $this->_data;
	}

	// retrieve the business object
	public function business(){
		return $this->_business;
	}

	// update profile
	public function update( $json ){

		$errors = [];

		// decode the json
		$json = json_decode($json);

		//-------------------------------------------------
		// ensure that the values are formatted correctly:

		/* active */
		if( $json->active !== 1 )
			
			// must be 0 or 1
			$json->active = 0;

		/* avatar */
		if( !$json->avatar ){
			
			// avatar must be (int) 0 or (string) filename
			$json->avatar = 0;
		
		// if the file exists in the uploads folder
		}else if( file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json->avatar ) ){

			// move it to the permanent business folder
			rename( 
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json->avatar,
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json->avatar
				  );

		// if given string does not match a file in the uploads folder
		}else if( !file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json->avatar ) ){

			$errors[] = "Problem saving avatar pic";

		}

		// concat single quotes around the string
		$json->avatar = "'" . $json->avatar . "'";

		// banner
		if( !$json->banner ){

			// banner must be (int) 0 or (string) filename
			$json->banner = 0;

		// if the file exists in the uploads folder
		}else if( file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json->banner ) ){

			// move it to the permanent business folder
			rename( 
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json->banner,
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json->banner
				  );

		}else if( !file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json->banner ) ){

			$errors[] = "Problem saving bannner pic";

		}

		// concat single quotes around the string
		$json->banner = "'" . $json->banner . "'";

		// avatar shape
		if( $json->avatar_shape != "circle" )

			// must be either "circle" or "square"
			$json->avatar_shape = "square";

		// name
		if( gettype( $json->name ) != "string" )

			$errors[] = "Business name formatted incorrectly";

		// tagline
		if( gettype( $json->tagline ) != "string" )

			$errors[] = "Tagline formatted incorrectly";

		// description
		if( gettype( $json->description ) != "string" )

			$errors[] = "Description formatted incorrectly";

		// if no errors
		if( !count($errors) ){

			// perform the query
			$cypher = "MATCH (u:User) WHERE u.username = '" . $this->_user->data("username") . "' " .

					  "MATCH (u)-[:MANAGES_BUSINESS]->(b) " .

					  "MATCH (b)-[:HAS_PROFILE]->(p) " .

					  "SET b.name = '" . $json->name . "', " . 

					  "p.active = " . $json->active . ", " .

					  "p.avatar = " . $json->avatar . ", " .

					  "p.banner = " . $json->banner . ", " .

					  "p.display_banner = " . $json->display_banner . ", " . 

					  "p.avatar_shape = '" . $json->avatar_shape . "', " .

					  "p.name = '" . $json->name . "', " .

					  "p.tagline = '" . $json->tagline . "', " .

					  "p.description = '" . $json->description . "';";

			$this->_db->query( $cypher );

			return true;

		} return false;
	}

	// get jumbotron json object data (not ecoded)
	public function jumbo(){

		$temp = "MATCH (b:Business) WHERE b.id = " . $this->_business->data("id") . " " .
				"MATCH (b)-[:HAS_PROFILE]->(p)-[q:HAS_JUMBO]->(j) ".
				"OPTIONAL MATCH (j)-[r]->(n) " .
				"RETURN p, q, j, r, n";

		$results = $this->_db->q($temp);

		// get the Jumbotron node
		$json = $results->getSingleNodeByLabel("Jumbotron");

		// get the HAS_JUMBO relationship/edge
		$temp = $json->getSingleRelationship("HAS_JUMBO")->getProperties();

		// create a clean object
		$json = $json->getProperties();

		// add the active property
		$json["active"] = $temp["active"];

		// set the layouts
		$json["layouts"] = [];
		$json["layouts"]["mobile"] = $results->getNodesByLabel("Mobile")->getProperties();
		$json["layouts"]["tablet"] = $results->getNodesByLabel("Tablet")->getProperties();
		$json["layouts"]["desktop"] = $results->getNodesByLabel("Desktop")->getProperties();

		// add empty arrays for the attached nodes
		$json["texts"] = [];
		$json["imgs"] = [];
		$json["btns"] = [];

		// loop through the images and push their properties
		$temp = $results->getNodesByLabel("Image");
		foreach ($temp as $t) {
			array_push($json["imgs"], $t->getProperties());
		}

		// texts
		$temp = $results->getNodesByLabel("Textbox");
		foreach ($temp as $t) {
			array_push($json["texts"], $t->getProperties());
		}

		// btns
		$temp = $results->getNodesByLabel("Button");
		foreach ($temp as $t) {
			array_push($json["btns"], $t->getProperties());
		}

		return $json;
	}
}







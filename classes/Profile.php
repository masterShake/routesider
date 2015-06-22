<?php

/*-----------------------------------------

				Business
			  ------------

 - 

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

			// concat single quotes around the string
			$json->avatar = "'" . $json->avatar . "'";

		// if given string does not match a file in the uploads folder
		}else{

			$errors[] = "Problem saving avatar pic";

		}

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

			// concat single quotes around the string
			$json->banner = "'" . $json->banner . "'";

		}else{

			$errors[] = "Problem saving bannner pic";

		}

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

					  "p.avatar_shape = '" . $json->avatar_shape . "', " .

					  "p.name = '" . $json->name . "', " .

					  "p.tagline = '" . $json->tagline . "', " .

					  "p.description = '" . $json->description . "';";

			$this->_db->query( $cypher );

			return true;

		} return false;
	}
}







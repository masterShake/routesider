<?php

/*-----------------------------------------

				Business
			  ------------

 - 

-----------------------------------------*/

class Profile{
	
	
	private $_db, 
			$_business, 
			$_data = array();

	// constructor
	public function __construct( $profile, $business ){

		// get the database connection
		$this->_db = neoDB::getInstance();

		// set the data
		$this->_data = $profile;

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

		// decode the json
		$json = json_decode($json);

		//-------------------------------------------------
		// ensure that the values are formatted correctly:

		// active
		if( $json["active"] )

			$json["active"] = 0;

		// avatar
		if( file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json["avatar"] ) )

			rename( 
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json["avatar"],
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json["avatar"]
				  );

		else

			$errors[] = "Problem saving avatar pic";

		// banner
		if( file_exists( $_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json["banner"] ) )

			rename( 
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/uploads/" . $json["banner"],
					$_SERVER["DOCUMENT_ROOT"] . "/routesider/img/business/" . $json["banner"]
				  );

		else

			$errors[] = "Problem saving bannner pic";

		// avatar shape
		if( $json["avatar_shape"] != "circle" )

			$json["avatar_shape"] = "square";

		// name
		if( gettype( $json["name"] ) != "string" )

			$errors[] = "Business name formatted incorrectly"

		// tagline
		if( gettype( $json["tagline"] ) != "string" )

			$errors[] = "Tagline formatted incorrectly"

		// description
		if( gettype( $json["description"] ) != "string" )

			$errors[] = "Description formatted incorrectly"

		// if no errors
		if( !count($errors) ){

			// perform the query

			return true;

		} return false;
	}
}







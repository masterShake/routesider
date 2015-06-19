<?php

/*-----------------------------------------

				Business
			  ------------

 - 

-----------------------------------------*/

class Business{
	
	
	private $_data = array(),
			$_profile;

	// constructor
	public function __construct( $business, $profile ){

		// set the data
		$this->_data = $business;

		// create the profile object
		$this->_profile = new Profile($profile);

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

}







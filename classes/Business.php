<?php

/*-----------------------------------------

				Business
			  ------------

 - 

-----------------------------------------*/

class Business{
	
	
	private $_data = array(),
			$_user, 
			$_profile;

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

}







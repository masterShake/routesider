<?php

/*-----------------------------------------

				Business
			  ------------

 - 

-----------------------------------------*/

class Profile{
	
	
	private $_db, 
			$_data = array();

	// constructor
	public function __construct( $profile ){

		// get the database connection
		$this->_db = neoDB::getInstance();

		// set the data
		$this->_data = $profile;

	}

	// retreive the business data
	public function data($prop = false){
		if($prop)
			return $this->_data[$prop];
		else
			return $this->_data;
	}

}







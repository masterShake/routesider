<?php

/*-----------------------------------------

				Map
			  -------

 - 

-----------------------------------------*/

class Map{

	private $_db, 
			$_data = array();

	// constructor
	public function __construct(){

		// get the database connection
		$this->_db = neoDB::getInstance();


	}
}





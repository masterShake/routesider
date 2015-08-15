<?php

//-----------------------------------------------
//	  	  Helium - db/neoxygen connection
//  	-----------------------------------
//
// - connect to the database without the
//   setAutoFormatResponse method on the client.
//
// - uses the neoxygen client framework
//
//-----------------------------------------------


require $_SERVER["DOCUMENT_ROOT"] . '/routesider/classes/composer/vendor/autoload.php';

use Neoxygen\NeoClient\ClientBuilder;

class Helium {

	public static $instance = null;

	private 	$_client = null,
				$_query = null,
				$_error = false,
				$_result = null,
				$_count = 0;

	private function __construct() {
		
		$this->_client = ClientBuilder::create()
					    ->addConnection(
					    	Config::get('neo4j/user'),
					    	Config::get('neo4j/protocol'),
					    	Config::get('neo4j/host'),
					    	Config::get('neo4j/port'))
					    ->build();	
	}

	public static function getInstance() {
		// Already an instance of this? Return, if not, create.
		if(!isset(self::$instance)) {
			self::$instance = new neoDB();
		}
		return self::$instance;
	}

	public function query($cypher){

		return $this->_client->sendCypherQuery($cypher)->getResult();
	}
}
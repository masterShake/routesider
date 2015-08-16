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

	public static $instance;

	public $_client,
			$_result;

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
			self::$instance = new Helium();
		}
		return self::$instance;
	}

	public function query( $cypher ){ 
		$this->_client->sendCypherQuery( $cypher );
		$this->_result = $this->_client->getResult(); 
	}

	public function getNodes($a, $group = true){
		return $this->_result->getNodes($a, $group);
	}
}
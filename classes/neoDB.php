<?php

require $_SERVER["DOCUMENT_ROOT"] . '/routesider/classes/composer/vendor/autoload.php';

use Neoxygen\NeoClient\ClientBuilder;

class neoDB {

	public static $instance = null;

	private 	$_client;
				
	// public 		$result;

	private function __construct() {
		
		$this->_client = ClientBuilder::create()
						    ->addConnection(
						    	Config::get('neo4j/user'),
						    	Config::get('neo4j/protocol'),
						    	Config::get('neo4j/host'),
						    	Config::get('neo4j/port'))
						    ->setDefaultTimeout(20) // <-- Timeout of 20 seconds for http requests
						    ->setAutoFormatResponse(true)
						    ->build();

		// $this->_client = ClientBuilder::create()
		// 			    ->addConnection(
		// 			    	Config::get('neo4j/user'),
		// 			    	Config::get('neo4j/protocol'),
		// 			    	Config::get('neo4j/host'),
		// 			    	Config::get('neo4j/port'))
		// 			    ->setAutoFormatResponse(true)
		// 			    ->build();	
	}

	public static function getInstance() {
		// Already an instance of this? Return, if not, create.
		if(!isset(self::$instance)) {
			self::$instance = new neoDB();
		}
		return self::$instance;
	}

	public function query($cypher, $params = array(), $boner = false){
		// if there are question marks
		if($params){

			$cypher = explode("?", $cypher);
			$c = count($params);

			// loop through the array of strings
			for($i = 0; $i < $c; $i++){
				// if the variable is a number
				$r = gettype($params[$i]);
				if($r == "integer" || $r == "double"){
					// just append the number
					$cypher[$i] .= $params[$i];
				}else{
					// escape single quotes. Neo4j handles the rest
					$d = preg_replace("/\"/","\\\"", $params[$i]);
					$cypher[$i] .= "'{$d}'";
				}
			}
			$cypher =  implode("", $cypher);
		}

		// if($boner)
		// 	return $cypher;

		return $this->_client->sendCypherQuery($cypher)->getRows();
	}

	public function q( $cypher ){

		return $this->_client->sendCypherQuery( $cypher )->getResult();

	}
}
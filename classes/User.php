<?php

/*-----------------------------------------

				  USER
				--------

 - 

-----------------------------------------*/

class User {
	
	private $_db,
			$_data = array(),
			$_loginToken = '',
			$_isLoggedIn = false,
			$_businesses = array();

	public function __construct($user = null) {
		
		$this->_db = neoDB::getInstance();

		// Check if a session exists and set user if so.
		if(Session::exists("username") && !$user){

			// get the user attached to this login token
			$user = Session::get("username");
			
			// if we find the user
			if($this->find($user)){
				
				// log her in
				$this->login();

			}else{
				
				// $this->logout();
			}
		}else{

			// $this->find($user);
		
		}
	}

	public function exists() { 
		return (!empty($this->_data)) ? true : false;
	}

	public function find($user = null) {
		
		if($user) {
			
			// match all data related to the user
			$cypher = "MATCH (u:User) WHERE u.username = '{$user}' "
				    . "OPTIONAL MATCH (u)-[:MANAGES_BUSINESS]->(b)-[:HAS_PROFILE]->(p) "
				    . "RETURN u, b, p";

			// set the data
	        $this->_data = $this->_db->query(  $cypher );

	        // if this user runs a business(es)
	        if( array_key_exists("b", $this->_data) )
	        	// loop through the user's businesses
	        	for($i = 0, $l = count($this->_data["b"]); $i < $l; $i++)
	        		// create new Business objects
	        		array_push( 
	        					$this->_businesses, 
	        					new Business( 
	        									$this->_data["b"][$i], 
	        									$this->_data["p"][$i] 
	        								)
	        				  );


	        $this->_data = $this->_data["u"][0];

	    	return true;
		}
		return false;
	}

	public function create($username, $password, $email = 0){

		//-----------------------------------------------------
		// NOTE: salt not working with neo4j, fix before launch
		//
		// salt the password
		// $salt = Hash::salt(32);
		$salt = '55555';
		$hashpass = Hash::make( $password, $salt );

		//-----------------------------------------------------
		// - cypher query
		// - create the user node
		$cypher = "CREATE (u:User { 
									username : '{$username}', 
									reg_date : ".'timestamp()'.",
									password : '{$hashpass}',
									    salt : '{$salt}'
								  } 
						  ) ";

		// attach the business node to the user
		$cypher .= "CREATE (u)-[:MANAGES_BUSINESS]->(b:Business) ";

		// attach the profile node to the business node
		$cypher .= "CREATE (b)-[:HAS_PROFILE]->(p:Profile { active : 0, avatar_shape : 'circle' }) ";

		// if the user has provided an email
		if( $email )
			// attache the email node to the user node
			$cypher .= "CREATE (u)-[:HAS_EMAIL]->(e:Email { address : '{$email}' } ) ";

		$cypher .= "RETURN u";

		// insert into db
		$this->_data = $this->_db->query($cypher);

		// log user in
		$this->login( $username, $password, true );
	}

	public function login($username = null, $password = null, $remember = false) {
		
		// if we already have the data for this person
		if(!$username && !$password && $this->exists()) {

			// create a session with the server
			Session::put("username", $this->_data["username"]);
			$this->_isLoggedIn = true;
			return true;

		// check the databse	
		} else {

			// fetch the user data
			$user = $this->find($username); 
			
			// if we retrieve any data
			if($user) {

				// check the password
				if($this->_data["password"] == Hash::make($password, $this->_data["salt"])) { 
					
					// put a new session for this username
					Session::put("username", $this->_data["username"]);

					// stay logged in for 1 month
					if($remember) { 

						// if the user has a login token already, then we will keep the one we have
						if(!$this->_loginToken) {

							// generate a unique hash
							$this->_loginToken = Hash::unique();

							$username = $this->_data["username"];

							// attache a token to this user in the db
							$cypher = " MATCH (u:User) WHERE u.username = '{$username}'

										CREATE (u)-[:IS_LOGGED_IN]->(s:Session {login_time : TIMESTAMP(), hash : '{$this->_loginToken}'} )

										CREATE (s)-[:SESSION_LOG]->(u) ";

							$this->_db->query($cypher);

						}

						// attache a cookie with the same token
						Cookie::put("login_token", $this->_loginToken, 604800);

					}

					$this->_isLoggedIn = true;

					return true;
				} // else{ echo 'password does not match'; }
			}
		}

		return false;
	}

	public function isLoggedIn() {
		return $this->_isLoggedIn;
	}

	public function logout() {

		if($this->_isLoggedIn){

			// delete the user session from the database
			$cypher = "MATCH (u:User { username : '" . $this->_data["username"] . "' })-[r:IS_LOGGED_IN]->(s) DELETE r";

			$this->_db->query($cypher);

		}

		Cookie::delete("login_token");

		Session::delete("username");
	
		$this->_isLoggedIn = false;
	}

	public function data($prop = false){
		if($prop)
			return $this->_data[$prop];
		else
			return $this->_data;
	}

	public function business(){
		return $this->_businesses;
	}
}


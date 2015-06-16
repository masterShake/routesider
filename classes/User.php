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
			$_vendor = false,
			$_admin = false;

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
			
			// set the data
	        $this->_data = $this->_db->query( "MATCH (u:User) WHERE u.username = '{$user}' RETURN u" );

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

		// create the cypher query
		$cypher = "CREATE (u:User { 
									username : '{$username}', 
									reg_date : ".'timestamp()'.",
									password : '{$hashpass}',
									    salt : '{$salt}'
								  } 
						  )";

		if( $email )

			$cypher .= "-[:HAS_EMAIL]->(e:Email { address : '{$email}' } )";

		$cypher .= " RETURN u";

		// insert into db
		$this->_data = $this->_db->query($cypher);

		// log user in
		$user->login( $username, $password, true );
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

	public function data($prop){
		return $this->_data[$prop];
	}

	public function logout() {

		if($this->_isLoggedIn){

			// delete the user session from the database
			$cypher = " MATCH (u:User { username : '" . $this->_data["username"] . "' })-[r:IS_LOGGED_IN]->(s) DELETE r";

			$this->_db->query($cypher);

		}

		Cookie::delete("login_token");

		Session::delete("username");
	
		$this->_isLoggedIn = false;
	}

}


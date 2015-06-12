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
		if(Session::exists('user_email') && !$user) {
			// get the user attached to this login token
			$user = Session::get('user_email');
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

	// public function exists() { 
	// 	return (!empty($this->_data)) ? true : false;
	// }

	public function find($user = null) {
		
		if($user) {
			
			// set the data
	        $this->_data = $this->_db->query( "MATCH (u:User) WHERE u.username = '{$user}'" );
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
		// $user->login( $username, $password, true );
	}

	// public function login($username = null, $password = null, $remember = false) {
	// 	// if not supplied a username or password, but 
	// 	if(!$username && !$password && $this->exists()) {
	// 		Session::put('user_email', $this->data()['email']);
	// 		$this->_isLoggedIn = true;
	// 		return true;
	// 	} else {

	// 		$user = $this->find($username); 
			
	// 		if($user) {

	// 			if($this->data()['password'] == Hash::make($password, $this->data()['salt'])) { 
					
	// 				Session::put('user_email', $this->data()['email']);

	// 				if($remember) { 

	// 					// if the user has a login token already, then we will keep the one we have
	// 					if(!$this->_loginToken) {
	// 						// generate a unique hash
	// 						$this->_loginToken = Hash::unique();

	// 						$email = $this->data()['email'];

	// 						$cypher = " MATCH (u:User) WHERE u.email = '{$email}'

	// 									CREATE (u)-[:IS_LOGGED_IN]->(s:Session {login_time : TIMESTAMP(), hash : '{$this->_loginToken}'} )

	// 									CREATE (s)-[:SESSION_LOG]->(u) ";

	// 						$this->_db->query($cypher);

	// 					}

	// 					Cookie::put('login_token', $this->_loginToken, 604800);

	// 				}

	// 				$this->_isLoggedIn = true;

	// 				return true;
	// 			} // else{ echo 'password does not match'; }
	// 		}
	// 	}

	// 	return false;
	// }

	// public function isLoggedIn() {
	// 	return $this->_isLoggedIn;
	// }

	// public function logout() {

	// 	if($this->_isLoggedIn){

	// 		// delete the user session from the database
	// 		$cypher = " MATCH (u:User { email : '".$email = $this->data()['email']."' })-[r:IS_LOGGED_IN]->(s) DELETE r";

	// 		$this->_db->query($cypher);

	// 	}

	// 		Cookie::delete('login_token');

	// 		Session::delete('user_email');
	
	// 	$this->_isLoggedIn = false;
	// }

}


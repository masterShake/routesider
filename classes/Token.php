<?php
class Token {

	// set a random string to the session value token
	public static function generate() {
		return Session::put('token', md5(uniqid()));
	}

	// check to see that this token matches the one from the session
	public static function check($token) {
		
		if(Session::exists('token') && $token === Session::get('token')) {
			Session::delete('token');
			return true;
		}
		
		return false;
	}
}
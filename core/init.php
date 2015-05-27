<?php
session_start();

// Create a global configuration
$GLOBALS['config'] = array(
	
	/* database */
	
	// 'neo4j' => array(
	// 	'host' => '127.0.0.1',
	// 	'protocol' => 'http',
	// 	'port' => 7474,
	// 	'user' => 'default'
	// ),

	/* cookies */

	// 'remember' => array(
	// 	'cookie_name'	=> 'hash',
	// 	'cookie_expiry' =>  604800
	// ),

	/* sessions */

	// 'session' => array(
	// 	'user_email'	=> 'user',
	// 	'token_name'	=> 'token'
	// )
);

// Autoload classes
function autoload($class) {
	$path = dirname(dirname(__FILE__)).'/classes/' . $class . '.php';
	if(file_exists($path))
		require_once $path;
}
spl_autoload_register('autoload');
<?php

//-------------------------------------
// Allows you to say something like:
// echo Config::get('mysql/host');

class Config {
	public static function get($path = null) {
		if($path) {
			$config = $GLOBALS['config'];
			$path = explode('/', $path);

			foreach($path as $bit) {
				if(isset($config[$bit])) {
					$config = $config[$bit];
				}
			}

			return $config;
		}

		return false;
	}
}
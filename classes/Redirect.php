<?php
class Redirect {
	public static function to($location = null) {

		if($location) {
			//allows for other possible errors like 502
			if(is_numeric($location)) {
				switch($location) {
					case 404:
						header('HTTP/1.0 404 Not Found');
						include 'includes/errors/404.php';
						exit();
					break;
					// case 502:
					// break;
				}
			} else {
				header('Location: ' . $location);
				exit();
			}
		}
	}
}
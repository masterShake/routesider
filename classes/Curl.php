<?php

//***************************
//		curl


// NOTE: CHANGE CURLOPT_SSL_VERIFYPEER TO A 1 IN PRODUCTION

class Curl{

	public static function post($URL, $params){

		//cURL shit
		$ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $URL);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // CHANGE THIS TO A 1 IN PRODUCTION

        $data = curl_exec($ch);

        curl_close($ch);

        return $data;

	}

	public static function get($URL){

		$ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // CHANGE THIS TO A 1 IN PRODUCTION
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $data = curl_exec($ch);
        curl_close($ch);
        
        return $data;
	}

}

?>
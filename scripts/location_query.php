<?php

/*------------------------------------------------

				  location query

			   --------------------

 - Returns query results based on long/lat 
   coordinates and other params.

  ------------------------------------------------*/

// create a json array 
$json = array( 
				"latitude" => Input::get("latitude"),
				"longitude" => Input::get("longitude")
		);

// return the json 
echo json_encode($json);

exit();




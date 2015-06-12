<?php

/*--------------------------------------------

		 database connection tests
	   -----------------------------

 - 

--------------------------------------------*/

require '../core/init.php';

$db = neoDB::getInstance();

$username = "master_balllz";

// salt the password
$salt = Hash::salt(32);
$hashpass = Hash::make( "stella", $salt );

echo gettype($salt);



// // create the cypher query
$cypher = "CREATE (u:User { 
							username : '{$username}', 
							reg_date : ".'timestamp()'.",
							password : '{$hashpass}',
							    sal : '".$salt."'
						  } 
				  ) 

		   RETURN u";

echo $cypher;

$results = $db->query($cypher);

print_r($results["u"]);












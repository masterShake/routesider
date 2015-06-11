<?php

/*--------------------------------------------

		 database connection tests
	   -----------------------------

 - 

--------------------------------------------*/

require '../core/init.php';

$db = neoDB::getInstance();

$cypher = "MATCH (n) RETURN n";

$results = $db->query($cypher);

print_r($results["n"]);












<?php

/*----------------------------------------

	  tests for login functionality

-----------------------------------------*/

require '../core/init.php';

$user = new User();

// if($user->isLoggedIn()){

// 	echo $user->data("username") . " is logged in.";

// 	// $user->logout();

// 	// echo "The user has been logged out.";

// }else{

// 	echo "not logged in :(";

// }

$user->login("michael", "stella", true);







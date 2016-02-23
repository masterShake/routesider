<?php

//-----------------------------------------------
//
//	cUrl and format Instagram API data
//
//-----------------------------------------------


// make api call for user info
$client->CallAPI( "https://api.instagram.com/v1/users/self/",
				  "GET",
				  ["api_key" => $creds[$_GET["n"]]["client_id"]],
				  [],
				  $results
				);

// get the results data
$results = $results->data;

// format the user account data
$account = new stdClass();
$account->username = $results->username;
$account->profile_pic = $results->profile_picture;
$account->website = $results->website;
$account->full_name = $results->full_name;
$account->bio = $results->bio;
$account->net_id = $results->id;

echo "<pre>";

print_r($account);

echo "</pre>";

exit();

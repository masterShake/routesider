<?php

//-----------------------------------------------
//
//	cUrl and format Instagram API data
//
//-----------------------------------------------// make api call for user info

$client->CallAPI( "http://api.tumblr.com/v2/user/info",
				  "GET",
				  ["api_key" => $creds[$_GET["n"]]["client_id"]],
				  [],
				  $socialite
				);

// get the results data
$socialite = $socialite->response->user;

// get the data from the first blog
$blog = $socialite->blogs[0];

// format the user account data
$account = new stdClass();
$account->username = $socialite->name;
// $account->profile_pic = 
$account->website = $blog->url;
$account->full_name = "";
$account->bio = $blog->description;
$account->net_id = $socialite->name;

// get the blog avatar
$client->CallAPI( "http://api.tumblr.com/v2/blog/{$socialite->name}.tumblr.com/avatar",
				  "GET",
				  ["api_key" => $creds[$_GET["n"]]["client_id"]],
				  [],
				  $blog
				);

// add the url path to the account object
$account->profile_pic = $blog->response->avatar_url;

// get the blog posts
$client->CallAPI( "http://api.tumblr.com/v2/blog/{$socialite->name}.tumblr.com/posts",
				  "GET",
				  ["api_key" => $creds[$_GET["n"]]["client_id"]],
				  [],
				  $results
				);

// get the results data
$results = $results->response;

echo "<pre>";

print_r($results);

echo "</pre>";

exit();




















// set the icon
$icon = "tumblr2";

// make api call for tumblr blog info
$account = Curl::get("http://api.tumblr.com/v2/blog/{$_POST["u"]}.tumblr.com/info?api_key={$client->client_id}");
$account = json_decode($account);
$account = $account->response->blog;

// call for avatar
$avatar = Curl::get("http://api.tumblr.com/v2/blog/{$_POST["u"]}.tumblr.com/avatar/512");
$avatar = json_decode($avatar);
$avatar = $avatar->response->avatar_url;

// call for tumblr post data
$posts = Curl::get("http://api.tumblr.com/v2/blog/".$_POST["u"].".tumblr.com/posts?api_key=".$creds[$_GET["n"]]["client_id"]."&notes_info=true");
$posts = json_decode($posts);
$posts = $posts->response->posts; // print_r($posts); exit();
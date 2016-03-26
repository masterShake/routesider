<?php

//-----------------------------------------------
//
//	cUrl and format Instagram API data
//
//-----------------------------------------------


// make api call for user info
$client->CallAPI( "https://api.instagram.com/v1/users/self",
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

// get the instagram posts
$client->CallAPI( "https://api.instagram.com/v1/users/self/media/recent",
				  "GET",
				  ["api_key" => $creds[$_GET["n"]]["client_id"]],
				  [],
				  $results
				);

// echo json_encode($results->data); exit;

$posts = [];

// loop throught the posts
foreach ($results->data as $post) { 
	
	// formatted stdObject
	$p = new stdClass();

	// set the properties
	$p->network = "Instagram";
	$p->type = (property_exists($post, "videos")) ? "video" : "photo";
	$p->timestamp = $post->created_time;
	$p->likes = $post->likes->count;
	$p->permalink = $post->link;
	$p->tags = $post->tags;
	$p->net_id = $post->id;

	// formatted media object
	$p->media = [];

	$q = new stdClass();

	// set the media properties
	$q->width = $post->images->standard_resolution->width;
	$q->height = $post->images->standard_resolution->height;
	$q->url = $post->images->standard_resolution->url;
	$q->thumbnail = $post->images->thumbnail->url;
	
	$q->caption = gettype($post->caption) == "object" ? $post->caption->text : null;

	// if there is a video
    if( property_exists($post, "videos")){
    	$q->embed_code = $post->videos->standard_resolution->url;
    	$q->type = "video";
    }else{
    	$q->type = "photo";
    }

    // push the media object onto the array
    $p->media []= $q;

    // push the new post object onto the array
	$posts []= $p;
}

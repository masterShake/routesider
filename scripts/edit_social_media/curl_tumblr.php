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
$results = $results->response->posts;

// create an empty posts array
$posts = [];

// loop through each of the posts
foreach($results as $post){

	// create an empty post object
	$p = new stdClass();

	// set the properties
	$p->network = "tumblr";
	$p->type = $post->type;
	$p->timestamp = $post->timestamp;
	$p->likes = $post->note_count;
	$p->permalink = $post->post_url;
	$p->tags = $post->tags;
	$p->net_id = $post->id;
	$p->media = [];

	// if this is a text post
	if($p->type == "text"){

		// make sure it has a title and a body
		$p->title = $post->title;
		$p->body = $post->body;
	}

	// if this post includes photos
	if($p->type == "photo"){

		// loop through all the photos
		foreach ($post->photos as $photo) {
			
			// create a new std class object
			$q = new stdClass();

			// set the properties
			$q->type = "photo";
			$q->caption = $photo->caption;
			$q->height = $photo->alt_sizes[0]->height;
			$q->width = $photo->alt_sizes[0]->width;
			$q->url = $photo->alt_sizes[0]->url;
			$q->thumbnail = $photo->alt_sizes[count($photo->alt_sizes) - 2]->url; // i like the size of 2nd to last one

			// push the new object onto the media array
			$p->media []= $q;
		}

	// if this post has a video
	}else if($p->type == "video"){

		// create a new std class object
		$q = new stdClass();

		// set the properties
		$q->type = "video";
		$q->caption = $post->caption;
		$q->height = null;
		$q->width = $post->player[count($post->player) - 1]->width;
		$q->embed_code = $post->player[count($post->player) - 1]->embed_code;
		$q->thumbnail = null;

		// push the new object onto the media array
		$p->media []= $q;
	}

	// push the new post object onto the array
	$posts []= $p;
}




















// set the icon
// $icon = "tumblr2";

// // make api call for tumblr blog info
// $account = Curl::get("http://api.tumblr.com/v2/blog/{$_POST["u"]}.tumblr.com/info?api_key={$client->client_id}");
// $account = json_decode($account);
// $account = $account->response->blog;

// // call for avatar
// $avatar = Curl::get("http://api.tumblr.com/v2/blog/{$_POST["u"]}.tumblr.com/avatar/512");
// $avatar = json_decode($avatar);
// $avatar = $avatar->response->avatar_url;

// // call for tumblr post data
// $posts = Curl::get("http://api.tumblr.com/v2/blog/".$_POST["u"].".tumblr.com/posts?api_key=".$creds[$_GET["n"]]["client_id"]."&notes_info=true");
// $posts = json_decode($posts);
// $posts = $posts->response->posts; // print_r($posts); exit();
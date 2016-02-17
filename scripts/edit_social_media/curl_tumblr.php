<?php

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
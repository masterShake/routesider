<?php

//-----------------------------------------------
//				   output posts
//				 ----------------
//
// - loop through the posts and output the proper
//   html
//
// - output 'show more' button if necessary
//
// - assumes a $posts neo4j object collection
//
//-----------------------------------------------

foreach($posts as $post){ 

    // get all the media objects
    $media = $post->getConnectedNodes("OUT", "HAS_MEDIA");

    // output html based on network type
    switch($post->getProperty("network")){

        case "instagram": include "components/edit_social_media/instagram_post_editable.php"; break;

        case "tumblr": include "components/edit_social_media/tumblr_post_editable.php"; break;

    }
} 

// if there are 10 posts, we'll assume there is more to load
if( count($posts) == 10 ){

    // calculate the next index
    $nextIndex = ( isset($_POST["index"]) ) ? (int)$_POST["index"] + 10 : 10;

    // show more button
    ?>
    
    <div style="text-align: center;">
        <button type="button" class="btn btn-info" data-i="{$nextIndex}">
            <span class="glyphicon glyphicon-download" aria-hidden="true"></span> show more
        </button>
    </div>

    <?php 
}


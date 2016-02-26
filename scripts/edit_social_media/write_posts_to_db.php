<?php

// if user has connected to this network before
$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
		  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
          "RETURN s";
$results = $db->query($cypher);

if( !empty( $results ) ){

	// update the linked_to socialite info
	$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
			  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
			  "SET l.active=1, l.login=1, s.auto_update=1";

	$db->query($cypher);

// else never connected before
}else{

	// create a new socialite
	$cypher = "MATCH (b:Business) WHERE b.id=" . $business->data("id") . " " .
          	  "MATCH (n:Network) WHERE n.name='" . $_POST["n"] . "' ".
          	  "CREATE (s:Socialite { ".
          	  	"username : '".$account->username."', ".
          	  	"net_id : '".$account->net_id."', ".
          	  	"profile_pic : '".$account->profile_pic."', ".
          	  	"website : '".$account->website."', ".
          	  	"full_name : '".addslashes($account->full_name)."', ".
          	  	"bio : '".addslashes($account->bio)."', ".
          	  	"auto_update : 1".
          	  "}) ".
			  "MERGE (b)-[:LINKED_TO {active:1,login:1}]->(s)<-[:HAS_MEMBER]-(n)";

    $db->query($cypher);

}

// loop through all the posts
foreach($posts as $post){

	// if the post already exists
	$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
			  "WHERE p.net_id='".$post->net_id."' ".
			  "RETURN p";

	$results = $db->query($cypher);

	if( !empty($results) ){

		// update the post info
		$cypher = "MATCH (p:Post)<-[:HAS_POST]-(n {name : '".$_POST["n"]."'}) ".
			  	  "WHERE p.net_id='".$post->net_id."' ".
			  	  "SET p.likes=".$post->likes;

		$db->query($cypher);

	// else 
	}else{

		// create new post node
		$cypher = "MATCH (b:Business)-[l:LINKED_TO]->(s)<-[h:HAS_MEMBER]-(n) ".
		  		  "WHERE b.id=" . $business->data("id") . " AND n.name='" . $_POST["n"] . "' " .
		  		  "CREATE (p:Post { ".
		  		  	"username : '".$_POST["u"]."', ".
		  		  	"net_id : '".$post->net_id."', ".
		  		  	"timestamp : ".$post->timestamp.", ".
		  		  	"title : '".((property_exists($post, "title")) ? addslashes($post->title) : "")."', ".
		  		  	"body : '".((property_exists($post, "body")) ? addslashes($post->body) : "")."', ".
		  		  	"likes : ".$post->likes.", ".
		  		  	"type : '".$post->type."', ".
		  		  	"network : '".$_POST["n"]."', ".
		  		  	"tags : '".json_encode($post->tags)."', ".
		  		  	"permalink : '".$post->permalink."' ".
		  		  " }) ".
				  "MERGE (s)-[:POSTED {deleted : 0} ]->(p)<-[:HAS_POST]-(n)";

		$db->query($cypher);

		// If the post contains image(s)
		if($post->type == "photo"){

			// loop through the photos
			foreach($post->media as $photo){

				$cypher = "MATCH (p:Post) WHERE p.net_id='".$post->net_id."' ".
			  	  		  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
			  	  		  	"width : ".(int)$photo->width.", ".
			  	  		  	"height : ".(int)$photo->height.", ".
			  	  		  	"url : '".$photo->url."', ".
			  	  		  	"thumbnail : '".$photo->thumbnail."', ".
			  	  		  	"type : 'photo', ".
			  	  		  	"caption : '".addslashes($photo->caption)."' ".
			  	  		  "})";
				
				// merge nodes
				$db->query($cypher);
			}
		
		// if the post contains a video
		}else if($post->type == "video"){

			$cypher = "MATCH (p:Post) WHERE p.net_id='".$post->net_id."' ".
		  	  		  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
		  	  		  	"width : ".(int)$post->media[0]->width.", ".
		  	  		  	"height : ".(int)$post->media[0]->height.", ".
		  	  		  	"embed_code : '".addslashes($post->media[0]->embed_code)."', ".
		  	  		  	"thumbnail : '".$post->media[0]->thumbnail."', ".
		  	  		  	"url : '".$post->media[0]->url."', ".
		  	  		  	"type : 'video', ".
		  	  		  	"caption : '".addslashes($post->media[0]->caption)."' ".
		  	  		  "})";
			
			// merge nodes
			$db->query($cypher);					
		}
	}

	// // if the post has notes
	// if(property_exists($post, "notes")){

	// 	// loop through all the likes
	// 	foreach($post->notes as $note){

	// 		// if the liker already exists

	// 		$cypher = "MATCH (s)<-[:HAS_MEMBER]-(n) ".
	// 				  "WHERE s.username='".$note->blog_name."' AND n.name='".$_POST["n"]."' ".
	// 				  "RETURN s";

	// 		$results = $db->query( $cypher );

	// 		if( !empty($results) ){

	// 			// merge like relationship
	// 			$cypher = "MATCH (s)<-[:HAS_MEMBER]-(n) ".
	// 				  	  "WHERE s.username='".$note->blog_name."' AND n.name='".$_POST["n"]."' ".
	// 				  	  "MATCH (p:Post) WHERE p.id='".$post->id."' ".
	// 				  	  "MERGE (s)-[:LIKED]->(p)";

	// 			$db->query($cypher);

	// 		// else
	// 		}else if($note->type == "like"){

	// 			// create new liker
	// 			$cypher = "MATCH (p)<-[:HAS_POST]-(n) ".
	// 					  "WHERE p.id='".$post->id."' ".
	// 					  "MERGE (p)<-[:LIKED]-(s:Socialite { ".
	// 					  	"username : '".$note->blog_name."'".
	// 					  "})<-[:HAS_MEMBER]-(n)";

	// 			$db->query($cypher);

	// 		}
	// 	}
	// }
}
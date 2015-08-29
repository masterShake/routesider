<?php

/*----------------------------------------

	  	      Oauth redirect

-----------------------------------------*/


// ajax post request for access token
if( isset($_POST["code"]) ){

    include "../core/init.php";

    // perform curl call for insta info
    if($_POST["network"] == "instagram"){

        $url = "https://api.instagram.com/oauth/access_token";

        $params  =  "client_id=6f469fae7d024a83ae77a5d463181af0&" .
                    "client_secret=574afd2e26674eea82002103bd0d425c&" .
                    "grant_type=authorization_code&" .
                    "redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&" .
                    "code=" . $_POST["code"];

        $meta = Curl::post( $url, $params );

        // convert the json into a standard object
        $meta = json_decode($meta);
        // echo $meta; exit();

        /*------------------------------------------ 
            create a new instagram node in the db
        ------------------------------------------*/

        $user = new User();

        $business = $user->business()[0];

        $db = neoDB::getInstance();

                  // match the business
        $cypher = "MATCH (b:Business) WHERE b.id=" . $business->data("id") . " " .
                  "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' " .
                  "OPTIONAL MATCH (b)-[l:LINKED_TO]->(s)<-[:HAS_MEMBER]-(n) WHERE n.name='".$_POST["network"]."' ".
                  "SET l.active=1, l.login=1";

        $db->query($cypher);

                  // match the business
        $cypher = "MATCH (b:Business) WHERE b.id=" . $business->data("id") . " " .
                  "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' " . 
                  // create a link to the socialite
                  "MERGE (b)-[:LINKED_TO { active : 1, login : 1 }]->(s:Socialite { " . 
                        // set the user properties
                        "username : '" . $meta->user->username . "', " .
                        "id : '" . $meta->user->id . "', " .
                        "profile_pic : '" . $meta->user->profile_picture . "', " .
                        "website : '" . $meta->user->website . "', " .
                        "full_name : '" . $meta->user->full_name . "', " .
                        "bio : '" . $meta->user->bio . "', " .
                        "auto_update : 1".
                  "}) ".
                  "MERGE (n)-[:HAS_MEMBER]->(s)";

        $db->query($cypher);

        /*----------------------------------------------
                retrieve posts from instagram
        ----------------------------------------------*/

        // request the user's recent media
        $url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" . $meta->access_token;
        
        $posts = Curl::get( $url ); 
        // echo $posts; exit(); // debugging

        $posts = json_decode($posts);

        $posts = $posts->data;

        /*----------------------------------------------
           create nodes for posts, likes, & followers
        ----------------------------------------------*/

        // loop through the posts
        foreach($posts as $post){

            $cypher = "MATCH (s:Socialite) WHERE s.id='" . $meta->user->id . "' " .
                      "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' " .
                      "MERGE (s)-[:POSTED { deleted : 0 } ]->(p:Post { " .
                            "username : '" . $meta->user->username . "', " .
                            "network : '".$_POST["network"]."', " .
                            "icon : 'instagram', ";
                            
                            // if there is a caption
                            if( !is_null($post->caption) )
                                $cypher .= "text : '" . str_replace("'", "\'", $post->caption->text) . "', ";
                            
            $cypher .=      "link : '" . $post->link . "', " .
                            "id : '" . $post->id . "', ";

                            // if there are any likes
                            if( !is_null($post->likes) )
                                $cypher .= "likes : " . (int)$post->likes->count . ", ";

            $cypher .=      "created_time : " . (int)$post->created_time . " " .
                        "})<-[:HAS_POST]-(n) ";

            // if there is a video
            if( property_exists($post, "videos"))
                
                // create a media node
                $cypher .=  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
                                "height : ". $post->videos->standard_resolution->height .", ".
                                "width : ". $post->videos->standard_resolution->width .", ".
                                "url : '". $post->videos->standard_resolution->url ."', ".
                                "thumbnail : '". $post->images->thumbnail->url ."', ".
                                "cover_image : '". $post->images->standard_resolution->url ."', ".
                                "type : 'video'".
                            "})";
            // else use the image
            else
                $cypher .=  "MERGE (p)-[:HAS_MEDIA]->(m:Media { ".
                                "height : ". $post->images->standard_resolution->height .", ".
                                "width : ". $post->images->standard_resolution->width .", ".
                                "url : '". $post->images->standard_resolution->url ."', ".
                                "thumbnail : '". $post->images->thumbnail->url ."', ".
                                "type : 'image'".
                            "})";

            $db->query( $cypher );

            // loop through all of the likers
            foreach($post->likes->data as $liker){ 

                          // match the post
                $cypher = "MATCH (p:Post) WHERE p.id='" . $post->id . "' " .
                          "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' " .
                          // maybe create the new socialite
                          "MERGE (s:Socialite { " .
                                "full_name : '" . $liker->full_name . "', " .
                                "id : '" . $liker->id . "', " .
                                "profile_pic : '" . $liker->profile_picture . "', " .
                                "username : '" . $liker->username . "' " .
                          "})<-[:HAS_MEMBER]-(n) " .
                          // maybe associate this socialite with a social network & post
                          "MERGE (s)-[:LIKED]->(p) RETURN n";
                
                $n = $db->query( $cypher ); 

                $n = $n["n"][0];
            }
        }
    }

    // output HTML checkbox for dropdown and query
    echo "  <input type='checkbox' class='form-control' value='".$n["name"]."' data-icon='".$n["icon"]."' checked>
            <span class='icon-".$n["icon"]."'></span>
            &nbsp;".ucfirst($n["name"]);

    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>
    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/main.css" rel="stylesheet">

    <style>
        h1, h5{
            text-align:center;
            color:#5cb85c;
        }
        h1{
            margin-top:150px;
        }
        h5{
            margin-top: 30px;
        }
    </style>

  </head>
  <body>

	<!-- hour glass spinner -->
    <h1>
        <span class="glyphicon glyphicon-hourglass loading" aria-label="loading animation"></span>
    </h1>

    <h5>Retrieving posts, please wait...</h5>

    <!-- javascript -->
    <script>

        (function(){
            document.addEventListener("DOMContentLoaded", function(){

                var network = '<?= $_GET["network"]; ?>';

                var ajax = new XMLHttpRequest();
                ajax.open("POST", "", true);
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        // console.log( this.responseText );
                        // console.log( JSON.parse(this.responseText) );
                        window.opener.esmApp.smPosts.authorize( this.responseText );
                        window.close();
                    }
                }
                ajax.send('network='+network+'&code=<?= $_GET["code"]; ?>');

            }, true);   
        })();

    </script>

  </body>
</html>











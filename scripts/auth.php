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
                  // create a link to the socialite
                  "MERGE (b)-[:LINKED_TO { active : 1 }]->(s:Socialite { " . 
                        // set the user properties
                        "username : '" . $meta->user->username . "', " .
                        "id : '" . $meta->user->id . "', " .
                        "profile_pic : '" . $meta->user->profile_picture . "', " .
                        "website : '" . $meta->user->website . "', " .
                        "full_name : '" . $meta->user->full_name . "', " .
                        "bio : '" . $meta->user->bio . "' " .
                  "})<-[:HAS_MEMBER]-(n)";

        $db->query($cypher);

        /*----------------------------------------------
                retrieve posts from instagram
        ----------------------------------------------*/

        // request the user's recent media
        $url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" . $meta->access_token;
        
        $posts = Curl::get( $url ); //echo $posts; exit();

        $posts = json_decode($posts);

        $posts = $posts->data;

        /*----------------------------------------------
           create nodes for posts, likes, & followers
        ----------------------------------------------*/

        // loop through the posts
        foreach($posts as $post){

            $cypher = "MATCH (s:Socialite) WHERE s.id='" . $meta->user->id . "' " .
                      "MATCH (n:Network) WHERE n.name='" . $_POST["network"] . "' " .
                      "MERGE (s)-[:POSTED]->(p:Post { " .
                            "username : '" . $meta->user->username . "', " .
                            "network : '".$_POST["network"]."', " .
                            "icon : 'instagram', " .
                            "img : '" . $post->images->standard_resolution->url . "', " . // res 640x640 
                            "thumbnail : '" . $post->images->thumbnail->url . "', "; // res 150x150
                            
                            // if there is a caption
                            if( !is_null($post->caption) )
                                $cypher .= "text : '" . str_replace("'", "\'", $post->caption->text) . "', ";
                            
            $cypher .=      "link : '" . $post->link . "', " .
                            "id : '" . $post->id . "', ";

                            // if there are any likes
                            if( !is_null($post->likes) )
                                $cypher .= "likes : " . (int)$post->likes->count . ", ";

            $cypher .=      "created_time : " . (int)$post->created_time . " " .
                        "})<-[:HAS_POST]-(n)";

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
                          "MERGE (s)-[:LIKED]->(p)" .
                
                $db->query( $cypher ); 
            }
        }
    }

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
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

	<!-- hour glass spinner -->
    <div style="width:100%;text-align:center;font-size:40px;color:#5cb85c;margin-top:150px;">
        <span class="glyphicon glyphicon-hourglass loading"></span>
    </div>


  	<!-- print_r -->
  	<!-- <pre></pre> -->


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
                        // console.log( JSON.parse(this.responseText) );
                        // console.log( this.responseText );
                        window.opener.esmApp.socialMod.authorize( network );
                        window.close();
                    }
                }
                ajax.send('network='+network+'&code=<?= $_GET["code"]; ?>');

            }, true);   
        })();

    </script>

  </body>
</html>











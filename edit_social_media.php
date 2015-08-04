<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    $fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

    if ($fn) {

        $user = new User();

        //-------------------------------------------
        // - getfile information
        // - $ff[0] = random number
        // - $ff[1] = file extension
        // - $ff[2] = heroSwiperObject
        $ff = explode(".", $fn);

        $uFolder = $_SERVER["DOCUMENT_ROOT"]."/routesider/uploads/";

        // AJAX call
        file_put_contents(
            $uFolder . $ff[0].'.'.$ff[1],
            file_get_contents('php://input')
        );

        //-------------------------------------------
        // - create a unique name for the file
        // - e.g. "username_123.jpg";
        $newName = rand(0, 1000);
        $newName = $user->data("username") . "_" . $newName . "." . $ff[1]; 

        // change the name of the file to ensure it is unique
        rename( $uFolder . $ff[0].'.'.$ff[1], $uFolder . $newName ); //change this
    
        $json = [ "filename" => $newName];

        $json = json_encode($json);

        exit( $json );
    }

    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(isset($_POST["post_id"])){

        $db = neoDB::getInstance();

        $cypher = "MATCH (n:" . ucfirst($_POST["network"]) . ")-[r:POSTED]->(p:Post) " .
                  "WHERE p.id = '" . $_POST["post_id"] . "' " .
                  "OPTIONAL MATCH (p)<-[q:LIKES]-(u)" .
                  "DELETE r, p, q, u";

        $db->query( $cypher );

        exit("delte successful");

    } else if(isset($_POST["network"])){

        // retrieve the data for the given network

        $user = new User();
    
        $business = $user->business();

        $business = $business[0];

        $profile = $business->profile();

        $db = neoDB::getInstance();

        $cypher = "MATCH (u:User) WHERE u.username = '".$user->data("username")."' ".
                  "MATCH (u)-[:MANAGES_BUSINESS]->(b) ".
                  "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s:".ucfirst($_POST["network"]).") ".
                  "MATCH (s)-[:POSTED]->(p) ".
                  "RETURN s, p";

        $posts = $db->query( $cypher );

        $posts = $posts["p"];

        // create an empty array to store the html
        $postHTML = [];

        // loop through all the posts to
        foreach($posts as $post){

            // push a new html string onto the postHTML array
            $postHTML[] = 

            "<div class='thumbnail social-media-post'>".
            "   <img src='".$post["img"]."' alt='".$post["text"]."'>".
            "   <div class='caption'>".
            "       <img src='img/business/".$profile->data("avatar")."' class='avatar' alt='business avatar/logo'>".
            "       <span class='username'>".$post["username"]."</span>".
            "       <span class='text'>".$post["text"]."</span>".
            "   </div>".
            "   <div class='likes'>".$post["likes"]."</div>".
            "   <div class='post-link'><a href='".$post["link"]."'><span class='icon_".$_POST["network"]."'></span></a></div>".
            "</div>";
        }

        echo json_encode($postHTML);

        exit();
    }

    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $errors = []; //required

    $user = new User();

    $business = $user->business();

    $business = $business[0];

    $profile = $business->profile();

    $networks = $business->networks();

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Routesider</title>

        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- page styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/icomoon.css" rel="stylesheet">
        <link href="css/edit_social_media.css" rel="stylesheet">
        <link href="css/on_off_switch.css" rel="stylesheet">
        <link href="css/swiper.min.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

    	<!-- page content (main) -->
        <div id="page-content">

            <!-- navbar -->
            <?php include "components/navbar.php"; ?>

            <div class="container">

            	<!-- header -->
            	<h1>Edit Social Media</h1>

            	<div class="row">

	            	<!-- activation buttons -->
	            	<section class="col-md-4" id="activation-btns">

	            		<h3>Activate/Deactivate</h3>

	            		<h5>Connect your social media account to Routesider to include posts in your Routesider feed.</h5>

	            		<div class="container-fluid activation-btns">
		            		
		            		<!-- facebook -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-face">
		            			
		            			<button type="button" class="btn activate-btn"  aria-label="activate facebook"><span class="icon-facebook2" aria-hidden="true"></span></button>

		            			<h5>Facebook</h5>

		            		</div>

		            		<!-- instagram -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-inst">
		            			
		            			<button type="button" class='btn activate-btn <?= in_array("instagram", $networks) ? "active" : ""; ?>' data-toggled="0" aria-label="activate instagram"><span class="icon-instagram" aria-hidden="true"></span></button>
		            			
                                <div class='popover top <?= in_array("instagram", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-instagram"></span> Instagram</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("instagram", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger">remove</button>

                                    <?php }else{ ?>

                                        <button type="button" data-network="instagram" data-url="https://api.instagram.com/oauth/authorize/?client_id=6f469fae7d024a83ae77a5d463181af0&amp;redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&amp;response_type=code" aria-label="add instagram account" class="btn">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>
                                
		            			<h5>Instagram</h5>

		            		</div>

		            		<!-- tumblr -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-tumb">
		            			
		            			<button type="button" class="btn activate-btn" aria-label="activate tumblr"><span class="icon-tumblr2" aria-hidden="true"></span></button>
		            			
		            			<h5>Tumblr</h5>

		            		</div>

		            		<!-- etsy -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-etz">

		            			<button type="button" class="btn activate-btn" aria-label="activate etsy"><span class="etsy-icon" aria-hidden="true">E</span></button>
		            			
		            			<h5>Etsy</h5>

		            		</div>

		            		<!-- twitter -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-twit">
		            			
		            			<button type="button" class="btn activate-btn" aria-label="activate twitter"><span class="icon-twitter2" aria-hidden="true"></span></button>
		            			
		            			<h5>Twitter</h5>

		            		</div>

		            		<!-- google -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-goog">

		            			<button type="button" class="btn activate-btn" aria-label="activate google"><span class="icon-google-plus2" aria-hidden="true"></span></button>

		            			<h5>Google</h5>

		            		</div>

		            	</div><!-- /container-fluid -->
	            	</section><!-- /activation-bts -->

	            	<!-- feed -->
	            	<section class="col-md-8" id="social-feed">	

                        <h3>Edit Posts</h3>

                        <h5>Remove unwanted posts from your Routesider feed.</h5>

                        <!-- search user posts -->
                        <div class="container-fluid" style="padding:0px;">
                            <div class="col-sm-8 col-sm-offset-2" style="padding:0px;">
                                <div class="input-group" id="search-posts">
                                    <input type="text" 
                                           class="form-control input-lg" 
                                           placeholder="Search posts"
                                           aria-label="search posts">
                                    <button type="button" class="btn" aria-label="Submit search for posts">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div><!-- /container-fluid -->

                        <!-- search settings -->
                        <div class="container-fluid" style="padding:0px;">
                            <div class="col-sm-10 col-sm-offset-1" id="search-settings" style="padding:0px;">

                                <!-- text or image posts -->
                                <div class="btn-group" role="group" aria-label="filter by content">
                                    <button type="button" class="btn btn-default active" aria-label="text-posts">
                                        <span class="glyphicon glyphicon-font"></span>
                                    </button>
                                    <button type="button" class="btn btn-default active" aria-label="media-posts">
                                        <span class="glyphicon glyphicon-film"></span>
                                    </button>
                                </div>
                                
                                <!-- query by network -->
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        all networks
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <?php foreach($networks as $network){ 
                                            echo "<li><a href='#'>{$network}</a></li>";
                                        } ?>
                                    </ul>
                                </div>

                            </div><!-- /search-settings -->
                        </div><!-- /container-fluid -->

                        <?php 

                        $posts = $business->getPosts();

                        foreach($posts as $post){ ?>

                        <div class="thumbnail social-media-post">
                            <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post["network"]; ?>' data-id='<?= $post["id"]; ?>'></div>
                            <img src='<?= $post["img"]; ?>' alt="social media post">
                            <div class="caption">
                                <table>
                                    <tr>
                                        <td>
                                            <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
                                        </td>
                                        <td>
                                            <p>
                                                <a href='https://instagram.com/<?= $post["username"]; ?>'>
                                                    <span>&#64;<?= $post["username"]; ?></span>
                                                </a>
                                                <?= isset($post["text"]) ? $post["text"] : ""; ?>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="social-post-link"><a href='<?= $post["link"]; ?>'><span class='icon-<?= $post["icon"]; ?>'></span></a></div>
                            <div class="likes">
                                <div class="glyphicon glyphicon-heart"></div><div style="font-size:10px">&nbsp;&nbsp;<?= $post["likes"]; ?></div>
                            </div>
                        </div>

                        <?php } ?>

	            	</section><!-- /feed -->
			
		    	</div><!-- /row -->
		    </div><!-- /container -->

            <!-- footer -->
            <?= include "components/footer.php"; ?>

        </div><!-- end page content -->

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- confirmation mo dal -->
        <div class="modal" id="confirmation-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Remove Post</h4>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure that you'd like to remove this post for your Routesider feed?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" style="float:left;">Cancel</button>
                        <button type="button" class="btn btn-primary btn-danger" data-confirm="1">Yes, remove post</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/edit_social_media.js"></script>

    </body>
</html>














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

    if(isset($_POST["network"])){

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
	            	<section class="col-sm-6 col-md-2" id="activation-btns">

	            		<h3>Activate/Deactivate</h3>

	            		<h5>Connect your social media account to Routesider to include posts in your Routesider feed.</h5>

	            		<div class="container-fluid activation-btns">
		            		
		            		<!-- facebook -->
		            		<div id="activate-face">
		            			
		            			<button type="button" class="btn activate-btn"  aria-label="activate facebook"><span class="icon-facebook2" aria-hidden="true"></span></button>

		            			<h5>Facebook</h5>

		            		</div>

		            		<!-- instagram -->
		            		<div id="activate-inst">
		            			
		            			<button type="button" class="btn activate-btn" data-toggled="0" aria-label="activate instagram"><span class="icon-instagram" aria-hidden="true"></span></button>
		            			
		            			<h5>Instagram</h5>

                                <div class="popover top">
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-instagram"></span> Instagram</h3>
                                    <div class="popover-content">
                                        <button type="button" data-network="instagram" data-url="https://api.instagram.com/oauth/authorize/?client_id=6f469fae7d024a83ae77a5d463181af0&amp;redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&amp;response_type=code" aria-label="add instagram account" class="btn">add account</button>
                                    </div>
                                </div>

		            		</div>

		            		<!-- tumblr -->
		            		<div id="activate-tumb">
		            			
		            			<button type="button" class="btn activate-btn" aria-label="activate tumblr"><span class="icon-tumblr2" aria-hidden="true"></span></button>
		            			
		            			<h5>Tumblr</h5>

		            		</div>

		            		<!-- etsy -->
		            		<div id="activate-etz">

		            			<button type="button" class="btn activate-btn" aria-label="activate etsy"><span class="etsy-icon" aria-hidden="true">E</span></button>
		            			
		            			<h5>Etsy</h5>

		            		</div>

		            		<!-- twitter -->
		            		<div id="activate-twit">
		            			
		            			<button type="button" class="btn activate-btn" aria-label="activate twitter"><span class="icon-twitter2" aria-hidden="true"></span></button>
		            			
		            			<h5>Twitter</h5>

		            		</div>

		            		<!-- google -->
		            		<div id="activate-goog">

		            			<button type="button" class="btn activate-btn" aria-label="activate google"><span class="icon-google-plus2" aria-hidden="true"></span></button>

		            			<h5>Google</h5>

		            		</div>

		            	</div><!-- /container-fluid -->
	            	</section><!-- /activation-bts -->

	            	<!-- other settings -->
	            	<section class="hidden-sx col-sm-6 col-md-4" id="social-metrics">
	            		
	            	</section><!-- /other settings -->

	            	<!-- feed -->
	            	<section class="col-sm-12 col-md-6" id="social-feed">	

                        <h3>Edit Posts</h3>

                        <h5>Remove unwanted posts from your Routesider feed.</h5>

                        <?php 

                        $posts = $business->getPosts();

                        for($i = 0; $i < count($posts["p"]); $i++){ ?>

                        <div class="thumbnail social-media-post">
                            <img src='<?= $posts["p"][$i]["img"]; ?>' alt="social media post">
                            <div class="caption">
                                <table>
                                    <tr>
                                        <td>
                                            <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
                                        </td>
                                        <td>
                                            <p>
                                                <a href='https://instagram.com/<?= $posts["s"][$i]["username"]; ?>'>
                                                    <span>&#64;<?= $posts["s"][$i]["username"]; ?></span>
                                                </a>
                                                <?= isset($posts["p"][$i]["text"]) ? $posts["p"][$i]["text"] : ""; ?>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="likes"><span class="glyphicon glyphicon-heart"></span><?= $posts["p"][$i]["likes"]; ?></div>
                            <div class="social-post-link"><a href='<?= $posts["p"][$i]["link"]; ?>'><span class="icon-instagram"></span></a></div>
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

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/edit_social_media.js"></script>

    </body>
</html>














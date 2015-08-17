<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle GET/POST params
    //-------------------------------

    //-----------------------------------------------
    // delete a post
    if(isset($_POST["post_id"])){

        $db = neoDB::getInstance();

        $cypher = "MATCH (n:" . ucfirst($_POST["network"]) . ")-[r:POSTED]->(p:Post) " .
                  "WHERE p.id = '" . $_POST["post_id"] . "' " .
                  "OPTIONAL MATCH (p)<-[q:LIKES]-(u)" .
                  "DELETE r, p, q, u";

        $db->query( $cypher );

        exit("delete successful");

    } 

    // else if(isset($_POST["network"])){

    //     // retrieve the data for the given network

    //     $user = new User();
    
    //     $business = $user->business();

    //     $business = $business[0];

    //     $profile = $business->profile();

    //     $db = neoDB::getInstance();

    //     $cypher = "MATCH (u:User) WHERE u.username = '".$user->data("username")."' ".
    //               "MATCH (u)-[:MANAGES_BUSINESS]->(b) ".
    //               "MATCH (b)-[:LINKED_SOCIAL_MEDIA_ACCOUNT]->(s:".ucfirst($_POST["network"]).") ".
    //               "MATCH (s)-[:POSTED]->(p) ".
    //               "RETURN s, p";

    //     $posts = $db->query( $cypher );

    //     $posts = $posts["p"];

    //     // create an empty array to store the html
    //     $postHTML = [];

    //     // loop through all the posts to
    //     foreach($posts as $post){

    //         // push a new html string onto the postHTML array
    //         $postHTML[] = 

    //         "<div class='thumbnail social-media-post'>".
    //         "   <img src='".$post["img"]."' alt='".$post["text"]."'>".
    //         "   <div class='caption'>".
    //         "       <img src='img/business/".$profile->data("avatar")."' class='avatar' alt='business avatar/logo'>".
    //         "       <span class='username'>".$post["username"]."</span>".
    //         "       <span class='text'>".$post["text"]."</span>".
    //         "   </div>".
    //         "   <div class='likes'>".$post["likes"]."</div>".
    //         "   <div class='post-link'><a href='".$post["link"]."'><span class='icon_".$_POST["network"]."'></span></a></div>".
    //         "</div>";
    //     }

    //     echo json_encode($postHTML);

    //     exit();
    // }

    //-----------------------------------------------
    // - query 
    else if(isset($_POST["q"])){

        // edit social media query script
        include "scripts/esm_query.php";

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

	            		<h5>Connect your social media account to Routesider.</h5>

	            		<div class="container-fluid activation-btns">
		            		
		            		<!-- facebook -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-face">
		            			
                                <div>
		            			    <button type="button" class="btn activate-btn"  aria-label="activate facebook"><span class="icon-facebook2" aria-hidden="true"></span></button>
                                    <h5>Facebook</h5>
                                </div>

                                <div class='popover top <?= in_array("facebook", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-facebook2" style="color:#3B5998;"></span> Facebook</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("facebook", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div style="margin-bottom:8px;">
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button type="button" class="btn btn-success" data-network="facebook" data-url="" aria-label="add facebook account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

		            		</div>

		            		<!-- instagram -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-inst">
                                
                                <div>		            			
    		            			<button type="button" class='btn activate-btn <?= in_array("instagram", $networks) ? "active" : ""; ?>' data-toggled="0" aria-label="activate instagram"><span class="icon-instagram" aria-hidden="true"></span></button>
                                    <h5>Instagram</h5>
                                </div>

                                <div class='popover top <?= in_array("instagram", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-instagram" style="color:#517fa4;"></span> Instagram</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("instagram", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div style="margin-bottom:8px;">
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button type="button" class="btn btn-success" data-network="instagram" data-url="https://api.instagram.com/oauth/authorize/?client_id=6f469fae7d024a83ae77a5d463181af0&amp;redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&amp;response_type=code" aria-label="add instagram account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

		            		</div>

		            		<!-- tumblr -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-tumb">
		            			
                                <div>
		            			   <button type="button" class="btn activate-btn" aria-label="activate tumblr"><span class="icon-tumblr2" aria-hidden="true"></span></button>
		            			   <h5>Tumblr</h5>
                                </div>

                                <div class='popover top <?= in_array("tumblr", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-tumblr2" style="color:#32506d;"></span> Tumblr</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("tumblr", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div style="margin-bottom:8px;">
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button type="button" class="btn btn-success" data-network="tumblr" data-url="" aria-label="add tumblr account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

		            		</div>

		            		<!-- linked in -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-link">

                                <div>
		            			   <button type="button" class="btn activate-btn" aria-label="activate LinkedIn"><span class="icon-linkedin" aria-hidden="true"></span></button>
		            			   <h5>LinkedIn</h5>
                                </div>

                                <div class='popover top <?= in_array("tumblr", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-tumblr2" style="color:#4875B4;"></span> LinkedIn</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("linkedin", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div style="margin-bottom:8px;">
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button type="button" class="btn btn-success" data-network="linkedin" data-url="" aria-label="add tumblr account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

		            		</div>

		            		<!-- twitter -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-twit">
		            			
                                <div>
		            			   <button type="button" class="btn activate-btn" aria-label="activate twitter"><span class="icon-twitter2" aria-hidden="true"></span></button>
		            			   <h5>Twitter</h5>
                                </div>

                                <div class='popover top <?= in_array("twitter", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-twitter2" style="color:#00ACED;"></span> Twitter</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("twitter", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button type="button" class="btn btn-success" data-network="twitter" data-url="" aria-label="add twitter account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

		            		</div>

		            		<!-- google -->
		            		<div class="col-xs-4 col-sm-2 col-md-6" id="activate-goog">

                                <div>
		            			   <button type="button" class="btn activate-btn" aria-label="activate google"><span class="icon-google-plus2" aria-hidden="true"></span></button>
		            			   <h5>Google</h5>
                                </div>

                                <div class='popover top <?= in_array("google", $networks) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-google-plus2" style="color:#dd4b39;"></span> Google</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("google", $networks) ){ ?>

                                        <div>
                                            <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                        </div>
                                        <div style="margin-bottom:8px;">
                                            <input type="checkbox" class="form-control" checked><span>use for login</span>
                                        </div>
                                        <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove</button>

                                    <?php }else{ ?>

                                        <button class="btn btn-success" type="button" data-network="google" data-url="" aria-label="add google account">add account</button>
                                    
                                    <?php } ?>

                                    </div>
                                </div>

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
                                    <div class="autocomp">
                                        <span value="" class="glyphicon glyphicon-hourglass spinner"></span>
                                    </div>
                                    <button type="button" class="btn" aria-label="Submit search for posts">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div><!-- /container-fluid -->

                        <!-- search settings -->
                        <div class="container-fluid" style="padding:0px;">
                            <div class="col-sm-10 col-sm-offset-1" style="padding:0px;margin-top:10px;margin-bottom:30px;">

                                <!-- text or image posts -->
                                <div class="btn-group" id="search-media" role="group" aria-label="filter by content">
                                    <button type="button" class="btn btn-default active" data-prop="imgs" aria-label="include image posts">
                                        <span class="icon-image"></span>
                                    </button>
                                    <button type="button" class="btn btn-default active" data-prop="vids" aria-label="include video posts">
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

                        <!-- social posts feed -->
                        <div id="social-posts">

                            <?php 

                            $posts = $business->getPosts();

                            // if we have any posts
                            if(count($posts->getNodesCount())){

                                foreach($posts->getNodes("Post") as $post){ 

                                    // get all the media objects
                                    $media = $post->getConnectedNodes("OUT", "HAS_MEDIA");

                                    ?>

                                <div class="thumbnail social-media-post">
                                    <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post->getProperty("network"); ?>' data-id='<?= $post->getProperty("id"); ?>'></div>
                                    <?php // if the post has at least 1 media object
                                          if( count($media) ){

                                            // if the post has a video
                                            if( $media[0]->getProperty("type") == "video" ){ ?>

                                    <!-- iframe -->
                                    <iframe src='<?= $media[0]->getProperty("url"); ?>' frameborder="0" autoplay="false"></iframe>
                                    
                                            <?php // if the post has more than 1 image
                                            }else if( count($media) > 1 ){  ?>

                                    <!-- gallery -->

                                            <?php // if there is only 1 image
                                            }else{ ?>

                                    <!-- single image -->
                                    <img src='<?= $media[0]->getProperty("url"); ?>' alt="social media post">
                                    
                                    <?php } } ?>

                                    <div class="caption">
                                        <table>
                                            <tr>
                                                <td>
                                                    <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
                                                </td>
                                                <td>
                                                    <p>
                                                        <a href='https://instagram.com/<?= $post->getProperty("username"); ?>'>
                                                            <span>&#64;<?= $post->getProperty("username"); ?></span>
                                                        </a>
                                                        <?= ($post->hasProperty("text")) ? $post->getProperty("text") : ""; ?>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="social-post-link"><a href='<?= $post->getProperty("link"); ?>'><span class='icon-<?= $post->getProperty("icon"); ?>'></span></a></div>
                                    <div class="likes">
                                        <div class="glyphicon glyphicon-heart"></div><div style="font-size:10px">&nbsp;&nbsp;<?= $post->getProperty("likes"); ?></div>
                                    </div>
                                </div>

                            <?php } }else{ ?>

                                <hr style="margin-top: 0px;">
                                <h5 style="text-align:center;"><i>no social networks connected</i></h5>

                            <?php } ?>
                            
                        </div><!-- /social-posts -->

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














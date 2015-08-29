<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle GET/POST params
    //-------------------------------

    //-----------------------------------------------
    // - remove network
    if(isset($_DELETE["network"])){

        echo "delete network"; exit();

    }
    

    //-----------------------------------------------
    // delete a post
    if(isset($_POST["post_id"])){

        $db = neoDB::getInstance();

        $cypher = "MATCH (s)-[r:POSTED]->(p:Post) WHERE p.id = '" . $_POST["post_id"] . "' " .
                  "SET r.deleted = 1";

        $db->query( $cypher );

        exit("1");

    } 

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

    // quick access to names so we only need to loop once
    $netNames = [];
    foreach($networks as $n)
        $netNames[] = $n["name"];

    $posts = $business->getPosts();

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
                                    <button type="button" class="btn activate-btn <?= in_array("facebook", $netNames) ? "active" : "not-active"; ?>"  aria-label="activate facebook"><span class="icon-facebook2" aria-hidden="true"></span></button>
                                    <h5>Facebook</h5>
                                </div>

                                <div class='popover top <?= in_array("facebook", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-facebook2"></span> Facebook</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("facebook", $netNames) ){ ?>

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
                            </div><!-- /facebook -->

                            <!-- instagram -->
                            <div class="col-xs-4 col-sm-2 col-md-6" id="activate-inst">
                                
                                <div>                               
                                    <button type="button" class='btn activate-btn <?= in_array("instagram", $netNames) ? "active" : "not-active"; ?>' data-toggled="0" aria-label="activate instagram"><span class="icon-instagram" aria-hidden="true"></span></button>
                                    <h5>Instagram</h5>
                                </div>

                                <div class='popover top <?= in_array("instagram", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-instagram"></span> Instagram</h3>
                                    <div class="popover-content">

                                        <div <?= in_array("instagram", $netNames)? "" : "style='display:none;'"; ?>>
                                            <div>
                                                <input type="checkbox" class="form-control" checked><span>auto-update</span>
                                            </div>
                                            <div style="margin-bottom:8px;">
                                                <input type="checkbox" class="form-control" checked><span>use for login</span>
                                            </div>
                                            <button type="button" class="btn btn-danger" data-network="instagram">
                                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> remove
                                            </button>
                                        </div>

                                        <div <?= in_array("instagram", $netNames)? "style='display:none;'" : ""; ?>>
                                            <button type="button" class="btn btn-success" data-network="instagram" data-url="https://api.instagram.com/oauth/authorize/?client_id=6f469fae7d024a83ae77a5d463181af0&amp;redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&amp;response_type=code" aria-label="add instagram account">add account</button>
                                        </div>

                                    <?php } ?>

                                    </div>
                                </div>
                            </div><!-- /instagram -->

                            <!-- tumblr -->
                            <div class="col-xs-4 col-sm-2 col-md-6" id="activate-tumb">
                                
                                <div>
                                   <button type="button" class="btn activate-btn <?= in_array("tumblr", $netNames) ? "active" : "not-active"; ?>" aria-label="activate tumblr"><span class="icon-tumblr2" aria-hidden="true"></span></button>
                                   <h5>Tumblr</h5>
                                </div>

                                <div class='popover top <?= in_array("tumblr", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-tumblr2" ></span> Tumblr</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("tumblr", $netNames) ){ ?>

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
                            </div><!-- /tumblr -->

                            <!-- linkedin -->
                            <div class="col-xs-4 col-sm-2 col-md-6" id="activate-link">

                                <div>
                                   <button type="button" class="btn activate-btn <?= in_array("linkedin", $netNames) ? "active" : "not-active"; ?>" aria-label="activate LinkedIn"><span class="icon-linkedin" aria-hidden="true"></span></button>
                                   <h5>LinkedIn</h5>
                                </div>

                                <div class='popover top <?= in_array("tumblr", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-tumblr2"></span> LinkedIn</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("linkedin", $netNames) ){ ?>

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
                            </div><!-- /linkedin -->

                            <!-- twitter -->
                            <div class="col-xs-4 col-sm-2 col-md-6" id="activate-twit">
                                
                                <div>
                                   <button type="button" class="btn activate-btn <?= in_array("twitter", $netNames) ? "active" : "not-active"; ?>" aria-label="activate twitter"><span class="icon-twitter2" aria-hidden="true"></span></button>
                                   <h5>Twitter</h5>
                                </div>

                                <div class='popover top <?= in_array("twitter", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-twitter2"></span> Twitter</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("twitter", $netNames) ){ ?>

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
                            </div><!-- /twitter -->

                            <!-- google -->
                            <div class="col-xs-4 col-sm-2 col-md-6" id="activate-goog">

                                <div>
                                   <button type="button" class="btn activate-btn <?= in_array("google", $netNames) ? "active" : "not-active"; ?>" aria-label="activate google"><span class="icon-google-plus2" aria-hidden="true"></span></button>
                                   <h5>Google</h5>
                                </div>

                                <div class='popover top <?= in_array("google", $netNames) ? "active" : ""; ?>'>
                                    <div class="arrow"></div>
                                    <h3 class="popover-title"><span class="icon-google-plus2"></span> Google</h3>
                                    <div class="popover-content">

                                    <?php if( in_array("google", $netNames) ){ ?>

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
                            </div><!-- /google -->

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
                                    <ul class="list-group autocomp">
                                        <li class="list-group-item" style="text-align:center;">
                                            <span class="glyphicon glyphicon-hourglass loading"></span>
                                        </li>
                                    </ul>
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
                                <div class="dropdown" style="max-width:50%;">
                                    
                                    <button class="btn btn-default dropdown-toggle" type="button" id="search-network" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <span>all networks</span>
                                        <span class="caret"></span>
                                    </button>
                                    
                                    <ul class="dropdown-menu list-group" id="network-select" aria-labelledby="search-network">
                                        <li class="list-group-item">
                                            <input type="checkbox" class="form-control" value="all" checked> all networks
                                        </li>
                                        <li role="separator" class="divider"></li>

                                        <?php // if there are any networks 
                                        if( count($networks) )
                                            // loop through the networks
                                            foreach($networks as $network)
                                                // construct the list 
                                                echo "<li class='list-group-item'>
                                                        <input type='checkbox' class='form-control' value='".$network["name"]."' data-icon='".$network["icon"]."' checked>
                                                        <span class='icon-".$network["icon"]."'></span>
                                                        &nbsp;".ucfirst($network["name"])."
                                                      </li>";
                                        ?>

                                    </ul>
                                </div>

                            </div><!-- /search-settings -->
                        </div><!-- /container-fluid -->

                        <!-- social posts feed -->
                        <div id="social-posts">

                            <?php 

                            // if we have any posts
                            if( count($networks) ){

                                foreach($posts->getNodes("Post") as $post){ 

                                    // get all the media objects
                                    $media = $post->getConnectedNodes("OUT", "HAS_MEDIA");

                                    ?>

                                <div class="thumbnail social-media-post" id='<?= $post->getProperty("id"); ?>' data-loading="0">
                                    <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post->getProperty("network"); ?>' data-id='<?= $post->getProperty("id"); ?>'></div>
                                    <?php // if the post has at least 1 media object
                                          if( count($media) ){

                                            // if the post has a video
                                            if( $media[0]->getProperty("type") == "video" ){ ?>

                                    <!-- temp image to iframe -->
                                    <div class="top-img" data-url='<?= $media[0]->getProperty("url"); ?>'>
                                        <img src='<?= $media[0]->getProperty("cover_image"); ?>' alt="social media post">
                                        <h1><span class="glyphicon glyphicon-play-circle"></span></h1>
                                    </div>
                                    
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

        <!-- confirm remove post modal -->
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

        <!-- confirm remove network modal -->
        <div class="modal" id="confirm-drop-network">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Remove Network</h4>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to remove Network from your Routesider feed?</p>
                        <p>(you can always re-connect later)</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" style="float:left;">Cancel</button>
                        <button type="button" class="btn btn-primary btn-danger" data-confirm="1">Yes, remove network</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/modal.js"></script>
        <script src="js/edit_social_media.js"></script>

    </body>
</html>














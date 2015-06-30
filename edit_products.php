<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

    	// do something

    }

    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $page = "edit_products";

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
        <link href="css/<?= $page; ?>.css" rel="stylesheet">
        <link href="css/on_off_switch.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

    	<!-- page content -->
        <div id="page-content">

            <!-- navbar -->
            <?php include "components/navbar.php"; ?>

            <h1>Edit Products</h1>

            <!-- footer -->
            <footer>
                <div class="container">
                    <div class="row">

                        <!-- quick links -->
                        <div class="col-sm-4">
                            
                            <div class="logo">
                                <a href="/">
                                    <div class="route">Route</div>
                                    <span>sider</span>
                                </a>
                            </div>

                            <ul class="list-group">
                                <li class="list-group-item">
                                    <a href="about">About</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="register">Sign Up</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="privacy">Privacy</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="terms_of_use">Terms of Use</a>
                                </li>
                            </ul>

                            <hr class="visible-xs">

                        </div>

                        <!-- contact info -->
                        <div class="col-sm-4 contact-info">
                            
                            <div>
                                <a href="tel:+6506781777">
                                    <span class="glyphicon glyphicon-earphone"></span>
                                </a>
                            </div>
                            <div style="font-size:10px;">
                                <a href="tel:+6506781777">phone</a>
                            </div>
                            <div style="margin-bottom: 30px;">
                                <a href="tel:+6506781777">(650) 678-1777</a>
                            </div>

                            <div class="glyphicon glyphicon-time"></div>
                            <div style="font-size:10px;">phone hours</div>
                            <div>10 - 10 <span style="font-size:8px;">(Silicon Valley)</span></div>
                            <div>everyday</div>

                            <hr class="visible-xs">

                        </div>

                        <!-- contact form -->
                        <div class="col-sm-4 contact-us">

                            <div class="glyphicon glyphicon-envelope"></div>
                            <div style="font-size:10px;">contact us</div>

                            <form>
                                <input type="text" 
                                       name="cemail" 
                                       class="form-control"
                                       id="cname" 
                                       placeholder="your@email.com">
                              
                                <textarea id="cmessage" 
                                          class="form-control" 
                                          placeholder="500 characters max"
                                          rows="5"></textarea>
                              
                                <div style="text-align:right;">
                                    <button type="button" class="btn btn-default" aria-label="send message">Send</button>
                                </div>

                            </form>
                            
                        </div>

                        <!-- copyright -->
                        <div style="text-align:center;padding:30px;font-size: 12px;color: #aaa;">&#169; Routesider 2015</div>

                    </div>
                </div>
            </footer>

        </div><!-- end page content -->

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>














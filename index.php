<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';

    
    //-------------------------------------
    // STEP 2: instantiate global variables
    //-------------------------------------

    $page = "index"; //required

    $myErrors = array(); //required

    
    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

        // initial page load ajax query for local deals
        if(Input::get("location_query")){

            require "scripts/location_query.php";
        }

        exit("no input for now");
    }
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

        <!-- Routesider styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>  
        <!-- navbar -->
        <nav class="navbar navbar-map" id="navbar">
                <div class="navbar-header">
                    
                    <!-- toggle mobile menu -->
                    <button type="button" 
                            class="navbar-toggle collapsed"
                            id="navbar-toggle-menu">
                        <span class="glyphicon glyphicon-menu-hamburger"></span>
                    </button>

                    <!-- routesider logo -->
                    <a class="navbar-brand" href="#" style="width: 138px;display:block;">
                        <span class="logo">
                            <span class="route">Route</span>
                            <span>sider</span>
                        </span>
                    </a>

                    <!-- search routesider -->
                    <button type="button"
                            style="float:right;"
                            class="navbar-toggle"
                            id="navbar-toggle-search">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>

                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Map <span class="sr-only">(current)</span></a></li>
                        <li><a href="#">Deals</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                <span class="user-pic"><span class="glyphicon glyphicon-user"></span></span>
                                <!-- <span class="visible-md visible-lg">username@email.com</span>  -->
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">username</a></li>
                                <li><a href="#">my collectives</a></li>
                                <li><a href="#">settings</a></li>
                                <li class="divider"></li>
                                <li><a href="#">edit profile</a></li>
                                <li><a href="#">edit products</a></li>
                                <li><a href="#">edit deals</a></li>
                                <li><a href="#">edit map</a></li>
                                <li><a href="#">edit social media</a></li>
                                <li class="divider"></li>
                                <li><a href="#">log out</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-right" role="search">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="products, businesses, locations, etc...">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
                            </span>
                        </div><!-- /input-group -->
                    </form>
                </div><!-- /.navbar-collapse -->
        </nav>

        <!-- map key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis -->
        <div id="map-canvas"></div>

        <!-- page content -->
        <div id="page-content">

            <!-- jumbotron -->
            <div class="container jumbo-container" id="jumbo-container">
                    
                <!-- pull tab -->
                <ul class="nav nav-tabs" 
                    id="jumbo-pull-tab"
                    role="tablist">
                    <li class="active" role="presentation">
                        <a href="#" 
                           class="map-pull-tab"
                           role="tab">
                            <span class="glyphicon glyphicon-chevron-up"></span>
                        </a>
                    </li>
                </ul>

                <div class="jumbotron map-overlay-s">

                    <!-- lead -->
                    <div class="row">                
                        <div class="col-sm-8 col-md-6 jumbo-lead">
                            <div class="logo">
                                <div>Route</div>
                                <span>sider</span>
                            </div>
                            <p>Local Products &amp; Services</p>
                        </div>
                    </div>

                    <!-- hook -->
                    <div class="row">
                        <article class="col-sm-8 col-md-6 jumbo-hook">
                            <h2>Showcase Your Business</h2>
                            <p>Listing your products on Routesider can help you garner the online attention that you deserve.</p>
                            <p><a class="btn btn-primary btn-lg" href="#" role="button">Sign Up</a></p>
                            <p>(It's free!)</p>
                        </article>
                    </div>
                
                </div>
            </div>


            <!-- footer -->
            <footer class="container footer-map">
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
            </footer>
        
        </div><!-- end page content -->


        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <nav id="slideout-menu">

            <!-- logo -->
            <div class="logo">
                <a href="/">
                    <div style="max-width: 166px; position: relative; left: 50%; margin-left: -83px;"><!-- centers logo -->
                        <div class="route">Route</div>
                        <span>sider</span>
                    </div>
                </a>
            </div>         

            <!-- search bar -->
            <div class="input-group"
                 style="padding: 0 10px">
                <input type="text" 
                       class="form-control" 
                       style="border-top-left-radius: 16px; border-bottom-left-radius: 16px;border-right: 0;"
                       placeholder="Search Routesider"
                       aria-label="search all of routesider">
                <div class="input-group-btn">
                    <button type="button" 
                            class="btn btn-default" 
                            style="border-left: 0;border-right: 0;" 
                            aria-label="search routesider">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                    <button type="button" 
                            class="btn btn-default" 
                            style="border-left: 0;border-top-right-radius: 16px;border-bottom-right-radius: 16px;color:#aaa;" 
                            aria-label="search settings">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <hr>

            <!-- links -->
            <ul class="list-group cool-links">
                <li class="list-group-item">
                    <a href="about">About</a>
                </li>
                <li class="list-group-item">
                    <a href="register">Sign Up</a>
                </li>
            </ul>

            <hr>

            <ul class="list-group lame-links">
                <li class="list-group-item">
                    <a href="privacy">Privacy</a>
                </li>
                <li class="list-group-item">
                    <a href="terms_of_use">Terms of Use</a>
                </li>
                <li class="list-group-item">
                    <a href="#">Contact Us</a>
                </li>
            </ul>

        </nav>

        <!-- javascripts -->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;callback=rsApp.setUserLocation"></script>
        <script src="js/main.js"></script>
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>
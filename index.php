<?php

    // get the page name
    $page = substr($_SERVER['PHP_SELF'], 0, -4);


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
        <nav class="navbar navbar-map">
            <div class="container">
                <div class="navbar-header">
                    
                    <!-- toggle mobile menu -->
                    <button type="button" 
                            class="navbar-toggle collapsed"
                            id="navbar-toggle-menu"
                            aria-describedby="Toggle navigation menu">
                        <span class="glyphicon glyphicon-menu-hamburger"></span>
                    </button>

                    <!-- routesider logo -->
                    <a class="navbar-brand" href="#">
                        <div class="logo">
                            <div>Route</div>
                            <span>sider</span>
                        </div>
                    </a>

                    <!-- search routesider -->
                    <button type="button"
                            style="float:right;"
                            class="navbar-toggle"
                            id="navbar-toggle-search"
                            aria-describedby="Click to display search bar.">
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
            </div><!-- /.container-fluid -->
        </nav>


        <!-- map -->
        <iframe id="map-bg" 
                frameborder="0"
                src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;q=san+francisco+bay+area">
        </iframe>

        
        <!-- jumbotron -->
        <div class="container jumbo-container">
                
            <!-- pull tab -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active" role="presentation">
                    <a href="#" 
                       class="map-pull-tab"
                       role="tab">
                        <span class="glyphicon glyphicon-chevron-up"></span>
                    </a>
                </li>
            </ul>

            <section class="jumbotron map-overlay-s">

                <!-- lead -->
                <div class="row">                
                    <article class="col-sm-8 col-md-6 jumbo-lead">
                        <h1 class="logo">
                            <div>Route</div>
                            <span>sider</span>
                        </h1>
                        <p>Local Products &amp; Services</p>
                    </article>
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
            
            </section>
        </div>


        <!-- javascripts -->
        <script src="js/routesider.js"></script>
        <script src="js/<?= $page ?>.js"></script>

    </body>
</html>
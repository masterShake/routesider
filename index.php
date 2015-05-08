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
        <link href="css/routesider.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <!-- navbar -->
        <nav class="navbar navbar-default">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <div class="logo">
                            <div>Route</div>
                            <span>sider</span>
                        </div>
                    </a>
                    <button style="float:right;" class="btn btn-default navbar-search-toggle visible-xs" type="submit"><span class="glyphicon glyphicon-search"></span></button>
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

        <!-- main -->
        <div class="container" role="main">

            <!-- featured deals -->
            <section class="row">
    
                <h3>Local &amp; Awesome</h3>
                
                <!-- deals swiper -->
                <article class="col-sm-12 deals-swiper">
                    <div style="width:100%;height:200px;outline: 1px solid #000"></div>
                </article>

            </section>

            <!-- search & map -->
            <section class="row search-map">

                <!-- search -->
                <article class="col-sm-6 col-md-4 search-map-input">
                    <form role="search">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="products, businesses, locations, etc...">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
                            </span>
                        </div><!-- /input-group -->
                    </form>
                </article>

                <!-- map -->
                <article class="col-sm-6 col-md-8 search-results-map">
                    <div style="width:100%;height:250px;outline: 1px solid #000"></div>
                </article>
                
                <!-- results -->
                <article class="col-sm-6 col-md-4 search-results">
                    
                    <!-- PLACEHOLDER -->
                    <ul class="media-list">
                        <li class="media">
                            <div class="media-left">
                                <a href="#">
                                    <img class="media-object" 
                                         src="http://i.imgur.com/gZdXm8G.jpg" 
                                         alt="username"
                                         style="max-width:64px;"
                                         >
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">Weedica</h4>
                                <p>Medical cannabis delivery in Alameda County, CA.</p>
                            </div>
                        </li>
                    </ul>

                </article>

            </section>

            <!-- register & about -->

        </div>

        <!-- jumbotron -->
        <div class="jumbotron">
            <div class="container">

                <div class="row">

                    <!-- logo & tagline -->
                    <div class="col-sm-8 col-md-6 jumbo-logo">
                        <h1 class="logo">
                            <div>Route</div>
                            <span>sider</span>
                        </h1>
                        <p>Local Products &amp; Services</p>
                    </div>

                    <!-- lead & register link -->
                    <div class="col-sm-8 col-md-6 jumbo-hook">
                        <h2>Showcase Your Business</h2>
                        <p>Listing your products on Routesider can help you garner the online attention that you deserve.</p>
                        <p><a class="btn btn-primary btn-lg" href="#" role="button">Sign Up</a></p>
                        <p>(It's free!)</p>
                    </div>

                </div>

            </div>
        </div>

        <!-- about & register -->
        <div class="container">

            <!-- three panel about -->
            <div class="row">
                <div class="col-md-4">
                    <h2>Shop Local</h2>
                    <p>Look for local treasures. Learn about the products in your area. Order online!</p>
                    <p><a class="btn btn-default" href="#" role="button">Shop &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Display Your Goods</h2>
                    <p>Create a profile on Routesider and show the world what your what you're made of! List up to 5 products for free!</p>
                    <p><a class="btn btn-default" href="#" role="button">Business Account &raquo;</a></p>
                </div>
                <div class="col-md-4">
                    <h2>Connect</h2>
                    <p>Build relationships with customers, suppliers, distributes, everybody! Routesider is a place for shopping AND networking.</p>
                    <p><a class="btn btn-default" href="#" role="button">Sign Up &raquo;</a></p>
                </div>
            </div>

        </div>

    </body>
</html>
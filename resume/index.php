<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags always come first -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <title>routesider - coming soon</title>

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
        <link rel="stylesheet" href="octicons.css">
        <link rel="stylesheet" href="resume.css">
    </head>
    <body>

        <!-- google map -->
        <div id="map-canvas"></div>

        <!-- page content -->
        <div id="page-content">

            <!-- navbar -->
            <nav class="navbar">
                <div class="container">
                    <!-- toggle mobile menu button -->
                    <button type="button" class="btn hidden-sm-up">
                        <span class="octicon octicon-three-bars"></span>
                    </button>
                    <!-- brand -->
                    <a class="navbar-brand" href="#">
                        <div class="logo">
                            <div style="float:right;">sider</div>
                            <svg viewbox="0 0 65 30" class="route">
                              <defs>
                                <mask id="mask" x="0" y="0" width="100" height="50">
                                  <rect x="0" y="0" width="100" height="40" fill="#fff"/>
                                  <text text-anchor="middle" x="32" y="20" dy="1">ROUTE</text>
                                </mask>
                              </defs>
                              <rect x="0" y="0" width="83" height="30" mask="url(#mask)" fill-opacity="1" fill="#5CB85C"/>    
                            </svg>
                        </div>
                    </a>
                    <!-- nav links -->
                    <div class="nav navbar-nav hidden-sm-down">
                        <a class="nav-item nav-link active" href="#">map builder <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="#">installation</a>
                        <a class="nav-item nav-link" href="#">resume</a>
                        <!-- search bar -->
                        <form role="search">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search">
                            </div>
                        </form>
                    </div>
                </div><!-- /container -->
            </nav><!-- /navbar-default -->

            <!-- map builder -->
            <section></section>

            <!-- how to embed -->
            <section>
                
                <!-- step 1 -->
                <article></article>
                
                <!-- step 2 -->
                <article></article>

            </section>

            <!-- my resume -->
            <section></section>    

        </div>
                
        <script src="resume.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;libraries=places,drawing&amp;callback=rApp.initMap"></script>
    </body>
</html>
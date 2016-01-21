<?php

$fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

if ($fn) {

    $uFolder = $_SERVER["DOCUMENT_ROOT"]."/routesider/resume/uploads/";

    // AJAX call
    file_put_contents(
        $uFolder . $fn,
        file_get_contents('php://input')
    );

    //-------------------------------------------
    // - create a unique name for the file
    // - e.g. "username_123.jpg";
    $fc = explode(".", $fn); // print_r($fc);
    $newName = rand(0, 100);
    $date = date_create();
    $date = date_timestamp_get($date);
    $newName = $date . "_" . $newName . "." . $fc[1]; 

    // change the name of the file to ensure it is unique
    rename( $uFolder . $fn, $uFolder . $newName ); //change this

    // get the image dimensions
    $imgData = getimagesize($uFolder.$newName);

    // output the filename
    exit( "http://localhost/routesider/resume/uploads/".$newName );
}

?>
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
        <link rel="stylesheet" href="icomoon.css">
        <link rel="stylesheet" href="resume.css">
    </head>
    <body>

        <!-- google map -->
        <div id="map-canvas"></div>

        <!-- page content -->
        <div id="pageContent">

            <!-- navbar -->
            <nav class="navbar">
                <div class="container">
                    <!-- toggle mobile menu button -->
                    <button type="button" class="btn hidden-md-up">
                        <span class="icon-menu"></span>
                    </button>
                    <!-- nav links -->
                    <div class="nav navbar-nav" id="navLinks">
                        <!-- search bar -->
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <div>
                            <a class="nav-item nav-link active" href="#">map builder <span class="sr-only">(current)</span></a>
                            <a class="nav-item nav-link" href="#install">installation</a>
                            <a class="nav-item nav-link" href="#">resume</a>
                        </div>
                    </div>
                </div><!-- /container -->
            </nav><!-- /navbar-default -->

            <!-- brand -->
            <a class="navbar-brand starting" id="logo" href="#">
                <div class="logo" >
                    <div style="float:right;padding-right:2px;">sider</div>
                    <svg viewbox="0 0 70 30" class="route">
                      <defs>
                        <mask id="mask" x="0" y="0" width="100" height="50">
                          <rect x="0" y="0" width="100" height="40" fill="#fff"/>
                          <text text-anchor="middle" x="35" y="20" dy="1">ROUTE</text>
                        </mask>
                      </defs>
                      <rect x="0" y="0" width="70" height="30" mask="url(#mask)" fill-opacity="1" fill="#5CB85C"/>    
                    </svg>
                </div>
            </a>

            <!-- lead -->
            <section class="container">
                <div id="lead">
                    <button type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p><b>A place for products - coming soon!</b></p>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="search" aria-label="search the world to start you map">
                        <span class="input-group-addon"><span class="icon-search"></span></span>
                    </div>
                    <hr>
                    <div style="text-align:left;padding-bottom:6px;font-size:14px;">Build a map:</div>
                    <ol>
                        <li><span class="icon-search"></span> search for you location</li>
                        <li><span class="icon-location"></span> drop pins or draw polygons</li>
                        <li><span class="icon-embed2"></span> embed map code</li>
                    </ol>
                </div>
            </section><!-- /lead -->

            <!-- map builder -->
            <section class="container">

                <!-- control panels -->
                <div id="cPanels">

                    <!-- drop pin -->
                    <div class="popover popover-top">
                        <div class="popover-arrow"></div>
                        <h3 class="popover-title">
                            <span class="icon-location"></span>Drop Pin
                            <button type="button" class="close" aria-label="shrink or grow">
                                <span aria-hidden="true">&#171;</span>
                            </button>
                        </h3>
                        <div class="popover-fade"></div>
                        <div class="popover-content container">
                            <div class="row">
                                <!-- drop pin instructions -->
                                <div class="col-md-6" style="margin-bottom:10px;">
                                    <ul>
                                        <li>Tap or click to drop pin</li>
                                        <li>Upload custom pin icon</li>
                                    </ul>
                                    <div class="current-icon">
                                        <div>
                                            <button type="button" class="close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <span class="icon-location"></span>
                                        </div>
                                        <h6>Current icon: </h6>
                                    </div>
                                </div><!-- /drop pin instructions -->
                                <!-- upload custom pin -->
                                <div class="col-md-6" style="padding: 0 8px;">
                                    <div class="upload-img">
                                        <div>
                                            <label>Files to upload:</label>
                                            <input type="file" 
                                                   name="fileselect[]" 
                                                   multiple="multiple" />
                                        </div>
                                        <p style="margin-bottom:0;margin-top:14px;">- or -</p>
                                        <p style="margin-bottom:0;font-size:18px;">Drag &amp; Drop</p>
                                    </div>
                                </div><!-- upload custom pin -->
                            </div><!-- /row -->
                        </div><!-- /popover-content container -->
                    </div><!-- / drop pin -->

                </div><!-- /control panels -->

                <!-- toolbar -->
                <div class="btn-group" id="mapTools" role="create map" aria-label="map builder toolbar">
                    <button type="button" class="btn" data-panel="0" aria-label="drop new pin">
                        <span class="icon-location"></span>
                    </button>
                    <button type="button" class="btn" data-panel="1" aria-label="draw new polygon">
                        <span class="icon-map"></span>
                    </button>
                    <button type="button" class="btn" data-panel aria-label="get code">
                        <span class="icon-eye"></span>
                    </button>
                    <button type="button" class="btn" data-panel="2" aria-label="get code">
                        <span class="icon-embed2"></span>
                    </button>
                </div><!-- /toolbar -->

            </section><!-- /map-maker -->

            <!-- embed instructions -->
            <div class="container">
                <section id="how-to-install">
                    <h2>How to embed map</h2>
                    <div class="pull-tab">
                        <span class="icon-circle-up"></span>
                    </div>
                    <hr>
                    <!-- step 1: -->
                    <article class="row">
                        <div class="col-md-4">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=33&amp;txt=400%C3%97300&amp;w=400&amp;h=300">
                        </div>
                        <div class="col-md-8">
                            <h3><strong>Step 1:</strong> Lorem ipsum dolor sit amet</h3>
                            <p>Sit vel vitae blandit, duis suspendisse in, placerat mauris ligula, luctus porttitor tortor proin. Ac neque id eget luctus sem, justo et ligula id urna. Tempor orci placerat neque eget id. Sed rhoncus purus at amet quis fusce, nisl rhoncus. Eget commodo in sociis duis placerat at, lacinia porta risus urna consectetuer id suspendisse. Ullamcorper tristique eu bibendum per quis, duis purus aptent scelerisque dapibus sed, a enim consectetuer nulla nulla, mi sem metus vestibulum ut ante.</p>
                        </div>
                    </article>
                    <!-- step 2: -->
                    <article class="row">
                        <div class="col-md-4" style="float:right;">
                            <img src="https://placeholdit.imgix.net/~text?txtsize=33&amp;txt=400%C3%97300&amp;w=400&amp;h=300">
                        </div>
                        <div class="col-md-8">
                            <h3><strong>Step 2:</strong> Lorem ipsum dolor sit amet</h3>
                            <p>Sit vel vitae blandit, duis suspendisse in, placerat mauris ligula, luctus porttitor tortor proin. Ac neque id eget luctus sem, justo et ligula id urna. Tempor orci placerat neque eget id. Sed rhoncus purus at amet quis fusce, nisl rhoncus. Eget commodo in sociis duis placerat at, lacinia porta risus urna consectetuer id suspendisse. Ullamcorper tristique eu bibendum per quis, duis purus aptent scelerisque dapibus sed, a enim consectetuer nulla nulla, mi sem metus vestibulum ut ante.</p>
                        </div>
                    </article>
                </section><!-- /how-to-install -->
            </div><!-- /container -->

            <!-- my resume -->
            <section></section>   

            <?php include '../components/footer.php'; ?>

        </div>
                
        <script src="resume.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;libraries=places,drawing&amp;callback=mm.initMap"></script>
    </body>
</html>
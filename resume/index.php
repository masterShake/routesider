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
        <link rel="stylesheet" href="color_wheel.css">
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
                            <button type="button" class="close" data-panel="0" aria-label="shrink or grow">
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

                    <!-- draw polygon -->
                    <div class="popover popover-top">
                        <div class="popover-arrow"></div>
                        <div class="popover-title map">
                            <div class="icon-map"></div>
                            <div class="icon-plus"></div>New Polygon
                            <button type="button" class="close" data-h="134" aria-label="shrink or grow">
                                <span aria-hidden="true">&#171;</span>
                            </button>
                        </div>
                        <div class="popover-fade"></div>
                        <div class="popover-content new-poly" style="height:134px;">
                            <ul>
                                <li>tap to add points</li>
                                <li>press the "complete" button to connect the dots</li>
                            </ul>
                            <button type="button" class="btn" id="undo" aria-label="undo">
                                <span class="icon-undo2" aria-hidden="true"></span> undo
                            </button>
                            <button type="button" class="btn" id="redo" aria-label="undo">
                                redo <span class="icon-redo2" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn" id="complete-polygon" aria-label="complete the polygon">
                                <span class="icon-spinner7" aria-hidden="true"></span> complete
                            </button>
                        </div><!-- /popover-content container -->
                    </div><!-- /new polygon -->

                    <!-- edit polygon -->
                    <div class="popover popover-top" id="poly">
                        <div class="popover-arrow" style="display:none;"></div>
                        <div class="popover-title map">
                            <button type="button" class="close" data-panel="2" data-as="editPoly" style="float:left;" aria-label="close edit polygon mode">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div class="icon-map" style="margin-top:1px;"></div>
                            <div class="icon-pencil" style="font-size:10px;margin-top:4px;"></div>Edit Polygon
                            <button type="button" class="close" data-h="154" aria-label="shrink or grow">
                                <span aria-hidden="true">&#171;</span>
                            </button>
                        </div>
                        <div class="popover-fade"></div>
                        <div class="popover-content container" style="height:154px;">
                            <div class="row">
                                <div class="col-md-8">
                                    <!-- hex table -->
                                    <table>
                                        <thead>
                                            <tr>
                                                <th colspan="3">
                                                    <div>opacity</div>
                                                    <span>hex</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- stroke -->
                                            <tr>
                                                <td>
                                                    <button type="button" 
                                                            class="btn active" 
                                                            style="background-color:#5CB85C;color:#FFF;"
                                                            data-bf="0"
                                                            aria-label="edit polygon border">
                                                        <span class="icon-checkbox-unchecked"></span>
                                                    </button>
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           value="#5CB85C" 
                                                           class="form-control hex-text" 
                                                           data-bf="0"
                                                           aria-label="polygon stroke hexidecimal color value">
                                                </td>
                                                <td>
                                                    <input type="text"
                                                           value="0.8"
                                                           class="form-control opacity-text" 
                                                           max-length="4"
                                                           data-bf="0"
                                                           aria-label="polygon stroke opacity between 0 and 1">
                                                </td>
                                            </tr>
                                            <!-- fill -->
                                            <tr>
                                                <td style="padding-top:4px;">
                                                    <button type="button" 
                                                            class="btn" 
                                                            style="background-color:#FFF;color:#444;"
                                                            data-bf="1"
                                                            aria-label="edit polygon fill">
                                                        <span class="icon-droplet"></span>
                                                    </button>
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           value="#DFF0D8"
                                                           class="form-control hex-text" 
                                                           data-bf="1"
                                                           aria-label="polygon fill hexidecimal color value">
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           value="0.5"
                                                           class="form-control opacity-text" 
                                                           max-length="4"
                                                           data-bf="1"
                                                           aria-label="polygon fill opacity between 0 and 1">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table><!-- /hex & opacity table -->
                                    <!-- color wheel -->
                                    <div class="color-wheel">
                                        <?php include 'color_wheel_btns.php'; ?>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="row">
                                        <!-- color picker -->
                                        <div class="col-xs-6 col-md-12">
                                            <lable>
                                                <span>more<span class="hidden-xs-down"> colors</span>:</span> 
                                                <input type="color" class="form-control" aria-label="full HTML5 color wheel" style="max-width:40px;padding:3px 7px;display:inline;" value="#5CB85C"/>
                                            </lable>
                                        </div>
                                        <!-- opacity slider -->
                                        <div class="col-xs-6 col-md-12">
                                            <span class="icon-brightness-contrast" style="font-size:18px;max-width:11%;"></span>
                                            <input type="range" type="range" min="0" max="1" step="0.01" value="0.8" style="width:calc(100% - 30px);margin-left:5px;"/>
                                        </div>
                                    </div><!-- /row -->
                                </div>
                            </div><!-- /row -->
                        </div><!-- /popover-content container -->
                    </div><!-- /edit-polygon -->

                    <!-- embed preview -->
                    <div class="container" id="prev">
                        <div>
                            <div class="icon-eye" style="float:left;font-size:18px;margin-top:3px;margin-right:4px;"></div>
                            <b>embed preview</b>
                            <button type="button" class="close" data-panel="3" data-as="embedView" aria-label="close embed preview mode">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <!-- embed code -->
                    <div class="popover popover-top">
                        <div class="popover-arrow"></div>
                        <h3 class="popover-title">
                            <span class="icon-embed2" style="padding-right:3px;"></span>Embed Code
                            <button type="button" class="close" data-h="212" aria-label="shrink or grow">
                                <span aria-hidden="true">&#171;</span>
                            </button>
                        </h3>
                        <div class="popover-fade"></div>
                        <div class="popover-content" style="height:212px;">
                            <textarea style="width:100%;height:150px;">
                            </textarea>
                            <div style="text-align:right;">
                                <button type="button" class="btn btn-info" aria-label="copy code">
                                    <span class="icon-paste" aria-hidden="true"></span> copy
                                </button>
                            </div>
                        </div><!-- /popover-content -->
                    </div><!-- /embed code -->

                    <!-- embed code -->

                </div><!-- /control panels -->

                <!-- toolbar -->
                <div class="btn-group" id="mapTools" role="create map" aria-label="map builder toolbar">
                    <button type="button" class="btn" data-panel="0" data-as="dropPin" aria-label="drop new pin">
                        <span class="icon-location"></span>
                    </button>
                    <button type="button" class="btn" data-panel="1" data-as="drawPoly" aria-label="draw new polygon">
                        <span class="icon-map"></span>
                    </button>
                    <button type="button" class="btn" data-panel="3" data-as="embedView" aria-label="get code">
                        <span class="icon-eye"></span>
                    </button>
                    <button type="button" class="btn" data-panel="4" aria-label="get code">
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
                            <h3><strong>Step 1:</strong> Create new Google developer project</h3>
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
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

        <!-- embedable code -->
        <textarea id="embed-code" style="display:none;">
            // global variables
            var gm = 
                bounds = null,
                pins = [],
                polygons = [],
                infoWindows = {},
                pinTrigger = 
                polyTrigger = false;

            // init map on script load
            function init(){

                // init the google map
                gm = new google.maps.Map( 
                    // map element
                    document.getElementById("map-canvas"),
                    // map options, default silicon valley
                    { center: {lat: 37.65120864327176, lng: -122.091064453125}, zoom: 9 }
                );

                // init the bounds object
                bounds = new google.maps.LatLngBounds();

                // init the info windows
                initWins();

                // init the pins
                initPins();

                // init the polygons
                initPolys();
            }

            // init all the pins
            function initPins(){

                // parse the json
                pinLits = JSON.parse(pinLits);

                // loop through the pin literals
                for(var i = 0; i < pinLits.length; i++){

                    // pin marker to map, push it to the 'pins' array
                    pins.push( new google.maps.Marker({
                        position: pinLits[i].position,
                        icon : pinLits[i].icon,
                        map : gm
                    }));

                    // set the i property
                    pins[i].set('i', pinLits[i].i);

                    // extend the map bounds
                    bounds.extend(pins[i].position);

                    // if this pin has a cooresponding info window
                    if(winLits.hasOwnProperty(pinLits[i].i))
                        // add the click event
                        pins[i].addListener('click', showWin);
                }

                // set the pinTrigger
                pinTrigger = true;

                // set the map bounds
                setBounds();
            }

            // init all the polygons
            function initPolys(){

                // parse the json
                polyLits = JSON.parse(polyLits);

                // loop through the polygon literals
                for(var i = 0; i < polyLits.length; i++){ console.log(polyLits[i].coords);

                    // add polygon to the map, push it to the 'polys' array
                    polygons.push( new google.maps.Polygon({
                        paths         : latLngObjs(polyLits[i].coords),
                        strokeColor   : polyLits[i].strokeColor,
                        strokeOpacity : polyLits[i].strokeOpacity,
                        strokeWeight  : 3,
                        fillColor     : polyLits[i].fillColor,
                        fillOpacity   : polyLits[i].fillOpacity,
                        map           : gm
                    }));

                    // set the i property
                    polygons[i].set('i', polyLits[i].i);

                    // if this polygon has a cooresponding info window
                    if(winLits.hasOwnProperty(polyLits[i].i))
                        // add the click event
                        polygons[i].addListener('click', showWin);
                }

                // set the pinTrigger
                polyTrigger = true;

                // set the map bounds
                setBounds();
            }

            // convert an array of LatLng literals to google maps LatLng objects
            function latLngObjs(a){

                // temp variable
                var t = null;

                // loop through the array of object literals
                for(var i = 0; i < a.length; i++){

                    // create the new LatLng Object
                    a[i] = new google.maps.LatLng(a[i]);

                    // extend the bounds
                    bounds.extend(a[i]);
                }

                // return the array
                return a;
            }

            // init the info windows
            function initWins(){

                // parse the json
                winLits = JSON.parse(winLits);

                // loop through the info window object literals
                for(var x in winLits){

                    // create google maps info window objects
                    infoWindows[x] = new google.maps.InfoWindow({
                        content : winLits[x].content,
                        position: winLits[x].position
                    });
                }
            }

            // create a LatLngBounds object to set map bounds
            function setBounds(){
                // if we are done setting all the polygons and pins
                if(pinTrigger && polyTrigger)
                    // set the map bounds
                    gm.fitBounds(bounds);
            }

            // click event display cooresponding info window
            function showWin(){
                infoWindows[this.i].open(gm, this);
            }
        </textarea>

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
                <h2 style="display:none;">lead</h2>
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
                <h2 style="display:none;">control panels</h2>

                <!-- control panels -->
                <div id="cPanels">

                    <!-- drop pin -->
                    <div class="popover popover-top drop-pin">
                        <div class="popover-arrow"></div>
                        <h3 class="popover-title">
                            <button type="button" class="close" data-panel="0" data-as="dropPin" aria-label="close drop pin control panel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <span class="icon-location"></span>Drop Pin
                            <button type="button" class="close" data-h aria-label="shrink or grow">
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
                            <button type="button" class="close" data-panel="1" data-as="drawPoly" aria-label="shrink or grow">
                                <span aria-hidden="true">&times;</span>
                            </button>
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
                                                           maxlength="4"
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
                                                           maxlength="4"
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
                                            <label>
                                                <span>more<span class="hidden-xs-down"> colors</span>:</span> 
                                                <input type="color" class="form-control" aria-label="full HTML5 color wheel" style="max-width:40px;padding:3px 7px;display:inline;" value="#5CB85C"/>
                                            </label>
                                        </div>
                                        <!-- opacity slider -->
                                        <div class="col-xs-6 col-md-12">
                                            <span class="icon-brightness-contrast" style="font-size:18px;max-width:11%;"></span>
                                            <input type="range" min="0" max="1" step="0.01" value="0.8" style="width:calc(100% - 30px);margin-left:5px;"/>
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
                            <button type="button" class="close" data-panel="4" data-as="embedCode" aria-label="shrink or grow">
                                <span aria-hidden="true">&times;</span>
                            </button>
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
                <div class="btn-group" id="mapTools" aria-label="map builder toolbar">
                    <button type="button" class="btn" data-panel="0" data-as="dropPin" aria-label="drop new pin">
                        <span class="icon-location"></span>
                    </button>
                    <button type="button" class="btn" data-panel="1" data-as="drawPoly" aria-label="draw new polygon">
                        <span class="icon-map"></span>
                    </button>
                    <button type="button" class="btn" data-panel="3" data-as="embedView" aria-label="get code">
                        <span class="icon-eye"></span>
                    </button>
                    <button type="button" class="btn" data-panel="4" data-as="embedCode" aria-label="get code">
                        <span class="icon-embed2"></span>
                    </button>
                </div><!-- /toolbar -->

            </section><!-- /map builder -->

            <!-- embed instructions -->
            <div class="container">
                <section id="how-to-install">
                    <h2>How to embed map</h2>
                    <div class="pull-tab">
                        <span class="icon-circle-up"></span>
                    </div>

                    <hr style="margin-bottom:28px;">

                    <div class="row">
                    
                        <!-- step 1 -->
                        <article class="col-xl-6">
                            <div class="row">
                                <div class="col-md-8 step step-right">
                                    <h4><strong>Step 1:</strong> Create new Google developer project</h4>
                                </div>
                                <div class="col-md-4 img-left">
                                    <div>
                                        <img src="http://localhost/routesider/resume/imgs/step_1.PNG" alt="Create new Google developer project" />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <p>
                                        Sign up for a <a href="https://developers.google.com/">Google developer account</a> if you don't alread have one. 
                                        Create a new project. 
                                        Give your new project a name, call it whatever you'd like.
                                    </p>
                                </div>
                            </div>
                        </article><!-- /step 1 -->

                        <hr class="article-divider">
                        
                        <!-- step 2 -->
                        <article class="col-xl-6">
                            <div class="row">
                                <div class="col-md-8 step">
                                    <h4><strong>Step 2:</strong> Enable maps JavaScript API</h4>
                                </div>
                                <div class="col-md-4 img-right">
                                    <div>
                                        <img src="http://localhost/routesider/resume/imgs/google_maps_javascript_api.PNG" alt="Enable the Google Maps JavaScript API" />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <p>
                                        On the <a href="https://console.developers.google.com/home/dashboard">Dashboard</a> page of the developer console, click "Enable &amp; manage APIs". 
                                        Under "Google Maps APIs" click <a href="https://console.developers.google.com/apis/api/maps_backend/overview">Google Maps JavaScript API</a>. 
                                        Click the "Enable API" button.
                                    </p>
                                </div>
                            </div>
                        </article><!-- /step 2 -->
                    
                    </div><!-- /row -->

                    <div class="row">

                        <hr class="article-divider">
                        
                        <!-- step 3 -->
                        <article class="col-xl-6">
                            <div class="row">
                                <div class="col-md-8 step step-right">
                                    <h4><strong>Step 3:</strong> Generate new API key</h4>
                                </div>
                                <div class="col-md-4 img-left">
                                    <div>
                                        <img src="http://localhost/routesider/resume/imgs/new_credentials.PNG" alt="Generate a new API key" />
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <p>
                                        On the <a href="https://console.developers.google.com/apis/credentials">Credentials</a> page click the 'new credentials' button. 
                                        In the dropdown menu, select the first option, "API key". 
                                        In the popup modal, select "browser key". 
                                        In the 'Create browser API key" panel enter your domain name as an accepted HTTP referrer. This prevents other people from using your API key. You can also enter "http://localhost/*" or leave it blank.
                                    </p>
                                </div>
                            </div><!-- /row -->
                        </article><!-- /step 3 -->
                        
                        <hr class="article-divider">

                        <!-- step 4 -->
                        <article class="col-xl-6">
                            <div class="row">
                                <div class="col-md-8 step">
                                    <h4><strong>Step 4:</strong> Copy and paste</h4>
                                </div>
                                <div class="col-md-4 img-right">
                                    <div>
                                        <img src="http://localhost/routesider/resume/imgs/your_api_key_here.PNG" alt="placeholder">
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <p>
                                        Once you're finished building your custom map on Routesider, click the embed code button <button type="button" class="btn" style="background-color:#dedede;padding:0 10px;padding-top:3px;"><span class="icon-embed2" style="color:#5CB85C;"></span></button>. 
                                        Copy the embedable code &amp; paste it into your web page. The map is propogated in the #map-canvas element. The JavaScript can go anywhere. 
                                        Add your API key to the bottom-most script tag. 
                                        Now you're good to go! Enjoy your custom embeded map. Adjust the JavaScript as you see fit.
                                    </p>
                                </div>
                            </div><!-- /row -->
                        </article><!-- /step 4 -->

                    </div><!-- /row -->

                </section><!-- /how-to-install -->
            </div><!-- /container -->

            <!-- my resume -->
            <section class="container">
                <h2 style="display:none;">michael giannini</h2>
                <div class="card">
                    <div class="card-header"></div>
                    <div class="card-block">
                        <!-- mug shot -->
                        <img src="http://localhost/routesider/resume/imgs/mug.jpg" alt="michael giannini silicon valley javascript web developer" >
                        <!-- name -->
                        <h4 class="card-title">MICHAEL GIANNINI</h4>
                        <h6>programmer&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;entrepreneur&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;philosopher</h6>
                        <hr>
                        <!-- about me -->
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <!-- nav tabs -->
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Skills</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Experience</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Education</a>
                            </li>
                        </ul>
                        <!-- nav content -->
                        <div class="resume-content">
                            <!-- skills -->
                            <div>
                                <!-- title -->
                                <h4><span class="icon-equalizer"></span> Skills</h4>
                                <!-- list -->
                                <ul>
                                    <li>Full stack web developer, HTML5, SCSS, JavaScript, PHP, MySQL, Neo4j</li>
                                    <li>JavaScript consultant, highly proficient in object-oriented software pattern design</li>
                                    <li>Neo4j developer, highly proficient in graph database management, implementation, and data science</li>
                                    <li>API developer, extensive experience with social media logins (Facebook, Instagram, Tumblr, Twitter, LinkedIn, Google+, Google Maps, etc.), RESTful communication &amp; JSON</li>
                                    <li>Deep understanding of financial markets &amp; products, macroeconomics, forecasting,  analytical research</li>
                                </ul>
                            </div>
                            <!-- experience -->
                            <div style="display:none;">
                                <!-- title -->
                                <h4><span class="icon-keyboard"></span> Experience</h4>
                                <!-- routesider -->
                                <article>
                                    <span>April 2015 &#8212; present</span>
                                    <h5>Founder, Routesider.com [startup]</h5>
                                    <h6>San Francisco, CA</h6>
                                    <ul>
                                        <li>Developing e-commerce platform for products, producers, distributors, and retailers; fusion of an inventory management system &amp; social network</li>
                                        <li>Features include extensive Google Maps API integration, interaction with social media, asynchronous file uploads, responsive design, unique application of touch gestures, content management system, etc.</li>
                                    </ul>
                                </article>
                            </div>
                            <!-- education -->
                            <div style="display:none;">
                                <!-- title -->
                                <h4><span class="icon-books"></span> Education</h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-muted container">
                        <div class="row">
                            <!-- linked in -->
                            <div class="col-xs-3">
                                <a href="#"><span class="icon-linkedin"></span></a>
                            </div>
                            <!-- tumblr -->
                            <div class="col-xs-3">
                                <a href="#"><span class="icon-tumblr2"></span></a>
                            </div>
                            <!-- email -->
                            <div class="col-xs-3">
                                <a href="#"><span class="icon-envelop"></span></a>
                            </div>
                            <!-- phone -->
                            <div class="col-xs-3">
                                <a href="#"><span class="icon-mobile"></span></a>
                            </div>
                        </div><!-- /row -->
                    </div><!-- /card-footer container -->
                </div><!-- /card -->
            </section>   

            <?php include '../components/footer.php'; ?>

        </div>
                
        <script src="resume.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;libraries=places,drawing&amp;callback=mm.initMap"></script>
    </body>
</html>
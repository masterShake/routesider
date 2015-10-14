<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    $fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

    if ($fn) {

        $user = new User();

        //-------------------------------------------
        // - getfile information
        // - $ff[0] = random number
        // - $ff[1] = file extension
        // - $ff[2] = heroSwiperObject
        $ff = explode(".", $fn);

        $uFolder = $_SERVER["DOCUMENT_ROOT"]."/routesider/uploads/";

        // AJAX call
        file_put_contents(
            $uFolder . $ff[0].'.'.$ff[1],
            file_get_contents('php://input')
        );

        //-------------------------------------------
        // - create a unique name for the file
        // - e.g. "username_123.jpg";
        $newName = rand(0, 1000);
        $newName = $user->data("username") . "_" . $newName . "." . $ff[1]; 

        // change the name of the file to ensure it is unique
        rename( $uFolder . $ff[0].'.'.$ff[1], $uFolder . $newName ); //change this
    
        $json = [ "filename" => $newName];

        $json = json_encode($json);

        exit( $json );
    }

    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

    	// do something

    }

    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $page = "edit_jumbotron";

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
        <title>Edit Jumbotron</title>

        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- page styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/icomoon.css" rel="stylesheet">
        <link href="css/on_off_switch.css" rel="stylesheet">
        <link href="css/edit_jumbotron.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <!-- initial values -->
        <input type="hidden" id="i-vals" value="[]">

        <!-- page content -->
        <div id="page-content">

            <!-- navbar -->
            <?php include "components/navbar.php"; ?>

            <!-- title header -->
            <div class="container">

                <!-- on/off switch -->
                <div style="float:right;text-align:center;width:100px;padding-left:10px;">
                    <h4 style="margin-top:20px;">visible in profile</h4>
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-jumbo" />
                        <label class="onoffswitch-label" for="myonoffswitch-jumbo">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>

                <!-- title -->
                <h1>Edit Jumbotron</h1>
            </div><!-- /title header -->

            <hr style="margin-bottom:12px;">

            <!-- canvases & control panels container -->
            <div class="container">

                <!-- canvas title -->
                <h3 id="canvas-title">Preview:</h3>

                <!-- jumbo-canvas -->
                <div id="jumbo-canvas">

                    <!-- background image layer -->
                    <div id="bg-canvas"></div>

                    <!-- text layer -->
                    <div id="text-canvas"></div>

                    <!-- images layer -->
                    <div id="img-canvas"></div>

                    <!-- buttons layer -->
                    <div id="btn-canvas"></div> 
                </div>

                <!-- properties toolbars & c panels -->
                <div>

                    <!-- background -->
                    <div class="props" id="bg-props">
                        <hr>
                        <!-- title -->
                        <div class="opts-title">
                            <div class="dash-box" aria-hidden="true">
                                <span class="icon-image" aria-hidden="true"></span>
                            </div>
                            <h5><b>Background options:</b></h5>
                        </div>

                        <!-- background image control panel -->
                        <div class="popover top control-panel" id="bg-image-cpanel">
                            <div class="popover-title"> 
                                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <div class="dash-box" style="padding: 0px 3px 1px;max-height: 18px;" aria-hidden="true">
                                    <span class="icon-image" aria-hidden="true"></span>
                                </div>
                                <div><b>Background</b></div>
                                <div class="glyphicon glyphicon-chevron-right"></div>
                                <div class="icon-image" style="font-size:18px;margin-right:5px;"></div>
                                <div><b>Image</b></div>
                            </div>
                            <div class="popover-content">
                                <!-- background image blur -->
                                <div class="half-slider" style="padding-left:10px;float:right;">
                                    <label for="bg-blur">
                                        <span class="glyphicon glyphicon-eye-open"></span>
                                        blur
                                    </label>
                                    <input type="text" class="form-control"  id="bg-blur" value="0">
                                    <input type="range" class="range-slider" min="0" max="1" step="0.01" value="0">
                                </div>
                                <!-- background image opacity -->
                                <div class="half-slider" style="border-right: 1px solid #ccc; padding-right: 10px;">
                                    <label for="bg-opacity">
                                        <span class="glyphicon glyphicon-adjust" aria-hidden="true"></span>
                                        opacity
                                    </label>
                                    <div>
                                        <input type="text" class="form-control"  id="bg-opacity" value="1">
                                        <input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                                    </div>
                                </div>
                            </div>
                            <div class="arrow" style="left:29px"></div>
                        </div><!-- /background image control panel -->

                        <!-- background color control panel -->

                        <!-- toolbar -->
                        <div class="btn-group btn-group-lg opts-toolbar" role="group" aria-label="edit background toolbar">
                            <!-- edit background image -->
                            <button type="button" class="btn btn-default" aria-label="edit background image">
                                <span class="icon-image"></span>
                            </button><!-- /edit background image -->
                            
                            <!-- crop background image -->
                            <button class="btn btn-default" aria-label="crop image">
                                <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
                            </button>
                            
                            <!-- edit background color -->
                            <div class="btn btn-default" aria-label="edit background color">
                                <!-- color wheel icon -->
                                <div class="colorwheel-icon">
                                    <div>
                                        <div style="background-color:#93F;margin-left:9px;"></div>
                                    </div>
                                    <div style="margin-top:-1px;">
                                        <div style="background-color:#F00;margin-left:-13px;"></div>
                                        <div style="background-color:#00F;margin-left:1px;margin-top:-1px;"></div>
                                    </div>
                                    <div style="margin-top:2px;">
                                        <div style="background-color:#F93;margin-left:2px;"></div>
                                        <div style="background-color:#0F0;margin-left:8px;"></div>
                                    </div>
                                    <div>
                                        <div style="background-color:#FF0;margin-left:9px;margin-top:-1px;"></div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- /toolbar -->

                    </div><!-- /background options -->

                    <!-- text -->
                    <div class="props" id="text-props"></div>

                    <!-- images -->
                    <div class="props" id="img-props"></div>

                    <!-- buttons -->
                    <div class="props" id="btn-props"></div>
                </div>

            </div>

            <!-- jumbo toolbar -->
            <div id="jumbo-toolbar" class="container">

                <!-- device layout dropdown -->
                <div class="dropup" id="layout-view">
                    <div aria-haspopup="true" aria-expanded="true">
                        <div class="icon-mobile" style="font-size:30px;float:left;margin-top:8px;" aria-hidden="true"></div>
                        <div style="padding-top:12px;float:right;">
                            <span class="hidden-xs">mobile</span>
                            <span class="caret"></span>
                        </div>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="layout-view">
                        <li class="dropdown-header">Layout View</li>
                        <li role="separator" class="divider"></li>
                        <li class="list-group-item">
                            <a href="#">
                                <span class="icon-mobile"></span>&nbsp;&nbsp;mobile
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="#">
                                <span class="icon-mobile2"></span>&nbsp;&nbsp;tablet
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" style="border-bottom: 0px;">
                                <span class="icon-laptop"></span>&nbsp;&nbsp;PC
                            </a>
                        </li>
                    </ul>
                </div><!-- /device layout dropdown -->
                
                <!-- components toolbar -->
                <div class="btn-group btn-group-lg" role="group" aria-label="components toolbar">
                    <!-- edit background -->
                    <button type="button" class="btn btn-default" aria-label="edit background">
                        <div class="dash-box" style="padding:3px 4px 1px;" aria-hidden="true">
                            <span class="icon-image" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <!-- add textbox -->
                    <button type="button" class="btn btn-default" aria-label="add textbox">
                        <div class="dash-box" aria-hidden="true">Aa</div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                    <!-- add image overlay -->
                    <button type="button" class="btn btn-default" aria-label="add image overlay">
                        <div class="icon-images" style="font-size:22px;float:left;margin: 2px 5px 0 0;" aria-hidden="true"></div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                    <!-- add button -->
                    <button type="button" class="btn btn-default" aria-label="add button">
                        <div class="dash-box" style="outline: 0px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                            <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </div><!-- /components toolbar -->
            </div><!-- /jumbo-toolbar -->

            <!-- save button -->
            <div class="container">
                <div class="well" id="save-btm">
                    <button type="button" class="btn btn-default">Save</button>
                    <span class="glyphicon glyphicon-arrow-left" style="padding: 0 10px;"></span>
                    click to save changes
                </div>
            </div>

            <!-- footer -->
            <?= include "components/footer.php"; ?>

        </div><!-- end page content -->

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <!-- <script src="js/edit_jumbotron.js"></script> -->

    </body>
</html>











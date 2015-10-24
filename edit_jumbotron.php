<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    // include "scripts/jumbo_img_upload.php";


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
        <input type="hidden" id="i-vals" value='<?= $profile->jumboJSON(); ?>'>

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

            <!-- save alert -->
            <div class="container" style="padding-left:0px;padding-right:0px">
                <div class="alert alert-info alert-dismissible" id="save1" style="display:none;margin:0 15px 10px;" role="alert">
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <button type="button" class="btn btn-default">Save</button>
                    <span class="glyphicon glyphicon-arrow-left" style="padding: 0 10px;"></span>
                    click to save changes
                </div>
            </div>

            <!-- canvases & control panels container -->
            <div class="container">

                <!-- canvas title -->
                <h3 id="canvas-title">Preview:</h3>

                <!-- jumbo-canvas -->
                <div id="jumbo-canvas">

                    <!-- preview layer -->
                    <div class="j-canvas" id="prev-canvas" style="display:block;"></div>

                    <!-- background image canvas layers -->
                    <?php include "components/edit_jumbo/bg_canvas_layers.php"; ?>

                    <!-- text layer -->
                    <div id="text-canvas"></div>

                    <!-- images layer -->
                    <div id="img-canvas"></div>

                    <!-- buttons layer -->
                    <div id="btns-canvas"></div> 
                </div>

                <!-- properties toolbars & c panels -->
                <div id="props">

                    <!-- background -->
                    <?php include "components/edit_jumbo/bg_control_panels.php"; ?>

                    <!-- text -->
                    <div id="text-props"></div>

                    <!-- images -->
                    <div id="img-props"></div>

                    <!-- buttons -->
                    <div id="btns-props"></div>
                </div>
            </div><!-- /canvasses & control panels .container -->

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
                <div class="btn-group btn-group-lg tb" role="group" aria-label="components toolbar">
                    <!-- edit background -->
                    <div type="button" 
                         class="btn btn-default"
                         data-propopts="bg" 
                         aria-label="edit background">
                        <div class="dash-box" style="padding:3px 4px 1px;" aria-hidden="true">
                            <span class="icon-image" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </div>
                    <!-- add textbox -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-propopts="text" 
                         aria-label="add textbox">
                        <div class="dash-box" aria-hidden="true">Aa</div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add image overlay -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-propopts="img" 
                         aria-label="add image overlay">
                        <div class="icon-images" style="font-size:22px;float:left;margin: 2px 5px 0 0;" aria-hidden="true"></div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add button -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-propopts="btns" 
                         aria-label="add button">
                        <div class="dash-box" style="outline: 0px;border-radius: 6px;background-color: #eee;border: 1px solid;padding: 2px 4px 0px;">
                            <span class="glyphicon glyphicon-link" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                </div><!-- /components toolbar -->
            </div><!-- /jumbo-toolbar -->

            <!-- save button -->
            <div class="container">
                <div class="well" id="save2">
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
        <script src="js/edit_jumbotron.js"></script>

    </body>
</html>











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
        <link href="css/swiper.min.css" rel="stylesheet">
        <link href="css/edit_jumbotron.css" rel="stylesheet">

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

            <!-- jumbotron canvas -->
            <div id="jumbo-canvas" class="container">

                <!-- dismissable page title -->

                <!-- edit background -->
                <div id="edit-background">
                    
                    <!-- upload old fashioned -->
                    <div class="traditional-upload">
                        <label for="banner-fileselect">Files to upload:</label>
                        <input type="file" 
                               id="background-fileselect" 
                               name="fileselect[]" 
                               multiple="multiple" />
                    </div>

                    <!-- drag and drop text -->
                    <div>
                        <p style="margin-top:20px;margin-bottom:0px;">-or-</p>
                        <h4 style="margin-top:4px;">Drag &amp; Drop</h4>
                    </div>
                    
                    <div class="icon-image"></div>

                    <!-- edit background toolbar -->
                    <div id="edit-background-toolbar" style="text-align:left;">
                        <!-- display background image -->
                        <div class="toggle-display">
                            <input type="checkbox" class="form-control" checked>
                            <label for="display-bg" class="glyphicon glyphicon-eye-open"></label>
                        </div>
                        <!-- toolbar btns -->
                        <div class="btn-group btn-group-lg" role="group" aria-label="edit background toolbar">
                            <button type="button" class="btn btn-default" aria-label="crop image">
                                <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-default" aria-label="change background color">
                                <div class="colorwheel-icon">
                                    <div>
                                        <div style="background-color:#93F;"></div>
                                    </div>
                                    <div>
                                        <div style="background-color:#F00;"></div>
                                        <div style="background-color:#00F;"></div>
                                    </div>
                                    <div>
                                        <div style="background-color:#0F0;"></div>
                                        <div style="background-color:#F93;"></div>
                                    </div>
                                    <div>
                                        <div style="background-color:#FF0;"></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                </div><!-- /edit-background -->

            </div><!-- /container -->

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
                <div class="btn-toolbar" role="toolbar" aria-label="...">

                    <!-- edit background -->
                    <div class="btn-group btn-group-lg" role="group" aria-label="edit background">
                        <button type="button" class="btn btn-default active" aria-label="edit background">
                            <div class="dash-box" style="padding:3px 4px 1px;"aria-hidden="true">
                                <span class="icon-image" aria-hidden="true"></span>
                            </div>
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </button>
                    </div>

                    <!-- add components -->
                    <div class="btn-group btn-group-lg" role="group" aria-label="components toolbar">
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
                    </div><!-- /add components -->

                </div><!-- /bootstrap button group toolbar -->

            </div><!-- /jumbo-toolbar -->

            <!-- footer -->
            <?= include "components/footer.php"; ?>

        </div><!-- end page content -->

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/edit_jumbotron.js"></script>

    </body>
</html>









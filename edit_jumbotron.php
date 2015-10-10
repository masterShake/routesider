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
                <h1 style="/*max-width:50%;*/">Edit Jumbotron</h1>

            </div><!-- /title header -->

            <hr style="margin-bottom:12px;">

            <!-- save alert -->
            <div class="alert alert-info" id="save-top" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <button type="button" class="btn btn-default">Save</button>
                  <span class="glyphicon glyphicon-arrow-left"></span>
                  <strong>Click</strong> to save your changes.
            </div>

            <!-- jumbotron canvas -->
            <div id="jumbo-canvas" class="container">

                <!-- edit background -->
                <section id="edit-background">

                    <h3 style="margin-top:0px;">Background:</h3>

                    <div id="drag-drop">
                    
                        <!-- upload old fashioned -->
                        <div class="traditional-upload">
                            <label for="banner-fileselect">Files to upload:</label>
                            <input type="file" 
                                   id="background-fileselect" 
                                   name="fileselect[]" 
                                   multiple="multiple" />
                        </div>

                        <!-- drag and drop text -->
                        <div class="background-text">
                            <p style="margin-top:20px;margin-bottom:0px;">-or-</p>
                            <h4 style="margin-top:4px;">Drag &amp; Drop</h4>
                        </div>

                    </div><!-- /drag-drop -->


                    <hr style="margin-bottom:12px;">

                    <!-- options toolbar title -->
                    <div id="bg-opts-title">
                        <div class="dash-box" style="padding: 3px 3px 0px;margin-top:-2px;font-size: 12px;max-height: 18px;" aria-hidden="true">
                            <span class="icon-image" aria-hidden="true"></span>
                        </div>
                        <h5 style="margin-top:0px;"><b>Background options:</b></h5>
                    </div>

                    <!-- edit background image control panel -->
                    <div class="popover top control-panel" id="bg-image-cpanel" style="top:-182px;">
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

                            <!-- background image opacity -->
                            <div class="slide-input">
                                <label for="bg-opacity">opacity</label>
                                <span class="glyphicon glyphicon-adjust"></span>
                                <input type="text" class="form-control"  id="bg-opacity" value="1">
                                <input type="range" class="range-slider" min="0" max="1" step="0.01" value="1">
                            </div>

                            <hr>

                            <!-- background image blur -->
                            <div class="slide-input">
                                <label for="bg-blur">blur</label>
                                <span class="glyphicon glyphicon-eye-open"></span>
                                <input type="text" class="form-control"  id="bg-blur" value="0">
                                <input type="range" class="range-slider" min="0" max="1" step="0.01" value="0">
                            </div>
                        </div>
                        <div class="arrow" style="left:29px"></div>
                    </div>
                    

                    <!-- edit background options toolbar -->
                    <div class="btn-group btn-group-lg opts-toolbar" id="bg-opts-toolbar" role="group" aria-label="edit background toolbar">

                        <!-- edit background image -->
                        <div class="btn btn-default" aria-label="edit background image" data-panel="bg-image-cpanel" data-h="190">
                            <div class="icon-image"></div>
                        </div><!-- /edit background image -->
                        
                        <!-- crop background image -->
                        <div class="btn btn-default" aria-label="crop image">
                            <div class="glyphicon glyphicon-scissors" aria-hidden="true"></div>
                        </div>
                        
                        <!-- edit background color -->
                        <div class="btn btn-default" aria-label="edit background color">
                            
                            <!-- color wheel icon -->
                            <div class="colorwheel-icon">
                                <div>
                                    <div style="background-color:#93F;margin-left:9px;"></div>
                                </div>
                                <div style="margin-top:-1px;">
                                    <div style="background-color:#F00;margin-left:-13px;"></div>
                                    <div style="background-color:#00F;margin-left:8px;margin-top:-1px;"></div>
                                </div>
                                <div style="margin-top:2px;">
                                    <div style="background-color:#F93;margin-left:2px;"></div>
                                    <div style="background-color:#0F0;margin-left:8px;"></div>
                                </div>
                                <div>
                                    <div style="background-color:#FF0;margin-left:9px;margin-top:-1px;"></div>
                                </div>
                            </div>

                            <!-- edit background color popover toolbar -->
                            <div class="popover top" id="bg-color-pop">
                                <div class="arrow"></div>
                                <div class="popover-title">
                                    
                                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    
                                    <!-- color wheel icon -->
                                    <div class="colorwheel-icon" style="float:left;">
                                        <div>
                                            <div style="background-color:#93F;margin-left:9px;"></div>
                                        </div>
                                        <div style="margin-top:-1px;">
                                            <div style="background-color:#F00;margin-left:-13px;"></div>
                                            <div style="background-color:#00F;margin-left:8px;margin-top:-1px;"></div>
                                        </div>
                                        <div style="margin-top:2px;">
                                            <div style="background-color:#F93;margin-left:2px;"></div>
                                            <div style="background-color:#0F0;margin-left:8px;"></div>
                                        </div>
                                        <div>
                                            <div style="background-color:#FF0;margin-left:9px;margin-top:-1px;"></div>
                                        </div>
                                    </div><!-- /colorwheel-icon -->
                                    <b><span style="padding-left:12px;font-size:16px;">background color</span></b>
                                </div>
                                <div class="popover-content">

                                     <div style="width:135px;float:right;">

                                        <!-- hex table -->
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>hex</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- fill -->
                                                <tr>
                                                    <td>
                                                        <button type="button" 
                                                                class="btn" 
                                                                style="background-color: #FFF; color: #444;"
                                                                data-activate="fill"
                                                                aria-label="edit jumbotron background color, use color wheel to select colors">
                                                            <span class="glyphicon glyphicon-tint"></span>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <input type="text" 
                                                               value="#DFF0D8"
                                                               class="form-control" 
                                                               data-hex="#DFF0D8" 
                                                               aria-label="background color hexidecimal color value">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table><!-- /hex table -->

                                        <!-- HTML5 color picker -->
                                        <div style="text-align:center;margin-top:14px;">
                                            <label for="color-picker">more colors:</label>
                                            <input type="color" 
                                                   id="color-picker"
                                                   value="#5CB85C"
                                                   aria-label="select from complete color wheel">
                                        </div><!-- /full color wheel -->

                                    </div>

                                    <!-- color wheel -->
                                    <div class="color-wheel">
                                        <!-- 3 -->
                                        <div>
                                            <button type="button" class="btn" data-hex="#FF00FF" aria-label="Red Magenta #FF00FF"></button>
                                            <button type="button" class="btn" data-hex="#FF0000" aria-label="Red #FF0000"></button>
                                            <button type="button" class="btn" data-hex="#FF7F00" aria-label="Orange #FF7F00"></button>
                                        </div>
                                        <!-- 4 -->
                                        <div>
                                            <button type="button" class="btn" data-hex="#FF00FF" aria-label="Magenta #FF00FF"></button>
                                            <button type="button" class="btn" data-hex="#FF99CC" aria-label="Lilac #FF99CC"></button>
                                            <button type="button" class="btn" data-hex="#FFCC99" aria-label="Apricot #FFCC99"></button>
                                            <button type="button" class="btn" data-hex="#FFFF00" aria-label="Yellow #FFFF00"></button>
                                        </div>
                                        <!-- 5 -->
                                        <div>
                                            <button type="button" class="btn" data-hex="#7F00FF" aria-label="Blue Magenta #7F00FF"></button>
                                            <button type="button" class="btn" data-hex="#CC99FF" aria-label="Lavendar #CC99FF"></button>
                                            <button type="button" class="btn" data-hex="#FFFFFF" aria-label="White #FFFFFF"></button>
                                            <button type="button" class="btn" data-hex="#CCFF99" aria-label="Celadon #CCFF99"></button>
                                            <button type="button" class="btn" data-hex="#7FFF00" aria-label="Green Yellow #7FFF00"></button>
                                        </div>
                                        <!-- 4 -->
                                        <div>
                                            <button type="button" class="btn" data-hex="#0000FF" aria-label="Blue #0000FF"></button>
                                            <button type="button" class="btn" data-hex="#99CCFF" aria-label="Cornflower Blue #99CCFF"></button>
                                            <button type="button" class="btn" data-hex="#99FFCC" aria-label="Sea Foam Green #99FFCC"></button>
                                            <button type="button" class="btn" data-hex="#00FF00" aria-label="Green #00FF00"></button>
                                        </div>
                                        <!-- 3 -->
                                        <div>
                                            <button type="button" class="btn" data-hex="#007FFF" aria-label="Blue Cyan #007FFF"></button>
                                            <button type="button" class="btn" data-hex="#00FFFF" aria-label="Cyan #00FFFF"></button>
                                            <button type="button" class="btn" data-hex="#00FF7F" aria-label="Green Cyan #00FF7F"></button>
                                        </div>
                                    </div><!-- /hexigon color wheel -->

                                </div>
                            </div>
                        </div><!-- /edit background color -->

                    </div><!-- /toolbar btns -->

                </section><!-- /edit-background -->

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
                <div class="btn-group btn-group-lg" role="group" aria-label="components toolbar">
                    <!-- edit background -->
                    <button type="button" class="btn btn-default active" aria-label="edit background">
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
        <script src="js/swiper.min.js"></script>
        <script src="js/edit_jumbotron.js"></script>

    </body>
</html>









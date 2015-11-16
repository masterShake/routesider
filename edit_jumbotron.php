<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    include "scripts/jumbo_img_upload.php";


    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

        // save changes
    	if(isset($_POST["json"])){

            // decode the json
            $jumbo = json_decode($_POST["json"]);

            // if the user added a new background image
            if(substr($jumbo->bg_img, 0, 6) == "upload"){
                // remove the "uploads/" prefix
                $jumbo->bg_img = substr($jumbo->bg_img, 8);
                // isolate the server root
                $uRoot = $_SERVER["DOCUMENT_ROOT"]."/routesider/";
                // move the file by renaming it
                rename($uRoot . "uploads/" . $jumbo->bg_img, $uRoot . "img/business/" . $jumbo->bg_img);
            }

            // get the user's business
            $user = new User();

            $business = $user->business()[0];

            $cypher = 
            "MATCH (b:Business) WHERE b.id = " . $business->data("id") . " " .
            "MATCH (b)-[:HAS_PROFILE]->(p)-[q:HAS_JUMBO]->(j) " .
            "SET q.active={$jumbo->active}, " .
            "j.bg_color='{$jumbo->bg_color}', ".
            "j.opacity={$jumbo->opacity}, ".
            "j.blur={$jumbo->blur}, ".
            "j.bg_img='{$jumbo->bg_img}', ".
            "j.bg_dims={$jumbo->bg_dims}";

            $db = neoDB::getInstance();

            $db->q($cypher);

            exit("1");
        }
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

    $jumbo = $profile->jumbo();

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

        <!-- php dynamic styles (must be last style sheet) -->
        <style>

            /* rule 0 - background image */
            <?php if($jumbo["bg_img"]){ ?>
                #cropCanvas>div{
                    width: <?= (400 * $jumbo["bg_dims"]); ?>px;
                }
            <?php } ?>

        </style>

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <!-- initial values -->
        <input type="hidden" id="i-vals" value='<?= json_encode($jumbo); ?>'>

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
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="onoff" <?= ($jumbo["active"]) ? "checked" : ""; ?>/>
                        <label class="onoffswitch-label" for="onoff">
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
                <div class="alert alert-info" id="save1" style="display:none;margin:0 15px 10px;" role="alert">
                    <button type="button" class="close" style="display:none;" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                    <div class="j-canvas" id="prevCanvas" style='background-color:<?= $jumbo["bg_color"]; ?>;'></div>

                    <!-- background image & crop layer -->
                    <div class="j-canvas" id="cropCanvas">
                        <div style='<?= ($jumbo["bg_img"]) ? "background-image:url(\"img/business/".$jumbo["bg_img"]."\");" : ""; ?>'>
                            <!-- dragable crop buttons -->
                            <div id="cropDrag">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                    <!-- image upload layer -->
                    <div class="j-canvas" id="bgCanvas">

                        <!-- upload image the old fashioned way -->
                        <div class="upload-oldfash" <?= ($jumbo["bg_img"]) ? "style='opacity:0.7'" : ""; ?>>
                            <label>Files to upload:</label>
                            <input type="file" 
                                   name="fileselect[]" 
                                   multiple="multiple" />
                        </div>

                        <!-- text -->
                        <div style="position:relative;font-size:12px;left:calc(50% - 18px);max-width:32px;text-shadow: 0px 0px 4px #FFF;">&#45; or &#45;</div>
                        Drag &amp; Drop
                    </div>

                    <!-- add & edit text, images, & btns layer -->
                    <div class="j-canvas" id="dragCanvas"></div>

                </div>

                <!-- properties toolbars & c panels -->
                <div id="props">

                    <!-- background -->
                    <?php include "components/edit_jumbo/bg_control_panels.php"; ?>

                    <!-- text -->
                    <?php include "components/edit_jumbo/text_control_panels.php"; ?>

                    <!-- images -->
                    <?php include "components/edit_jumbo/img_control_panels.php"; ?>

                    <!-- buttons -->
                    <?php include "components/edit_jumbo/btns_control_panels.php"; ?>

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
                         data-comp="bg" 
                         aria-label="edit background">
                        <div class="dash-box" style="padding:3px 4px 1px;" aria-hidden="true">
                            <span class="icon-image" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </div>
                    <!-- add textbox -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-comp="text" 
                         aria-label="add textbox">
                        <div class="dash-box" aria-hidden="true">Aa</div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add image overlay -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-comp="img" 
                         aria-label="add image overlay">
                        <div class="icon-images" style="font-size:22px;float:left;margin: 2px 5px 0 0;" aria-hidden="true"></div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add button -->
                    <div type="button" 
                         class="btn btn-default" 
                         data-comp="btns" 
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











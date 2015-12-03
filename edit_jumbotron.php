<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    include "scripts/edit_jumbotron/img_upload.php";


    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    include "scripts/edit_jumbotron/save.php";

    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $user = new User();

    $business = $user->business()[0];

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
        <link href="css/color_wheel.css" rel="stylesheet">
        <link href="css/drag_btns.css" rel="stylesheet">
        <link href="css/edit_jumbotron.css" rel="stylesheet">

        <!-- php dynamic styles (must be last style sheet) -->
        <style>

            /* rule 0 - bg image container */
            #cropCanvas>div{
                width: <?= ($jumbo["layouts"]["mobile"]["w"]) ? ($jumbo["layouts"]["mobile"]["w"]*100)."%" : "100%"; ?>;
                position: relative;
                left: <?= $jumbo["layouts"]["mobile"]["x"]; ?>px;
                top: <?= $jumbo["layouts"]["mobile"]["y"]; ?>px;
            }

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

                <!-- jumboCanvas -->
                <!-- class = "mobile" || "tablet" || "laptop" -->
                <div id="jumboCanvas">

                    <!-- layout div -->
                    <div>

                        <!-- background image & crop layer -->
                        <div class="j-canvas" id="cropCanvas" style='background-color:<?= $jumbo["color"]; ?>;'>
                            <div>
                                <!-- dragable crop buttons -->
                                <div class="drag-btns" style="display:none;">

                                    <!-- reposition drag elem -->
                                    <div>
                                        <div style="top:calc(50% - 10px);left:calc(50% - 10px);">
                                            <div class="vert" style="left:4px"></div>
                                            <div class="horiz" style="top:-6px;"></div>
                                        </div>
                                    </div>

                                    <!-- data-de = directional event -->
                                    <!-- data-dx = directional constant x -->
                                    <!-- data-dy = directional constant y -->
                                    <!-- data-fx = functional constant x -->
                                    <!-- data-fy = functional constant y -->

                                    <!-- top left --> 
                                    <div data-de="d" data-dx="1" data-dy="1" data-fx="1" data-fy="1">
                                        <div class="horiz"></div>
                                        <div class="vert"></div>
                                    </div>
                                    <!-- top center -->
                                    <div data-de="v" data-dy="1" data-fx="0.5" data-fy="1">
                                        <div class="horiz"></div>
                                        <div class="vert"></div>
                                    </div>
                                    <!-- top right -->
                                    <div data-de="d" data-dx="-1" data-dy="1" data-fx="0" data-fy="1">
                                        <div class="horiz"></div>
                                        <div class="vert"></div>
                                    </div>
                                    <!-- center left -->
                                    <div data-de="h" data-dx="1" data-fx="1" data-fy="0.5">
                                        <div class="vert"></div>
                                        <div class="horiz"></div>
                                    </div>
                                    <!-- center right -->
                                    <div data-de="h" data-dx="-1" data-fx="-1" data-fy="0.5">
                                        <div class="vert"></div>
                                        <div class="horiz"></div>
                                    </div>
                                    <!-- bottom left -->
                                    <div data-de="d" data-dx="1" data-dy="-1" data-fx="1" data-fy="0">
                                        <div class="vert"></div>
                                        <div class="horiz"></div>
                                    </div>
                                    <!-- bottom center -->
                                    <div data-de="v" data-dy="-1" data-fx="0.5" data-fy="0">
                                        <div class="vert"></div>
                                        <div class="horiz"></div>
                                    </div>
                                    <!-- bottom right -->
                                    <div data-de="d" data-dx="-1" data-dy="-1" data-fx="0" data-fy="0">
                                        <div class="vert"></div>
                                        <div class="horiz"></div>
                                    </div>
                                </div>
                                <!-- background image -->
                                <?php if($jumbo["image"]){ ?>

                                    <img src='img/business/<?= $jumbo["image"]; ?>' alt="" id="bgImg" style='opacity:<?= $jumbo["opacity"]; ?>;-webkit-filter: blur(<?= $jumbo["blur"]; ?>px);filter: blur(<?= $jumbo["blur"]; ?>px);' />

                                <?php }else{ ?>

                                    <div class="bg-placeholder">
                                        <span class="icon-image"></span>
                                    </div>

                                <?php } ?>
                            </div>
                        </div><!-- /cropCanvas -->

                        <!-- image upload layer -->
                        <div class="j-canvas" id="bgCanvas">

                            <!-- upload image the old fashioned way -->
                            <div class="upload-oldfash" <?= ($jumbo["image"]) ? "style='opacity:0.7'" : ""; ?>>
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

                    </div><!-- /layout div -->

                </div><!-- /jumboCanvas -->

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
                <div class="dropup" id="layoutView">
                    <div aria-haspopup="true" aria-expanded="true" role="button">
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
                            <!-- data-layout = jumboCanvas classname -->
                            <!-- data-h = canvas height -->
                            <a href="#" data-layout="mobile" data-h="1.78">
                                <span class="icon-mobile"></span>&nbsp;&nbsp;mobile
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" this-layout="tablet" data-h="1.33">
                                <span class="icon-mobile2"></span>&nbsp;&nbsp;tablet
                            </a>
                        </li>
                        <li class="list-group-item">
                            <a href="#" this-layout="desktop" data-h="0.63" style="border-bottom: 0px;">
                                <span class="icon-laptop"></span>&nbsp;&nbsp;PC
                            </a>
                        </li>
                    </ul>
                </div><!-- /device layout dropdown -->
                
                <!-- components toolbar -->
                <div class="btn-group btn-group-lg tb" role="group" aria-label="components toolbar">
                    <!-- edit background -->
                    <div role="button"
                         class="btn btn-default"
                         data-comp="bg" 
                         aria-label="edit background">
                        <div class="dash-box" style="padding:3px 4px 1px;" aria-hidden="true">
                            <span class="icon-image" aria-hidden="true"></span>
                        </div>
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </div>
                    <!-- add textbox -->
                    <div role="button"
                         class="btn btn-default" 
                         data-comp="text" 
                         aria-label="add textbox">
                        <div class="dash-box" aria-hidden="true">Aa</div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add image overlay -->
                    <div role="button"
                         class="btn btn-default" 
                         data-comp="img" 
                         aria-label="add image overlay">
                        <div class="icon-images" style="font-size:22px;float:left;margin: 2px 5px 0 0;" aria-hidden="true"></div>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </div>
                    <!-- add button -->
                    <div class="btn btn-default" 
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

        <!-- confirmation modal -->
        <div class="modal fade" id="confModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" style="float:left;" data-dismiss="modal">cancel</button>
                        <button type="button" class="btn btn-default btn-danger">
                            <span class="glyphicon glyphicon-trash" style="margin-right:5px;"></span> delete
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- /confirmation modal -->

        <!-- modal backdrop -->
        <div class="modal-backdrop fade" id="confBD" style="display:none;"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/hammer.min.js"></script>
        <script src="js/rrr.js"></script>
        <script src="js/edit_jumbotron/edit_jumbotron.js"></script>
        <script src="js/edit_jumbotron/bg.js"></script>
        <script src="js/edit_jumbotron/tb.js"></script>
        <script src="js/edit_jumbotron/io.js"></script>
        <script src="js/edit_jumbotron/btn.js"></script>

    </body>
</html>











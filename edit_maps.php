<?php

/*----------------------------------------------

                  edit maps

----------------------------------------------*/



//---------------------------
// STEP 1: load the init file
//---------------------------

require_once 'core/init.php';


//-------------------------------------
// STEP 2: instantiate global variables
//-------------------------------------

$page = "edit_maps"; //required

$errors = []; //required

$user;


//-------------------------------
// STEP 3: handle GET/POST params
//-------------------------------

if(Input::exists()){

    // do something

}



//-------------------------------------
// instantiate more global variables
//-------------------------------------

$user = new User();

$business = $user->business()[0];

$profile = $business->profile();

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>Routesider</title>

        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- Routesider styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/<?= $page; ?>.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <!-- business avatar -->
        <input type="hidden" value='<?= $profile->data("avatar"); ?>' id="business-avatar"> 

        <!-- page content -->
        <div id="page-content">

            <!-- navbar -->
            <?php include "components/navbar.php"; ?>

            <!-- components toolbar -->
            <div class="container">
                <div id="components-toolbar" class="btn-group" role="group" aria-label="formatting toolbar">
                    
                    <!-- view/edit pins -->
                    <button type="button" class="btn" aria-label="view/edit pins">
                        <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                        <span class="glyphicon glyphicon-pencil"></span>
                    </button>

                    <!-- view/edit polygons -->
                    <button type="button" class="btn" aria-label="view/edit polygons">
                        <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                        <span class="glyphicon glyphicon-pencil"></span>
                    </button>

                    <!-- page title -->
                    <button type="button" class="btn" id="page-title" aria-label="page title, no action">
                        <h4>Edit Maps</h4>
                    </button>

                    <!-- drop new pin -->
                    <button type="button" class="btn" aria-label="drop new pin">
                        <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>

                    <!-- draw new polygon -->
                    <button type="button" class="btn" aria-label="draw new polygon">
                        <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>

                </div>
            </div>

            <!-- map key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis -->
            <div id="map-canvas"></div>

            <!-- bottom formatting toolbar -->
            <div class="container" style="position: absolute; bottom: 10px; z-index: 1;"> 
                
                <!-- toggle tab -->
                <ul class="nav nav-tabs" id="toggle-toolbar" role="toggle toolbar">
                    <li role="presentation">
                        <a href="#">
                            <div>
                                <div class="glyphicon glyphicon-chevron-up"></div>
                                <div class="glyphicon glyphicon-chevron-up"></div>
                            </div>
                        </a>
                    </li>
                </ul>
                

                <div id="bottom-toolbar">

                    <!-- search user maps -->
                    <div class="input-group">
                        <input type="text" 
                               class="form-control" 
                               id="search-maps-field" 
                               placeholder="search <?= $business->data("name"); ?> maps" 
                               aria-describedby="search-button">
                        <span class="input-group-addon" id="search-maps-button">
                            <span class="glyphicon glyphicon-search"></span>
                        </span>
                    </div><!-- /search user maps -->

                    <!-- drop new pin -->
                    <div id="drop-new-pin-toolbar" class="formatting-toolbar">
                        <button type="button" class="close" aria-label="Close new pin toolbar"><span aria-hidden="true">&times;</span></button>
                        <div class="toolbar-instructions">
                            <span>Search location or <span class="hidden-md hidden-lg">tap</span><span class="hidden-xs hidden-sm">click</span> to drop new pin</span>
                        </div>
                        <h4><span class="glyphicon glyphicon-map-marker"></span> New Pin</h4>
                    </div><!-- /drop-new-pin-toolbar -->

                    <!-- draw new polygon -->
                    <div id="draw-new-polygon-toolbar" class="formatting-toolbar">
                        <!-- toolbar header -->
                        <button type="button" class="close" aria-label="Close new polygon toolbar"><span aria-hidden="true">&times;</span></button>
                        <div class="toolbar-instructions" style="text-align: left; max-width: 60%;">
                            <ul>
                                <li><span class="hidden-md hidden-lg">Tap</span><span class="hidden-xs hidden-sm">Click</span> to add points.</li>
                                <li>Press the "complete" button to connect all the dots.</li>
                            </ul>
                        </div>
                        <h4><span class="glyphicon glyphicon-stop"></span> New Polygon</h4>
                        <!-- toolbar body -->
                        <div style="padding: 6px 0px; text-align:right;">
                            <!-- undo, redo, complete polygon -->
                            <button type="button" class="btn" id="undo" aria-label="undo">
                                <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span> undo
                            </button>
                            <button type="button" class="btn" id="redo" aria-label="undo">
                                redo <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn" id="complete-polygon" aria-label="complete the polygon">complete polygon</button>
                                        
                        </div>
                    </div><!-- /draw-new-polygon-toolbar -->

                    <!-- edit polygon toolbar -->
                    <div id="edit-polygon-toolbar" class="formatting-toolbar">
                        <!-- toolbar header -->
                        <button type="button" class="close" aria-label="Close edit polygon toolbar"><span aria-hidden="true">&times;</span></button>
                        <div class="toolbar-instructions" style="text-align: left; max-width: 60%;">
                            <ul>
                                <li>Use the color wheel  to change the  colors.</li>
                                <li>Use the opacity slider to change the transparency.</li>
                            </ul>
                        </div>
                        <h4><span class="glyphicon glyphicon-stop"></span> Edit Polygon</h4>
                        
                        <!-- toolbar body -->
                        <div style="margin-top:-6px;">

                            <!-- formatting table and opacity slider -->
                            <div style="width:55%;float:right;margin-top:4px;">

                                <!-- polygon colors table-->
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>hex</th>
                                            <th>opacity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- stroke -->
                                        <tr>
                                            <td>
                                                <button type="button" 
                                                        class="btn btn-color-selected" 
                                                        id="polygon-edit-stroke-btn" 
                                                        style="background-color: #5CB85C; color: #FFF;"
                                                        data-activate="stroke"
                                                        aria-label="edit polygon border, use color wheel to select colors">
                                                    <span class="glyphicon glyphicon-unchecked"></span>
                                                </button>
                                            </td>
                                            <td style="width:83px;">
                                                <input type="text" 
                                                       value="#5CB85C" 
                                                       class="form-control" 
                                                       id="polygon-hex-stroke-input"
                                                       data-hex="#5CB85C" 
                                                       aria-label="polygon stroke hexidecimal color value">
                                            </td>
                                            <td style="width:25px;">
                                                <input type="text"
                                                       value="0.8"
                                                       class="form-control" 
                                                       id="polygon-opacity-stroke-input"
                                                       max-length="4"
                                                       data-opacity="0.8" 
                                                       aria-label="polygon stroke opacity between 0 and 1">
                                            </td>
                                        </tr>
                                        <!-- fill -->
                                        <tr>
                                            <td>
                                                <button type="button" 
                                                        class="btn" 
                                                        id="polygon-edit-fill-btn" 
                                                        style="background-color: #FFF; color: #444;"
                                                        data-activate="fill"
                                                        aria-label="edit polygon fill, use color wheel to select colors">
                                                    <span class="glyphicon glyphicon-tint"></span>
                                                </button>
                                            </td>
                                            <td style="width:83px;">
                                                <input type="text" 
                                                       value="#DFF0D8"
                                                       class="form-control" 
                                                       id="polygon-hex-fill-input"
                                                       data-hex="#DFF0D8" 
                                                       aria-label="polygon fill hexidecimal color value">
                                            </td>
                                            <td style="width:25px;">
                                                <input type="text" 
                                                       value="0.5"
                                                       class="form-control" 
                                                       id="polygon-opacity-fill-input"
                                                       max-length="4"
                                                       data-opacity="0.5"
                                                       aria-label="polygon fill opacity between 0 and 1">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table><!-- /hex & opacity table -->

                                <!-- opacity slider -->
                                <div style="margin-top: 18px;">
                                    <label for="polygon-opacity" style="margin-bottom:0px;margin-left:14px;">
                                        <span class="glyphicon glyphicon-adjust"></span>
                                    </label>
                                    <div style="float:right;">
                                        <input id="polygon-opacity" type="range" min="0" max="1" step="0.01" value="0.8"/>
                                    </div>
                                </div>

                            </div>

                            <!-- color wheel -->
                            <div style="width:118px;">
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
                                
                                <!-- full color wheel -->
                                <div style="text-align:center;">
                                    <label for="color-picker">more colors:</label>
                                    <input type="color" 
                                           id="color-picker"
                                           value="#5CB85C"
                                           aria-label="select from complete color wheel">
                                </div><!-- /full color wheel -->

                            </div><!-- /color wheel and opacity slider -->

                            <!-- description input -->
                            <div style="margin-top: 13px;">
                                <textarea class="form-control" id="polygon-description" placeholder="polygon description"></textarea>
                            </div>

                            <!-- semi-transparent gradient overlay -->
                            <div id="semi-trans"></div>

                        </div><!-- /toolbar body -->
                    </div><!-- /edit-polygon-toolbar -->

                    <!-- save alert -->
                    <div class="alert alert-info" id="save-alert" role="alert">
                        <button type="button" class="btn btn-info" id="save-btn">save</button>
                        <span>Click <strong>save</strong> to keep your changes.</span>
                    </div><!-- /save alert -->

                </div>
            </div> 

        </div>

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- token -->
        <input type="hidden" id="token" name="token" value='<?= Token::generate(); ?>' >

        <!-- business name -->
        <input type="hidden" id="business-name" name="business-name" value='<?= $business->data("name"); ?>' >

        <!-- javascripts -->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;libraries=places,drawing&amp;callback=init"></script>
        <script src="js/main.js"></script>
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>









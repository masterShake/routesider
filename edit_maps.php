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

        <!-- page content -->
        <div id="page-content">

            <!-- navbar -->
            <nav class="navbar navbar-dark" id="navbar">
                <div class="container">
                    
                    <div class="navbar-header">
                        
                        <!-- toggle mobile menu -->
                        <button type="button" 
                                class="navbar-toggle collapsed"
                                id="navbar-toggle-menu">
                            <span class="glyphicon glyphicon-menu-hamburger"></span>
                        </button>

                        <!-- routesider logo -->
                        <a class="navbar-brand" href="#">
                            <span class="logo">
                                <span class="route">Route</span>
                                <span>sider</span>
                            </span>
                        </a>

                        <!-- search routesider -->
                        <button type="button"
                                style="float:right;"
                                class="navbar-toggle"
                                id="navbar-toggle-search">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>

                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Map <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Deals</a></li>
                            <li><a href="#">Sign Up</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    <span class="user-pic"><span class="glyphicon glyphicon-user"></span></span>
                                    <!-- <span class="visible-md visible-lg">username@email.com</span>  -->
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">username</a></li>
                                    <li><a href="#">my collectives</a></li>
                                    <li><a href="#">settings</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#">edit profile</a></li>
                                    <li><a href="#">edit products</a></li>
                                    <li><a href="#">edit deals</a></li>
                                    <li><a href="#">edit map</a></li>
                                    <li><a href="#">edit social media</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#">log out</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="navbar-form navbar-right" role="search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="products, businesses, locations, etc...">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div><!-- /input-group -->
                        </form>
                    </div><!-- /.navbar-collapse -->
                </div>
            </nav>

            <!-- components toolbar -->
            <div class="container">
                <div id="components-toolbar" class="btn-group" role="group" aria-label="formatting toolbar">
                    
                    <!-- view/edit pins -->
                    <button type="button" class="btn" aria-label="view/edit pins">
                        <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                    </button>

                    <!-- view/edit polygons -->
                    <button type="button" class="btn" aria-label="view/edit polygons">
                        <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
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
                    </div>

                    <!-- drop new pin -->
                    <div id="drop-new-pin-toolbar" class="formatting-toolbar">
                        <button type="button" class="close" aria-label="Close new pin toolbar"><span aria-hidden="true">&times;</span></button>
                        <div class="toolbar-instructions">
                            <span>Search location or <span class="hidden-md hidden-lg">tap</span><span class="hidden-xs hidden-sm">click</span> to drop new pin</span>
                        </div>
                        <h4><span class="glyphicon glyphicon-map-marker"></span> New Pin</h4>
                    </div>

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
                        <div>
                            <!-- formatting buttons and inputs -->
                            <div style="width:55%;float:right;">
                                <!-- color, undo/redo, & complete buttons -->
                                <div>
                                    <!-- polygon colors table-->
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>hex</th>
                                                <th>opacity</th>
                                            </tr>
                                        </thead>
                                        <!-- fill -->
                                        <tbody>
                                            <tr>
                                                <th><span class="glyphicon glyphicon-tint"></span></th>
                                                <td>
                                                    <button type="button" 
                                                            class="btn btn-color-selected" 
                                                            id="polygon-hex-fill-btn" 
                                                            aria-label=""></button>
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           class="form-control" 
                                                           id="polygon-hex-fill-input">
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           class="form-control" 
                                                           id="polygon-opacity-fill-input">
                                                </td>
                                            </tr>
                                            <!-- border -->
                                            <tr>
                                                <th><span class="glyphicon glyphicon-unchecked"></span></th>
                                                <td>
                                                    <button type="button" 
                                                            class="btn btn-color-selected" 
                                                            id="polygon-hex-border-btn" 
                                                            aria-label=""></button>
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           class="form-control" 
                                                           id="polygon-hex-border-input">
                                                </td>
                                                <td>
                                                    <input type="text" 
                                                           class="form-control" 
                                                           id="polygon-opacity-border-input">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- undo, redo, complete polygon -->
                                    <div>
                                        <!-- undo/redo -->
                                        <div>
                                            <button type="button" class="btn" id="undo" aria-label="undo">
                                                <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn" id="redo" aria-label="undo">
                                                <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                        <!-- complete the polygon -->
                                        <div>
                                            <button type="button" class="btn" id="complete" aria-label="complete the polygon">complete</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- description input -->
                                <div>
                                    <input type="text" 
                                       class="form-control" 
                                       id="polygon-description" 
                                       placeholder="polygon description">
                                </div>
                            </div>
                            <!-- color wheel and opacity slider-->
                            <div style="width:118px;">
                                <!-- color wheel -->
                                <div class="color-wheel">
                                    <!-- 3 -->
                                    <div>
                                        <button type="button" class="btn" aria-label="Red Magenta #FF00FF"></button>
                                        <button type="button" class="btn" aria-label="Red #FF0000"></button>
                                        <button type="button" class="btn" aria-label="Orange #FF7F00"></button>
                                    </div>
                                    <!-- 4 -->
                                    <div>
                                        <button type="button" class="btn" aria-label="Magenta #FF00FF"></button>
                                        <button type="button" class="btn" aria-label="Lilac #FF99CC"></button>
                                        <button type="button" class="btn" aria-label="Apricot #FFCC99"></button>
                                        <button type="button" class="btn" aria-label="Yellow #FFFF00"></button>
                                    </div>
                                    <!-- 5 -->
                                    <div>
                                        <button type="button" class="btn" aria-label="Blue Magenta #7F00FF"></button>
                                        <button type="button" class="btn" aria-label="Lavendar #CC99FF"></button>
                                        <button type="button" class="btn" aria-label="White #FFFFFF"></button>
                                        <button type="button" class="btn" aria-label="Celadon #CCFF99"></button>
                                        <button type="button" class="btn" aria-label="Green Yellow #7FFF00"></button>
                                    </div>
                                    <!-- 4 -->
                                    <div>
                                        <button type="button" class="btn" aria-label="Blue #0000FF"></button>
                                        <button type="button" class="btn" aria-label="Cornflower Blue #99CCFF"></button>
                                        <button type="button" class="btn" aria-label="Sea Foam Green #99FFCC"></button>
                                        <button type="button" class="btn" aria-label="Green #00FF00"></button>
                                    </div>
                                    <!-- 3 -->
                                    <div>
                                        <button type="button" class="btn" aria-label="Blue Cyan #007FFF"></button>
                                        <button type="button" class="btn" aria-label="Cyan #00FFFF"></button>
                                        <button type="button" class="btn" aria-label="Green Cyan #00FF7F"></button>
                                    </div>
                                </div>
                                <!-- full color wheel -->
                                <div style="text-align:center;">
                                    <label for="color-picker">more colors:</label>
                                    <input type="color" 
                                           id="color-picker"
                                           value="#5CB85C"
                                           aria-label="select from complete color wheel">
                                </div>
                                <!-- opacity slider -->
                                <div style="margin-top: 13px;">
                                    <label for="polygon-opacity">
                                        <span class="glyphicon glyphicon-adjust"></span>
                                    </label>
                                    <div style="max-width: 98px; float:right;">
                                        <input id="polygon-opacity" type="range" min="0" max="1" step="0.01" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div> 

        </div>

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <nav id="slideout-menu">

            <!-- logo -->
            <div class="logo">
                <a href="/">
                    <div style="max-width: 166px; position: relative; left: 50%; margin-left: -83px;"><!-- centers logo -->
                        <div class="route">Route</div>
                        <span>sider</span>
                    </div>
                </a>
            </div>         

            <!-- search bar -->
            <div class="input-group"
                 style="padding: 0 10px">
                <input type="text" 
                       class="form-control" 
                       style="border-top-left-radius: 16px; border-bottom-left-radius: 16px;border-right: 0;"
                       placeholder="Search Routesider"
                       aria-label="search all of routesider">
                <div class="input-group-btn">
                    <button type="button" 
                            class="btn btn-default" 
                            style="border-left: 0;border-right: 0;" 
                            aria-label="search routesider">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                    <button type="button" 
                            class="btn btn-default" 
                            style="border-left: 0;border-top-right-radius: 16px;border-bottom-right-radius: 16px;color:#aaa;" 
                            aria-label="search settings">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <hr>

            <!-- links -->
            <ul class="list-group cool-links">
                <li class="list-group-item">
                    <a href="about">About</a>
                </li>
                <li class="list-group-item">
                    <a href="register">Sign Up</a>
                </li>
            </ul>

            <hr>

            <ul class="list-group lame-links">
                <li class="list-group-item">
                    <a href="privacy">Privacy</a>
                </li>
                <li class="list-group-item">
                    <a href="terms_of_use">Terms of Use</a>
                </li>
                <li class="list-group-item">
                    <a href="#">Contact Us</a>
                </li>
            </ul>
        </nav>

        <!-- token -->
        <input type="hidden" id="token" name="token" value='<?= Token::generate(); ?>' >

        <!-- business name -->
        <input type="hidden" id="business-name" name="business-name" value='<?= $business->data("name"); ?>' >

        <!-- javascripts -->
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;key=AIzaSyCCV74W4fbd9w1PVxD-OviILs9MPFqFdis&amp;libraries=places&amp;callback=rsApp.setUserLocation"></script>
        <script src="js/main.js"></script>
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>









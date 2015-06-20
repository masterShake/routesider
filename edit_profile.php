<?php



    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';


    //---------------------------------------
    // Don't need to worry about tokens here.
    //
    // Image only goes to the uploads folder,
    // and is assigned to the user when they
    // click save.

    // handle form input
    $fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

    if ($fn) {

        $user = new User();

        //-------------------------------------------
        // - getfile information
        // - $ff[0] = random number
        // - $ff[1] = file extension
        // - $ff[2] = img element type (banner or avatar)
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
    
        $json = [ "filename" => $newName, "imgType" => $ff[2], "token" => Token::generate() ];

        $json = json_encode($json);

        exit( $json );
    }
    // else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    //  // form submit
    //  $files = $_FILES['fileselect'];

    //  foreach ($files['error'] as $id => $err) {
    //      if ($err == UPLOAD_ERR_OK) {
    //          $fn = $files['name'][$id];
    //          move_uploaded_file(
    //              $files['tmp_name'][$id],
    //              '../../uploads/' . $fn
    //          );
    //          echo "<p>File $fn uploaded.</p>";
    //      }
    //  }
    // }

    
    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

        // check token
        if( Token::check( Input::get("token") ) ){

            // set the user
            $user = new User();

            // create an empty errors array
            $errors = [];

            // set the business
            $business = $user->business();
            $business = $business[0];

            // set the profile
            $profile = $business->profile();

            $profile->update( Input::get("vals") );

            // return the json object
            $json = [ 
                        "errors" => $errors,
                        "token"  => Token::generate() 
                    ];

            echo json_encode($json);

        }else{

            $json = [ 
                        "errors" => [ "Token Timeout" ],
                        "token"  => Token::generate()
                    ];

            echo json_encode( $json );

        }

        exit();
    }


    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $page = "register"; //required

    $errors = []; //required

    $user = new User();

    $business = $user->business();

    $business = $business[0];

    $profile = $business->profile();

    //---------------------------------------
    // - if the user is not logged in, 
    //   redirect her to the login page and 
    //   flash a message
    if( ! $user->isLoggedIn()){

        exit("you must be logged in to view this page");

    }

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

        <!-- page styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/edit_profile.css" rel="stylesheet">
        <link href="css/on_off_switch.css" rel="stylesheet">

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

            <section class="container">

                <!-- initial values -->
                <input type="hidden" 
                       value='<?= json_encode( $profile->data() ); ?>' 
                       name="initvals" 
                       id="initial-values">

                <!-- token -->
                <input type="hidden" 
                       value='<?= Token::generate(); ?>' 
                       name="token" 
                       id="token">

                <h1>Edit Profile</h1>

                <!-- save button + activate/deactivate profile switch -->
                <div class="alert alert-info" 
                     role="alert" 
                     style="display:none;" 
                     id="save-alert1">
                    <span>Click the <strong>save</strong> button to keep your changes.</span>
                </div>

                <div style="height: 80px;">

                    <button class="btn" id="save-btn1" style="margin-top:40px;" aria-label="save changes">Save</button>

                    <div style="float:right;">
                        <h4>Page Visible</h4>
                        <div class="onoffswitch" 
                                   data-propname="active">
                            <input type="checkbox" 
                                   name="onoffswitch" 
                                   class="onoffswitch-checkbox" 
                                   id="myonoffswitch-profile">
                            <label class="onoffswitch-label" for="myonoffswitch-profile">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <hr>

                <!-- edit banner -->
                <form id="edit-banner" 
                      style="margin-top:20px;"
                      action="" 
                      method="POST" 
                      enctype="multipart/form-data">

                    <h4 style="margin-top:25px;">Edit Avatar &amp; Profile Banner</h4>

                    <div id="banner-filedrag" data-elem="banner">or drop files here</div>

                    <div class="traditional-upload">
                        <label for="banner-fileselect">Files to upload:</label>
                        <input type="file" 
                               id="banner-fileselect" 
                               name="fileselect[]" 
                               multiple="multiple" />
                    </div>
                </form>

                <!-- edit avatar -->
                <form id="edit-avatar"  
                      action="index.html" 
                      method="POST" 
                      enctype="multipart/form-data">

                    <div id="avatar-filedrag" data-elem="avatar">or drop files here</div>

                    <div id="semi-circle-traditional-upload">
                        <label for="avatar-fileselect">Files to upload:</label>
                        <input type="file" 
                               id="avatar-fileselect" 
                               name="fileselect[]" 
                               multiple="multiple" />
                    </div>
                </form>
                
                <div class="avatar-shape-btns">
                    <div style="float:left;">
                        <div class="avatar-shape" style="border-radius:50%;"></div>
                        <input type="radio" id="circle-avatar" name="avatar-shape" value="circle" checked>
                    </div>
                    <div style="float:right;">
                        <div class="avatar-shape"></div>
                        <input type="radio" id="square-avatar" name="avatar-shape" value="square">
                    </div>
                </div>

                <hr>

                <!-- business name -->
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        <h4>Business Name</h4>
                        <input type="text" name="name" class="form-control" id="business-name">
                    </div>
                </div>

                <!-- tagline -->
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <h4>Tagline</h4>
                        <input type="text" name="tagline" class="form-control" id="tagline">
                    </div>
                </div>

                <!-- description -->
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <h4>Description</h4>
                        <textarea class="form-control" id="description" name="description"></textarea>
                    </div>
                </div>

                <hr>

                <div class="alert alert-info" 
                     role="alert" 
                     style="display:none;" 
                     id="save-alert2">
                    <span>Click the <strong>save</strong> button to keep your changes.</span>
                </div>

                <button class="btn" id="save-btn2" style="margin:20px;margin-bottom:38px;" aria-label="save changes">Save</button>

            </section>

            <!-- footer -->
            <footer>
                <div class="container">
                    <div class="row">

                        <!-- quick links -->
                        <div class="col-sm-4">
                            
                            <div class="logo">
                                <a href="/">
                                    <div class="route">Route</div>
                                    <span>sider</span>
                                </a>
                            </div>

                            <ul class="list-group">
                                <li class="list-group-item">
                                    <a href="about">About</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="register">Sign Up</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="privacy">Privacy</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="terms_of_use">Terms of Use</a>
                                </li>
                            </ul>

                            <hr class="visible-xs">

                        </div>

                        <!-- contact info -->
                        <div class="col-sm-4 contact-info">
                            
                            <div>
                                <a href="tel:+6506781777">
                                    <span class="glyphicon glyphicon-earphone"></span>
                                </a>
                            </div>
                            <div style="font-size:10px;">
                                <a href="tel:+6506781777">phone</a>
                            </div>
                            <div style="margin-bottom: 30px;">
                                <a href="tel:+6506781777">(650) 678-1777</a>
                            </div>

                            <div class="glyphicon glyphicon-time"></div>
                            <div style="font-size:10px;">phone hours</div>
                            <div>10 - 10 <span style="font-size:8px;">(Silicon Valley)</span></div>
                            <div>everyday</div>

                            <hr class="visible-xs">

                        </div>

                        <!-- contact form -->
                        <div class="col-sm-4 contact-us">

                            <div class="glyphicon glyphicon-envelope"></div>
                            <div style="font-size:10px;">contact us</div>

                            <form>
                                <input type="text" 
                                       name="cemail" 
                                       class="form-control"
                                       id="cname" 
                                       placeholder="your@email.com">
                              
                                <textarea id="cmessage" 
                                          class="form-control" 
                                          placeholder="500 characters max"
                                          rows="5"></textarea>
                              
                                <div style="text-align:right;">
                                    <button type="button" class="btn btn-default" aria-label="send message">Send</button>
                                </div>

                            </form>
                            
                        </div>

                        <!-- copyright -->
                        <div style="text-align:center;padding:30px;font-size: 12px;color: #aaa;">&#169; Routesider 2015</div>

                    </div>
                </div>
            </footer>

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

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/edit_profile.js"></script>

    </body>
</html>
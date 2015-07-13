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

    $errors = []; //required

    $user = new User();

    $business = $user->business();

    $business = $business[0];

    $profile = $business->profile();

    $email = $user->email() ? $user->email() : $user->data("username");

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
        <link href="css/icomoon.css" rel="stylesheet">
        <link href="css/formatting_toolbar.css" rel="stylesheet">
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
            <?php include "components/navbar.php"; ?>

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
                                   id="myonoffswitch-profile"
                                   <?= $profile->data("active") ? "checked" : ""; ?>>
                            <label class="onoffswitch-label" for="myonoffswitch-profile">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <hr>

                <h4 style="margin-top:25px;">Edit Avatar &amp; Profile Banner</h4>
                
                <!-- edit banner -->
                <form id="edit-banner" 
                      style="margin-top:20px;"
                      action="" 
                      method="POST" 
                      enctype="multipart&#47;form-data">

                    <div id="banner-filedrag" 
                         data-elem="banner"
                         style='<?= $profile->data("banner") ? "background-image: url(img/business/" . $profile->data("banner") . ");" : "none;" ?><?= $profile->data("display_banner") ? "" : "opacity:.35;background-image:none;" ?>' >or drop files here</div>

                    <div class="traditional-upload" <?= ($profile->data("banner")) ? "style='opacity: 0.75;'" : ""; ?>>
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

                    <div id="avatar-filedrag" 
                         data-elem="avatar" 
                         style='background-image: <?= $profile->data("avatar") ? "url(img/business/" . $profile->data("avatar") . ");" : "none;" ?><?= $profile->data("avatar_shape") == "square" ? "border-radius: 0%;" : "" ?>' >or drop files here</div>

                    <div id="semi-circle-traditional-upload"
                         style='<?= $profile->data("avatar_shape") == "square" ? "border-top-left-radius: 0px; border-top-right-radius: 0px;" : "" ?><?= ($profile->data("avatar")) ? "opacity: 0.75;" : ""; ?>'>
                        <label for="avatar-fileselect">Files to upload:</label>
                        <input type="file" 
                               id="avatar-fileselect" 
                               name="fileselect[]" 
                               multiple="multiple" />
                    </div>
                </form>
                
                <!-- avatar & banner settings -->
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">

                        <!-- avatar shape -->
                        <div class="avatar-shape-btns">
                            <label for="avatar-shape">avatar shape</label>
                            <div style="float: left; margin-left: 10px;">
                                <div class="avatar-shape" style="border-radius:50%;"></div>
                                <input type="radio" id="circle-avatar" name="avatar-shape" value="circle" <?= $profile->data("avatar_shape") == "circle" ? "checked" : ""; ?>>
                            </div>
                            <div style="float:right; margin-right: 14px;">
                                <div class="avatar-shape"></div>
                                <input type="radio" id="square-avatar" name="avatar-shape" value="square" <?= $profile->data("avatar_shape") == "square" ? "checked" : ""; ?>>
                            </div>
                        </div>

                        <!-- display banner -->
                        <div style="padding-top: 22px;">
                            <input type="checkbox" name="display-banner" class="form-control" id="display-banner" <?= $profile->data("display_banner") ? "checked" : ""; ?>>
                            <label for="display-banner" style="margin-top: 4px;"><span class='glyphicon glyphicon-eye-<?= $profile->data("display_banner") ? "open" : "close"; ?>'></span> banner</label>
                        </div>

                    </div>
                </div><!-- /avatar & banner settings -->

                <hr>

                <!-- business name -->
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        <label for="business-name">Business Name</label>
                        <input type="text" 
                               name="name" 
                               class="form-control" 
                               id="business-name"
                               value="<?= $profile->data("name") ?>">
                        <!-- formatting toolbar -->
                        <?php include "components/formatting_toolbar_half.php"; ?>
                    </div>
                </div>

                <!-- tagline -->
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <label for="tagline">Tagline</label>
                        <input type="text" 
                               name="tagline" 
                               class="form-control" 
                               id="tagline"
                               value="<?= $profile->data("tagline") ?>">
                        <!-- formatting toolbar -->
                        <?php include "components/formatting_toolbar_half.php"; ?>
                    </div>
                </div>

                <!-- description -->
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" name="description"><?= $profile->data("description"); ?></textarea>
                        <!-- formatting toolbar -->
                        <?php include "components/formatting_toolbar_full.php"; ?>
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
            <?php include "components/footer.php"; ?>

        </div>

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/formatting_toolbar.js"></script>
        <script src="js/edit_profile.js"></script>

    </body>
</html>
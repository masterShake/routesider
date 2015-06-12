<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';

    
    //-------------------------------------
    // STEP 2: instantiate global variables
    //-------------------------------------

    $page = "register"; //required

    $errors = []; //required

    $user;

    
    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

        // check if username available
        if(Input::get("namecheck")){

            $db = neoDB::getInstance();

            $cypher = "MATCH (u:User) WHERE u.username = '".$_POST["username"]."' RETURN u";

            $results = $db->query($cypher);

            if(count($results))

                echo "1";

            else

                echo "0";

            exit();

        // check if email already in system
        }else if(Input::get("emailcheck")){

            echo "here is the user email: ".$_POST["email"];
            exit();

        }else if( Input::get("create_user") ){

            /* variables */

            $u = $_POST["username"];
            $p = $_POST["password"];
            $e = $_POST["email"];

            /* validate input */

            // make sure we got a username
            if( ! $u  ){

                // add a message to the error array
                $errors[] = "Please create a username";
            }
            
            // verify that username fits regex
            if( ! preg_match('/^[a-z0-9_-]{3,32}$/', $u) ){

                $errors[] = "invalid username formatting";
            }

            // verify that username does not already exist in the db


            // verify that the password is the correct length
            if( strlen( $p ) < 6 || strlen( $p ) > 64 ){

                $errors[] = "Password incorrect length";
            }

            // if there is an email, validate it
            if( $e && preg_match("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/", $e) ){

                // verify that email does not already exist in the database

            }else{

                $e = 0;

            }

            // if we have errors
            if( $errors ){

                // return them as json
                echo json_encode($errors);

            // if no errors
            }else{

                // create new user
                $user = new User();

                $user->create($u, $p, $e);

                echo "1";

            }

            exit();
        }

        exit("no input for now");
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

        <!-- Routesider styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/register.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>

        <!-- page content -->
        <div class="page-content">

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
            
            <div class="container">
                <div class="row">

                    <!-- registration form -->
                    <div class="col-sm-6 col-lg-8">
                        
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h2>Sign up for Routesider</h2>
                                <h6>Create a <strong>FREE</strong> profile page for your business.</h6>
                            </div>
                            <div class="panel-body">
                                
                                <form class="sign-up-form">

                                    <!-- create username -->
                                    <div>
                                        <label>Create a Username</label>
                                        <input type="text"
                                               name="newuser" 
                                               class="form-control text-input" 
                                               id="new-username"
                                               placeholder="a-Z 0-9 _ -">
                                        <div class="glyphicon glyphicon-ok-circle"></div>
                                        <div class="glyphicon glyphicon-remove-circle"></div>
                                        <div class="glyphicon glyphicon-hourglass"></div>
                                        <button class="btn btn-default" type="button">
                                            <span class="glyphicon glyphicon-info-sign"></span>
                                        </button>
                                        <div class="input-error"></div>
                                    </div>

                                    <!-- create password -->
                                    <div>
                                        <label>Password</label>
                                        <input type="password"
                                               name="pass" 
                                               class="form-control" 
                                               id="new-password"
                                               placeholder="a-Z 0-9 !@#$%^&amp;*">
                                        <div class="glyphicon glyphicon-ok-circle"></div>
                                        <div class="glyphicon glyphicon-remove-circle"></div>
                                        <button class="btn btn-default" type="button">
                                            <span class="glyphicon glyphicon-info-sign"></span>
                                        </button>
                                        <div class="input-error"></div>
                                    </div>

                                    <!-- repeat password -->
                                    <div>
                                        <input type="password" 
                                               name="repass"
                                               class="form-control" 
                                               id="repeat-password"
                                               placeholder="repeat password">
                                        <div class="glyphicon glyphicon-ok-circle"></div>
                                        <div class="glyphicon glyphicon-remove-circle"></div>
                                        <div class="input-error" style="margin-top:83px;"></div>
                                    </div>

                                    <!-- create username -->
                                    <div>
                                        <label>Email (optional)</label>
                                        <input type="text"
                                               name="newemail" 
                                               class="form-control text-input" 
                                               id="new-email"
                                               placeholder="add email later if you want">
                                        <div class="glyphicon glyphicon-ok-circle"></div>
                                        <div class="glyphicon glyphicon-hourglass"></div>
                                        <div class="input-error"></div>
                                    </div>

                                    <div>

                                        <div class="input-group" style="margin: 20px 0; padding-top:10px;">
                                            <input type="checkbox" 
                                                   name="business" 
                                                   checked="checked" 
                                                   id="business-profile">
                                            <div style="z-index:1;margin-left:-30px;height:25px;width:25px;background:rgba(100, 100, 100, 0.5);float:left;"></div>
                                            <div style="float:left;margin-top:2px;">Business account (free)</div>
                                        </div>

                                        <div class="input-group" style="margin: 20px 0;">
                                            <input type="checkbox" 
                                                   name="tou" 
                                                   id="tou">
                                            <div style="float:left;margin-top:2px;">I agree to the <a href="#">terms of use</a></div>
                                        </div>

                                    </div>

                                </form>

                            </div>
                            <div class="panel-footer">
                                <button type="button" 
                                        class="btn btn-default"
                                        id="submit-new-user">sign up</button>
                            </div>
                        </div>
                    </div>

                    <!-- easy as 1 2 3 -->
                    <div class="col-sm-6 col-lg-4">
                        
                        <!-- STEP 1 -->
                        <div class="media">
                            <div class="media-left media-middle">
                                <a href="#">
                                    <!-- <img class="media-object" src="..." alt="..."> -->
                                    <div style="padding:32px 34px;border-radius: 17px;background-color:#ccc;"><span class="glyphicon glyphicon-camera"></span></div>
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">List Unlimited Products FREE</h4>
                                <p>Zril putent minimum te vix, commodo vivendo scripserit ad mei. No est semper vocent indoctum, nam ad docendi efficiendi comprehensam, integre nostrum electram sit an.</p>
                            </div>
                        </div>

                        <!-- STEP 2 -->
                        <div class="media">
                            <div class="media-right media-middle">
                                <a href="#">
                                    <!-- <img class="media-object" src="..." alt="..."> -->
                                    <div style="padding:32px 34px;border-radius: 17px;background-color:#ccc;"><span class="glyphicon glyphicon-camera"></span></div>
                                </a>
                            </div>
                            <div class="media-body body-right">
                                <h4 class="media-heading">Business Networking made Easy</h4>
                                <p>Lorem ipsum dolor sit amet, qui dicit iudico interpretaris ei, te pro habeo cotidieque. Cum civibus molestiae no, delenit blandit eam cu, nec case senserit tractatos eu.</p>
                            </div>
                        </div>

                        <!-- STEP 3 -->
                        <div class="media">
                            <div class="media-left media-middle">
                                <a href="#">
                                    <!-- <img class="media-object" src="..." alt="..."> -->
                                    <div style="padding:32px 34px;border-radius: 17px;background-color:#ccc;"><span class="glyphicon glyphicon-camera"></span></div>
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">Get Exposure &amp; Grow</h4>
                                <p>Et timeam assueverit mea, ubique mandamus in quo. Vim audiam deserunt vulputate ne, falli numquam ad his, te eum animal argumentum.</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <!-- jumbotron -->
            <div class="jumbotron">
                <div class="container">
                    <h1>Hello, world!</h1>
                    <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                    <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                </div>
            </div>

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
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>







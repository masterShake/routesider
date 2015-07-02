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

            <?php 

            //-----------------------------------------------
            // - if the user is logged in, display the user
            //   dropdown menu.
            // - if the not logged in, display the search bar

            if ($user->isLoggedIn()){ ?>

            <!-- user menu -->
            <div class="dropdown user-nav navbar-toggle">
                <!-- dropdown button -->
                <button class="btn dropdown-toggle" 
                        type="button" 
                        id="dropdown-user-nav"
                        aria-haspopup="true" 
                        aria-expanded="true">
                    <span class="user-pic"><span class="glyphicon glyphicon-user"></span></span>
                    <span class="caret"></span>
                </button>
                <!-- dropdown menu items -->
                <ul class="dropdown-menu list-group user-links" aria-labelledby="dropdown-nav">
                    <li>
                        <div class='avatar <?= $profile->data("avatar_shape"); ?>'></div>
                        <span><?= $business->data("name"); ?></span>
                    </li>
                    <li class="divider"></li>
                    <!-- profile -->
                    <li>
                        <!-- small label for edit buttons -->
                        <div class="link-labels" style="padding-bottom: 2px;">
                            <div><span class="glyphicon glyphicon-eye-open"></span>&nbsp;view</div>
                            edit&nbsp;<span class="glyphicon glyphicon-pencil"></span>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div>
                            <a class="view-page" href='<?= $business->data("name") ?>'>
                                <span class="icon-profile"></span>&nbsp;&nbsp;Profile
                            </a>
                            <a href="edit_profile.php">
                                <button type="button" class="btn" aria-label="edit profile">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </a>
                        </div>
                    </li>
                    <!-- products -->
                    <li class="list-group-item">
                        <div>
                            <a class="view-page" href="<? $username; ?>/products">
                                <span class="glyphicon glyphicon-gift"></span>&nbsp;&nbsp;Products
                            </a>
                            <a href="edit_products.php">
                                <button type="button" class="btn" aria-label="edit products">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </a>
                        <div>
                    </li>
                    <!-- promos -->
                    <li class="list-group-item">
                        <div>
                            <a class="view-page" href="<? $username; ?>/promos">
                                <span class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;Promos
                            </a>
                            <a href="edit_promos.php">
                                <button type="button" class="btn" aria-label="edit promos">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </a>
                        </div>
                    </li>
                    <!-- maps -->
                    <li class="list-group-item">
                        <div>
                            <a class="view-page" href="<? $username; ?>/maps">
                                <span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;Maps
                            </a>
                            <a href="edit_maps.php">
                                <button type="button" class="btn" aria-label="edit maps">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </a>
                        </div>
                    </li>
                    <!-- social media -->
                    <li class="list-group-item" style="padding-bottom: 0px;">
                        <div style="border-bottom: 0px;">
                            <a class="view-page" href="<? $username; ?>/social">
                                <span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;&nbsp;Social Media
                            </a>
                            <a href="edit_social.php">
                                <button type="button" class="btn" aria-label="edit social media">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </a>
                        </div>
                    </li>
                    <li class="divider"></li>
                    <li><a href="#">settings</a></li>
                    <li><a href="#">logout</a></li>
                </ul>
            </div>

            <?php }else{ ?>

            <!-- search routesider -->
            <form class="navbar-form navbar-right" role="search">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="products, businesses, locations, etc...">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
                    </span>
                </div>
            </form>

            <?php } ?>

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
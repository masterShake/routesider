<!-- navbar -->
<nav class="navbar navbar-dark" id="navbar">
    <div class="container">

         <?php 

        //-----------------------------------------------
        // - if the user is logged in, display the user
        //   dropdown menu.
        // - if the not logged in, display the search bar

        if ($user->isLoggedIn()){ ?>

        <!-- user menu -->
        <div class="dropdown user-nav">
            <!-- dropdown button -->
            <button class="btn dropdown-toggle" type="button"  id="dropdown-user-nav" aria-haspopup="true" aria-expanded="true">
                <span class="user-pic"><span class="glyphicon glyphicon-user"></span></span>
                <span class="caret"></span>
            </button>
            <!-- dropdown menu items -->
            <ul class="dropdown-menu list-group" aria-labelledby="dropdown-user-nav">
                <li style="padding: 6px 15px;">
                    <div style="height: 28px;">
                        <div class='avatar <?= $profile->data("avatar_shape"); ?>' style='background-image: url(img/business/<?= $profile->data("avatar"); ?>);'></div>
                        <span style="font-size: 16px; font-weight: 600; line-height: 34px;"><?= $business->data("name"); ?></span>
                    </div>
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
                <li class="list-group-item user-link">
                    <div>
                        <a href="edit_profile.php" class="btn btn-default" aria-label="edit profile">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="view-page" href='<?= $user->data("username"); ?>'>
                            <span class="icon-profile"></span>&nbsp;&nbsp;Profile
                        </a>
                    </div>
                </li>
                <!-- products -->
                <li class="list-group-item user-link">
                    <div>
                        <a href="edit_products.php" class="btn btn-default" aria-label="edit products">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="view-page" href="<?= $user->data("username"); ?>/products">
                            <span class="glyphicon glyphicon-gift"></span>&nbsp;&nbsp;Products
                        </a>
                    </div>
                </li>
                <!-- promos -->
                <li class="list-group-item user-link">
                    <div>
                        <a href="edit_promos.php" class="btn btn-default" aria-label="edit promos">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="view-page" href="<?= $user->data("username"); ?>/promos">
                            <span class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;Promos
                        </a>
                    </div>
                </li>
                <!-- maps -->
                <li class="list-group-item user-link">
                    <div>
                        <a href="edit_products.php" class="btn btn-default" aria-label="edit products">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="view-page" href="<?= $user->data("username"); ?>/maps">
                            <span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;Maps
                        </a>
                    </div>
                </li>
                <!-- social media -->
                <li class="list-group-item user-link" style="padding-bottom: 0px;">
                    <div style="border-bottom: 0px;">
                        <a href="edit_social_media.php" class="btn btn-default" aria-label="edit social media">
                            <span class="glyphicon glyphicon-pencil"></span>
                        </a>
                        <a class="view-page" href="<?= $user->data("username"); ?>/social">
                            <span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;&nbsp;Social Media
                        </a>                        
                    </div>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="#" class="dropdown-bottom">
                        <div class="glyphicon glyphicon-cog" style="display:block; float:left; margin-top: 3px;"></div>&nbsp;&nbsp;<span>settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="dropdown-bottom">
                        <div class="icon-exit glyphicon" style="margin-top: 3px;"></div>&nbsp;&nbsp;<span>logout</span>
                    </a>
                </li>
            </ul>
        </div>

        <?php } ?>
        
        <div class="navbar-header">
            
            <!-- toggle mobile menu -->
            <button type="button"  class="navbar-toggle collapsed" id="navbar-toggle-menu">
                <span class="glyphicon glyphicon-menu-hamburger"></span>
            </button>

            <!-- routesider logo -->
            <a class="navbar-brand" href="#">
                <span class="logo">
                    <span class="route">Route</span>
                    <span>sider</span>
                </span>
            </a>

           <?php if( !$user->isLoggedIn() ){ ?>

            <!-- search routesider -->
            <form class="navbar-form navbar-right">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search Routesider">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
                    </span>
                </div>
            </form>

            <?php } ?>

        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            
            <!-- navigation links -->
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Map <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Deals</a></li>
                <li><a href="#">Sign Up</a></li>
            </ul>

            <!-- search routesider -->
            <form class="navbar-form navbar-right" role="search">
                <input type="text" class="form-control" placeholder="Search Routesider">
                <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
            </form>

        </div><!-- /.navbar-collapse -->

    </div>
</nav>
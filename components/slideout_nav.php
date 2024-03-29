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
    <div class="input-group" style="padding: 0 10px">
        <input type="text" 
               class="form-control" 
               style="border-top-left-radius: 16px; border-bottom-left-radius: 16px;border-right: 0;"
               placeholder="Search Routesider"
               aria-label="search all of routesider">
        <div class="input-group-btn">
            <button type="button" class="btn btn-default" style="border-left: 0;border-right: 0;" aria-label="search routesider">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default" style="border-left: 0;border-top-right-radius: 16px;border-bottom-right-radius: 16px;color:#aaa;" aria-label="search settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </button>
        </div>
    </div>

    <hr>

    <?php if($user->isLoggedIn()){ ?>

    <!-- logged in user nav -->
    <div>
        <!-- avatar and username -->
        <div style="text-align: center;">
        	<div class='avatar <?= ($profile->data("avatar_shape") == "circle") ? "circle" : ""; ?>' 
        		 style='background-image: url(img/business/<?= $profile->data("avatar"); ?>)'></div>
        	<h4><?= $business->data("name"); ?></h4>
        </div>
        <!-- small label for edit buttons -->
        <div class="link-labels">
        	<div><span class="glyphicon glyphicon-eye-open"></span>&nbsp;view</div>
        	edit&nbsp;<span class="glyphicon glyphicon-pencil"></span>
        </div>
        <!-- logged in user links -->
        <ul class="list-group">
        	<!-- profile -->
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
        </ul>
    </div>

    <?php } ?>

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
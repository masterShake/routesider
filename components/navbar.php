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
          	<ul class="navbar-right user-nav">
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
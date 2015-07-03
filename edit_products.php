<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 3: handle GET/POST params
    //-------------------------------

    if(Input::exists()){

    	// do something

    }

    //-------------------------------------
    // instantiate global variables
    //-------------------------------------

    $page = "edit_products";

    $errors = []; //required

    $user = new User();

    $business = $user->business();

    $business = $business[0];

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

        <!-- page styles -->
        <link href="css/main.css" rel="stylesheet">
        <link href="css/icomoon.css" rel="stylesheet">
        <link href="css/<?= $page; ?>.css" rel="stylesheet">
        <link href="css/on_off_switch.css" rel="stylesheet">
        <link href="css/swiper.min.css" rel="stylesheet">

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

            <div class="container">

            	<!-- header -->
            	<h1>Edit Products</h1>

            	<!-- search products -->
            	<div class="row">
            		<div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
						<div class="input-group input-group-lg search-products-input">
							<input type="text" 
								   class="form-control" 
								   id="search-products"
								   placeholder="Search products"
								   aria-label="search products">
							<button type="button" class="btn btn-lg" id="search-products-submit" aria-label="Submit search for products">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- my products swiper -->
		    <div class="swiper-container" id="products-swiper">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide">Slide 1</div>
		            <div class="swiper-slide">Slide 2</div>
		            <div class="swiper-slide">Slide 3</div>
		            <div class="swiper-slide">Slide 4</div>
		            <div class="swiper-slide">Slide 5</div>
		        </div>
		    </div>

		    <div class="container">

		    	<!-- add new product button & panel -->
		    	<div class="row">
		    		<div class="col-sm-4 col-sm-offset-4 col-md-2 col-md-offset-5">
		    			<div class="btn btn-lg btn-success" id="new-product-btn">
		    				<div>
		    					<button type="button" class="close" id="close-new-product-panel" aria-label="Close new product panel">&times;</button>
		    					<div style="text-align:center; width: 100%">
			    					<h3 style="margin: 0px"><span class="glyphicon glyphicon-plus"></span>&nbsp;New Product</h3>
		    					</div>
		    					<!-- new product panel -->
		    					<div id="new-product-panel">
		    						
		    						<hr>

		    						<!-- producer -->
		    						<div class="producer-btns">
			    						<p>
		    								<span class="glyphicon glyphicon-info-sign" id="producer-info" data-alert="info" data-text="<b>Producer</b> means that you are selling this product under your brand name, i.e. the business for which you created a profile."></span>
		    								Are you the producer of this product?
			    						</p>
			    						<div style="text-align:center;  margin: 20px 0px;">
			    							<div class="btn-group" role="group" aria-label="Are you the producer? yes or no?">
												<button type="button" class="btn" aria-label="Yes, my company produces this product">yes</button>
												<button type="button" class="btn" aria-lable="No, we are reselling another company's product">no</button>
											</div>
										</div>
									</div>

									<!-- if not producer, prompt user to look for product on routesider -->
									<div class="product-already-listed">
			    						<p>	
		    								<span class="glyphicon glyphicon-info-sign" id="already-listed-info" data-alert="info" data-text="If the producer of this product already has a profile on Routesider, you may search for the existing product and add it to your inventory."></span>
		    								Is this product already listed on Routesider?&nbsp;
			    						</p>
			    						<div style="text-align:center;  margin: 20px 0px;">
			    							<div class="btn-group" role="group" aria-label="Are you the producer? yes or no?">
												<button type="button" class="btn" aria-label="Yes, let me look for it">yes</button>
												<button type="button" class="btn" aria-lable="No, I need to add it myself">no</button>
												<button type="button" class="btn" aria-lable="I don't know if this product is already on Routesider">idk</button>
											</div>
										</div>
									</div>
									<div class="input-group search-products-input">
										<input type="text" 
											   class="form-control" 
											   id="search-products-2"
											   placeholder="Search products"
											   aria-label="search products">
										<button type="button" class="btn" id="search-products-submit-2" aria-label="Submit search for products">
											<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
										</button>
									</div>

									<!-- save alert 1 -->
									<div class="alert" id="save-alert-1">
										<div>
											<button type="button" class="btn btn-default">save</button>
										</div>
										<span>New product must have a name</span>
									</div>

									<!-- product name and subname -->
									<label for="product-name" style="margin-top: 30px;">Product Name</label>
									<input type="text"
										   name="productname"
										   class="form-control input-lg"
										   id="product-name"
										   aria-label="give the product a name">

									<label for="product-name">Sub Name</label>
									<input type="text"
										   name="subname"
										   class="form-control"
										   id="product-sub-name"
										   aria-label="optional subname for the product">

									<!-- upload image swiper -->
									<div class="slideshow">
										<div class="hero">
											<div class="glyphicon glyphicon-camera"></div>
											<h4>No images yet</h4>
										</div>
										<div class="swiper-container hero-swiper">
											<div class="swiper-wrapper">
												<div class="swiper-slide upload-slide">
													<!-- filedrag -->
													<div class="filedrag"><span><span class="glyphicon glyphicon-camera">&nbsp;</span>drag &amp; drop<br><span style="font-size: 8px;">-or-</span></span></div>
													<!-- traditional upload -->
													<div class="fileselect">
								                        <input type="file"  
								                               name="fileselect" 
								                               multiple="multiple" />
													</div>
												</div>
											</div>
										</div>
									</div>

									<!-- save alert 2 -->
									<div class="alert" id="save-alert-2">
										<div>
											<button type="button" class="btn btn-default">save</button>
										</div>
										<span>New product must have a name</span>
									</div>

		    					</div>

		    				</div>
						</div>		
		    		</div>
		    	</div>

		    </div>

            <!-- footer -->
            <?= include "components/footer.php"; ?>

        </div><!-- end page content -->

        <!-- contentent cover to close menu -->
        <div id="content-cover"></div>

        <!-- mobile slideout menu -->
        <?php include "components/slideout_nav.php"; ?>

        <!-- javascripts -->
        <script src="js/main.js"></script>
        <script src="js/swiper.min.js"></script>
        <script src="js/<?= $page; ?>.js"></script>

    </body>
</html>














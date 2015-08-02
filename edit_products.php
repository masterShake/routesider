<?php

    //---------------------------
    // STEP 1: load the init file
    //---------------------------

    require_once 'core/init.php';    


    //-------------------------------
    // STEP 2: handle image upload
    //-------------------------------

    $fn = (isset($_SERVER['HTTP_X_FILE_NAME']) ? $_SERVER['HTTP_X_FILE_NAME'] : false);

    if ($fn) {

        $user = new User();

        //-------------------------------------------
        // - getfile information
        // - $ff[0] = random number
        // - $ff[1] = file extension
        // - $ff[2] = heroSwiperObject
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
    
        $json = [ "filename" => $newName];

        $json = json_encode($json);

        exit( $json );
    }

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
        <link href="css/formatting_toolbar.css" rel="stylesheet">
        <link href="css/edit_products.css" rel="stylesheet">
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

            	<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active">
						<a href="#new-product" aria-controls="new-product" role="tab">New Product</a>
					</li>
					<li role="presentation">
						<a href="#edit-products" aria-controls="edit-products" role="tab">Edit Products</a>
					</li>
		    	</ul>

		    	<!-- tab content -->
		    	<div class="tab-content">

		    		<!-- new products -->
				    <div role="tabpanel" class="tab-pane active" id="new-product">
				    	
				    	<!-- search products -->
		            	<div class="row">
		            		<div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
								<div class="input-group input-group-lg search-products-input">
									<input type="text" 
										   class="form-control" 
										   placeholder="Search Routesider"
										   aria-label="search products">
									<button type="button" class="btn btn-lg" aria-label="Submit search for products">
										<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>
								</div>
							</div>
						</div>

						<!-- new products button -->
						<div class="btn btn-lg btn-success" id="new-product-btn">
		    				<div>
		    					<button type="button" class="close" aria-label="Close new product panel">&times;</button>
		    					<div style="text-align:center; width: 100%">
			    					<h3 style="margin: 0px"><span class="glyphicon glyphicon-plus"></span>&nbsp;New Product</h3>
		    					</div>

	    						<!-- producer -->
	    						<div id="producer-btns">
		    						
	    							<!-- line break -->
	    							<hr>
		    						
		    						<p>
	    								<span class="glyphicon glyphicon-info-sign" data-alert="info" data-text="&#60;b&#62;Producer&#60;&#47;b&#62; means that you are selling this product under your brand name, i.e. the business for which you created a profile."></span>
	    								Are you the producer of this product?
		    						</p>
		    						<div style="text-align:center;  margin: 20px 0px;">
		    							<div class="btn-group" role="group" aria-label="Are you the producer? yes or no?">
											<button type="button" class="btn btn-success" style="border-right:0px;" aria-label="Yes, my company produces this product">yes</button>
											<button type="button" class="btn btn-danger" style="border-left:0px;" aria-label="No, we are reselling another company's product">no</button>
										</div>
									</div>
								</div>

								<!-- if not producer, prompt user to look for product on routesider -->
								<div id="product-already-listed">
		    						<p>	
	    								<span class="glyphicon glyphicon-info-sign" data-alert="info" data-text="If the producer of this product already has a profile on Routesider, you may search for the existing product and add it to your inventory."></span>
	    								Is this product already listed on Routesider?&nbsp;
		    						</p>
		    						<div style="text-align:center;  margin: 20px 0px;">
		    							<div class="btn-group" role="group" aria-label="Are you the producer? yes or no?">
											<button type="button" class="btn btn-success" style="border-right:0px;" aria-label="Yes, let me look for it">yes</button>
											<button type="button" class="btn btn-danger" style="border-left:0px;" aria-label="No, I need to add it myself">no</button>
											<button type="button" class="btn" aria-label="I don't know if this product is already on Routesider">idk</button>
										</div>
									</div>
								</div>

								<!-- search routesider text field input -->
								<div class="input-group search-products-input" id="existing-product-search">
									<input type="text" 
										   class="form-control" 
										   placeholder="Search products"
										   aria-label="search products">
									<button type="button" class="btn" aria-label="Submit search for products">
										<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>
								</div>

								<!-- product inputs -->
								<div id="product-inputs">

									<!-- product name -->
									<div>
										<label for="product-name" style="margin-top: 10px;">Product Name</label>
										<input type="text"
											   name="productname"
											   class="form-control input-lg"
											   id="product-name"
											   aria-label="give the product a name"/>
										<!-- formatting toolbar -->
										<?php include "components/formatting_toolbar_half.php"; ?>
									</div>

									<!-- product sub name -->
									<div>
										<label for="product-name">Sub Name</label>
										<input type="text"
											   name="subname"
											   class="form-control"
											   id="product-sub-name"
											   aria-label="optional subname for the product"/>
										<!-- formatting toolbar -->
										<?php include "components/formatting_toolbar_half.php"; ?>
									</div>

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
													<div class="filedrag"><span><span class="glyphicon glyphicon-camera"></span>&nbsp;drag &amp; drop<br><span style="font-size: 8px;">-or-</span></span></div>
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

									<!-- description -->
									<div>
										<label>Product Description</label>
										<textarea rows="5" placeholder="Tell us about this product" id="product-description"></textarea>
										<!-- full formatting toolbar -->
										<?php include "components/formatting_toolbar_full.php"; ?>	
									</div>

									<!-- save alert 2 -->
									<div class="alert" id="save-alert-2">
										<div>
											<button type="button" class="btn btn-default">save</button>
										</div>
										<span>New product must have a name</span>
									</div>

								</div><!-- /product-inputs -->

		    				</div>
						</div><!-- /new products button -->

				    	<!-- instructions -->
				    	<ul class="instructions">
				    		<li>Search for existing products and add them to your shelf.</li>
				    		<li>Or click the "New Product" button to create a new product, upload images, etc.</li>
				    	</ul>

				    </div><!-- /new-product -->

				    <!-- edit products -->
				    <div role="tabpanel" class="tab-pane" id="edit-products">
				    	
				    	<!-- search products -->
		            	<div class="row">
		            		<div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
								<div class="input-group input-group-lg search-products-input">
									<input type="text" 
										   class="form-control" 
										   placeholder="Search my products"
										   aria-label="search products">
									<button type="button" class="btn btn-lg" aria-label="Submit search for products">
										<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>
								</div>
							</div>
						</div>

				    </div><!-- /edit-products -->

				</div><!-- /tab-content -->

		    </div><!-- /container -->

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
        <script src="js/formatting_toolbar.js"></script>
        <script src="js/edit_products/hero_swiper.js"></script>
        <script src="js/edit_products/product_creator.js"></script>
        <script src="js/edit_products/edit_products.js"></script>

    </body>
</html>














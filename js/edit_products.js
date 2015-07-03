
//-----------------------------------------------
//
//		   		 edit_maps app
//			   -----------------
//
// - This file contains all the methods that can
//   be found specifically on edit_products.php
//
//-----------------------------------------------































//-----------------------------------------------
//
//		   	 additional RS methods
//
//-----------------------------------------------

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with no map
RS.prototype.toggleMobileMenu = function(){
	// set the max width of the content cover
	// if the menu is hidden and the window is mobile-sized
	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
		&& window.innerWidth < 768 ){
		// open the menu
		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
		// cover the content
		document.getElementById("content-cover").style.display = "block";
		// set timer to reveal #content-cover
		setTimeout( rsApp.showContentCover , 200 );
	}else{
		// close the menu
		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
		// reveal the content
		document.getElementById("content-cover").style.opacity = "0";
		// set timer to hide #content-cover
		setTimeout( rsApp.hideContentCover , 300 );
	}
}



























var EPA, epApp;

(function(){

	//-----------------------------------------------
	//					EPA class				
	//				  -------------
	//
	// - EPA (epApp) the edit products app for
	//	 edit_products.php
	//
	// - Parent class contains all methods necessary
	//   for the cohesion of all the components that
	//   add new products and edit old ones.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	EPA = function(){

		/* properties */

		// initialize the products swiper
		this.swiper = new Swiper( document.getElementById("products-swiper"), 
								  {
							        slidesPerView: 'auto',
        							centeredSlides: true,
							        spaceBetween: 8
								  }
								);

		// initialize the hero swiper
		this.heroSwiper = new HS( document.getElementsByClassName("slideshow")[0] );

		/* event listeners */

		// new product button
		document.getElementById("new-product-btn")
			.addEventListener("click", this.openNewProductPanel, false);

		// close new product panel
		document.getElementById("close-new-product-panel")
			.addEventListener("click", this.closeNewProductPanel, false);

		// info buttons
		document.getElementById("producer-info")
			.addEventListener("click", this.infoAlert, false);
		document.getElementById("already-listed-info")
			.addEventListener("click", this.infoAlert, false);
	}

	/* METHODS */

	//-----------------------------------------------
	// - Event listener for add-new-product button
	// - Animate open new product panel
	EPA.prototype.openNewProductPanel = function(event){

		// if the product panel is already open
		if( event.target === document.getElementById("close-new-product-panel") )
			return;

		this.className = "";

		// display the little x
		document.getElementById("close-new-product-panel")
			.style.display = "block";

		// display the new product panel
		document.getElementById("new-product-panel")
			.style.display = "block";

		// reinit the hero swiper
		epApp.heroSwiper.swiper.update();

		setTimeout( epApp.fadeInProductPanel, 100 );
	}
	//-----------------------------------------------
	// - timeout function fade in new product panel
	EPA.prototype.fadeInProductPanel = function(){
		document.getElementById("new-product-panel")
			.style.opacity = 1;
	}

	//-----------------------------------------------
	// - event listener to close new product panel
	EPA.prototype.closeNewProductPanel = function(){

		// #new-product-btn background to green
		document.getElementById("new-product-btn").className = "btn btn-lg btn-success"

		// hide the little x
		this.style.display = "none";

		// hide the new product panel
		document.getElementById("new-product-panel")
			.style.opacity = 0;
		document.getElementById("new-product-panel")
			.style.display = "none";
	}

	//-----------------------------------------------
	// - event listener to reveal info alerts
	EPA.prototype.infoAlert = function(){
		// call the insertAlert method 
		rsApp.insertAlert(
							this.dataset.alert,
							this.dataset.text,
							this.parentElement.parentElement.children[1]
						 );
	}






























	//-----------------------------------------------
	//
	//				  HS - Hero Swiper
	//				 ---------------
	//
	// - Class for uploading new pics into the hero
	//   swiper for a product.
	// - This object initiailizes the swiper
	// - Handles the image uploads
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var HS = function( slideshowElem ){

		// initialize the swiper
		this.swiper = new Swiper( slideshowElem.getElementsByClassName("swiper-container")[0], 
								  {
							        slidesPerView: 'auto',
        							centeredSlides: true,
							        spaceBetween: 5
								  }
								);

		// variable property to hold ajax object
		this.xhr = null;

		// hero element
		this.hero = slideshowElem.getElementsByClassName("hero")[0];

		/* construction */
	}

	/* METHODS */


	// file drag hover
	HS.prototype.fileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}
	// file selection event listener
	HS.prototype.fileSelectHandler = function(e) {

			// cancel event and hover styling
			rsApp.fileDragHover(e);
			
			// display the spinner
			e.target.innerHTML = "<span class='glyphicon glyphicon-hourglass loading'></span>";

			// fetch FileList object
			var files = e.target.files || e.dataTransfer.files;// process all File objects

			// upload the file
			epApp.heroSwiper.uploadFile(files[0], e.target.dataset.elem);
	}
	// ajax upload file
	HS.prototype.uploadFile = function(file, elemStr){

		// delete the previous xhr object
		this.xhr = null;

		// create a new one
		this.xhr = new XMLHttpRequest();

		// if file is the correct type and size
		if( (file.type == "image/jpeg" || 
								 file.type == "image/jpg"  ||
								 file.type == "image/png"  ||
								 file.type == "image/gif")
		  	&& file.size < 9999999999999999
		  ){

		  	// add an event listener to the ajax request
		  	this.xhr.onreadystatechange = function(){
		  		if (this.readyState == 4) { console.log(this.responseText);

		  			// turn the response json into an object
		  			this.j = JSON.parse( this.responseText );
				}
		  	}

			// ajax
			this.xhr.open("POST", "http://localhost/routesider/edit_profile.php", true);
			this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
			this.xhr.send(file);
		}
	}






















	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new EPA object
	    epApp = new EPA();

	}, false);	

})();















































































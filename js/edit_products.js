
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
							        pagination: '.swiper-pagination',
							        slidesPerView: 'auto',
        							centeredSlides: true,
							        spaceBetween: 8,
							        initialSlide: 1
								  }
								);

		/* event listeners */

		// new product button
		document.getElementById("new-product-btn")
			.addEventListener("click", this.openNewProductPanel, false);

		// close new product panel
		document.getElementById("close-new-product-panel")
			.addEventListener("click", this.closeNewProductPanel, false);
	}

	/* METHODS */

	//-----------------------------------------------
	// - Event listener for add-new-product button
	// - Animate open new product panel
	EPA.prototype.openNewProductPanel = function(event){

		// if the product panel is already open
		if( event.target === document.getElementById("close-new-product-panel") )
			return;

		// #new-product-btn background to white
		this.style.backgroundColor = "#FFF";

		// remove #new-product-btn padding
		this.style.padding = "0px";

		// change the font color
		this.style.color = "#444";

		// change the font size
		this.style.fontSize = "30px";

		// change the border color
		this.style.borderColor = "#FFF";

		// display the little x
		document.getElementById("close-new-product-panel")
			.style.display = "block";

		// display the new product panel
		document.getElementById("new-product-panel")
			.style.display = "block";

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
		document.getElementById("new-product-btn")
			.style.backgroundColor = "#5CB85C";

		// add #new-product-btn padding
		document.getElementById("new-product-btn")
			.style.padding = "5px";

		// change back the font color
		document.getElementById("new-product-btn")
			.style.color = "#FFF";

		// change back the font size
		document.getElementById("new-product-btn")
			.style.fontSize = "18px";

		// change back the border color
		document.getElementById("new-product-btn")
			.style.borderColor = "#5CB85C";

		// hide the little x
		this.style.display = "none";

		// hide the new product panel
		document.getElementById("new-product-panel")
			.style.opacity = 0;
		document.getElementById("new-product-panel")
			.style.display = "none";
	}





























	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new EPA object
	    epApp = new EPA();

	}, false);	

})();















































































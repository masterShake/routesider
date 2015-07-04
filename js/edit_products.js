
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
	// - Add a method to the array object type to
	//   help move items in HS.slideshow 
	Array.prototype.move = function (old_index, new_index) {
	    if (new_index >= this.length) {
	        var k = new_index - this.length;
	        while ((k--) + 1) {
	            this.push(undefined);
	        }
	    }
	    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	    return this; // for testing purposes
	};





















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

		// filedrag element
		this.filedrag = slideshowElem.getElementsByClassName("filedrag")[0];

		// array of all the image files in the slide in given order
		this.slideshow = [];

		/* construction */

		// dragover event listeners
		this.filedrag.addEventListener("dragover", this.fileDragHover, false);
		this.filedrag.addEventListener("dragleave", this.fileDragHover, false);
		this.filedrag.addEventListener("drop", this.fileSelectHandler, false);
	}

	/* METHODS */


	// file drag hover
	HS.prototype.fileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		// e.target.className = (e.type == "dragover" ? "hover" : "");
	}
	// file selection event listener
	HS.prototype.fileSelectHandler = function(e) {

			// cancel event and hover styling
			epApp.heroSwiper.fileDragHover(e);
			
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

		  			// push the image file onto the slideshow
		  			epApp.heroSwiper.slideshow.push(this.j["filename"]);

		  			// remove the spinning hourglass
		  			epApp.heroSwiper.filedrag.innerHTML = '<span><span class="glyphicon glyphicon-camera"></span>&nbsp;drag &amp; drop<br><span style="font-size: 8px;">-or-</span></span>';
				
		  			// set the hero background image
		  			epApp.heroSwiper.hero.innerHTML = "";
		  			epApp.heroSwiper.hero.style.backgroundImage = "url(uploads/" + this.j['filename'] + ")";

		  			// add a slide to the slideshow
		  			epApp.heroSwiper.addSlide( document.createElement('div'), this.j['filename'] );
				}
		  	}

			// ajax
			this.xhr.open("POST", "", true);
			this.xhr.setRequestHeader("X-file-name", file.name + "." + elemStr);
			this.xhr.send(file);
		}
	}

	//-----------------------------------------------
	// - add a slide to the slideshow
	HS.prototype.addSlide = function(blankDiv, filename){
		
		// set the data-filename attribute
		blankDiv.setAttribute("data-filename", filename);
		
		// add the elements to remove sldie or move it to the front
		blankDiv.innerHTML = '<div class="glyphicon glyphicon-remove-circle"></div>' +
							 '<br>' +
							 '<input type="checkbox" checked>';
		
		// set the slide class
		blankDiv.className = "swiper-slide image-slide";
		
		// set the image background
		blankDiv.style.backgroundImage = "url(uploads/"+filename+")"; // console.log(this.swiper.slides[this.swiper.slides.length - 1]); console.log(blankDiv)
		
		// add event listner to remove circle
		blankDiv.children[0].addEventListener('click', epApp.heroSwiper.removeSlide, false);
		
		// add event listener to move slide to the front
		blankDiv.children[0].addEventListener('click', epApp.heroSwiper.slideToFront, false);
		
		// prepend the element
		this.swiper.prependSlide(blankDiv);
		
		// update
		this.swiper.update();
	}

	//-----------------------------------------------
	// - event listener to remove slide from
	//   slideshow
	HS.prototype.removeSlide = function(){
		
		// remove this filename from the slideshow
		epApp.heroSwiper.slideshow.splice( 
											epApp.heroSwiper.slideshow.indexOf(this.parentElement.dataset.filename),
											1
										 );
		
		// remove the slide from the swiper
		epApp.heroSwiper.swiper.removeSlide( epApp.heroSwiper.swiper.clickedIndex );
		
		// if there are no more slides
		if(epApp.heroSwiper.slideshow.length < 1){
			
			// reset the inner html of the hero
			epApp.heroSwiper.hero.innerHTML = '<div class="glyphicon glyphicon-camera"></div>' + 
											  '<h4>No images yet</h4>';
		
			// remove the background image
			epApp.heroSwiper.hero.style.backgroundImage = "none";
		}
	}

	//-----------------------------------------------
	// - event listener to move slide to the front
	//   of the slideshow
	HS.prototype.slideToFront = function(){

		// move this filename to the front of the slideshow array
		epApp.heroSwiper.slideshow.move(
											epApp.heroSwiper.swiper.clickedIndex,
											0
									   );

		// append a copy to the front
		epApp.heroSwiper.swiper.prependSlide(
												'<div class="swiper-slide image-slide" data-filename="' + this.dataset.filename + '">'+
												'	<div class="glyphicon glyphicon-remove-circle"></div>' +
							 					'	<br>' +
							 					'	<input type="checkbox" checked>' +
											  	'</div>'
											);

		// remove the original slide
		epApp.heroSwiper.swiper.removeSlide( epApp.heroSwiper.swiper.clickedIndex );

		// add event listeners to the new slide
		epApp.heroSwiper.swiper.slides[0].children[0]
			.addEventListener('click', epApp.heroSwiper.removeSlide, false);
		epApp.heroSwiper.swiper.slides[0].children[2]
			.addEventListener('click', epApp.heroSwiper.slideToFront, false);

		// update
		epApp.heroSwiper.swiper.update();
	}




















	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new EPA object
	    epApp = new EPA();

	}, false);	

})();















































































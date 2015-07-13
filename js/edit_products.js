
//-----------------------------------------------
//
//		   		 edit products app
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

		// keep a dictionary of all the formatting toolbars
		this.toolbars = {};

		// keep track of the active toolbar
		this.activeToolbar = null;

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

		// init formatting toolbars
		this.toolbars[0] = new FT(
									document.getElementById("product-name"),
									document.getElementById("product-name").parentElement.children[2],
									0
								 );
		this.toolbars[1] = new FT(
									document.getElementById("product-sub-name"),
									document.getElementById("product-sub-name").parentElement.children[2],
									1
								 );
		this.toolbars[2] = new FT(
									document.getElementById("product-description"),
									document.getElementById("product-description").parentElement.children[2],
									2
								 );
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
		blankDiv.children[2].addEventListener('click', epApp.heroSwiper.slideToFront, false);
		
		// if there are other slides
		if(this.swiper.slides.length > 1)
			this.swiper.slides[0].children[2].checked = false;

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
		
		// if there are no more slides
		if(!epApp.heroSwiper.slideshow.length){
			
			// reset the inner html of the hero
			epApp.heroSwiper.hero.innerHTML = '<div class="glyphicon glyphicon-camera"></div>' + 
											  '<h4>No images yet</h4>';
		
			// remove the background image
			epApp.heroSwiper.hero.style.backgroundImage = "none";
		
		// if this was the first slide in slideshow
		}else if(epApp.heroSwiper.swiper.clickedIndex == 0){

			// set the checked box of the next slide
			epApp.heroSwiper.swiper.slides[1].children[2].checked = true;
		
			// change the hero
			epApp.heroSwiper.hero.style.backgroundImage = 'url(uploads/' + epApp.heroSwiper.slideshow[0] + ')';
		}
		
		// remove the slide from the swiper
		epApp.heroSwiper.swiper.removeSlide( epApp.heroSwiper.swiper.clickedIndex );
	}

	//-----------------------------------------------
	// - event listener to move slide to the front
	//   of the slideshow
	HS.prototype.slideToFront = function(){

		// if this slide is alreay in front
		if(this.parentElement === epApp.heroSwiper.swiper.slides[0]){
			// keep it in check
			this.checked = true; return;
		}

		/* do the style stuff first to avoid race conditions */

		// uncheck the front slide
		epApp.heroSwiper.swiper.slides[0].children[2].checked = false;

		// set the hero
		epApp.heroSwiper.hero.style.backgroundImage = 'url(uploads/'+this.parentElement.dataset.filename+')';

		// move this filename to the front of the slideshow array
		epApp.heroSwiper.slideshow.move(
											epApp.heroSwiper.swiper.clickedIndex,
											0
									   );

		// move the slide
		this.parentElement.parentElement.insertBefore( this.parentElement, this.parentElement.parentElement.children[0] );

		// update
		epApp.heroSwiper.swiper.update();
	}





























	//-----------------------------------------------
	//
	//			  FT (formatting toolbar)
	//			---------------------------
	//
	// - @ inputElem -> html DOM element either
	//   input [type=text] or textarea
	//
	// - @ index -> key reference for epApp
	//
	// - half toolbar is used for input [type=text]
	//
	// - full toolbar is used for textarea
	//
	// - NOTE: the formatting toolbars are found in
	//   the "components" directory. They must be
	//   dynamically included into the file using
	//   php. It is assumed that the div.toolbar elem
	//   is a sibling of the input in the DOM. 
	// 
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var FT = function( inputElem, formattingElem, index ){

		/* properties */

		// keep a ref pointer to the input
		this.inputElem = inputElem;

		// keep a ref pointer to the div.formatting elem
		this.formattingElem = formattingElem;

		// grab all the buttons
		this.buttons = this.formattingElem.getElementsByTagName("button");

		// keep track of the index key
		this.index = index;

		// set the data-index attribute of the input
		this.inputElem.setAttribute("data-index", index);

		// - keep track of the cursor position in the input
		// - starting position 0
		this.cursorPos = 0;

		// keep track of the positions of any highlighted text
		this.highStart, this.highEnd = null;

		// temp array of split string values
		this.splitVals = [];

		/* construction */

		// input focus
		this.inputElem.addEventListener("focus", this.inputFocus, false);

		// input keyup get cursor position
		this.inputElem.addEventListener("keyup", this.getCursorPos, false);

		// mouseup event for highlighted text
		this.inputElem.addEventListener("select", this.getHigh, false);

		// toggle the formatting table
		this.formattingElem.getElementsByClassName("toggle-formatting-table")[0]
			.addEventListener("click", this.toggleTable, false);

		// event listeners to the buttons
		for(var i = 0; i < this.buttons.length; i++){
			this.buttons[i].addEventListener("click", this.markdown, false);
		}
		this.buttons = null;
		delete this.buttons;

	}

	/* METHODS */

	//-----------------------------------------------
	// - event listeners user focuses on text input
	// - reveal the toolbar
	FT.prototype.inputFocus = function(){

		// if there is an active toolbar
		if(epApp.activeToolbar){
			epApp.activeToolbar.formattingElem.style.display = "none";
			document.body.removeEventListener("click", epApp.activeToolbar.inputBlur, true);
		}

		// (re)set the active toolbar
		epApp.activeToolbar = epApp.toolbars[this.dataset.index];

		// show the data-index attribute to reveal the toolbar
		epApp.activeToolbar.formattingElem.style.display = "block";

		// add blur event listener to the document
		document.body.addEventListener("click", epApp.activeToolbar.inputBlur, true);
	}

	//-----------------------------------------------
	// - event listeners user blurs from text input
	// - only hide the toolbar if the user does not
	//   click within the parent.
	FT.prototype.inputBlur = function(event){
		// set the current element
		epApp.currElem = event.target;
		// - loop up to the top parent
		// - make sure we clicked outside of activeDropdown
		while( epApp.currElem !== document.body ){
			// if we get to our active dropdown
			if(epApp.currElem === epApp.activeToolbar.inputElem.parentElement){
				// break out of the loop
				return;
			}
			// set the new currElem
			epApp.currElem = epApp.currElem.parentElement;
		}
		// - If we get this far, we know we clicked away from the input

		// reset the highStart and highEnd properties
		epApp.activeToolbar.highStart, 
		epApp.activeToolbar.highEnd = null;
		// - hide the toolbar
		epApp.activeToolbar.formattingElem.style.display = "none";
		// - remove the event listener 
		document.body.removeEventListener("click", epApp.activeToolbar.inputBlur, true);
	}

	//-----------------------------------------------
	// - event listener to toggle the formatting
	//   instructions table.
	FT.prototype.toggleTable = function(event){

		// prevent the link from linking
		event.preventDefault(); console.log(this.children);

		// if the table is hidden
		if(this.dataset.toggled === "0"){

			// set the attribute
			this.setAttribute("data-toggled", "1");
			
			// change the icon
			this.children[0].className = "glyphicon glyphicon-triangle-top";

			// reveal the table
			this.parentElement.parentElement.children[2].style.display = "inline-table";
		}else{
			this.setAttribute("data-toggled", "0");
			this.children[0].className = "glyphicon glyphicon-triangle-bottom";
			this.parentElement.parentElement.children[2].style.display = "none";
		}

	}

	//-----------------------------------------------
	// - keyup event listener to keep track of user
	//   cursor position
	FT.prototype.getCursorPos = function(event){
		// set the cursorPos property (int)
		epApp.activeToolbar.cursorPos = this.selectionStart;
		// if the selection start does not match the end
		if(this.selectionStart != this.selectionEnd)
			epApp.activeToolbar.getHigh(event);
		else
			epApp.activeToolbar.highStart, 
			epApp.activeToolbar.highEnd = null;
	}

	//-----------------------------------------------
	// - mouseup event listener to look for
	//   highlighted text
	FT.prototype.getHigh = function(event){ 
		// set the highlighed start and end properties
		epApp.activeToolbar.highStart = event.target.selectionStart;
		epApp.activeToolbar.highEnd = event.target.selectionEnd;
	}

	//-----------------------------------------------
	// - split the text of the input
	// - if not highlighted, split at cursor position
	// - if highlighted, split at selectionStart &
	//   selectionEnd as denoted by the FT.highStart
	//   & FT.highEnd properties
	// - return an array with split strings
	FT.prototype.splitInput = function(){
		// if we have highlighted text
		if(this.highEnd)
			// split the value of the input 3 ways
			return [
					  this.inputElem.value.substring(0, epApp.activeToolbar.highStart),
					  this.inputElem.value.substring(epApp.activeToolbar.highStart, epApp.activeToolbar.highEnd),
					  this.inputElem.value.substring(epApp.activeToolbar.highEnd)
				   ];
		else
			// split the value 2 ways at the last position of the cursor
			return [
					  epApp.activeToolbar.inputElem.value.substring(0, epApp.activeToolbar.cursorPos),
					  epApp.activeToolbar.inputElem.value.substring(epApp.activeToolbar.cursorPos)
				   ];
	}

	//-----------------------------------------------
	// - set the focus and change the cursor
	// - @ offset -> add some number to cursor pos
	FT.prototype.shiftFocus = function(offset){

		// focus & move the cursor to its previous position
		this.inputElem.focus();

		// change the cursorPos property
		this.cursorPos = this.inputElem.selectionStart - offset;

		// move the cursor to the cursorPos + 2
		this.inputElem.setSelectionRange
			( 
				this.cursorPos,
				this.cursorPos
			);

	}

	//-----------------------------------------------
	// - formatting button event listener
	// - insert characters on either side of cursor
	//   or highlighted text as denoted by given
	//   dataset attributes
	FT.prototype.markdown = function(){

		// set splitVals properties
		epApp.activeToolbar.splitVals = epApp.activeToolbar.splitInput();

		// set the value of the input
		epApp.activeToolbar.inputElem.value = 
			(epApp.activeToolbar.splitVals.length > 2) ?
				
				// for highlighted text
				epApp.activeToolbar.splitVals[0] + 
				this.dataset.front +
				epApp.activeToolbar.splitVals[1] + 
				this.dataset.rear +
				epApp.activeToolbar.splitVals[2] 	   :

				// for unhighlighted text
				epApp.activeToolbar.splitVals[0] + 
				this.dataset.front +
				this.dataset.rear + 
				epApp.activeToolbar.splitVals[1]	   ;

		// shift focus
		epApp.activeToolbar.shiftFocus( this.dataset.rear.length );

		// blur away from the button
		this.blur();
	}















	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new EPA object
	    epApp = new EPA();

	}, false);	

})();














































































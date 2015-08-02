
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

		// initialize the product creator
		this.pc = new PC();

		// init formatting toolbars
		// this.toolbars[0] = new FT(
		// 							document.getElementById("product-name"),
		// 							document.getElementById("product-name").parentElement.children[2],
		// 							0
		// 						 );
		// this.toolbars[1] = new FT(
		// 							document.getElementById("product-sub-name"),
		// 							document.getElementById("product-sub-name").parentElement.children[2],
		// 							1
		// 						 );
		// this.toolbars[2] = new FT(
		// 							document.getElementById("product-description"),
		// 							document.getElementById("product-description").parentElement.children[2],
		// 							2
		// 						 );
	}

	/* METHODS */

	





























	// //-----------------------------------------------
	// //
	// //			  FT (formatting toolbar)
	// //			---------------------------
	// //
	// // - @ inputElem -> html DOM element either
	// //   input [type=text] or textarea
	// //
	// // - @ index -> key reference for epApp
	// //
	// // - half toolbar is used for input [type=text]
	// //
	// // - full toolbar is used for textarea
	// //
	// // - NOTE: the formatting toolbars are found in
	// //   the "components" directory. They must be
	// //   dynamically included into the file using
	// //   php. It is assumed that the div.toolbar elem
	// //   is a sibling of the input in the DOM. 
	// // 
	// //-----------------------------------------------

	// /* CONSTRUCTOR */

	// var FT = function( inputElem, formattingElem, index ){

	// 	/* properties */

	// 	// keep a ref pointer to the input
	// 	this.inputElem = inputElem;

	// 	// keep a ref pointer to the div.formatting elem
	// 	this.formattingElem = formattingElem;

	// 	// grab all the buttons
	// 	this.buttons = this.formattingElem.getElementsByTagName("button");

	// 	// keep track of the index key
	// 	this.index = index;

	// 	// set the data-index attribute of the input
	// 	this.inputElem.setAttribute("data-index", index);

	// 	// - keep track of the cursor position in the input
	// 	// - starting position 0
	// 	this.cursorPos = 0;

	// 	// keep track of the positions of any highlighted text
	// 	this.highStart, this.highEnd = null;

	// 	// temp array of split string values
	// 	this.splitVals = [];

	// 	/* construction */

	// 	// input focus
	// 	this.inputElem.addEventListener("focus", this.inputFocus, false);

	// 	// input keyup get cursor position
	// 	this.inputElem.addEventListener("keyup", this.getCursorPos, false);

	// 	// mouseup event for highlighted text
	// 	this.inputElem.addEventListener("select", this.getHigh, false);

	// 	// toggle the formatting table
	// 	this.formattingElem.getElementsByClassName("toggle-formatting-table")[0]
	// 		.addEventListener("click", this.toggleTable, false);

	// 	// event listeners to the buttons
	// 	for(var i = 0; i < this.buttons.length; i++){
	// 		this.buttons[i].addEventListener("click", this.markdown, false);
	// 	}
	// 	this.buttons = null;
	// 	delete this.buttons;

	// }

	// /* METHODS */

	// //-----------------------------------------------
	// // - event listeners user focuses on text input
	// // - reveal the toolbar
	// FT.prototype.inputFocus = function(){

	// 	// if there is an active toolbar
	// 	if(epApp.activeToolbar){
	// 		epApp.activeToolbar.formattingElem.style.display = "none";
	// 		document.body.removeEventListener("click", epApp.activeToolbar.inputBlur, true);
	// 	}

	// 	// (re)set the active toolbar
	// 	epApp.activeToolbar = epApp.toolbars[this.dataset.index];

	// 	// show the data-index attribute to reveal the toolbar
	// 	epApp.activeToolbar.formattingElem.style.display = "block";

	// 	// add blur event listener to the document
	// 	document.body.addEventListener("click", epApp.activeToolbar.inputBlur, true);
	// }

	// //-----------------------------------------------
	// // - event listeners user blurs from text input
	// // - only hide the toolbar if the user does not
	// //   click within the parent.
	// FT.prototype.inputBlur = function(event){
	// 	// set the current element
	// 	epApp.currElem = event.target;
	// 	// - loop up to the top parent
	// 	// - make sure we clicked outside of activeDropdown
	// 	while( epApp.currElem !== document.body ){
	// 		// if we get to our active dropdown
	// 		if(epApp.currElem === epApp.activeToolbar.inputElem.parentElement){
	// 			// break out of the loop
	// 			return;
	// 		}
	// 		// set the new currElem
	// 		epApp.currElem = epApp.currElem.parentElement;
	// 	}
	// 	// - If we get this far, we know we clicked away from the input

	// 	// reset the highStart and highEnd properties
	// 	epApp.activeToolbar.highStart, 
	// 	epApp.activeToolbar.highEnd = null;
	// 	// - hide the toolbar
	// 	epApp.activeToolbar.formattingElem.style.display = "none";
	// 	// - remove the event listener 
	// 	document.body.removeEventListener("click", epApp.activeToolbar.inputBlur, true);
	// }

	// //-----------------------------------------------
	// // - event listener to toggle the formatting
	// //   instructions table.
	// FT.prototype.toggleTable = function(event){

	// 	// prevent the link from linking
	// 	event.preventDefault(); console.log(this.children);

	// 	// if the table is hidden
	// 	if(this.dataset.toggled === "0"){

	// 		// set the attribute
	// 		this.setAttribute("data-toggled", "1");
			
	// 		// change the icon
	// 		this.children[0].className = "glyphicon glyphicon-triangle-top";

	// 		// reveal the table
	// 		this.parentElement.parentElement.children[2].style.display = "inline-table";
	// 	}else{
	// 		this.setAttribute("data-toggled", "0");
	// 		this.children[0].className = "glyphicon glyphicon-triangle-bottom";
	// 		this.parentElement.parentElement.children[2].style.display = "none";
	// 	}

	// }

	// //-----------------------------------------------
	// // - keyup event listener to keep track of user
	// //   cursor position
	// FT.prototype.getCursorPos = function(event){
	// 	// set the cursorPos property (int)
	// 	epApp.activeToolbar.cursorPos = this.selectionStart;
	// 	// if the selection start does not match the end
	// 	if(this.selectionStart != this.selectionEnd)
	// 		epApp.activeToolbar.getHigh(event);
	// 	else
	// 		epApp.activeToolbar.highStart, 
	// 		epApp.activeToolbar.highEnd = null;
	// }

	// //-----------------------------------------------
	// // - mouseup event listener to look for
	// //   highlighted text
	// FT.prototype.getHigh = function(event){ 
	// 	// set the highlighed start and end properties
	// 	epApp.activeToolbar.highStart = event.target.selectionStart;
	// 	epApp.activeToolbar.highEnd = event.target.selectionEnd;
	// }

	// //-----------------------------------------------
	// // - split the text of the input
	// // - if not highlighted, split at cursor position
	// // - if highlighted, split at selectionStart &
	// //   selectionEnd as denoted by the FT.highStart
	// //   & FT.highEnd properties
	// // - return an array with split strings
	// FT.prototype.splitInput = function(){
	// 	// if we have highlighted text
	// 	if(this.highEnd)
	// 		// split the value of the input 3 ways
	// 		return [
	// 				  this.inputElem.value.substring(0, epApp.activeToolbar.highStart),
	// 				  this.inputElem.value.substring(epApp.activeToolbar.highStart, epApp.activeToolbar.highEnd),
	// 				  this.inputElem.value.substring(epApp.activeToolbar.highEnd)
	// 			   ];
	// 	else
	// 		// split the value 2 ways at the last position of the cursor
	// 		return [
	// 				  epApp.activeToolbar.inputElem.value.substring(0, epApp.activeToolbar.cursorPos),
	// 				  epApp.activeToolbar.inputElem.value.substring(epApp.activeToolbar.cursorPos)
	// 			   ];
	// }

	// //-----------------------------------------------
	// // - set the focus and change the cursor
	// // - @ offset -> add some number to cursor pos
	// FT.prototype.shiftFocus = function(offset){

	// 	// focus & move the cursor to its previous position
	// 	this.inputElem.focus();

	// 	// change the cursorPos property
	// 	this.cursorPos = this.inputElem.selectionStart - offset;

	// 	// move the cursor to the cursorPos + 2
	// 	this.inputElem.setSelectionRange
	// 		( 
	// 			this.cursorPos,
	// 			this.cursorPos
	// 		);

	// }

	// //-----------------------------------------------
	// // - formatting button event listener
	// // - insert characters on either side of cursor
	// //   or highlighted text as denoted by given
	// //   dataset attributes
	// FT.prototype.markdown = function(){

	// 	// set splitVals properties
	// 	epApp.activeToolbar.splitVals = epApp.activeToolbar.splitInput();

	// 	// set the value of the input
	// 	epApp.activeToolbar.inputElem.value = 
	// 		(epApp.activeToolbar.splitVals.length > 2) ?
				
	// 			// for highlighted text
	// 			epApp.activeToolbar.splitVals[0] + 
	// 			this.dataset.front +
	// 			epApp.activeToolbar.splitVals[1] + 
	// 			this.dataset.rear +
	// 			epApp.activeToolbar.splitVals[2] 	   :

	// 			// for unhighlighted text
	// 			epApp.activeToolbar.splitVals[0] + 
	// 			this.dataset.front +
	// 			this.dataset.rear + 
	// 			epApp.activeToolbar.splitVals[1]	   ;

	// 	// shift focus
	// 	epApp.activeToolbar.shiftFocus( this.dataset.rear.length );

	// 	// blur away from the button
	// 	this.blur();
	// }















	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new EPA object
	    epApp = new EPA();

	}, false);	

})();















































































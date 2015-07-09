
//-----------------------------------------------
//
//		   		 edit social media app
//			   -----------------
//
// - This file contains all the unique methods 
//   that can be found specifically on 
//   edit_social_media.php
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
// RS.prototype.toggleMobileMenu = function(){
// 	// set the max width of the content cover
// 	// if the menu is hidden and the window is mobile-sized
// 	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
// 		&& window.innerWidth < 768 ){
// 		// open the menu
// 		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
// 		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
// 		// cover the content
// 		document.getElementById("content-cover").style.display = "block";
// 		// set timer to reveal #content-cover
// 		setTimeout( rsApp.showContentCover , 200 );
// 	}else{
// 		// close the menu
// 		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
// 		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
// 		// reveal the content
// 		document.getElementById("content-cover").style.opacity = "0";
// 		// set timer to hide #content-cover
// 		setTimeout( rsApp.hideContentCover , 300 );
// 	}
// }




















var ESM, esmApp;

(function(){

	//-----------------------------------------------
	//					ESM class				
	//				  -------------
	//
	// - ESM (esmApp) javascript app for
	//	 edit_social_media.php
	//
	// - Parent class contains all methods necessary
	//   active and deactive social media profiles.
	//
	// - Allow business to edit which content is 
	//   included in their business feed.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	ESM = function(){

		/* properties */

		// array of popover objects
		this.popovers = [];
		// popover that is currently open
		this.activePopover = null;
		// temp variable to keep track of elems while looping
		this.currPopElem = null;

		/* construction */

		// initialize the popovers
		this.popovers.push(
							new Popover(document.getElementById("activate-inst").children[0], 0)
						  );

	}

	/* METHODS */


























	//-----------------------------------------------
	//					  Popover
	//					-----------
	//
	// - Toggle popover elements
	//
	// - @ elem -> the element when clicked reveals
	//   the popover
	//
	// - @ i -> some index to find the elem in the
	//   parent object's popover array property
	//
	// - Keeping consistent with twitter bootstrap,
	//   elem must have a data-title attribute, and
	//   a data-content attribute.
	//
	// - Be sure to use HTML special characters in
	//   the values of the data- attributes.
	// 
	// - Popover element is dynamically added to dom
	//   durring construction of the object.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var Popover = function(elem, i){ console.log(elem);

		/* properties */

		// index of this Popover object in the parent's array
		this.index = i;

		/* construction */

		// create the popover
		this.popover = document.createElement("div");
		this.popover.className = "popover top";

		// set the inner HTML
		this.popover.innerHTML = '<div class="arrow"></div>' +
						 '<h3 class="popover-title">' + elem.dataset.title + '</h3>' +
						 '<div class="popover-content">' + elem.dataset.content + '</div>';

		// insert the popover just before the index
		elem.parentElement.insertBefore(this.popover, elem);

		// set the index of the elem
		elem.setAttribute("data-index", this.index);

		// add an event listener to the elem to toggle popover
		elem.addEventListener("click", this.toggle, false);
	}

	//-----------------------------------------------
	// - toggle the display of the popover
	Popover.prototype.toggle = function(){

		// if the popover is hidden
		if( esmApp.popovers[this.dataset.index].popover.offsetParent === null ){

			// set the active popover
			esmApp.activePopover = esmApp.popovers[this.dataset.index];

			// display the popover element
			esmApp.activePopover.popover.style.display = "block";

			// add event listener to the body to close the popover
			document.body.addEventListener("click", esmApp.activePopover.hide, true);
		
		// if the popover is showing
		}else{
			// hide it
			esmApp.activePopover.popover.style.display = "none";
			// remove the event listener from the body
			document.body.removeEventListener("click", esmApp.activePopover.hide, true);
		}
	}

	//-----------------------------------------------
	// - hide the active popover elem
	Popover.prototype.hide = function(){

		// set the current element
		esmApp.currPopElem = event.target;
		// - loop up to the top parent
		// - make sure we clicked outside of activeDropdown
		while( esmApp.currPopElem !== document.body ){
			// if we get to our active dropdown
			if(esmApp.currPopElem === esmApp.activePopover.popover){
				// break out of the loop
				return;
			}
			// set the new currPopElem
			esmApp.currPopElem = esmApp.currPopElem.parentElement;
		}
		// - If we get this far, we need to close the dropdown
		//   and remove the event listeners.
		esmApp.activePopover.popover.style.display = "none";
		document.body.removeEventListener("click", esmApp.activePopover.hide, true);

	}
















	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new ESM (edit social media) object
	    esmApp = new ESM();

	}, true);	

})();










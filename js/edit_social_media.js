
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

		// initialize the SocialMediaMod object
		this.socialMod = new SocialMediaMod();

		/* construction */

		// initialize the popovers
		this.popovers.push(
							new Popover(document.getElementById("activate-face").children[0], 0),
							new Popover(document.getElementById("activate-inst").children[0], 1)
						  );

	}

	/* METHODS */






























	//-----------------------------------------------
	//					SocialMediaMod
	//				  ------------------
	//
	// - launch the popup window to get user 
	//   credentials & token
	//
	// - receive token upon confirmation
	//
	// - make ajax curl request to get additional
	//   user info.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var SocialMediaMod = function(){

		/* properties */

		// keep track of which window is currently open
		this.currentNetwork = null;

		// variable to receive user approval token
		this.userToken = 0;

		// credentials for each of the social networks
		this.instagram = {
						   pagetitle : "Instagram connect",
								 url : "https://api.instagram.com/oauth/authorize/?client_id=6f469fae7d024a83ae77a5d463181af0&redirect_uri=http%3A%2F%2Flocalhost%2Froutesider%2Fscripts%2Fauth.php%3Fnetwork%3Dinstagram&response_type=code",
						windowparams : "scrollbars=yes,width=475,height=425"
						 };

		/* initialize */

		// set timeout to give the popovers a chance to initialize
		setTimeout(function(){

			// add instagram account event listener
			document.getElementById("activate-inst")
				.getElementsByTagName("button")[0]
					.addEventListener("click", esmApp.socialMod.requestAuth, false);

		}, 1000)

	}

	/* METHODS */

	//-----------------------------------------------
	// - open a new window and send an authorization
	//   request
	SocialMediaMod.prototype.requestAuth = function(){

		// set the current network property
		esmApp.socialMod.activeNetwork = this.dataset.network;

		//open the auth window
		window.open( esmApp.socialMod[ this.dataset.network ].url, 
					 esmApp.socialMod[ this.dataset.network ].pagetitle, 
					 esmApp.socialMod[ this.dataset.network ].windowparams);

	}

	//-----------------------------------------------
	// - set a timed interval to periodically check
	//   for user approval
	SocialMediaMod.prototype.authorize = function( network, code ){

		console.log(network);

		console.log(code);

	}


















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

	var Popover = function(elem, i){

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

		// determine the position of the element relative #page-content
		this.popover.style.left = (elem.getBoundingClientRect().left - (elem.offsetWidth / 2) - 8) + "px";

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










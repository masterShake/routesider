
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

		// popover that is currently open
		this.activePopover = null;
		// temp variable to keep track of elems while looping
		this.currPopElem = null;

		// initialize the SocialMediaMod object
		this.socialMod = new SocialMediaMod();

		/* construction */
		
		// activate network event listener btns

		// instagram
		document.getElementById("activate-inst").children[0]
			.addEventListener("click", this.showPopover, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - toggle the display of the popover
	ESM.prototype.showPopover = function(){ console.log("toggle button clicked");

		// set the active popover
		esmApp.activePopover = this.parentElement.children[2];

		// display the popover element
		esmApp.activePopover.style.display = "block";

		// add event listener to the body to close the popover
		document.body.addEventListener("click", esmApp.hidePopover, true);
	}

	//-----------------------------------------------
	// - hide the active popover elem
	ESM.prototype.hidePopover = function(event){ console.log("body clicked");


		// set the current element
		esmApp.currPopElem = event.target;
		// - loop up to the top parent
		// - make sure we clicked outside of activeDropdown
		while( esmApp.currPopElem !== document.body){
			// if we get to our active dropdown
			if( esmApp.currPopElem === esmApp.activePopover ){
				// break out of the loop
				return;
			}
			// set the new currPopElem
			esmApp.currPopElem = esmApp.currPopElem.parentElement;
		}
		// - If we get this far, we need to close the dropdown
		//   and remove the event listeners.
		esmApp.activePopover.style.display = "none";
		document.body.removeEventListener("click", esmApp.hidePopover, true);
	}


























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

		/* initialize */

		// add instagram account event listener
		document.getElementById("activate-inst")
			.getElementsByTagName("button")[1]
				.addEventListener("click", this.requestAuth, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - open a new window and send an authorization
	//   request
	SocialMediaMod.prototype.requestAuth = function(){

		// set the current network property
		esmApp.socialMod.activeNetwork = this.dataset.network;

		//open the auth window
		window.open( this.dataset.url, 
					 this.dataset.pagetitle,
					 "scrollbars=yes,width=475,height=425"
				   );

	}

	//-----------------------------------------------
	// - callback after a user has added a social
	//   network
	// - perform an ajax call to retrieve the data
	SocialMediaMod.prototype.authorize = function( network ){

		rsApp.ajax(
					"POST",
					document.URL,
					"network="+network,
					esmApp.socialMod.insertPosts
					false
				  );
	}

	//-----------------------------------------------
	// - ajax callback get posts and assemble the
	//   dom objects
	// - add event listeners to make the posts 
	//   editable
	SocialMediaMod.prototype.insertPosts = function(response){

		console.log(response);

	}
































	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new ESM (edit social media) object
	    esmApp = new ESM();

	}, true);	

})();










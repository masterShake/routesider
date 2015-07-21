
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

//-----------------------------------------------
// - ajax function designed to avoid memory leaks
// - @ajaxOpts -> object with 4 params:
//		+ ajaxOpts.method (GET, POST, etc.)
//		+ ajaxOpts.url
//		+ ajaxOpts.params
//		+ ajaxOpts.callback
//	
RS.prototype.ajax = function( ajaxOpts ){
    var i = this.indexer++;
    this.tempObjs[i] = new XMLHttpRequest();
    this.tempObjs[i].open(ajaxOpts.method, ajaxOpts.url, true);
    this.tempObjs[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.tempObjs[i].onreadystatechange = function() {
        if(rsApp.tempObjs[i].readyState == 4 && rsApp.tempObjs[i].status == 200) {
            if(ajaxOpts.callback)
                ajaxOpts.callback(rsApp.tempObjs[i].responseText);
            rsApp.tempObjs[i] = null;
            delete rsApp.tempObjs[i];
        }
    }
    this.tempObjs[i].send(ajaxOpts.params);
};


















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

		// temp variable to hold all the social media posts
		this.posts = document.getElementsByClassName("social-media-post");

		/* initialize */

		// add instagram account event listener
		document.getElementById("activate-inst")
			.getElementsByTagName("button")[1]
				.addEventListener("click", this.requestAuth, false);

		// loop through the social media posts
		for(var i = 0; i < this.posts.length; i++){
			
			// attach event listener to the delete button
			this.posts[i].children[0]
			 .addEventListener("click", this.launchModal, false);
		}
		this.posts = null;
		delete this.posts;

		// add event listeners to the modal buttons
		document.getElementById("confirmation-modal")
				.getElementsByTagName("button")[0]
					.addEventListener("click", this.hideModal, false);

		document.getElementById("confirmation-modal")
				.getElementsByTagName("button")[1]
					.addEventListener("click", this.hideModal, false);

		document.getElementById("confirmation-modal")
				.getElementsByTagName("button")[2]
					.addEventListener("click", this.hideModal, false);
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

		rsApp.ajax({
					method : "POST",
					url : document.URL,
					params : "network="+network,
					callback : esmApp.socialMod.insertPosts
				  });
	}

	//-----------------------------------------------
	// - ajax callback get posts and assemble the
	//   dom objects
	// - add event listeners to make the posts 
	//   editable
	SocialMediaMod.prototype.insertPosts = function(response){

		console.log(response);

	}

	//-----------------------------------------------
	// - display the modal
	SocialMediaMod.prototype.launchModal = function(){ console.log("launch modal called");
		// display the modal elem
		document.getElementById("confirmation-modal").style.display = "block";
		setTimeout( esmApp.socialMod.animateModal, 10 );
	}
	//-----------------------------------------------
	// - timeout function
	// - animate the modal after displaying
	SocialMediaMod.prototype.animateModal = function(){
		document.getElementById("confirmation-modal").style.opacity = "1";
		document.getElementById("confirmation-modal").children[0].style.top = "100px";
	}


	//-----------------------------------------------
	// - hide the modal
	// - trigger the callback if required
	SocialMediaMod.prototype.hideModal = function(){
		// hide the modal
		document.getElementById("confirmation-modal").style.opacity = "0";
		document.getElementById("confirmation-modal").children[0].style.top = "-200px";
		setTimeout( esmApp.socialMod.hideModalElem, 400);

	}
	//-----------------------------------------------
	// - timeout function
	// - hide the modal after animating
	SocialMediaMod.prototype.hideModalElem = function(){
		document.getElementById("confirmation-modal").style.display = "none";
	}

	//-----------------------------------------------
	// - remove the selected social media post elem 
	//   from the feed
	// - ajax call to remove the post from the db, 
	//   no callback
	SocialMediaMod.prototype.deletePost = function( netowrk, postId ){

		rsApp.ajax({
					method : "POST",
					url : document.URL,
					params : "network="+network+"&post_id="+postId,
					callback : false
				  });
	}






























	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new ESM (edit social media) object
	    esmApp = new ESM();

	}, true);	

})();










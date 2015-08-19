
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


















var ESM, esmApp;

(function(){

	//-----------------------------------------------
	//			  ESM - edit social media			
	//			---------------------------
	//
	// - Allow business to edit which content is 
	//   included in their business feed.
	//
	// - populates social feed with results
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	ESM = function(){

		/* properties */

		// initialize the searchbar
		this.searchBar = new SB();

		// initialize the SMM object
		this.socialMod = new SMM();

		/* construction */
		
		// activate network event listener btns

		// facebook
		document.getElementById("activate-face").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);
		// instagram
		document.getElementById("activate-inst").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);
		// tumblr
		document.getElementById("activate-tumb").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);
		// twitter
		document.getElementById("activate-twit").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);
		// google
		document.getElementById("activate-goog").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);
		// linked in
		document.getElementById("activate-link").children[0]
			.addEventListener("click", rsApp.toggleDropdown, false);

	}

	/* METHODS */


























	//-----------------------------------------------
	//					SB - search bar
	//				  -------------------
	//
	// - initialize new autocomplete object
	//
	// - attach event listeners to the dropdown & the
	//   post-type buttons
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var SB = function(){

		/* properties */

		// include in search
		this.imgs = 1;
		this.vids = 1;

		// autocomplete object
		// this.autocomplete = new AC();

		/* event listeners */

		// toggle image and video
		document.getElementById("search-media").children[0]
			.addEventListener("click", this.toglBtns, false);
		document.getElementById("search-media").children[1]
			.addEventListener("click", this.toglBtns, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - toggle image & video buttons event listener
	// - set searchbar properties
	SB.prototype.toglBtns = function(){

		// if button is active
		if( this.className.substr( this.className.length - 6 ) ){

			// remove the active class
			this.className = this.className.substr( 0, this.className.length - 7 );

			// set the searchBar property
			esmApp.searchBar[this.dataset.prop] = 0;
		
		// if button inactive
		}else{

			// add the class
			this.className = this.className + " active";

			// set the searchBar property
			esmApp.searchBar[this.dataset.prop] = 1;

		}

	}

	//-----------------------------------------------
	// - ajax call to get user posts
	// - @ q -> query (string)
	// - @ c -> callback (function)
	// - callback performed by esmApp
	SB.prototype.query = function(q, c){

		rsApp.ajax({

			method : "POST",
			url : document.URL,
			params: "q=" + q + "&n=0&i=" + this.imgs + "&v=" + this.vids,
			callback : c
		})

	}






















	//-----------------------------------------------
	//				  AC - autocomplete
	//				---------------------
	//
	// - add keyup & other event listeners
	//
	// - toggle display select dropdown options
	//
	// - coordinate with the searchbar
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var AC = function( elem ){

		/* properties */

		/* add event listeners */

	}

	/* METHODS */

	//-----------------------------------------------
	// - autocomplete keyup event listener
	AC.prototype.ku = function(){

		// if there is any text in the box
		if( this.value ){

			this.parentElement.children[1].style.display = "block";

		}else{

			// hide the autocomplete element
			this.parentElement.children[1].style.display = "none";

		}

	}



















	//-----------------------------------------------
	//			 SMM - social media module
	//		   -----------------------------
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

	var SMM = function(){

		/* properties */

		// keep track of which window is currently open
		this.aNet = null;

		// variable to receive user approval token
		this.userToken = 0;

		// temp variable to hold all the social media posts
		this.posts = document.getElementsByClassName("social-media-post");

		// create a modal object
		this.modal = new Modal();

		/* initialize */

		// add instagram account event listener
		document.getElementById("activate-inst")
			.getElementsByTagName("button")[1]
				.addEventListener("click", this.requestAuth, false);

		// loop through the social media posts
		for(var i = 0; i < this.posts.length; i++){
			
			// attach event listener to the delete button
			this.posts[i].children[0]
			 .addEventListener("click", this.modal.launchModal, false);
		}
		this.posts = null;
		delete this.posts;
	}

	/* METHODS */

	//-----------------------------------------------
	// - open a new window and send an authorization
	//   request
	SMM.prototype.requestAuth = function(){

		// set the current network property
		esmApp.socialMod.aNet = this.dataset.network;

		//open the auth window
		window.open( this.dataset.url, 
					 this.dataset.network,
					 "scrollbars=yes,width=475,height=425"
				   );
	}

	//-----------------------------------------------
	// - callback after a user has added a social
	//   network
	// - perform an ajax call to retrieve the data
	// - scroll to social feed if mobile
	// - query updated content
	SMM.prototype.authorize = function(){

		// show the loading animation
		document.getElementById("social-posts")
			.innerHTML = '<span class="glyphicon glyphicon-hourglass spinner"></span>';

		// scroll to the posts
		location.href = "#";
		location.href = "#social-posts";

		// ajax query
		esmApp.searchBar.query("", esmApp.socialMod.insertPosts);
	}

	//-----------------------------------------------
	// - ajax callback get posts and assemble the
	//   dom objects
	// - add event listeners to make the posts 
	//   editable
	SMM.prototype.insertPosts = function(r){

		console.log(r);

		// document.getElementById("social-posts").innerHTML = r;

		// add event listeners
	}

	//-----------------------------------------------
	// - remove the selected social media post elem 
	//   from the feed
	// - ajax call to remove the post from the db, 
	//   no callback
	SMM.prototype.deletePost = function(){ console.log("delete has been called.");

		rsApp.ajax({
					method : "POST",
					url : document.URL,
					params : "network="+this.modal.network+"&post_id="+this.modal.id,
					callback : this.ajaxCallback
				  });
	}

	//-----------------------------------------------
	// - ajax callback for debuggin purposes only
	SMM.prototype.ajaxCallback = function(response){
		console.log("here is the response:\n");
		console.log(response);
	}

	//-----------------------------------------------
	// - display instagram video event listener
	SMM.prototype.showVid = function(){

		// temp variable, create iframe 
		esmApp.socialMod.newVid = document.createElement("iframe")
									// set keep track of post id
									.setAttribute("data-postid", this.parentElement.id);
		// set the source
		esmApp.socialMod.src = this.dataset.url;

		// add event listener to on load 
		esmApp.socialMod.newVid.onload = esmApp.socialMod.swap;
	} 
	//-----------------------------------------------
	// - showVid helper event listener
	// - called when video is loaded
	SMM.prototype.swap = function(){

		console.log(this);

		// display the iframe
		// document.getElementById(this.dataset.postid)
		// 	.insertBefore( 
		// 		document.getElementById(this.dataset.postid)
		// 			.chidlren,
		// 		this );

	}



















	//-----------------------------------------------
	//					 Modal
	//				   ---------
	//
	// - launch modal
	//
	// - handle callback
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var Modal = function(){

		/* properties */

		// keep track of which post is to be deleted
		this.network = null;
		this.id = null;

		/* init */

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
	// - display the modal
	Modal.prototype.launchModal = function(){
		// set the modal properties
		esmApp.socialMod.modal.network = this.dataset.network;
		esmApp.socialMod.modal.id = this.dataset.id;
		// display the modal elem
		document.getElementById("confirmation-modal").style.display = "block";
		setTimeout( esmApp.socialMod.modal.animateModal, 1 );
	}
	//-----------------------------------------------
	// - timeout function
	// - animate the modal after displaying
	Modal.prototype.animateModal = function(){
		document.getElementById("confirmation-modal").style.opacity = "1";
		document.getElementById("confirmation-modal").children[0].style.top = "100px";
	}

	//-----------------------------------------------
	// - hide the modal
	// - trigger the callback if required
	Modal.prototype.hideModal = function(){
		// hide the modal
		document.getElementById("confirmation-modal").style.opacity = "0";
		document.getElementById("confirmation-modal").children[0].style.top = "-200px";
		setTimeout( esmApp.socialMod.modal.hideModalElem, 400);

		// if user confirmed delete
		if(this.hasAttribute("data-confirm"))
			esmApp.socialMod.deletePost();

	}
	//-----------------------------------------------
	// - timeout function
	// - hide the modal after animating
	Modal.prototype.hideModalElem = function(){
		document.getElementById("confirmation-modal").style.display = "none";
	}























	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    // create new RS object
	    rsApp = new RS();

	    // create new ESM (edit social media) object
	    esmApp = new ESM();

	}, true);	

})();










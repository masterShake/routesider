
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

		// random temp variable
		this.temp;

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
		this.nets = [];

		// all the network checkboxes in the dropdown
		this.networks = document.getElementById("network-select")
				.getElementsByTagName("input");

		// autocomplete object
		this.autocomplete = new AC();

		/* event listeners */

		// toggle image and video
		document.getElementById("search-media").children[0]
			.addEventListener("click", this.toglBtns, false);
		document.getElementById("search-media").children[1]
			.addEventListener("click", this.toglBtns, false);

		// active network dropdown
		document.getElementById("search-network")
			.addEventListener("click", rsApp.toggleDropdown, false);

		// "all networks" checkbox
		this.networks[0].addEventListener("change", this.allNet, false);

		// loop through the network inputs
		for(var i = 1; i < this.networks.length; i++)

			// add the change event listner
			this.networks[i].addEventListener("change", this.netBox, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - handle "all networks" textbox change event
	// - only change the other textboxes on check
	SB.prototype.allNet = function(){

		// if checked --> unchecked
		if( !this.checked )
			// do nothing
			return;
			

		// loop through all the networks
		for(var i = 1, len = esmApp.searchBar.networks.length; i < len; i++)
			// check all the inputs
			esmApp.searchBar.networks[i].checked = true;

		// set the button inner html
		document.getElementById("search-network").children[0]
			.innerHTML = "all networks";

		// query + update
	}


	//-----------------------------------------------
	// - handle social network textbox change events
	SB.prototype.netBox = function(){

		// if [x] --> [ ] unchecked
		if( !this.checked ){

			// uncheck "all networks" checkbox
			this.parentElement
					.parentElement
						.children[0]
							.children[0]
								.checked = false;

			// look for the icon in the dropdown button
			esmApp.temp = document.getElementById("search-network")
							.getElementsByClassName( "icon-"+this.dataset.icon );
			// if it's there
			if( esmApp.temp.length )
				// remove it
				esmApp.temp[0].parentElement.removeChild(esmApp.temp[0]);

		// if [ ] --> [x] checked & so are all others
		}else if( esmApp.searchBar.getNets().length == esmApp.searchBar.networks.length - 1 ){

			// uncheck "all networks" checkbox
			this.parentElement
					.parentElement
						.children[0]
							.children[0]
								.checked = true;

			// set the button innerHTML
			document.getElementById("search-network").children[0]
				.innerHTML = "all networks";
		
		// [ ] --> [x] checked
		}else{

			// create a new icon
			esmApp.temp = document.createElement("span");
			esmApp.temp.setAttribute("class", "icon-"+this.dataset.icon )

			// append the icon to the dropdown button inner HTML
			document.getElementById("search-network").children[0]
				.appendChild( esmApp.searchBar.temp );
		}
	}

	//-----------------------------------------------
	// - helper function get all the checked networks
	SB.prototype.getNets = function(){

		// clear the nets array
		this.nets = [];

		// loop through all the networks
		for(var i = 1; i < this.networks.length; i++)

			// if the checkbox is checked
			if( this.networks[i].checked )

				// push it to the nets array
				this.nets.push( this.networks[i].value );

		// return the nets array
		return this.nets;
	}



	//-----------------------------------------------
	// - toggle image & video buttons event listener
	// - set searchbar properties
	SB.prototype.toglBtns = function(){ console.log( this.className.substr( this.className.length - 6 ));

		// if button is active
		if( this.className.substr( this.className.length - 6 ) == "active" ){

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
			params: "q=" + q + "&" +
					"n=" + JSON.stringify( this.getNets() ) + "&" +
					"i=" + this.imgs + "&" + 
					"v=" + this.vids,
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

	var AC = function(){

		/* properties */

		/* add event listeners */		

		// keyup query input
		document.getElementById("search-posts").children[0]
			.addEventListener("keyup", this.ku, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - autocomplete keyup event listener
	AC.prototype.ku = function(){

		// if there is any text in the box
		if( this.value ){

			// display the dropdown
			this.parentElement.children[1].style.display = "block";

			// call the query 
			esmApp.searchBar.query(
				this.value, 
				esmApp.searchBar.autocomplete.popFields 
			);

		}else{

			// hide the autocomplete element
			this.parentElement.children[1].style.display = "none";

			// replace the content with a spinner
			this.parentElement.children[1].innerHTML = 
			'<li class="list-group-item" style="text-align:center;">'+
			'	<span class="glyphicon glyphicon-hourglass spinner"></span>'+
			'</li>';
		}
	}

	//-----------------------------------------------
	// - populate the autocomplete elmenent with the
	//   results
	// - max results : 4
	// - @r - results string json
	AC.prototype.popFields = function(r){

		console.log(r);

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

		// create a modal object
		this.modal = new Modal();

		/* initialize */

		// temp variable to hold all the social media posts
		this.posts = document.getElementsByClassName("social-media-post");

		// add instagram account event listener
		document.getElementById("activate-inst")
			.getElementsByTagName("button")[1]
				.addEventListener("click", this.requestAuth, false);

		// loop through the social media posts
		for(var i = 0; i < this.posts.length; i++){
			
			// attach event listener to the delete button
			this.posts[i].children[0]
			 .addEventListener("click", this.modal.launchModal, false);

			// attach event listener to video play buttons
			if( this.posts[i].children[1].className == "top-img" )
				this.posts[i].children[1]
					.addEventListener("click", this.showVid, false);
		}

		// remove the temp variable
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

		// if we are already loading the video
		if( this.dataset.loading == 1 )
			// do nothing
			return;

		// set the data-loading attribute
		this.setAttribute("data-loading", "1");

		// temp variable, create iframe 
		esmApp.socialMod.newVid = document.createElement("iframe");
		// set keep track of post id
		esmApp.socialMod.newVid.setAttribute("data-postid", this.parentElement.id);
		// remove the frameborder
		esmApp.socialMod.newVid.setAttribute("frameborder", "0");
		// set the source
		esmApp.socialMod.newVid.setAttribute("src", this.dataset.url);

		// add event listener to on load 
		esmApp.socialMod.newVid // .onLoad = esmApp.socialMod.swap;
			.addEventListener("load", esmApp.socialMod.swap, true);

		// append to body
        document.body.appendChild(esmApp.socialMod.newVid);
	} 
	//-----------------------------------------------
	// - showVid helper event listener
	// - called when video is loaded
	SMM.prototype.swap = function(){

		// if this has already been swapped
		if( !this.dataset.postid )
			// do nothing
			return;

		// display the iframe
		document.getElementById(this.dataset.postid)
			.insertBefore( 
				this,
				document.getElementById(this.dataset.postid).children[1]
			);

		// return the postid
		this.setAttribute("data-postid", "");

		// remove the placeholder image
		this.parentElement.removeChild(this.parentElement.children[2]);
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











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

window.esmApp;

(function(document){

	var esmApp;

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

	var ESM = function(){

		/* properties */

		// initialize the searchbar
		this.searchBar = new SearchBar();

		// initialize the social media buttons
		this.smBtns = new SocialMediaButtons();

		// initialize the social media posts
		this.smPosts = new SocialMediaPosts();

		// random temp variable
		this.temp = null;

		/* construction */

	}

	/* METHODS */


























	//-----------------------------------------------
	//					SearchBar - search bar
	//				  -------------------
	//
	// - initialize new autocomplete object
	//
	// - attach event listeners to the dropdown & the
	//   post-type buttons
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var SearchBar = function(){

		/* properties */

		// include in search
		this.imgs = 1;
		this.vids = 1;
		this.nets = [];

		// all the network checkboxes in the dropdown
		this.networks = document.getElementById("network-select")
				.getElementsByTagName("input");

		// acomp object
		this.acomp = new AutoComplete();

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
	SearchBar.prototype.allNet = function(){

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
	SearchBar.prototype.netBox = function(){

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
				.appendChild( esmApp.temp );
		}
	}

	//-----------------------------------------------
	// - helper function get all the checked networks
	SearchBar.prototype.getNets = function(){

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
	SearchBar.prototype.toglBtns = function(){

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
	// - @ a -> acomp (0 or 1)
	// - @ c -> callback (function)
	// - @ pid -> post ID (string)
	// - callback performed by esmApp
	SearchBar.prototype.query = function(q, c, a, pid){

		// clear all other ajax calls
		rsApp.tempObjs = {};

		rsApp.ajax({

			method : "POST",
			url : document.URL,
			params: "q=" + q + "&" +
					"n=" + JSON.stringify( this.getNets() ) + "&" +
					"i=" + this.imgs + "&" + 
					"v=" + this.vids + "&" +
					"a=" + a + "&" +
					"pid=" + pid,
			callback : c
		})

	}

	//-----------------------------------------------
	// - ajax callback
	// - populate the social media posts feed
	// - @ r -> ajax response (string)
	SearchBar.prototype.popFeed = function(r){

		// get the feed elem
		esmApp.temp = document.getElementById("social-posts");

		// populate the feed with HTML
		esmApp.temp.innerHTML = r;

		// loop through the posts
		for(var i = 0; i < esmApp.temp.children.length; i++){

			if(esmApp.temp.children[i].className == "thumbnail social-media-post"){

				// delete event listener
				esmApp.temp.children[i].children[0]
					.addEventListener("click", esmApp.smPosts.confirmDel, false);

				// if video
				if( esmApp.temp.children[i].children[1].className == "top-img" )
					// add video play event listener
					esmApp.temp.children[i].children[1]
						.addEventListener("click", esmApp.smPosts.showVid, false);
			}
		}
	}



	//-----------------------------------------------
	//				  AutoComplete - autocomplete
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

	var AutoComplete = function(){

		/* properties */

		// keep track of the text input
		this.ti = document.getElementById("search-posts").children[0];
		// keep track of the acomp dropdown
		this.ad = document.getElementById("search-posts").children[1];
		// keep track of the number of results
		this.count = 0;
		// keep track of active selection
		this.active = -1;

		/* add event listeners */		

		// keyup query input
		this.ti.addEventListener("keyup", this.ku, false);
		// focus
		this.ti.addEventListener("focus", this.fcs, false);

	}

	/* METHODS */

	//-----------------------------------------------
	// - acomp keyup event listener
	AutoComplete.prototype.ku = function(event){ // console.log(event.keyCode);

		// if the user typed the down key
		if(event.keyCode == 40 || event.keyCode == 38){

			esmApp.searchBar.acomp.sel(39 - event.keyCode);

			return;
		}else if( event.keyCode == 13 ){

			esmApp.searchBar.acomp.ntr();

		// if there is any text in the box
		}else if( this.value ){

			// display the dropdown
			this.parentElement.children[1].style.display = "block";

			// call the query 
			esmApp.searchBar.query(
				this.value,
				esmApp.searchBar.acomp.popFields,
				1,
				0
			);

		}else{

			// hide the acomp element
			this.parentElement.children[1].style.display = "none";

			// replace the content with a spinner
			this.parentElement.children[1].innerHTML = 
			'<li class="list-group-item" style="text-align:center;">'+
			'	<span class="glyphicon glyphicon-hourglass loading"></span>'+
			'</li>';
		}
	}

	//-----------------------------------------------
	// - down key selection event
	// - k is for keynumber +1 for up, -1 for down
	AutoComplete.prototype.sel = function(k){

		// get the current count
		this.count = this.ad.children.length;

		// if we are not yet at the last item
		if( (-k * this.active) <= (k - 1)*(this.count - 2)/(-2) ){

			// incriment/decriment active
			this.active = this.active - k;

			// if this is the second result or greater
			if( (k * this.active) < (k + 1)*(this.count)/(2) )
				// change reset the previous background color
				this.ad.children[this.active + k]
						.style.backgroundColor = "#fff";

			// if we did no just refocus on  the input
			if( this.active >= 0 )
				// set the active background color
				this.ad.children[this.active]
						.style.backgroundColor = "#eee";
			else
				// move cursor to the end
				this.ti.value = this.ti.value;
		}
	}

	//-----------------------------------------------
	// - enter key event listener
	AutoComplete.prototype.ntr = function(pid){

		// clear the feed
		document.getElementById("social-posts").innerHTML = 
			'<h2 style="text-align:center;">'+
			'	<span class="glyphicon glyphicon-hourglass loading"></span>'+
			'</h2>';

		// hide the autocomplete dropdown
		this.ad.style.display = "none";

		// perform the query
		esmApp.searchBar.query(
			this.ti.value,
			esmApp.searchBar.popFeed,
			0,
			 (this.active > -1) ? this.ad.children[this.active].dataset.pid : 0
		);
	}

	//-----------------------------------------------
	// - populate the acomp elmenent with the
	//   results
	// - max results : 4
	// - @r - results string json
	AutoComplete.prototype.popFields = function(r){
		// reset the active number
		this.active = -1;
		// insert hmtl response
		document.getElementById("search-posts").children[1]
			.innerHTML = r;
		// add event listeners
		esmApp.searchBar.acomp.addLstnrs();
	}

	//-----------------------------------------------
	// - helper function for popFields
	// - add event listeners to the newly inserted content
	AutoComplete.prototype.addLstnrs = function(){

		// if no suggestions
		if( this.ad.children[0].children[0].tagName == "SPAN" )
			return; // do nothing

		// loop through the suggestions list
		for(var i = 0; i < this.ad.children.length; i++)

			// add event listener
			this.ad.children[i]
				.addEventListener("click", esmApp.searchBar.acomp.clkSug, false);
	}

	//-----------------------------------------------
	// - blur search posts event listener
	// - hide the acomp dropdown
	AutoComplete.prototype.blr = function(event){

		// if we clicked on the autocomplete dropdown
		if( event.target.hasAttribute("data-pid") || event.target.parentElement.hasAttribute("data-pid") || event.target === document.getElementById("search-posts").children[0] )
			return; // do nothing

		// hide the autocomplete element
		document.getElementById("search-posts")
			.children[1].style.display = "none";
	
		// remove this event listener
		document.body.removeEventListener("click", esmApp.searchBar.acomp.blr, true);
	}

	//-----------------------------------------------
	// - focus search posts event listener
	// - show the autocomplete dropdown
	AutoComplete.prototype.fcs = function(){

		// attach click event listener to body
		document.body.addEventListener("click", esmApp.searchBar.acomp.blr, true);
		
		// if input not empty
		if(this.value)
			// display autocomplete dropdown
			this.parentElement.children[1].style.display = "block";
	}

	//-----------------------------------------------
	// - click suggestion results event listener
	// - ajax to retrieve post
	AutoComplete.prototype.clkSug = function(){ console.log("suggestion clicked!");

		// clear the feed
		document.getElementById("social-posts").innerHTML = 
			'<h2 style="text-align:center;">'+
			'	<span class="glyphicon glyphicon-hourglass loading"></span>'+
			'</h2>';

		// hide the autocomplete dropdown
		this.parentElement.style.display = "none";

		// perform the query
		esmApp.searchBar.query(
			esmApp.searchBar.acomp.ti.value,
			esmApp.searchBar.popFeed,
			0,
			this.dataset.pid
		);
	}











	//-----------------------------------------------
	//			 SocialMediaButtons - social media buttons
	//		   ------------------------------
	//
	// - toggle media controls popover
	//
	// - launch the popup window to get user data
	//
	// - populate feed with data
	//
	// - remove social network
	//
	//-----------------------------------------------

	var SocialMediaButtons = function(){

		/* properties */

		// keep track of active network
		this.aNet = null;

		// initialize the confirmation modal
		this.modal = new modal( document.getElementById("confirm-drop-network") );

		// temp variable
		this.temp = null;

		/* init */

		// get all the social media buttons
		this.temp = document.getElementById("activation-btns")
						.children[2].children;

		// loop through all the buttons
		for(var i = 0; i < this.temp.length; i++){

			// activate the popover
			this.temp[i].children[0]
				.addEventListener("click", rsApp.toggleDropdown, false);

			// checkbox
			this.temp[i].getElementsByTagName("input")[0]
				.addEventListener("change", this.chex, false);

			// checkbox
			this.temp[i].getElementsByTagName("input")[1]
				.addEventListener("change", this.chex, false);

			// remove network button
			this.temp[i].children[1].getElementsByTagName("button")[0]
				.addEventListener("click", this.removeNet, false);

			// remove network button
			this.temp[i].children[1].getElementsByTagName("button")[1]
				.addEventListener("click", this.reqAuth, false);
		}

		// add ajax request to modal confirmation button
		document.getElementById("confirm-drop-network")
			.getElementsByTagName("button")[2]
				.addEventListener("click", this.ajaxRemNet, false);

		this.temp = null;
	}

	/*::methods::*/

	//-----------------------------------------------
	// - open a new window and send an authorization
	//   request
	SocialMediaButtons.prototype.reqAuth = function(){

		// set the current network property
		esmApp.smBtns.aNet = this.dataset.network;

		// open the auth window
		// INSTAGRAM
		// window.open( this.dataset.url, 
		// 			 this.dataset.network,
		// 			 "scrollbars=yes,width=475,height=425"
		// 		   );
		
		// 
		window.open( "http://localhost/routesider/scripts/edit_social_media/ra.php?n="+this.dataset.network, 
					 "Connect to "+this.dataset.network,
					 "scrollbars=yes,width=475,height=425"
				   );
	
	}

	//-----------------------------------------------
	// - change the classes and popover html of newly
	//   added activion button
	SocialMediaButtons.prototype.actBtn = function(){

		// get the active network btn
		this.temp = document.getElementById(
						"activate-"+this.aNet.substr(0, 4));

		// set active class for activate-btn
		this.temp.children[0].children[0].className = this.temp.children[0].children[0].className.substr(0, 16) + " active";

		// set active class for popover
		this.temp.children[1].className = this.temp.children[1].className + "active";

		// display the active popover content
		this.temp.getElementsByClassName("popover-content")[0]
			.children[0].style.display = "block";
	
		// hide the other content
		this.temp.getElementsByClassName("popover-content")[0]
			.children[1].style.display = "none";		
	}

	//-----------------------------------------------
	// - remove social network event listener
	SocialMediaButtons.prototype.removeNet = function(){

		// set the active network
		esmApp.smBtns.aNet = this.dataset.network;

		// set the modal header
		esmApp.smBtns.modal.elem.getElementsByTagName("h4")[0]
			.innerHTML = "Remove <span class='icon-"+this.dataset.icon+"'></span> "+
						 this.dataset.network.charAt(0).toUpperCase()+this.dataset.network.slice(1);

		// launch the modal
		esmApp.smBtns.modal.launch();

	}

	//-----------------------------------------------
	// - revert styles to default add listeners
	SocialMediaButtons.prototype.deactBtn = function(){

		// get the active network btn
		this.temp = document.getElementById(
						"activate-"+this.aNet.substr(0, 4));

		// set active class for activate-btn
		this.temp.children[0].children[0].className = "btn activate-btn not-active";

		// set active class for popover
		this.temp.children[1].className = "popover top ";

		// display the active popover content
		this.temp.getElementsByClassName("popover-content")[0]
			.children[1].style.display = "block";
	
		// hide the other content
		this.temp.getElementsByClassName("popover-content")[0]
			.children[0].style.display = "none";		

	}

	//-----------------------------------------------
	// - ajax call remove network
	SocialMediaButtons.prototype.ajaxRemNet = function(){

		// change the activation button class
		esmApp.smBtns.deactBtn();

		// clear the social feed
		document.getElementById("social-posts").innerHTML = 
			'<h2 style="text-align:center;">'+
			'	<span class="glyphicon glyphicon-hourglass loading"></span>'+
			'</h2>';

		// make an ajax call to remove the network
		rsApp.ajax({
			method : "POST",
			url : document.URL,
			params : "delnet="+esmApp.smBtns.aNet,
			callback : esmApp.smBtns.reFeed
		});

	}

	//-----------------------------------------------
	// - ajax callback after removing network
	// - query to repopulate feed.
	SocialMediaButtons.prototype.reFeed = function(){
		esmApp.searchBar.query("", esmApp.searchBar.popFeed, 0, 0);
	}

	//-----------------------------------------------
	// - event listener for the checkboxes
	SocialMediaButtons.prototype.chex = function(){

		rsApp.ajax({
			method : "POST",
			url : document.URL,
			params : "checkchange="+this.name+"&val="+this.checked+"&network="+this.dataset.network
		});

	}







	//-----------------------------------------------
	//			 SocialMediaPosts - social media Posts
	//		   -----------------------------
	//
	// - populate fields 
	//
	// - remove posts
	//
	// - play videos
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var SocialMediaPosts = function(){

		/* properties */

		// keep track of targeted post
		this.confId = null;
		this.confNet = null;

		// create a modal object
		this.modal = new modal( document.getElementById("confirmation-modal") );

		/* initialize */

		// temp variable to hold all the social media posts
		this.temp = document.getElementsByClassName("social-media-post");

		// loop through the social media posts
		for(var i = 0; i < this.temp.length; i++){
			
			// attach event listener to the delete button
			this.temp[i].children[0]
			 .addEventListener("click", this.confirmDel, false);

			// attach event listener to video play buttons
			if( this.temp[i].children[1].className == "top-img" )
				this.temp[i].children[1]
					.addEventListener("click", this.showVid, false);
		}

		// delete posts when confirmed
		this.modal.elem.getElementsByClassName("btn-danger")[0]
			.addEventListener("click", this.deletePost, false);

		// remove the temp variable
		this.temp = null;
	}

	/* METHODS */

	//-----------------------------------------------
	// - callback after a user has added a social
	//   network
	// - perform an ajax call to retrieve the data
	// - scroll to social feed if mobile
	// - query updated content
	SocialMediaPosts.prototype.authorize = function( strElems ){

		// show the loading animation
		document.getElementById("social-posts")
			.innerHTML = '<h2 style="text-align:center;">'+
						 '	<span class="glyphicon glyphicon-hourglass loading"></span>'+
						 '</h2>';

		// scroll to the posts
		document.getElementById("social-feed").scrollIntoView();

		// add the network to the dropdown, reuse this.temp temp var
		this.temp = document.createElement("li");
		this.temp.className = "list-group-item";
		this.temp.innerHTML = strElems;
		document.getElementById("network-select")
			.appendChild(this.temp);

		// add the event listener to the checkbox
		this.temp.getElementsByTagName("input")[0]
			.addEventListener("change", esmApp.searchBar.netBox);

		// ajax query
		esmApp.searchBar.query("", esmApp.searchBar.popFeed, 0, 0);

		// change the html of the freshly added network button
		esmApp.smBtns.actBtn();
	}

	//-----------------------------------------------
	// - remove the selected social media post elem 
	//   from the feed
	// - ajax call to remove the post from the db, 
	//   no callback
	SocialMediaPosts.prototype.deletePost = function(){

		// remove the selected
		document.getElementById(esmApp.smPosts.confId)
			.parentElement.removeChild(
				document.getElementById(esmApp.smPosts.confId)
			);

		// ajax delete request
		rsApp.ajax({
					method : "POST",
					url : document.URL,
					params : "network="+esmApp.smPosts.confNet+"&post_id="+esmApp.smPosts.confId,
					callback : false
				  });
	}

	//-----------------------------------------------
	// - launches modal to confirm deletion of post
	SocialMediaPosts.prototype.confirmDel = function(){
		// set the modal properties
		esmApp.smPosts.confNet = this.dataset.network;
		esmApp.smPosts.confId = this.dataset.id;
		// show the modal
		esmApp.smPosts.modal.launch();
	}

	//-----------------------------------------------
	// - display instagram video event listener
	SocialMediaPosts.prototype.showVid = function(){

		// if we are already loading the video
		if( this.dataset.loading == 1 )
			// do nothing
			return;

		// set the data-loading attribute
		this.setAttribute("data-loading", "1");

		// show the spinner
		this.children[1].children[0].className = "glyphicon glyphicon-hourglass loading";

		// temp variable, create iframe 
		esmApp.smPosts.newVid = document.createElement("iframe");
		// set keep track of post id
		esmApp.smPosts.newVid.setAttribute("data-postid", this.parentElement.id);
		// remove the frameborder
		esmApp.smPosts.newVid.setAttribute("frameborder", "0");
		// set the source
		esmApp.smPosts.newVid.setAttribute("src", this.dataset.url);

		// add event listener to on load 
		esmApp.smPosts.newVid // .onLoad = esmApp.smPosts.swap;
			.addEventListener("load", esmApp.smPosts.swap, true);

		// append to body
        document.body.appendChild(esmApp.smPosts.newVid);
	} 
	//-----------------------------------------------
	// - showVid helper event listener
	// - called when video is loaded
	SocialMediaPosts.prototype.swap = function(){

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























	/* initialize */

	document.addEventListener("DOMContentLoaded", function(){

	    

	    // create new ESM (edit social media) object
	    window.esmApp = esmApp = new ESM();

	}, true);	

})(window.document);











//--------------------------------------
//
//			routesider app
//
//--------------------------------------

//
// - This file contains all the 
//   javascript functions that can be 
//   found on every page.
// - The global variable representing a 
//   new RS object must be named rsApp.
//

var RS, rsApp;

// (function(){

	RS = function(){

		/* properties */

		// google map variables
		this.userLatitude = 0;
		this.userLongitude = 0;
		this.map = null;
		// ajax variables
		this.tempObjs = {};
		this.indexer = 1;
		// keep track of which dropdown is open
		this.activeDropdown = null;
		this.currElem = null; // keep track while looping for activeDropdown
		// new alert elem
		this.alertElem = null;
		// empty string variable memory allocation
		this.tempStr = "";

		/* constructor */

		// add event listener to slide out menu button
		document.getElementById("navbar-toggle-menu")
			.addEventListener("click", this.toggleMobileMenu, false);
		// - cover content when menu is exposed
		// - click cover to close menu
		document.getElementById("content-cover")
			.addEventListener("click", this.toggleMobileMenu, false);
		// - toggle user dropdown event listener
		document.getElementById("dropdown-user-nav")
			.addEventListener("click", this.toggleDropdown, false);
	};

	/* methods */

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
	
	//-----------------------------------------------
	//					dropdown
	//				  ------------
	// - event listener toggle dropdown
	RS.prototype.toggleDropdown =function(){
		
		// set the active dropdown
		rsApp.activeDropdown = this.parentElement;

		// if the dropdown menu is showing
		if( this.parentElement.children[1].offsetParent === null ){
			// display the menu
			this.parentElement.children[1].style.display = "block";
			// add the event listener
			document.body.addEventListener("click", rsApp.closeDropdown, true);
		}else{
			// hide the menu
			this.parentElement.children[1].style.display = "none";
			// add the event listener
			document.body.removeEventListener("click", rsApp.closeDropdown, true);
		}
	}
	//-----------------------------------------------
	// - event listener on body to close dropdown
	RS.prototype.closeDropdown = function(event){
		// set the current element
		rsApp.currElem = event.target;
		// - loop up to the top parent
		// - make sure we clicked outside of activeDropdown
		while( rsApp.currElem !== document.body ){
			// if we get to our active dropdown
			if(rsApp.currElem === rsApp.activeDropdown){
				// break out of the loop
				return;
			}
			// set the new currElem
			rsApp.currElem = rsApp.currElem.parentElement;
		}
		// - If we get this far, we need to close the dropdown
		//   and remove the event listeners.
		rsApp.activeDropdown.children[1].style.display = "none";
		document.body.removeEventListener("click", rsApp.closeDropdown, true);
	}

	//--------------------------------------------
	// - This method is intended to be overwritten
	//   by some other script if map is needed.
	// - This function is required because it is 
	//   the callback for google maps when it is
	//   finished loading.
	RS.prototype.setUserLocation = function(){
		return false;
	};
	//----------------------------------------
	// - Initialize a google map.
	// - The map element must always have the
	//   id #map-canvas.
	RS.prototype.initGoogleMap = function(){

		this.map = new google.maps.Map(
					// map element
					document.getElementById("map-canvas"),
					// map options
					{ zoom : 10, 
					  center : new google.maps.LatLng( this.userLatitude, this.userLongitude )
					}
		);
	};

	// event listener toggle slide out menu
	RS.prototype.toggleMobileMenu = function(){
		// set the max width of the content cover
		// if the menu is hidden and the window is mobile-sized
		if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
			&& window.innerWidth < 768 ){
			// open the menu
			document.getElementById("page-content").style.transform = "translate(270px, 0px)";
			document.getElementById("navbar").style.transform = "translate(270px, 0px)";
			document.getElementById("map-canvas").style.transform = "translate(270px, 0px)";
			document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
			// cover the content
			document.getElementById("content-cover").style.display = "block";
			// set timer to reveal #content-cover
			setTimeout( rsApp.showContentCover , 200 );
		}else{
			// close the menu
			document.getElementById("page-content").style.transform = "translate(0px, 0px)";
			document.getElementById("navbar").style.transform = "translate(0px, 0px)";
			document.getElementById("map-canvas").style.transform = "translate(0px, 0px)";
			document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
			// reveal the content
			document.getElementById("content-cover").style.opacity = "0";
			// set timer to hide #content-cover
			setTimeout( rsApp.hideContentCover , 300 );
		}
	}
	// timed function to reveal #content-cover
	RS.prototype.showContentCover = function(){
		document.getElementById("content-cover").style.opacity = ".4";
	}
	// timed function to hide the #content-cover
	RS.prototype.hideContentCover = function(){
		document.getElementById("content-cover").style.display = "none";
	}


	//---------------------------------------------
	// - generate a dismissable alert
	RS.prototype.insertAlert = function(aClass, aHTML, refElem){

		//----------------------------------------
		// - create the alert elem
		// - totally vulnerable to race conditions but whatevs
		this.alertElem = document.createElement("div");
		this.alertElem.className = "alert alert-" + aClass;
		this.alertElem.setAttribute("role", "alert"); // for srs readers
		this.alertElem.innerHTML = '<button type="button" class="close" aria-label="Close">' +
								   '	<span aria-hidden="true">&times;</span>' +
								   '</button>' +
								   aHTML;
		// add an event listener to the close button
		this.alertElem.children[0].addEventListener("click", rsApp.removeAlert, false); 
		// insert the html before the reference elem
		refElem.parentElement.insertBefore(this.alertElem, refElem);
		setTimeout(this.fadeAlert, 10);
	}
	// timeout fade in
	RS.prototype.fadeAlert = function(){
		rsApp.alertElem.style.opacity = 1;
	}
	// event listener
	RS.prototype.removeAlert = function(){
		this.parentElement.parentElement.removeChild(this.parentElement);
	}

// })();



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
//   new rs object must be named rsApp.
//

var rs;

(function(){

	rs = function(){

		/* properties */

		// google map variables
		this.userLatitude = 0;
		this.userLongitude = 0;
		this.map = null;
		// ajax variables
		this.tempObjs = {};
		this.indexer = 1;
		// new alert elem
		this.alertElem = null;
		// empty string variable memory allocation
		this.tempStr = "";

		/* constructor */

		// add event listener to menu button
		document.getElementById("navbar-toggle-menu")
			.addEventListener("click", this.toggleMobileMenu, false);
		// - cover content when menu is exposed
		// - click cover to close menu
		document.getElementById("content-cover")
			.addEventListener("click", this.toggleMobileMenu, false);
	};

	/* methods */

	//--------------------------------------
	// - ajax function designed to avoid
	//   memory leaks
	rs.prototype.ajax = function(meth, url, params, callback, callbackParams){
	    var i = this.indexer++;
	    this.tempObjs[i] = new XMLHttpRequest();
	    this.tempObjs[i].open(meth, url, true);
	    this.tempObjs[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    this.tempObjs[i].onreadystatechange = function() {
	        if(rsApp.tempObjs[i].readyState == 4 && rsApp.tempObjs[i].status == 200) {
	            if(callback)
	                callback(rsApp.tempObjs[i].responseText, callbackParams);
	            delete rsApp.tempObjs[i];
	        }
	    }
	    this.tempObjs[i].send(params);
	};


	//--------------------------------------------
	// - This method is intended to be overwritten
	//   by some other script if map is needed.
	// - This function is required because it is 
	//   the callback for google maps when it is
	//   finished loading.
	rs.prototype.setUserLocation = function(){
		return false;
	};
	//----------------------------------------
	// - Initialize a google map.
	// - The map element must always have the
	//   id #map-canvas.
	rs.prototype.initGoogleMap = function(){

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
	rs.prototype.toggleMobileMenu = function(){
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
	rs.prototype.showContentCover = function(){
		document.getElementById("content-cover").style.opacity = ".4";
	}
	// timed function to hide the #content-cover
	rs.prototype.hideContentCover = function(){
		document.getElementById("content-cover").style.display = "none";
	}


	//---------------------------------------------
	// - generate a dismissable alert
	rs.prototype.insertAlert = function(aClass, aHTML, refElem){

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
	rs.prototype.fadeAlert = function(){
		rsApp.alertElem.style.opacity = 1;
	}
	// event listener
	rs.prototype.removeAlert = function(){
		this.parentElement.parentElement.removeChild(this.parentElement);
	}

})();



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
		this.ajaxObjs = {};
		this.indexer = 1;

		/* constructor */

		this.initMobileMenu();
	};

	/* methods */

	//--------------------------------------
	// - ajax function designed to avoid
	//   memory leaks
	rs.prototype.ajax = function(meth, url, params, callback, callbackParams){
	    var i = this.indexer++;
	    this.ajaxObjs[i] = new XMLHttpRequest();
	    this.ajaxObjs[i].open(meth, url, true);
	    this.ajaxObjs[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    this.ajaxObjs[i].onreadystatechange = function() {
	        if(rsApp.ajaxObjs[i].readyState == 4 && rsApp.ajaxObjs[i].status == 200) {
	            if(callback)
	                callback(rsApp.ajaxObjs[i].responseText, callbackParams);
	            delete rsApp.ajaxObjs[i];
	        }
	    }
	    this.ajaxObjs[i].send(params);
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
	rs.prototype.initGoogleMap = function(){ console.log(this);

		this.map = new google.maps.Map(
					// map element
					document.getElementById("map-canvas"),
					// map options
					{ zoom : 10, 
					  center : new google.maps.LatLng( this.userLatitude, this.userLongitude )
					}
		);
	};

	// initialize the slide-out mobile menu
	rs.prototype.initMobileMenu = function(){

		// add event listener to menu button
		console.log("pretend mobile menu initialized");

	};

})();



//--------------------------------------
//
//			routesider app
//
//--------------------------------------

//
// - This file contains all the javascript 
//   functions that can be found on every page.
//

(function(){

	/* routesider app */
 
	window.rs = function(){

		// properties //
		

		// constructor //
 
		this.userLocation = this.setUserLocation();
		this.initMobileMenu();
	}

	/* methods */

	//--------------------------------------
	// - request permission for user geoloc.
	// - display map based on user location 
	//   & db query.
	//
	rs.prototype.setUserLocation = function(){

		// trigger prompt for permission and/or callback
	    navigator.geolocation.getCurrentPosition(

	    	// permission granted
	    	function(position){

	    		// position.coords.longitude
	    		// position.coords.latitude

	    		// display user geographic area

	    	}, 

	    	// permission denied
	    	function(){}

	    );

	}

	rs.prototype.initMobileMenu = function(){

		// add event listener to menu button

	}


})();
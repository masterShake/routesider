
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

		// properties
		this.userLocation = null;

		// initialization
		this.userLocation = this.setUserLocation();

	}

	/* methods */

	rs.prototype.setUserLocation = function(){

		// trigger prompt for permission and/or callback
	    navigator.geolocation.getCurrentPosition(

	    	// permission granted
	    	function(position){

	    		// position.coords.longitude
	    		// position.coords.latitude

	    	}, 

	    	// permission denied
	    	function(){}

	    );

	}

})();
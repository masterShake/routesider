
//--------------------------------------
//
//			routesider app
//
//--------------------------------------

//
// - This file contains all the javascript 
//   functions that can be found on every page.
//


/* routesider app */

window.rs = function(){

	// properties //
	
	this.userLocation;

	// constructor //

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

    	this.locationSuccess(position),
    	this.locationError(error)
    );
}

// each page may overwrite this function
rs.prototype.locationSuccess = function(position){

	// position.coords.longitude
	// position.coords.latitude

	return false;
}

// each page may overwrite this function
rs.prototype.locationError = function(error){

	// default map
	console.log(error);

}

rs.prototype.initMobileMenu = function(){

	// add event listener to menu button
	console.log("pretend mobile menu initialized");

}


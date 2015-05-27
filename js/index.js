
//--------------------------------------
//
//		   index/homepage app
//
//--------------------------------------

//
// - This file contains all the rs
//   methods that can be found 
//   specifically on the index page.
//
// - functions are added as prototypes
//   of the rs object.
//



/* index methods */


//--------------------------------------
// - request permission for user geoloc.
// - display map based on user location 
//   & db query.
//
rs.prototype.setUserLocation = function(){

	// trigger prompt for permission and/or callback
 	navigator.geolocation.getCurrentPosition(
	 	
	 	rsApp.locationSuccess,
	 	rsApp.locationError
    );
};
//--------------------------------------
// - callback function after user grants
//   or rejects access to location data
// - use geocode to ajax query for local
//   promos.
rs.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	rsApp.userLatitude = position.coords.latitude;
	rsApp.userLongitude = position.coords.longitude;

	// ajax call with the coordinates
	rsApp.ajax(
				"POST",
				"/routesider/index.php", // change this in production
				"location_query=1&latitude="+rsApp.userLatitude+"&longitude="+rsApp.userLongitude,
				rsApp.locationCallback,
				false
	);

	// initialize the google map
	// this.initGoogleMap();
};

//-------------------------------------
// - If user does not grant access to
//   current location, display default
//   map.
rs.prototype.locationError = function(){

	// ajax call for default map
	rsApp.ajax(
				"POST",
				"index.php", // change this in production
				"/routesider/location_query=1&latitude=0&longitude=0",
				rsApp.locationCallback,
				false
	);
};

//-------------------------------------
// - Callback from ajax request
// - Assemble the map using the data
//   that is returned.
rs.prototype.locationCallback = function(response){

	console.log(response);

};


/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();
    rsApp.setUserLocation();

}, false);
        



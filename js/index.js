
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
// - callback function after user grants
//   or rejects access to location data
// - use geocode to ajax query for local
//   promos.
rs.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	this.userLatitude = position.coords.latitude;
	this.userLongitude = position.coords.longitude;

	// ajax call with the coordinates
	this.ajax(
				"POST",
				"index.php",
				"latitude="+this.userLatitude+"&longitude="+this.userLongitude,
				this.locationCallback
	);

	// initialize the google map
	// this.initGoogleMap( document.getElementById("map-canvas") );
}

//-------------------------------------
// - If user does not grant access to
//   current location, display default
//   map.
rs.prototype.locationError = function(){

	// the the longitude and latitude properties
	this.userLatitude = 0;
	this.userLongitude = 0;

	// ajax call for default map
	this.ajax(
				"POST",
				"index.php",
				"latitude=0&longitude=0",
				this.locationCallback
	);
}

//-------------------------------------
// - Callback from ajax request
// - Assemble the map using the data
//   that is returned.
rs.prototype.locationCallback = function(response){

	console.log(response);

}


/* initialize */

var rsApp;

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

}, false);
        



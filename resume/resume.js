var rApp, // resume app
	gm;	  // google map object







//-----------------------------------------------
//				rApp (resume app)
//			  ---------------------
//
// - manage resume javascript objects
//
//-----------------------------------------------

var R = function(){

	// track the google maps object
	this.gm = null;

	// user location, default silicon valley
	this.userLat = 37.65120864327176;
	this.userLng = -122.091064453125;

	// request the user's location
	this.getLocation();
}

//-----------------------------------------------
// - initialize google map
R.prototype.initMap = function(){

	// init the google map
	gm = this.gm = new google.maps.Map( 
					// map element
					document.getElementById("map-canvas"),
					// map options
					{ center: {lat: this.userLat, lng: this.userLng}, zoom: 9 }
			     );
}

//-----------------------------------------------
// - request user location
R.prototype.getLocation = function(){

	// trigger prompt for permission, callback
 	navigator.geolocation.getCurrentPosition(
	 	this.locationSuccess,
	 	this.locationError
    );
}

//-----------------------------------------------
// - user location callback function affirmative
// - 
R.prototype.locationSuccess = function(position){

	// the the longitude and latitude properties
	rApp.userLat = position.coords.latitude;
	rApp.userLng = position.coords.longitude;

	// if the google map is not defined, do nothing
	if(!gm) return;

	// set the google map center and zoom
	gm.panTo({ lat: rApp.userLat, lng: rApp.userLng });
}

//-----------------------------------------------
// - location denied, do nothing
R.prototype.locationError = function(){ return false; }





























//-----------------------------------------------
//
// 					initialize 
//
//-----------------------------------------------

rApp = new R();

document.addEventListener("DOMContentLoaded", function(){

	return false;

}, false);
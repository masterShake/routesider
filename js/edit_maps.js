
//--------------------------------------
//
//		   edit_maps app
//
//--------------------------------------

//
// - This file contains all the rs
//   methods that can be found 
//   specifically on edit_maps.php
//
// - functions are added as prototypes
//   of the rs object.
//




/* edit_maps methods */




//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with static map (not fixed)
rs.prototype.toggleMobileMenu = function(){
	// set the max width of the content cover
	// if the menu is hidden and the window is mobile-sized
	if( document.getElementById("page-content").style.transform != "translate(270px, 0px)"
		&& window.innerWidth < 768 ){
		// open the menu
		document.getElementById("page-content").style.transform = "translate(270px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(270px, 0px)";
		// cover the content
		document.getElementById("content-cover").style.display = "block";
		// set timer to reveal #content-cover
		setTimeout( rsApp.showContentCover , 200 );
	}else{
		// close the menu
		document.getElementById("page-content").style.transform = "translate(0px, 0px)";
		document.getElementById("content-cover").style.transform = "translate(0px, 0px)";
		// reveal the content
		document.getElementById("content-cover").style.opacity = "0";
		// set timer to hide #content-cover
		setTimeout( rsApp.hideContentCover , 300 );
	}
}







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

	// generate the google map
	rsApp.initGoogleMap();

	// ajax call with the coordinates
	rsApp.ajax(
				"POST",
				"/routesider/index.php", // change this in production
				"location_query=1&latitude="+rsApp.userLatitude+"&longitude="+rsApp.userLongitude,
				rsApp.locationCallback,
				false
	);
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











/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

}, false);






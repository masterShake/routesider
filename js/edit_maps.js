
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











//---------------------------------------------------
// 					drop new pin
//				  ----------------
//
//


// - Event listener for new pin button in components
//   toolbar
rs.prototype.toggleNewPinMode = function(){

	// If the drop-new-pin component is hidden
	if( document.getElementById("drop-new-pin-toolbar").style.display != "block" )

		// initialize drop-new-pin mode
		rsApp.initNewPinMode();

	else

		// terminate drop-new-pin mode
		rsApp.terminateNewPinMode();
}
// - initialize new pin mode
// - display elements
// - add event listeners
rs.prototype.initNewPinMode = function(){

	// change the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn selected";

	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "block";

	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-button").innerHTML = "<span class='glyphicon glyphicon-map-marker'></span>";

	// change the cursor on the map to a crosshair

	// add event listeners to google map

}
// - terminate new pin mode
// - hide elements
// - remove event listeners
rs.prototype.terminateNewPinMode = function(){

	// restore the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn";

	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "none";

	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-button").innerHTML = "<span class='glyphicon glyphicon-search'></span>";

	// change the cursor on the map to back to grab

	// remove event listeners

}











/* initialize */

document.addEventListener("DOMContentLoaded", function(){

    // create new rs object
    rsApp = new rs();

    // add event listener to the add new pin button
    document.getElementById("components-toolbar").children[3]
    	.addEventListener("click", rsApp.toggleNewPinMode, false);

    // add event listener to the close new pin toolbar x
    document.getElementById("drop-new-pin-toolbar").children[0]
    	.addEventListener("click", rsApp.terminateNewPinMode, false);

}, false);






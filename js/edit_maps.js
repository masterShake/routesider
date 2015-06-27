
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
// - event listener for search bar
// - expand the height to accomodate the autocomplete
//   results.
rs.prototype.autoExpand = function(){
	// if the field is not blank
	if( this.value )
		// expand the margin
		this.parentElement.style.marginBottom = "180px";
	// if blank
	else
		// contract the margin
		this.parentElement.style.marginBottom = "0px";
}
// - blur even contract
rs.prototype.blurContract = function(){
	this.parentElement.style.marginBottom = "0px";
}



















//---------------------------------------------------
// - Terminate any open formatting modes
// - Do not terminate the exception
rs.prototype.termFormattingModes = function(exception){
	
	// drop new pin
	if( this.newPinMode && exception != "new pin" )

		this.terminateNewPinMode();

	// draw new polygon
	if( this.newPolyMode && exception != "new poly" )

		this.terminateNewPolyMode();
} 









































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

	// exit the other formatting modes and hide other toolbars
	rsApp.termFormattingModes("new pin");

	// set drop-new-pin mode property to true
	rsApp.newPinMode = true;

	/* css */

	// change the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn selected";
	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Enter location to drop pin";
	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-maps-button").innerHTML = "<span class='glyphicon glyphicon-map-marker'></span>";

	/* google map */

	this.initGooglePinDrop();
}
// - terminate new pin mode
// - hide elements
// - remove event listeners
rs.prototype.terminateNewPinMode = function(){

	// set drop-new-pin mode property to true
	rsApp.newPinMode = false;

	/* css */

	// restore the class of the new pin button
	document.getElementById("components-toolbar").children[3].className = "btn";
	// display the drop-new-pin-toolbar element
	document.getElementById("drop-new-pin-toolbar").style.display = "none";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field")
		.placeholder = "Search " + this.businessName + " maps";
	// change the icon in the search button to indicate drop pin function
	document.getElementById("search-maps-button").innerHTML = "<span class='glyphicon glyphicon-search'></span>";

	/* google map */

	this.termGooglePinDrop();
}
// - initialize the google maps drop new pin functionality
rs.prototype.initGooglePinDrop = function(){

	// change the cursor on the map to a crosshair
	this.map.setOptions({ 
							draggableCursor : "crosshair",
						  	draggingCursor  : "crosshair"
					   });

	// create the google maps Autocomplete object
	this.autocomp = new google.maps.places.Autocomplete( document.getElementById("search-maps-field") );

	// apply event listener when location is selected with click
	google.maps.event.addListener( this.map, 'click', rsApp.dropPinClick );

	// apply event listener when location is selected via autocomplete field
	google.maps.event.addListener(this.autocomp, 'place_changed', rsApp.dropPinAutocomp);
}
// - map click event listener
// - create the latlng object when the user clicks on the map
// - call the drop pin method
rs.prototype.dropPinClick = function(e){

	// delete the previous temp LatLng object
	delete rsApp.tempLatLng;

	// get the LatLng object from the event
	rsApp.tempLatLng = e.latLng;

	// call the dropPin method
	rsApp.dropPin();
}
// - autocomplete event listener
// - Create the latlng object when the user selects 
//   a place from the autocomplete suggestions.
// - call the drop pin method
rs.prototype.dropPinAutocomp = function(){

	// hide the extra space under the search-maps-field
	setTimeout( rsApp.timeoutShrink, 100 );

	// delete the previous temp LatLng object
	delete rsApp.tempLatLng;

	// create the LatLng object
	rsApp.tempLatLng = new google.maps.LatLng(
		      									rsApp.autocomp.getPlace().geometry.location.A,
		      									rsApp.autocomp.getPlace().geometry.location.F
		      								);

	// pan to this location
	rsApp.map.panTo( rsApp.tempLatLng );

	// zoom to the correct resolution
	rsApp.map.setZoom( 15 );

	// drop the pin after panning to the latlng
	setTimeout( rsApp.dropPin, 950 );
}
// - function to drop a pin
// - may only be called after rsApp.tempLatLng property has been set
rs.prototype.dropPin = function(){

	// create a new pin and push it to the pins array
	rsApp.pins.push( new google.maps.Marker({
      position: rsApp.tempLatLng,
      map: rsApp.map,
      title: 'Hello World!',
      animation: google.maps.Animation.DROP
  }) );
}
// - timeout function to hide the extra space under the #search-maps-field
rs.prototype.timeoutShrink = function(){
	// remove the margin
	document.getElementById("search-maps-field").parentElement.style.marginBottom = "0px";
};
// - terminate the google maps drop new pin functionality
rs.prototype.termGooglePinDrop = function(){

	// change the cursor back to grabber
	this.map.setOptions({ 
							draggableCursor : "grab",
						  	draggingCursor  : "grabbing"
					   });

	// remove autocomplete event listener	
	delete this.autocomp;

	// remove autocomplete event listener
	document.getElementById("search-maps-field")
		.removeEventListener("keyup", rsApp.autocomplete, false);
}


































//---------------------------------------------------
// 				  draw new polygon
//				--------------------
//
//


// - Event listener for new polygon button in 
//   the components toolbar
rs.prototype.toggleNewPolyMode = function(){

	// If the drop-new-pin component is hidden
	if( document.getElementById("draw-new-polygon-toolbar").style.display != "block" )

		// initialize draw-new-poly mode
		rsApp.initNewPolyMode();

	else

		// terminate draw-new-poly mode
		rsApp.terminateNewPolyMode();
}
// - initialize new pin mode
// - display elements
// - add event listeners
rs.prototype.initNewPolyMode = function(){

	// exit the other formatting modes and hide other toolbars
	rsApp.termFormattingModes("new poly");

	// reset the new polygon mode property to false
	this.newPolyMode = true;
	
	/* css */

	// display the toggle toolbar tab
	document.getElementById("toggle-toolbar").style.display = "block";
	// change the class of the new polygon component button
	document.getElementById("components-toolbar").children[4].className = "btn selected";
	// display the draw-new-polygon-toolbar element
	document.getElementById("draw-new-polygon-toolbar").style.display = "block";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search locations";

	/* google map */
}
// - terminate new pin mode
// - hide elements
// - remove event listeners
rs.prototype.terminateNewPolyMode = function(){
	
	/* css */

	// display the toggle toolbar tab
	document.getElementById("toggle-toolbar").style.display = "none";
	// change the class of the new pin button
	document.getElementById("components-toolbar").children[4].className = "btn";
	// display the drop-new-pin-toolbar element
	document.getElementById("draw-new-polygon-toolbar").style.display = "none";
	// change placeholder text for search maps input
	document.getElementById("search-maps-field").placeholder = "Search " + this.businessName + " maps";

	/* google map */
}
// - event listener for <a> tag inside #toolbar-toggle
// - toggle the draw new polygon toolbar to make more space
rs.prototype.toggleToolbar = function(){
	// if the toolbar is displayed
	if( document.getElementById("draw-new-polygon-toolbar").offsetHeight > 60 ){
		// shrink it
		document.getElementById("draw-new-polygon-toolbar").style.height = "54px";
		// flip the toggler
		this.children[0].style.transform = "rotate(180deg)";
	}else{
		// grow it
		document.getElementById("draw-new-polygon-toolbar").style.height = "311px";
		// flip the toggler
		this.children[0].style.transform = "rotate(0deg)";
	}
}





















/* initialize */

document.addEventListener("DOMContentLoaded", function(){


    /*--------- instantiate the necessary objects ----------*/

    rsApp = new rs();


    /*------------- additional rs properties ---------------*/

    // - Initialize arrays to hold all google.maps.Marker & 
    //   google.maps.Polygon objects for given business.
    rsApp.pins = [];
    rsApp.polygons = [];
    // - Set roperties to determine/manage which editting/
    //   formatting modes are active
    rsApp.newPinMode = false;
    rsApp.newPolyMode = false;
    // temporary storage for google.maps.LatLng objects
    rsApp.tempLatLng = {};
    // temporary storage for google.maps.Autocomplete
    rsApp.autocomp;
    // set the business name for easy access
    rsApp.businessName = document.getElementById("business-name").value;


    /*----------------- event listeners --------------------*/

    // add event listener to expand the formatting toolbar
    document.getElementById("search-maps-field")
    	.addEventListener("keyup", rsApp.autoExpand, false);
    document.getElementById("search-maps-field")
    	.addEventListener("blur", rsApp.blurContract, false);

    // add event listener to the add new pin button
    document.getElementById("components-toolbar").children[3]
    	.addEventListener("click", rsApp.toggleNewPinMode, false);

    // add event listener to the close new pin toolbar x
    document.getElementById("drop-new-pin-toolbar").children[0]
    	.addEventListener("click", rsApp.terminateNewPinMode, false);

    // add event listener to the draw new polygon button
    document.getElementById("components-toolbar").children[4]
    	.addEventListener("click", rsApp.toggleNewPolyMode, false);

    // add event listener to the close new polygon toolbar x
    document.getElementById("draw-new-polygon-toolbar").children[0]
    	.addEventListener("click", rsApp.terminateNewPolyMode, false);

    // add event listener to the pull tab to toggle the draw-new-polygon toolbar
    document.getElementById("toggle-toolbar").children[0].children[0]
    	.addEventListener("click", rsApp.toggleToolbar, false);

}, false);







//-----------------------------------------------
//
//		   		 edit_maps app
//			   -----------------
//
// - This file contains all the methods that can
//   be found specifically on edit_maps.php
//
// - Because this page requires so much
//   javascript, I created a few new classes:
//
//		+ MA (mapApp) parent class for edit_maps
//		  page. Holds all the other classes as
// 		  properties.
//
//		+ PinDropper (mapApp.pinDropper) 
//		  contains all the properties and methods
//		  relevant to the drop & edit pin 
//		  functionalities.
//
//		+ PolyDrawer (mapApp.polyDrawer) class
// 		  to allow user to create a new polygon.
// 
//		+ PolyEditor (mapApp.polyEditor) contains
//		  all properties and methods to allow
//		  user to edit a polygon.
//
// - Most functions are NOT added as prototypes
//   of the RS object, but there are a few to
//   deal with the toggle menu and initializing
//   the map.
//
//-----------------------------------------------




































//-----------------------------------------------
//
//		   	 additional RS methods
//
//-----------------------------------------------

//----------------------------------------------
// - Event listener toggle slide out menu for
//   pages with static map (not fixed)
RS.prototype.toggleMobileMenu = function(){
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
RS.prototype.setUserLocation = function(){

	// trigger prompt for permission and/or callback
 	navigator.geolocation.getCurrentPosition(
	 	
	 	rsApp.locationSuccess,
	 	rsApp.locationError
    );
}

//--------------------------------------
// - callback function after user grants
//   or rejects access to location data
// - use geocode to ajax query for local
//   promos.
RS.prototype.locationSuccess = function(position){

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
}

//-------------------------------------
// - If user does not grant access to
//   current location, display default
//   map.
RS.prototype.locationError = function(){

	// ajax call for default map
	rsApp.ajax(
				"POST",
				"index.php", // change this in production
				"/routesider/location_query=1&latitude=0&longitude=0",
				rsApp.locationCallback,
				false
	);
}
































var MA, init;

(function(){


	//-----------------------------------------------
	//
	//		   			MA class
	//				  ------------
	//
	// - Parent object for the page
	//
	// - Holds all of the other classes and universal
	//   variables that they use
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	MA = function(){

		/* properties */

		// array to hold all the google maps markers
		this.pins = [];

		// array to hold all the polygons
		this.polygons = [];

	    // - Set roperties to determine/manage which editting/
	    //   formatting modes are active
	    this.newPinMode = false;
	    this.newPolyMode = false;
		
		// init property for future PinDropper object
		// this.pinDropper = null;
		this.pinDropper = new PinDropper();

		// init property for future PolyDrawer object
		// this.polyDrawer = new PolyDrawer( this );

		// init property for future PolyEditor object
		// this.polyEditor = new PolyEditor( this );

	    // set the business name for easy access
	    this.businessName = document.getElementById("business-name").value;
	
	    /* construction */

	     // add event listener to expand the formatting toolbar
	    document.getElementById("search-maps-field")
	    	.addEventListener("keyup", this.autoExpand, false);
	    document.getElementById("search-maps-field")
	    	.addEventListener("blur", this.blurContract, false);
	}

	/* METHODS */

	//---------------------------------------------------
	// - event listener for search bar
	// - expand the height to accomodate the autocomplete
	//   results.
	MA.prototype.autoExpand = function(){
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
	MA.prototype.blurContract = function(){
		this.parentElement.style.marginBottom = "0px";
	}

	
	//---------------------------------------------------
	// - Terminate any open formatting modes
	// - Do not terminate the exception
	MA.prototype.termFormattingModes = function(exception){
		
		// drop new pin
		if( this.newPinMode && exception != "new pin" )

			this.terminateNewPinMode();

		// draw new polygon
		if( this.newPolyMode && exception != "new poly" )

			this.terminateNewPolyMode();
	} 
































	//-----------------------------------------------
	// 					drop new pin
	//				  ----------------
	//
	// - Contains properties and methods that allow a
	//   user to drop and edit their pins
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var PinDropper = function(){

		/* properties */

	    // temporary storage for google.maps.LatLng objects
	    this.tempLatLng = null;
	    // temporary storage for google.maps.Autocomplete
	    this.autocomp;

	    /* construction */

	    // add event listener to the add new pin button
	    document.getElementById("components-toolbar").children[3]
	    	.addEventListener("click", this.toggleNewPinMode, false);

	    // add event listener to the close new pin toolbar x
	    document.getElementById("drop-new-pin-toolbar").children[0]
	    	.addEventListener("click", this.terminateNewPinMode, false);
	}

	//---------------------------------------------------
	// - Event listener for new pin button in components
	//   toolbar
	PinDropper.prototype.toggleNewPinMode = function(){

		// If the drop-new-pin component is hidden
		if( document.getElementById("drop-new-pin-toolbar").style.display != "block" )

			// initialize drop-new-pin mode
			mapApp.pinDropper.initNewPinMode();

		else

			// terminate drop-new-pin mode
			mapApp.pinDropper.terminateNewPinMode();
	}

	//-----------------------------------------------
	// - initialize new pin mode
	// - display elements
	// - add event listeners
	PinDropper.prototype.initNewPinMode = function(){

		// exit the other formatting modes and hide other toolbars
		mapApp.termFormattingModes("new pin");

		// set drop-new-pin mode property to true
		mapApp.newPinMode = true;

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

	//-----------------------------------------------
	// - initialize the google maps drop new pin 
	//   functionality
	PinDropper.prototype.initGooglePinDrop = function(){

		// change the cursor on the map to a crosshair
		rsApp.map.setOptions({ 
								draggableCursor : "crosshair",
							  	draggingCursor  : "crosshair"
						   });

		// create the google maps Autocomplete object
		this.autocomp = new google.maps.places.Autocomplete( document.getElementById("search-maps-field") );

		// apply event listener when location is selected with click
		google.maps.event.addListener( rsApp.map, 'click', mapApp.pinDropper.dropPinClick );

		// apply event listener when location is selected via autocomplete field
		google.maps.event.addListener(this.autocomp, 'place_changed', mapApp.pinDropper.pinDropAutocomp);
	}

	//-----------------------------------------------
	// - map click event listener
	// - create the latlng object when the user clicks on the map
	// - call the drop pin method
	PinDropper.prototype.dropPinClick = function(e){

		// delete the previous temp LatLng object
		mapApp.pinDropper.tempLatLng = null;

		// get the LatLng object from the event
		mapApp.pinDropper.tempLatLng = e.latLng;

		// call the dropPin method
		mapApp.pinDropper.dropPin();
	}

	//-----------------------------------------------	
	// - autocomplete event listener
	// - Create the latlng object when the user selects 
	//   a place from the autocomplete suggestions.
	// - call the drop pin method
	PinDropper.prototype.pinDropAutocomp = function(){

		// hide the extra space under the search-maps-field
		setTimeout( mapApp.pinDropper.timeoutShrink, 100 );

		// create the LatLng object
		mapApp.pinDropper.tempLatLng = new google.maps.LatLng(
			      									mapApp.pinDropper.autocomp.getPlace().geometry.location.A,
			      									mapApp.pinDropper.autocomp.getPlace().geometry.location.F
			      								);

		// pan to this location
		rsApp.map.panTo( mapApp.tempLatLng );

		// zoom to the correct resolution
		rsApp.map.setZoom( 15 );

		// drop the pin after panning to the latlng
		setTimeout( mapApp.pinDropper.dropPin, 950 );
	}

	//-----------------------------------------------	
	// - function to drop a pin
	// - may only be called after mapApp.tempLatLng 
	//   property has been set
	PinDropper.prototype.dropPin = function(){ 

		// create a new pin and push it to the pins array
		mapApp.pins.push( new google.maps.Marker({
	      position: mapApp.pinDropper.tempLatLng,
	      map: rsApp.map,
	      title: 'Hello World!',
	      animation: google.maps.Animation.DROP
	  }) );
	}

	//-----------------------------------------------
	// - timeout function to hide the extra space
	//   under the #search-maps-field
	PinDropper.prototype.timeoutShrink = function(){
		// remove the margin
		document.getElementById("search-maps-field").parentElement.style.marginBottom = "0px";
	};

	//---------------------------------------------------
	// - terminate new pin mode
	// - hide elements
	// - remove event listeners
	PinDropper.prototype.terminateNewPinMode = function(){

		// set drop-new-pin mode property to true
		mapApp.newPinMode = false;

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

		mapApp.pinDropper.termGooglePinDrop();
	}

	//-----------------------------------------------
	// - terminate the google maps drop new pin 
	//   functionality
	PinDropper.prototype.termGooglePinDrop = function(){ 

		// remove the dropPin event listener
		google.maps.event.clearListeners( rsApp.map, 'click' );

		// change the cursor back to grabber
		rsApp.map.setOptions({ 
								draggableCursor : "grab",
							  	draggingCursor  : "grabbing"
						   });

		// remove autocomplete event listener	
		this.autocomp = null;
	}





























	//-----------------------------------------------
	// 				 initialize app
	//			   ------------------
	//
	// - init function called by google maps api once
	//   all of the google maps js is loaded.
	//
	//-----------------------------------------------

	init =  function(){

		// initialize the RS object
		window.rsApp = new RS();

		// set the user location
		rsApp.setUserLocation();

		// finally create the mapApp object
		window.mapApp = new MA();
	}



})();










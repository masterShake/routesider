
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
		this.polyDrawer = new PolyDrawer();

		// init property for future PolyEditor object
		this.polyEditor = new PolyEditor();

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
	// 				draw new polygon
	//			  --------------------
	//
	// - collection of methods that allows a user to
	//   draw a new polygon.
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var PolyDrawer = function(){

		/* properties */

	    // - temporary array to hold coordinates of new polygon
		//   under construction
		this.polyCoords = [];
		// - temporary array to hold any coordinates that have
		//   been removed from the polyline 
		this.polyCoordsRedo = [];
		// temporary google maps poly line object
		this.polyline = null;

	    /* construction */

	     // add event listener to the draw new polygon button
	    document.getElementById("components-toolbar").children[4]
	    	.addEventListener("click", this.toggleNewPolyMode, false);

	    // add event listener to the close new polygon toolbar x
	    document.getElementById("draw-new-polygon-toolbar").children[0]
	    	.addEventListener("click", this.terminateNewPolyMode, false);

	    // add event listener to the pull tab to toggle the draw-new-polygon toolbar
	    document.getElementById("toggle-toolbar").children[0].children[0]
	    	.addEventListener("click", this.toggleToolbar, false);

	    // undo polyline event listener
	    document.getElementById("undo")
	    	.addEventListener("click", this.undoDrawPolyline, false);

	    // redo polyline event listener
	    document.getElementById("redo")
	    	.addEventListener("click", this.redoDrawPolyline, false);

	    // complete the polygon event listener
	    document.getElementById("complete-polygon")
	    	.addEventListener("click", this.completePolygon, false);
	}

	/* METHODS */

	//-----------------------------------------------
	// - Event listener for new polygon button in the
	//   components toolbar
	PolyDrawer.prototype.toggleNewPolyMode = function(){

		// If the drop-new-pin component is hidden
		if( document.getElementById("draw-new-polygon-toolbar").style.display != "block" )

			// initialize draw-new-poly mode
			mapApp.polyDrawer.initNewPolyMode();

		else

			// terminate draw-new-poly mode
			mapApp.polyDrawer.terminateNewPolyMode();
	}

	//-----------------------------------------------	
	// - initialize new pin mode
	// - display elements
	// - add event listeners
	PolyDrawer.prototype.initNewPolyMode = function(){

		// exit the other formatting modes and hide other toolbars
		mapApp.termFormattingModes("new poly");

		// reset the new polygon mode property to true
		mapApp.newPolyMode = true;
		
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

		this.initGooglePolyDraw();
	}

	//-----------------------------------------------	
	// - set event listeners for google maps draw 
	//   polygon
	PolyDrawer.prototype.initGooglePolyDraw = function(){

		// change the cursor on the map to a crosshair
		rsApp.map.setOptions({ 
								draggableCursor : "crosshair",
							  	draggingCursor  : "crosshair"
						   });

		// reset the polyCoords array
		this.polyCoords = [];

		// reset the polyCoordsRedo array to redo undos
		this.polyCoordsRedo = [];

		// if the polyline property is set to null
		if( !this.polyline ){
			// create it
			this.polyline = new google.maps.Polyline({ editable : true });
			// set the map
			this.polyline.setMap( rsApp.map );
		}

		// apply event listener when location is selected with click
		google.maps.event.addListener( rsApp.map, 'click', mapApp.polyDrawer.drawPolyline );
	}

	//-----------------------------------------------	
	// - event listener polygon complete
	PolyDrawer.prototype.drawPolyline = function(e){ 

		// clear the polyCoordsRedo array because the history has changed
		mapApp.polyDrawer.polyCoordsRedo = [];

		// change the class of the redo button
		document.getElementById("redo").className = "btn";

		// push to the polyCoords array
		mapApp.polyDrawer.polyCoords.push( e.latLng );

		// set the new path
		mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );

		// maybe change the class of the complete button
		mapApp.polyDrawer.completeBtnClass();

		// defintely change the class of the undo button
		document.getElementById("undo").className = "btn btn-info";
	}

	//-----------------------------------------------	
	// - undo line event listener
	PolyDrawer.prototype.undoDrawPolyline = function(){

		// if polyCoords is empty, return false
		if( !mapApp.polyDrawer.polyCoords.length )
			return false;

		// pop off last point and add it to the undone
		mapApp.polyDrawer.polyCoordsRedo.push( mapApp.polyDrawer.polyCoords.pop() );

		// set class of redo button
		document.getElementById("redo").className = "btn btn-info";

		// now if polyCoords is empty, grey out the undo btn
		if( !mapApp.polyDrawer.polyCoords.length )
			this.className = "btn";

		// maybe change the class of the complete button
		mapApp.polyDrawer.completeBtnClass();

		// redraw the polyline
		mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );
	}

	//-----------------------------------------------	
	// - redo line event listener
	PolyDrawer.prototype.redoDrawPolyline = function(){

		// if polyCoords is empty, return false
		if( !mapApp.polyDrawer.polyCoordsRedo.length )
			return false;

		// - Pop off the last object in the polyCoords array
		// - Push it to the polyCoordsRedo array
		mapApp.polyDrawer.polyCoords.push( mapApp.polyDrawer.polyCoordsRedo.pop() );

		// If polyCoords is now empty, grey out the redo btn
		if( !mapApp.polyDrawer.polyCoordsRedo.length )
			this.className = "btn";

		// maybe change the class of the complete button
		mapApp.polyDrawer.completeBtnClass();

		// polyCoords is definitely full so undo needs the correct class
		document.getElementById("undo").className = "btn btn-info";

		// redraw the polyline
		mapApp.polyDrawer.polyline.setPath( mapApp.polyDrawer.polyCoords );
	}

	//-----------------------------------------------	
	// - clear the undo and redo btns and related 
	//   ms property arrays
	PolyDrawer.prototype.clearUndoRedoBtns = function(){

		// reset the polyCoords array
		this.polyCoords = [];

		// reset the polyCoordsRedo array to redo undos
		this.polyCoordsRedo = [];

		// reset the classes for the undo and redo btns
		document.getElementById("undo").className = "btn";
		document.getElementById("redo").className = "btn";
	}

	//-----------------------------------------------	 
	// - function to change the class of the complete-polygon button
	// - button will only fire if there are 3+ polyCoords
	PolyDrawer.prototype.completeBtnClass = function(){
		// If there are more than 3 polyCoords
		if( this.polyCoords.length > 2 )
			// change the class of the complete-polygon button
			document.getElementById("complete-polygon").className = "btn btn-success";
		else
			// grey the complete-polygon button out
			document.getElementById("complete-polygon").className = "btn";
	}

	//-----------------------------------------------	
	// - complete the polygon
	PolyDrawer.prototype.completePolygon = function(){

		// if there are fewer than 3 polyCoords, do nothing
		if( mapApp.polyDrawer.polyCoords.length < 3 ) return;

		// change the class of the complete-polygon btn back to grey
		document.getElementById("complete-polygon").className = "btn";

		// remove the polyline overlay from our map
		mapApp.polyDrawer.polyline.setMap(null);

		// delete the polyline object
		mapApp.polyDrawer.polyline = null;

		// remove event listeners
		google.maps.event.clearListeners( rsApp.map, 'click' );

		// create a new polygon object and push it to the array
		mapApp.polygons.push(
			new google.maps.Polygon({
									    paths: mapApp.polyDrawer.polyCoords,
									    strokeColor: document.getElementById("polygon-hex-stroke-input").dataset.hex,
									    strokeOpacity: document.getElementById("polygon-opacity-stroke-input").dataset.opacity,
									    strokeWeight: 3,
									    fillColor: document.getElementById("polygon-hex-fill-input").dataset.hex,
									    fillOpacity: document.getElementById("polygon-opacity-fill-input").dataset.opacity  
									})
						   );

		// put that bad boy on the map
		mapApp.polygons[mapApp.polygons.length - 1].setMap( rsApp.map );

		// clear the undo and redo btns
		mapApp.polyDrawer.clearUndoRedoBtns();

		// give the new polygon a description property
		mapApp.polygons[mapApp.polygons.length - 1]["description"] = 
			document.getElementById("polygon-description").value;

		// set the activePolygon property for mapApp
		mapApp.polyEditor.activePolygon = mapApp.polygons[mapApp.polygons.length - 1];
	}

	//-----------------------------------------------
	// - terminate new pin mode
	// - hide elements
	// - remove event listeners
	PolyDrawer.prototype.terminateNewPolyMode = function(){

		// reset the newPolyMode property to false
		mapApp.newPolyMode = false;
		
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

		mapApp.polyDrawer.termGooglePolyDraw();
	}

	//-----------------------------------------------	
	// - remove event listeners to draw polygon
	// - restore original functionality
	PolyDrawer.prototype.termGooglePolyDraw = function(){

		// change the cursor back to grabber
		rsApp.map.setOptions({ 
								draggableCursor : "grab",
							  	draggingCursor  : "grabbing"
						   });

	}

	//-----------------------------------------------
	// - event listener for <a> tag inside 
	//   #toolbar-toggle elem
	// - toggle the draw new polygon toolbar to make 
	//   more space on the map
	PolyDrawer.prototype.toggleToolbar = function(){
		// if the toolbar is displayed
		if( document.getElementById("draw-new-polygon-toolbar").offsetHeight > 60 ){
			// shrink it
			document.getElementById("draw-new-polygon-toolbar").style.height = "54px";
			// flip the toggler
			this.children[0].style.transform = "rotate(0deg)";
		}else{
			// grow it
			document.getElementById("draw-new-polygon-toolbar").style.height = "311px";
			// flip the toggler
			this.children[0].style.transform = "rotate(180deg)";
		}
	}


























	//-----------------------------------------------
	// 				   edit polygon
	//			  	 ----------------
	//
	// - collection of methods that allows a user to
	//   edit a polygon, old and new
	//
	//-----------------------------------------------

	/* CONSTRUCTOR */

	var PolyEditor = function(){

		/* properties */

		// pointer to the polygon we are working with
		this.activePolygon = null;
		// the property we are editing (stroke or fill)
		this.activeEdit = "stroke";
		// temporary object for keeping track of polygon options
		this.tempPolyOpts = null;

		/* construction */

		// edit stroke button event listener
	    document.getElementById("polygon-edit-stroke-btn")
	    	.addEventListener("click", this.activateColorEdit, false);

	    // edit fill button event listener
	    document.getElementById("polygon-edit-fill-btn")
	    	.addEventListener("click", this.activateColorEdit, false);

	    // change polygon color properties when clicking on color wheel
	    this.colorWheelBtns = document.getElementsByClassName("color-wheel")[0]
	    							.getElementsByTagName("button");
	   	for(var i = 0; i < this.colorWheelBtns.length; i++)
	   		this.colorWheelBtns[i].addEventListener("click", this.colorSelect, false);
	   	this.colorWheelBtns = null;
	   	delete this.colorWheelBtns;

	   	// change polygon opacity with slider event lsitener
	   	document.getElementById("polygon-opacity")
	   		.addEventListener("change", this.slideOpacity, false);

	   	// change polygon opacity with text input event listener
	   	document.getElementById("polygon-opacity-stroke-input")
	   		.addEventListener("keyup", this.typeOpacity, false);
	   	document.getElementById("polygon-opacity-fill-input")
	   		.addEventListener("keyup", this.typeOpacity, false);
	   	document.getElementById("polygon-opacity-stroke-input")
	   		.addEventListener("blur", this.blurOpacity, false);
	   	document.getElementById("polygon-opacity-fill-input")
	   		.addEventListener("blur", this.blurOpacity, false);
	}

	//-----------------------------------------------
	// - event listener to activate edit color button
	PolyEditor.prototype.activateColorEdit = function(){

		// determine which property of the polygon we are editing
		mapApp.polyEditor.activeEdit = this.dataset.activate;

		if( mapApp.polyEditor.activeEdit == "stroke" ){
			// change the classes
			document.getElementById("polygon-edit-stroke-btn").className = "btn btn-color-selected";
			document.getElementById("polygon-edit-fill-btn").className = "btn";
		}else{
			document.getElementById("polygon-edit-stroke-btn").className = "btn";
			document.getElementById("polygon-edit-fill-btn").className = "btn btn-color-selected";
		}
		// set the opacity slider
		document.getElementById("polygon-opacity").value = 
			document.getElementById("polygon-opacity-"+ mapApp.polyEditor.activeEdit +"-input").dataset.opacity;
	}

	//------------------------------------------------
	// - event listener for color wheel btns
	// - on click, set the background color, data-hex, 
	//   and value properties for the hex inputs.
	PolyEditor.prototype.colorSelect = function(){

		// set the background color
		document.getElementById("polygon-edit-" + mapApp.polyEditor.activeEdit + "-btn").style.backgroundColor = this.dataset.hex;

		// set the icon/text color
		document.getElementById("polygon-edit-" + mapApp.polyEditor.activeEdit + "-btn").style.color =
			( mapApp.polyEditor.hexBrightness( mapApp.polyEditor.hexToRgb( this.dataset.hex ) ) > .6 ) ? "#444" : "#FFF";
		
		// set the value
		document.getElementById("polygon-hex-" + mapApp.polyEditor.activeEdit + "-input").value = this.dataset.hex;
		
		// set the data-hex attribute
		document.getElementById("polygon-hex-" + mapApp.polyEditor.activeEdit + "-input").setAttribute( "data-hex", this.dataset.hex );
	
		// if we have an active polygon
		if(mapApp.polyEditor.activePolygon){
			// change the options for the active polygon
			mapApp.polyEditor.tempPolyOpts = {};
			mapApp.polyEditor.tempPolyOpts[mapApp.polyEditor.activeEdit + "Color"] = this.dataset.hex;
			mapApp.polyEditor.activePolygon.setOptions( mapApp.polyEditor.tempPolyOpts );
			mapApp.polyEditor.tempPolyOpts = null;
		}
	}

	//-----------------------------------------------
	// - algorithm to determine if a hex value is 
	//   light or dark.
	// - @rgbObj -> object with r, g, & b values as
	//   returned by hext to rgb function
	// - returns a value between 0 and 1
	// - #000 would return a value of 0
	// - #FFF would return a value of 1
	// - all other colors would be somewhere
	//   inbetween
	// - values below .6 should be overlaid with
	//   white text
	// - values above .6, overlaid with black
	PolyEditor.prototype.hexBrightness = function( rgbObj ){
		// calculate & return weighted average
		return ( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256;
	}
	//-----------------------------------------------
	// - algorithm to convert hex to rgb
	// - @hex -> hexidecimal as string
	// - returns object with r, g, & b values
	PolyEditor.prototype.hexToRgb = function(hex) {
		// convert to array of hex vals
		this.tempHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		// return the results as an object
	    return this.tempHex ? {
	        r: parseInt(this.tempHex[1], 16),
	        g: parseInt(this.tempHex[2], 16),
	        b: parseInt(this.tempHex[3], 16)
	    } : null;
	}

	//-----------------------------------------------
	// - event listener to change the opacity when
	//   the user moves the slider
	PolyEditor.prototype.slideOpacity = function(){

		// set the properties of the input
		document.getElementById("polygon-opacity-" + mapApp.polyEditor.activeEdit + "-input").value = this.value;
		document.getElementById("polygon-opacity-" + mapApp.polyEditor.activeEdit + "-input").setAttribute( "data-opacity", this.value );

		// set the options of the active polygon
		if(mapApp.polyEditor.activePolygon){
			// change the options for the active polygon
			mapApp.polyEditor.tempPolyOpts = {};
			mapApp.polyEditor.tempPolyOpts[mapApp.polyEditor.activeEdit + "Opacity"] = this.value;
			mapApp.polyEditor.activePolygon.setOptions( mapApp.polyEditor.tempPolyOpts );
			mapApp.polyEditor.tempPolyOpts = null;
		}
	}

	//-----------------------------------------------
	// - keyup event listener for opacity input
	PolyEditor.prototype.typeOpacity = function(){

		// if there is no input, or the value is 1 return 
		if( !this.value || this.value == "1" ) return;

		// strip out non-numeric values from the string
		this.value.replace(/[^0-9\.]/g, '');

		// if the value of the first character is not 0
		if( this.value.charAt(0) != "0" )

			// pop a 0 in there
			this.value = "0" + this.value;

		// if the value of the second character is not "."
		if( this.value.length > 1 && this.value.charAt(1) != "." )

			// pop the decimal in there
			this.value = "0." + this.value.substring(1, 3);

		// set the data-opacity attribute

		// set the value of the slider

		// change the polygon property options

	}
	//-----------------------------------------------
	// - if the use leaves the field blank, set the
	//   value to 0
	PolyEditor.prototype.blurOpacity = function(){
		if(this.value === "")
			this.value = "0";
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










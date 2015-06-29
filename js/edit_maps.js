
//-----------------------------------------------
//
//		   		 edit_maps app
//			   -----------------
//
// - This file contains all the methods that can
//   be found specifically on edit_maps.php
//
// - Because this page requires so much
//   javascript, I created a new class called
//   ma (mapApp) instead of adding more
//   prototypes to the rs class.
//
// - Most functions are NOT added as prototypes
//   of the rs object.
//
//-----------------------------------------------












































//-----------------------------------------------
//
//		   	 additional rs methods
//
//-----------------------------------------------

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
















































//-----------------------------------------------
//
//		   			ma class
//
//-----------------------------------------------



(function(){

	// initialize the variable
	window.mapApp = {};


	/* constructor */

	window.ma = function(){

		/* new pin properties */

	    // - Initialize arrays to hold all google.maps.Marker
	    //   objects for given business.
	    this.pins = [];
	    // - Set roperties to determine/manage which editting/
	    //   formatting modes are active
	    this.newPinMode = false;
	    this.newPolyMode = false;
	    // temporary storage for google.maps.LatLng objects
	    this.tempLatLng = {};
	    // temporary storage for google.maps.Autocomplete
	    this.autocomp;

	    /* edit pin properties */

	    /* polygon properties */

	    // - Initialize arrays to hold all google.maps.Data.Polygon 
	    //   objects for given business.
	    this.polygons = [];
		// - temporary array to hold coordinates of new polygon
		//   under construction
		this.polyCoords = [];
		// - temporary array to hold any coordinates that have
		//   been removed from the polyline 
		this.polyCoordsRedo = [];

		/* edit polygon properties */

		// - temporary variable to hold an object with rgb vals
		this.tempHex = {};
		// - keep track of which element color is being edited
		// - values = "stroke" || "fill"
		// - default stroke
		this.activeEdit = "stroke";
		// pointer to polygon user is currently editing
		this.activePolygon = null;

	    /* other properties */

	    // set the business name for easy access
	    mapApp.businessName = document.getElementById("business-name").value;

	    /* constructor commands */

	}



	/* ma methods */


	//---------------------------------------------------
	// - event listener for search bar
	// - expand the height to accomodate the autocomplete
	//   results.
	ma.prototype.autoExpand = function(){
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
	ma.prototype.blurContract = function(){
		this.parentElement.style.marginBottom = "0px";
	}

	
	//---------------------------------------------------
	// - Terminate any open formatting modes
	// - Do not terminate the exception
	ma.prototype.termFormattingModes = function(exception){
		
		// drop new pin
		if( this.newPinMode && exception != "new pin" )

			this.terminateNewPinMode();

		// draw new polygon
		if( this.newPolyMode && exception != "new poly" )

			this.terminateNewPolyMode();
	} 

































	//----------------------------------------------------
	// 					drop new pin
	//				  ----------------
	//
	// - Collection of methods to allow user to drop a
	//   new pin on the map.
	//
	//----------------------------------------------------

	//---------------------------------------------------
	// - Event listener for new pin button in components
	//   toolbar
	ma.prototype.toggleNewPinMode = function(){

		// If the drop-new-pin component is hidden
		if( document.getElementById("drop-new-pin-toolbar").style.display != "block" )

			// initialize drop-new-pin mode
			mapApp.initNewPinMode();

		else

			// terminate drop-new-pin mode
			mapApp.terminateNewPinMode();
	}

	//-----------------------------------------------
	// - initialize new pin mode
	// - display elements
	// - add event listeners
	ma.prototype.initNewPinMode = function(){

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
	ma.prototype.initGooglePinDrop = function(){

		// change the cursor on the map to a crosshair
		rsApp.map.setOptions({ 
								draggableCursor : "crosshair",
							  	draggingCursor  : "crosshair"
						   });

		// create the google maps Autocomplete object
		this.autocomp = new google.maps.places.Autocomplete( document.getElementById("search-maps-field") );

		// apply event listener when location is selected with click
		google.maps.event.addListener( rsApp.map, 'click', mapApp.dropPinClick );

		// apply event listener when location is selected via autocomplete field
		google.maps.event.addListener(this.autocomp, 'place_changed', mapApp.dropPinAutocomp);
	}

	//-----------------------------------------------
	// - map click event listener
	// - create the latlng object when the user clicks on the map
	// - call the drop pin method
	ma.prototype.dropPinClick = function(e){

		// delete the previous temp LatLng object
		delete mapApp.tempLatLng;

		// get the LatLng object from the event
		mapApp.tempLatLng = e.latLng;

		// call the dropPin method
		mapApp.dropPin();
	}

	//-----------------------------------------------	
	// - autocomplete event listener
	// - Create the latlng object when the user selects 
	//   a place from the autocomplete suggestions.
	// - call the drop pin method
	ma.prototype.dropPinAutocomp = function(){

		// hide the extra space under the search-maps-field
		setTimeout( mapApp.timeoutShrink, 100 );

		// delete the previous temp LatLng object
		delete mapApp.tempLatLng;

		// create the LatLng object
		mapApp.tempLatLng = new google.maps.LatLng(
			      									mapApp.autocomp.getPlace().geometry.location.A,
			      									mapApp.autocomp.getPlace().geometry.location.F
			      								);

		// pan to this location
		rsApp.map.panTo( mapApp.tempLatLng );

		// zoom to the correct resolution
		rsApp.map.setZoom( 15 );

		// drop the pin after panning to the latlng
		setTimeout( mapApp.dropPin, 950 );
	}

	//-----------------------------------------------	
	// - function to drop a pin
	// - may only be called after mapApp.tempLatLng 
	//   property has been set
	ma.prototype.dropPin = function(){

		// create a new pin and push it to the pins array
		mapApp.pins.push( new google.maps.Marker({
	      position: mapApp.tempLatLng,
	      map: rsApp.map,
	      title: 'Hello World!',
	      animation: google.maps.Animation.DROP
	  }) );
	}

	//-----------------------------------------------
	// - timeout function to hide the extra space
	//   under the #search-maps-field
	ma.prototype.timeoutShrink = function(){
		// remove the margin
		document.getElementById("search-maps-field").parentElement.style.marginBottom = "0px";
	};

	//---------------------------------------------------
	// - terminate new pin mode
	// - hide elements
	// - remove event listeners
	ma.prototype.terminateNewPinMode = function(){

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

		mapApp.termGooglePinDrop();
	}

	//-----------------------------------------------
	// - terminate the google maps drop new pin 
	//   functionality
	ma.prototype.termGooglePinDrop = function(){

		// remove the dropPin event listener
		google.maps.event.clearListeners( rsApp.map, 'click' );

		// change the cursor back to grabber
		rsApp.map.setOptions({ 
								draggableCursor : "grab",
							  	draggingCursor  : "grabbing"
						   });

		// remove autocomplete event listener	
		delete this.autocomp;

		// remove autocomplete event listener
		document.getElementById("search-maps-field")
			.removeEventListener("keyup", mapApp.autocomplete, false);
	}


































	//-----------------------------------------------
	// 				draw new polygon
	//			  --------------------
	//
	// - collection of methods that allows a user to
	//   draw a new polygon.
	//
	//-----------------------------------------------

	//-----------------------------------------------
	// - Event listener for new polygon button in the
	//   components toolbar
	ma.prototype.toggleNewPolyMode = function(){

		// If the drop-new-pin component is hidden
		if( document.getElementById("draw-new-polygon-toolbar").style.display != "block" )

			// initialize draw-new-poly mode
			mapApp.initNewPolyMode();

		else

			// terminate draw-new-poly mode
			mapApp.terminateNewPolyMode();
	}

	//-----------------------------------------------	
	// - initialize new pin mode
	// - display elements
	// - add event listeners
	ma.prototype.initNewPolyMode = function(){

		// exit the other formatting modes and hide other toolbars
		mapApp.termFormattingModes("new poly");

		// reset the new polygon mode property to true
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

		this.initGooglePolyDraw();
	}

	//-----------------------------------------------	
	// - set event listeners for google maps draw 
	//   polygon
	ma.prototype.initGooglePolyDraw = function(){

		// change the cursor on the map to a crosshair
		rsApp.map.setOptions({ 
								draggableCursor : "crosshair",
							  	draggingCursor  : "crosshair"
						   });

		// reset the polyCoords array
		this.polyCoords = [];

		// reset the polyCoordsRedo array to redo undos
		this.polyCoordsRedo = [];

		// if we havent already created the polyline object
		if( !this.hasOwnProperty("polyline") ){
			// create it
			this.polyline = new google.maps.Polyline({ editable : true });
			// set the map
			this.polyline.setMap( rsApp.map );
		}

		// apply event listener when location is selected with click
		google.maps.event.addListener( rsApp.map, 'click', mapApp.drawPolyline );
	}

	//-----------------------------------------------	
	// - event listener polygon complete
	ma.prototype.drawPolyline = function(e){ 

		// clear the polyCoordsRedo array because the history has changed
		mapApp.polyCoordsRedo = [];

		// change the class of the redo button
		document.getElementById("redo").className = "btn";

		// push to the polyCoords array
		mapApp.polyCoords.push( e.latLng );

		// set the new path
		mapApp.polyline.setPath( mapApp.polyCoords );

		// maybe change the class of the complete button
		mapApp.completeBtnClass();

		// defintely change the class of the undo button
		document.getElementById("undo").className = "btn btn-info";
	}

	//-----------------------------------------------	
	// - undo line event listener
	ma.prototype.undoDrawPolyline = function(){

		// if polyCoords is empty, return false
		if( !mapApp.polyCoords.length )
			return false;

		// pop off last point and add it to the undone
		mapApp.polyCoordsRedo.push( mapApp.polyCoords.pop() );

		// set class of redo button
		document.getElementById("redo").className = "btn btn-info";

		// now if polyCoords is empty, grey out the undo btn
		if( !mapApp.polyCoords.length )
			this.className = "btn";

		// maybe change the class of the complete button
		mapApp.completeBtnClass();

		// redraw the polyline
		mapApp.polyline.setPath( mapApp.polyCoords );
	}

	//-----------------------------------------------	
	// - redo line event listener
	ma.prototype.redoDrawPolyline = function(){

		// if polyCoords is empty, return false
		if( !mapApp.polyCoordsRedo.length )
			return false;

		// - Pop off the last object in the polyCoords array
		// - Push it to the polyCoordsRedo array
		mapApp.polyCoords.push( mapApp.polyCoordsRedo.pop() );

		// If polyCoords is now empty, grey out the redo btn
		if( !mapApp.polyCoordsRedo.length )
			this.className = "btn";

		// maybe change the class of the complete button
		mapApp.completeBtnClass();

		// polyCoords is definitely full so undo needs the correct class
		document.getElementById("undo").className = "btn btn-info";

		// redraw the polyline
		mapApp.polyline.setPath( mapApp.polyCoords );
	}

	//-----------------------------------------------	
	// - clear the undo and redo btns and related 
	//   ms property arrays
	ma.prototype.clearUndoRedoBtns = function(){

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
	ma.prototype.completeBtnClass = function(){
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
	ma.prototype.completePolygon = function(){

		// if there are fewer than 3 polyCoords, do nothing
		if( mapApp.polyCoords.length < 3 ) return;

		// change the class of the complete-polygon btn back to grey
		document.getElementById("complete-polygon").className = "btn";

		// remove the polyline overlay from our map
		mapApp.polyline.setMap(null);

		// delete the polyline object
		delete mapApp.polyline;

		// remove event listeners
		google.maps.event.clearListeners( rsApp.map, 'click' );

		// create a new polygon object and push it to the array
		mapApp.polygons.push(
			new google.maps.Polygon({
									    paths: mapApp.polyCoords,
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
		mapApp.clearUndoRedoBtns();

		// give the new polygon a description property
		mapApp.polygons[mapApp.polygons.length - 1]["description"] = 
			document.getElementById("polygon-description").value;

		// set the activePolygon property for mapApp
		mapApp.activePolygon = mapApp.polygons[mapApp.polygons.length - 1];
	}

	//-----------------------------------------------
	// - terminate new pin mode
	// - hide elements
	// - remove event listeners
	ma.prototype.terminateNewPolyMode = function(){

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

		mapApp.termGooglePolyDraw();
	}

	//-----------------------------------------------	
	// - remove event listeners to draw polygon
	// - restore original functionality
	ma.prototype.termGooglePolyDraw = function(){

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
	ma.prototype.toggleToolbar = function(){
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

	//-----------------------------------------------
	// - event listener to activate edit color button
	ma.prototype.activateColorEdit = function(){

		// determine which property of the polygon we are editing
		mapApp.activeEdit = this.dataset.activate;

		// change the classes
		if( mapApp.activeEdit == "stroke" ){
			document.getElementById("polygon-edit-stroke-btn").className = "btn btn-color-selected";
			document.getElementById("polygon-edit-fill-btn").className = "btn";
		}else{
			document.getElementById("polygon-edit-stroke-btn").className = "btn";
			document.getElementById("polygon-edit-fill-btn").className = "btn btn-color-selected";
		}
	}

	//------------------------------------------------
	// - event listener for color wheel btns
	// - on click, set the background color, data-hex, 
	//   and value properties for the hex inputs.
	ma.prototype.colorSelect = function(){

		// set the background color
		document.getElementById("polygon-edit-" + mapApp.activeEdit + "-btn").style.backgroundColor = this.dataset.hex;

		// set the icon/text color
		document.getElementById("polygon-edit-" + mapApp.activeEdit + "-btn").style.color =
			( mapApp.hexBrightness( mapApp.hexToRgb( this.dataset.hex ) ) > .6 ) ? "#444" : "#FFF";
		
		// set the value
		document.getElementById("polygon-hex-" + mapApp.activeEdit + "-input").value = this.dataset.hex;
		
		// set the data-hex attribute
		document.getElementById("polygon-hex-" + mapApp.activeEdit + "-input").setAttribute( "data-hex", this.dataset.hex );
	
		// change the options for the active polygon
		mapApp.tempPolyOpts = {};
		mapApp.tempPolyOpts[mapApp.activeEdit + "Color"] = this.dataset.hex;
		mapApp.activePolygon.setOptions( mapApp.tempPolyOpts );
		delete mapApp.tempPolyOpts;
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
	ma.prototype.hexBrightness = function( rgbObj ){
		// calculate & return weighted average
		return ( rgbObj.r*0.299 + rgbObj.g*0.587 + rgbObj.b*0.114 ) / 256;
	}
	//-----------------------------------------------
	// - algorithm to convert hex to rgb
	// - @hex -> hexidecimal as string
	// - returns object with r, g, & b values
	ma.prototype.hexToRgb = function(hex) {
		// delete the previous tempHex object
		delete this.tempHex;
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
	// 				 initialize app
	//			   ------------------
	//
	// - init function called by google maps api once
	//   all of the google maps js is loaded.
	//
	//-----------------------------------------------

	window.init =  function(){


	    /*--------- instantiate the necessary objects ----------*/

	    rsApp = new rs();

	    mapApp = new ma();


	    /*--------- call required constructor methods ----------*/

	    rsApp.setUserLocation();


	    /*------------- add the event listeners ----------------*/

	    // add event listener to expand the formatting toolbar
	    document.getElementById("search-maps-field")
	    	.addEventListener("keyup", mapApp.autoExpand, false);
	    document.getElementById("search-maps-field")
	    	.addEventListener("blur", mapApp.blurContract, false);

	    // add event listener to the add new pin button
	    document.getElementById("components-toolbar").children[3]
	    	.addEventListener("click", mapApp.toggleNewPinMode, false);

	    // add event listener to the close new pin toolbar x
	    document.getElementById("drop-new-pin-toolbar").children[0]
	    	.addEventListener("click", mapApp.terminateNewPinMode, false);

	    // add event listener to the draw new polygon button
	    document.getElementById("components-toolbar").children[4]
	    	.addEventListener("click", mapApp.toggleNewPolyMode, false);

	    // add event listener to the close new polygon toolbar x
	    document.getElementById("draw-new-polygon-toolbar").children[0]
	    	.addEventListener("click", mapApp.terminateNewPolyMode, false);

	    // add event listener to the pull tab to toggle the draw-new-polygon toolbar
	    document.getElementById("toggle-toolbar").children[0].children[0]
	    	.addEventListener("click", mapApp.toggleToolbar, false);

	    // undo polyline event listener
	    document.getElementById("undo")
	    	.addEventListener("click", mapApp.undoDrawPolyline, false);

	    // redo polyline event listener
	    document.getElementById("redo")
	    	.addEventListener("click", mapApp.redoDrawPolyline, false);

	    // complete the polygon event listener
	    document.getElementById("complete-polygon")
	    	.addEventListener("click", mapApp.completePolygon, false);
	
	    // edit stroke button event listener
	    document.getElementById("polygon-edit-stroke-btn")
	    	.addEventListener("click", mapApp.activateColorEdit, false);

	    // edit fill button event listener
	    document.getElementById("polygon-edit-fill-btn")
	    	.addEventListener("click", mapApp.activateColorEdit, false);

	    // change polygon color properties when clicking on color wheel
	    mapApp.colorWheelBtns = document.getElementsByClassName("color-wheel")[0]
	    							.getElementsByTagName("button");
	   	for(var i = 0; i < mapApp.colorWheelBtns.length; i++)
	   		mapApp.colorWheelBtns[i].addEventListener("click", mapApp.colorSelect, false);
	   	delete mapApp.colorWheelBtns;

	}




})();